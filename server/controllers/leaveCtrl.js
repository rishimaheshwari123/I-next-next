const Leave = require("../models/leaveModel");
const Employee = require("../models/employeeModel");
const Attendance = require("../models/attendanceModel");

// Apply for leave
exports.applyLeave = async (req, res) => {
  try {
    const employeeId = req.user.id; // This is employee._id from JWT
    const { leaveType, startDate, endDate, reason, attachments } = req.body;

    // Get employee
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Calculate total days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // Check leave balance
    const leaveBalance = employee.leaveBalance[leaveType];
    if (leaveBalance < totalDays) {
      return res.status(400).json({
        success: false,
        message: `Insufficient ${leaveType} leave balance. Available: ${leaveBalance} days`,
      });
    }

    // Create leave request
    const leave = await Leave.create({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
      attachments,
    });

    res.status(201).json({
      success: true,
      message: "Leave application submitted successfully",
      data: leave,
    });
  } catch (error) {
    console.error("Error applying leave:", error);
    res.status(500).json({
      success: false,
      message: "Error applying leave",
      error: error.message,
    });
  }
};

// Get my leaves
exports.getMyLeaves = async (req, res) => {
  try {
    const employeeId = req.user.id; // This is employee._id from JWT
    const { status } = req.query;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    let query = { employeeId: employee._id };
    if (status) {
      query.status = status;
    }

    const leaves = await Leave.find(query)
      .populate("approvedBy", "name email")
      .sort({ appliedDate: -1 });

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaveBalance: employee.leaveBalance,
      data: leaves,
    });
  } catch (error) {
    console.error("Error fetching leaves:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching leaves",
      error: error.message,
    });
  }
};

// Get all leaves (Admin)
exports.getAllLeaves = async (req, res) => {
  try {
    const { status, leaveType, employeeId } = req.query;

    let query = {};

    if (status) query.status = status;
    if (leaveType) query.leaveType = leaveType;
    if (employeeId) query.employeeId = employeeId;

    const leaves = await Leave.find(query)
      .populate("employeeId", "name employeeId designation department")
      .populate("approvedBy", "name email")
      .sort({ appliedDate: -1 });

    res.status(200).json({
      success: true,
      count: leaves.length,
      data: leaves,
    });
  } catch (error) {
    console.error("Error fetching all leaves:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching leaves",
      error: error.message,
    });
  }
};

// Approve leave (Admin)
exports.approveLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminComments } = req.body;
    const adminId = req.user.id;

    const leave = await Leave.findById(id).populate("employeeId");

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Leave request already processed",
      });
    }

    // Update leave status
    leave.status = "approved";
    leave.approvedBy = adminId;
    leave.approvedDate = new Date();
    leave.adminComments = adminComments || "";
    await leave.save();

    // Deduct leave balance
    const employee = await Employee.findById(leave.employeeId);
    employee.leaveBalance[leave.leaveType] -= leave.totalDays;
    await employee.save();

    // Mark attendance as on-leave for the date range
    const startDate = new Date(leave.startDate);
    const endDate = new Date(leave.endDate);

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      await Attendance.findOneAndUpdate(
        { employeeId: leave.employeeId, date: new Date(date) },
        { status: "on-leave", remarks: `${leave.leaveType} leave` },
        { upsert: true }
      );
    }

    res.status(200).json({
      success: true,
      message: "Leave approved successfully",
      data: leave,
    });
  } catch (error) {
    console.error("Error approving leave:", error);
    res.status(500).json({
      success: false,
      message: "Error approving leave",
      error: error.message,
    });
  }
};

// Reject leave (Admin)
exports.rejectLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminComments } = req.body;
    const adminId = req.user.id;

    const leave = await Leave.findById(id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Leave request already processed",
      });
    }

    leave.status = "rejected";
    leave.approvedBy = adminId;
    leave.approvedDate = new Date();
    leave.adminComments = adminComments || "";
    await leave.save();

    res.status(200).json({
      success: true,
      message: "Leave rejected",
      data: leave,
    });
  } catch (error) {
    console.error("Error rejecting leave:", error);
    res.status(500).json({
      success: false,
      message: "Error rejecting leave",
      error: error.message,
    });
  }
};

// Cancel leave (Employee)
exports.cancelLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeId = req.user.id; // This is employee._id from JWT

    const employee = await Employee.findById(employeeId);
    const leave = await Leave.findById(id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    // Check if leave belongs to the employee
    if (leave.employeeId.toString() !== employee._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (leave.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel processed leave",
      });
    }

    await Leave.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Leave cancelled successfully",
    });
  } catch (error) {
    console.error("Error cancelling leave:", error);
    res.status(500).json({
      success: false,
      message: "Error cancelling leave",
      error: error.message,
    });
  }
};

// Get leave statistics
exports.getLeaveStats = async (req, res) => {
  try {
    const totalPending = await Leave.countDocuments({ status: "pending" });
    const totalApproved = await Leave.countDocuments({ status: "approved" });
    const totalRejected = await Leave.countDocuments({ status: "rejected" });

    const leaveTypeStats = await Leave.aggregate([
      { $match: { status: "approved" } },
      { $group: { _id: "$leaveType", count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalPending,
        totalApproved,
        totalRejected,
        leaveTypeStats,
      },
    });
  } catch (error) {
    console.error("Error fetching leave stats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};
