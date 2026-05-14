const Attendance = require("../models/attendanceModel");
const Employee = require("../models/employeeModel");

// Punch In
exports.punchIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const { location } = req.body;

    // Get employee
    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Check if already punched in today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAttendance = await Attendance.findOne({
      employeeId: employee._id,
      date: { $gte: today },
    });

    if (existingAttendance && existingAttendance.punchIn) {
      return res.status(400).json({
        success: false,
        message: "Already punched in today",
        data: existingAttendance,
      });
    }

    // Create or update attendance
    const attendance = existingAttendance
      ? await Attendance.findByIdAndUpdate(
          existingAttendance._id,
          {
            punchIn: new Date(),
            status: "present",
            "location.punchInLocation": location || "Not provided",
          },
          { new: true }
        )
      : await Attendance.create({
          employeeId: employee._id,
          date: new Date(),
          punchIn: new Date(),
          status: "present",
          location: {
            punchInLocation: location || "Not provided",
          },
        });

    res.status(200).json({
      success: true,
      message: "Punched in successfully",
      data: attendance,
    });
  } catch (error) {
    console.error("Error punching in:", error);
    res.status(500).json({
      success: false,
      message: "Error punching in",
      error: error.message,
    });
  }
};

// Punch Out
exports.punchOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const { location } = req.body;

    // Get employee
    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Get today's attendance
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      employeeId: employee._id,
      date: { $gte: today },
    });

    if (!attendance || !attendance.punchIn) {
      return res.status(400).json({
        success: false,
        message: "Please punch in first",
      });
    }

    if (attendance.punchOut) {
      return res.status(400).json({
        success: false,
        message: "Already punched out today",
        data: attendance,
      });
    }

    // Update attendance
    attendance.punchOut = new Date();
    attendance.location.punchOutLocation = location || "Not provided";
    await attendance.save();

    res.status(200).json({
      success: true,
      message: "Punched out successfully",
      data: attendance,
    });
  } catch (error) {
    console.error("Error punching out:", error);
    res.status(500).json({
      success: false,
      message: "Error punching out",
      error: error.message,
    });
  }
};

// Get my attendance
exports.getMyAttendance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month, year } = req.query;

    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    let query = { employeeId: employee._id };

    // Filter by month and year if provided
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      query.date = { $gte: startDate, $lte: endDate };
    }

    const attendance = await Attendance.find(query)
      .populate("employeeId", "name employeeId designation department")
      .sort({ date: -1 });

    // Calculate statistics
    const stats = {
      totalDays: attendance.length,
      present: attendance.filter((a) => a.status === "present" || a.status === "late").length,
      absent: attendance.filter((a) => a.status === "absent").length,
      halfDay: attendance.filter((a) => a.status === "half-day").length,
      late: attendance.filter((a) => a.status === "late").length,
      onLeave: attendance.filter((a) => a.status === "on-leave").length,
    };

    res.status(200).json({
      success: true,
      data: attendance,
      stats,
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching attendance",
      error: error.message,
    });
  }
};

// Get employee attendance (Admin)
exports.getEmployeeAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { month, year, startDate, endDate } = req.query;

    let query = { employeeId };

    // Filter by date range
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    } else if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0);
      query.date = { $gte: start, $lte: end };
    }

    const attendance = await Attendance.find(query)
      .populate("employeeId", "name employeeId designation department")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    console.error("Error fetching employee attendance:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching attendance",
      error: error.message,
    });
  }
};

// Get all attendance (Admin)
exports.getAllAttendance = async (req, res) => {
  try {
    const { date, status } = req.query;

    let query = {};

    if (date) {
      const searchDate = new Date(date);
      searchDate.setHours(0, 0, 0, 0);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);
      query.date = { $gte: searchDate, $lt: nextDay };
    }

    if (status) {
      query.status = status;
    }

    const attendance = await Attendance.find(query)
      .populate("employeeId", "name employeeId designation department")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    console.error("Error fetching all attendance:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching attendance",
      error: error.message,
    });
  }
};

// Get today's attendance status
exports.getTodayStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await Attendance.findOne({
      employeeId: employee._id,
      date: { $gte: today },
    });

    res.status(200).json({
      success: true,
      data: attendance || null,
    });
  } catch (error) {
    console.error("Error fetching today's status:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching status",
      error: error.message,
    });
  }
};

// Mark attendance manually (Admin)
exports.markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status, remarks } = req.body;

    const attendance = await Attendance.findOneAndUpdate(
      { employeeId, date: new Date(date) },
      { status, remarks },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Attendance marked successfully",
      data: attendance,
    });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({
      success: false,
      message: "Error marking attendance",
      error: error.message,
    });
  }
};

// Get attendance report (Admin)
exports.getAttendanceReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query = {
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };

    const report = await Attendance.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$employeeId",
          totalPresent: {
            $sum: {
              $cond: [
                { $in: ["$status", ["present", "late"]] },
                1,
                0,
              ],
            },
          },
          totalAbsent: {
            $sum: { $cond: [{ $eq: ["$status", "absent"] }, 1, 0] },
          },
          totalHalfDay: {
            $sum: { $cond: [{ $eq: ["$status", "half-day"] }, 1, 0] },
          },
          totalLate: {
            $sum: { $cond: [{ $eq: ["$status", "late"] }, 1, 0] },
          },
          totalHours: { $sum: "$totalHours" },
        },
      },
      {
        $lookup: {
          from: "employees",
          localField: "_id",
          foreignField: "_id",
          as: "employee",
        },
      },
      { $unwind: "$employee" },
    ]);

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({
      success: false,
      message: "Error generating report",
      error: error.message,
    });
  }
};
