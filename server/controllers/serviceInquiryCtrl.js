const ServiceInquiry = require("../models/serviceInquiryModel");
const Service = require("../models/serviceModel");
const Auth = require("../models/authModel");

// Create Service Inquiry (Client)
exports.createInquiry = async (req, res) => {
  try {
    const clientId = req.user.id;
    const { serviceId, variantName, variantAmount, message, requirements } = req.body;

    // Validate required fields
    if (!serviceId || !variantName || !variantAmount || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Get client details from auth
    const client = await Auth.findById(clientId);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    const inquiry = await ServiceInquiry.create({
      serviceId,
      variantName,
      variantAmount,
      clientId,
      clientName: client.name || "Client",
      clientEmail: client.email,
      clientPhone: client.phone || "",
      message,
      requirements: requirements || "",
    });

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully",
      data: inquiry,
    });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    res.status(500).json({
      success: false,
      message: "Error creating inquiry",
      error: error.message,
    });
  }
};

// Get All Inquiries (Admin)
exports.getAllInquiries = async (req, res) => {
  try {
    const { status, serviceId, search, clientId } = req.query;

    let query = {};

    if (status) {
      query.status = status;
    }

    if (serviceId) {
      query.serviceId = serviceId;
    }

    if (clientId) {
      query.clientId = clientId;
    }

    if (search) {
      query.$or = [
        { clientName: { $regex: search, $options: "i" } },
        { clientEmail: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const inquiries = await ServiceInquiry.find(query)
      .populate({
        path: "serviceId",
        select: "serviceName category",
        populate: {
          path: "category",
          select: "name",
        },
      })
      .populate("clientId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching inquiries",
      error: error.message,
    });
  }
};

// Get My Inquiries (Client)
exports.getMyInquiries = async (req, res) => {
  try {
    const clientId = req.user.id;
    const { status } = req.query;

    let query = { clientId };

    if (status) {
      query.status = status;
    }

    const inquiries = await ServiceInquiry.find(query)
      .populate({
        path: "serviceId",
        select: "serviceName category",
        populate: {
          path: "category",
          select: "name",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    console.error("Error fetching my inquiries:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching inquiries",
      error: error.message,
    });
  }
};

// Get Inquiry by ID
exports.getInquiryById = async (req, res) => {
  try {
    const { id } = req.params;

    const inquiry = await ServiceInquiry.findById(id)
      .populate({
        path: "serviceId",
        select: "serviceName category description",
        populate: {
          path: "category",
          select: "name",
        },
      })
      .populate("clientId", "name email phone");

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    console.error("Error fetching inquiry:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching inquiry",
      error: error.message,
    });
  }
};

// Update Inquiry Status (Admin)
exports.updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    // Validate status
    const validStatuses = ["pending", "contacted", "converted", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const updateData = { status };
    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }

    const inquiry = await ServiceInquiry.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate("serviceId", "serviceName")
      .populate("clientId", "name email");

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry status updated successfully",
      data: inquiry,
    });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    res.status(500).json({
      success: false,
      message: "Error updating inquiry",
      error: error.message,
    });
  }
};

// Get Inquiry Statistics (Admin)
exports.getInquiryStats = async (req, res) => {
  try {
    const totalInquiries = await ServiceInquiry.countDocuments();
    const pending = await ServiceInquiry.countDocuments({ status: "pending" });
    const contacted = await ServiceInquiry.countDocuments({
      status: "contacted",
    });
    const converted = await ServiceInquiry.countDocuments({
      status: "converted",
    });
    const rejected = await ServiceInquiry.countDocuments({ status: "rejected" });

    // Inquiries by service
    const inquiriesByService = await ServiceInquiry.aggregate([
      {
        $group: {
          _id: "$serviceId",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "_id",
          foreignField: "_id",
          as: "service",
        },
      },
      { $unwind: "$service" },
      {
        $project: {
          _id: 0,
          serviceName: "$service.serviceName",
          count: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalInquiries,
        pending,
        contacted,
        converted,
        rejected,
        inquiriesByService,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};
