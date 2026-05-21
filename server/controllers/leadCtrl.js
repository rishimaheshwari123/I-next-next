const Lead = require("../models/leadModel");
const Employee = require("../models/employeeModel");

// Create Lead
exports.createLead = async (req, res) => {
  try {
    const userId = req.user.id;
    const leadData = { ...req.body, createdBy: userId };

    const lead = await Lead.create(leadData);

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({
      success: false,
      message: "Error creating lead",
      error: error.message,
    });
  }
};

// Get All Leads with Filters
exports.getAllLeads = async (req, res) => {
  try {
    const {
      status,
      source,
      type,
      priority,
      startDate,
      endDate,
      search,
    } = req.query;

    let query = {};

    // Filter by status
    if (status) {
      query.leadStatus = status;
    }

    // Filter by source
    if (source) {
      query.leadSource = source;
    }

    // Filter by type
    if (type) {
      query.leadType = type;
    }

    // Filter by priority
    if (priority) {
      query.priority = priority;
    }

    // Filter by date range
    if (startDate && endDate) {
      query.receivedDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Search by client name or contact number
    if (search) {
      query.$or = [
        { clientName: { $regex: search, $options: "i" } },
        { contactNumber: { $regex: search, $options: "i" } },
        { leadTitle: { $regex: search, $options: "i" } },
      ];
    }

    const leads = await Lead.find(query)
      .populate("assignedTo", "name employeeId")
      .populate("createdBy", "name email")
      .sort({ receivedDate: -1 });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching leads",
      error: error.message,
    });
  }
};

// Get Lead Statistics
exports.getLeadStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ leadStatus: "New" });
    const contactedLeads = await Lead.countDocuments({ leadStatus: "Contacted" });
    const qualifiedLeads = await Lead.countDocuments({ leadStatus: "Qualified" });
    const wonLeads = await Lead.countDocuments({ leadStatus: "Won" });
    const lostLeads = await Lead.countDocuments({ leadStatus: "Lost" });
    const onHoldLeads = await Lead.countDocuments({ leadStatus: "On Hold" });

    // Calculate total revenue from won leads
    const wonLeadsData = await Lead.find({ leadStatus: "Won" });
    const totalRevenue = wonLeadsData.reduce(
      (sum, lead) => sum + (lead.budget || 0),
      0
    );

    // Get leads by source
    const leadsBySource = await Lead.aggregate([
      {
        $group: {
          _id: "$leadSource",
          count: { $sum: 1 },
        },
      },
    ]);

    // Get leads by type
    const leadsByType = await Lead.aggregate([
      {
        $group: {
          _id: "$leadType",
          count: { $sum: 1 },
        },
      },
    ]);

    // Get upcoming follow-ups (next 7 days)
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const upcomingFollowUps = await Lead.countDocuments({
      followUpDate: { $gte: today, $lte: nextWeek },
      leadStatus: { $nin: ["Won", "Lost"] },
    });

    res.status(200).json({
      success: true,
      data: {
        totalLeads,
        newLeads,
        contactedLeads,
        qualifiedLeads,
        wonLeads,
        lostLeads,
        onHoldLeads,
        totalRevenue,
        upcomingFollowUps,
        leadsBySource,
        leadsByType,
      },
    });
  } catch (error) {
    console.error("Error fetching lead stats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};

// Get Single Lead
exports.getLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findById(id)
      .populate("assignedTo", "name employeeId email contactNumber")
      .populate("createdBy", "name email");

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error("Error fetching lead:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching lead",
      error: error.message,
    });
  }
};

// Update Lead
exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("assignedTo", "name employeeId")
      .populate("createdBy", "name email");

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).json({
      success: false,
      message: "Error updating lead",
      error: error.message,
    });
  }
};

// Delete Lead
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting lead:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting lead",
      error: error.message,
    });
  }
};

// Update Lead Status
exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;

    const updateData = { leadStatus: status };

    // If status is Won or Lost, set actual closing date
    if (status === "Won" || status === "Lost") {
      updateData.actualClosingDate = new Date();
    }

    if (remarks) {
      updateData.remarks = remarks;
    }

    const lead = await Lead.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Error updating lead status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating status",
      error: error.message,
    });
  }
};

// Assign Lead to Employee
exports.assignLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeId } = req.body;

    // Check if employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      { assignedTo: employeeId },
      { new: true }
    ).populate("assignedTo", "name employeeId");

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead assigned successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Error assigning lead:", error);
    res.status(500).json({
      success: false,
      message: "Error assigning lead",
      error: error.message,
    });
  }
};

// Get Upcoming Follow-ups
exports.getUpcomingFollowUps = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const followUps = await Lead.find({
      followUpDate: { $gte: today },
      leadStatus: { $nin: ["Won", "Lost"] },
    })
      .populate("assignedTo", "name employeeId")
      .sort({ followUpDate: 1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: followUps.length,
      data: followUps,
    });
  } catch (error) {
    console.error("Error fetching follow-ups:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching follow-ups",
      error: error.message,
    });
  }
};

// ============ EMPLOYEE ROUTES ============

// Get My Assigned Leads (Employee)
exports.getMyLeads = async (req, res) => {
  try {
    const employeeId = req.user.id; // This is employee._id from JWT
    const { status, search } = req.query;

    // Get employee
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    let query = { assignedTo: employee._id };

    // Filter by status
    if (status) {
      query.leadStatus = status;
    }

    // Search
    if (search) {
      query.$or = [
        { clientName: { $regex: search, $options: "i" } },
        { contactNumber: { $regex: search, $options: "i" } },
        { leadTitle: { $regex: search, $options: "i" } },
      ];
    }

    const leads = await Lead.find(query)
      .populate("assignedTo", "name employeeId")
      .populate("createdBy", "name email")
      .sort({ receivedDate: -1 });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.error("Error fetching my leads:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching leads",
      error: error.message,
    });
  }
};

// Update Lead Status (Employee)
exports.updateMyLeadStatus = async (req, res) => {
  try {
    const employeeId = req.user.id; // This is employee._id from JWT
    const { id } = req.params;
    const { status, notes } = req.body;

    // Get employee
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Check if lead is assigned to this employee
    const lead = await Lead.findOne({ _id: id, assignedTo: employee._id });
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found or not assigned to you",
      });
    }

    const updateData = { leadStatus: status };

    // If status is Won or Lost, set actual closing date
    if (status === "Won" || status === "Lost") {
      updateData.actualClosingDate = new Date();
    }

    // Add notes to remarks
    if (notes) {
      const timestamp = new Date().toLocaleString();
      const newNote = `\n[${timestamp}] ${employee.name}: ${notes}`;
      updateData.remarks = (lead.remarks || "") + newNote;
    }

    const updatedLead = await Lead.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate("assignedTo", "name employeeId")
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: updatedLead,
    });
  } catch (error) {
    console.error("Error updating lead:", error);
    res.status(500).json({
      success: false,
      message: "Error updating lead",
      error: error.message,
    });
  }
};

// Add Notes to Lead (Employee)
exports.addLeadNotes = async (req, res) => {
  try {
    const employeeId = req.user.id; // This is employee._id from JWT
    const { id } = req.params;
    const { notes } = req.body;

    if (!notes || !notes.trim()) {
      return res.status(400).json({
        success: false,
        message: "Notes cannot be empty",
      });
    }

    // Get employee
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Check if lead is assigned to this employee
    const lead = await Lead.findOne({ _id: id, assignedTo: employee._id });
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found or not assigned to you",
      });
    }

    // Add notes with timestamp
    const timestamp = new Date().toLocaleString();
    const newNote = `\n[${timestamp}] ${employee.name}: ${notes}`;
    const updatedRemarks = (lead.remarks || "") + newNote;

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { remarks: updatedRemarks },
      { new: true }
    )
      .populate("assignedTo", "name employeeId")
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      message: "Notes added successfully",
      data: updatedLead,
    });
  } catch (error) {
    console.error("Error adding notes:", error);
    res.status(500).json({
      success: false,
      message: "Error adding notes",
      error: error.message,
    });
  }
};

// Add Notes to Lead (Admin)
exports.addLeadNotesAdmin = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { notes } = req.body;

    if (!notes || !notes.trim()) {
      return res.status(400).json({
        success: false,
        message: "Notes cannot be empty",
      });
    }

    // Get admin user
    const Auth = require("../models/authModel");
    const admin = await Auth.findById(userId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Get lead
    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    // Add notes with timestamp and admin name
    const timestamp = new Date().toLocaleString();
    const newNote = `\n[${timestamp}] ${admin.name} (Admin): ${notes}`;
    const updatedRemarks = (lead.remarks || "") + newNote;

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { remarks: updatedRemarks },
      { new: true }
    )
      .populate("assignedTo", "name employeeId")
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      message: "Notes added successfully",
      data: updatedLead,
    });
  } catch (error) {
    console.error("Error adding notes:", error);
    res.status(500).json({
      success: false,
      message: "Error adding notes",
      error: error.message,
    });
  }
};
