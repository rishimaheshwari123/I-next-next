const Auth = require("../models/authModel");
const bcrypt = require("bcrypt");

// Create Staff
exports.createStaff = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { name, email, phone, password, permissions } = req.body;

    // Check if admin is super admin (not staff)
    const admin = await Auth.findById(adminId);
    if (admin.isStaff) {
      return res.status(403).json({
        success: false,
        message: "Only super admin can create staff members",
      });
    }

    // Check if email already exists
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create staff
    const staff = await Auth.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "admin",
      isStaff: true,
      permissions: permissions || {},
      createdBy: adminId,
    });

    // Remove password from response
    const staffData = staff.toObject();
    delete staffData.password;

    res.status(201).json({
      success: true,
      message: "Staff created successfully",
      data: staffData,
    });
  } catch (error) {
    console.error("Error creating staff:", error);
    res.status(500).json({
      success: false,
      message: "Error creating staff",
      error: error.message,
    });
  }
};

// Get All Staff
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Auth.find({ isStaff: true })
      .select("-password -token")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: staff.length,
      data: staff,
    });
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching staff",
      error: error.message,
    });
  }
};

// Get Staff by ID
exports.getStaffById = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await Auth.findOne({ _id: id, isStaff: true })
      .select("-password -token")
      .populate("createdBy", "name email");

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    res.status(200).json({
      success: true,
      data: staff,
    });
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching staff",
      error: error.message,
    });
  }
};

// Update Staff
exports.updateStaff = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    // Check if admin is super admin
    const admin = await Auth.findById(adminId);
    if (admin.isStaff) {
      return res.status(403).json({
        success: false,
        message: "Only super admin can update staff members",
      });
    }

    const updateData = { name, email, phone };

    // Hash new password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const staff = await Auth.findOneAndUpdate(
      { _id: id, isStaff: true },
      updateData,
      { new: true }
    ).select("-password -token");

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Staff updated successfully",
      data: staff,
    });
  } catch (error) {
    console.error("Error updating staff:", error);
    res.status(500).json({
      success: false,
      message: "Error updating staff",
      error: error.message,
    });
  }
};

// Update Staff Permissions
exports.updateStaffPermissions = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { id } = req.params;
    const { permissions } = req.body;

    // Check if admin is super admin
    const admin = await Auth.findById(adminId);
    if (admin.isStaff) {
      return res.status(403).json({
        success: false,
        message: "Only super admin can update permissions",
      });
    }

    const staff = await Auth.findOneAndUpdate(
      { _id: id, isStaff: true },
      { permissions },
      { new: true }
    ).select("-password -token");

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Permissions updated successfully",
      data: staff,
    });
  } catch (error) {
    console.error("Error updating permissions:", error);
    res.status(500).json({
      success: false,
      message: "Error updating permissions",
      error: error.message,
    });
  }
};

// Delete Staff
exports.deleteStaff = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { id } = req.params;

    // Check if admin is super admin
    const admin = await Auth.findById(adminId);
    if (admin.isStaff) {
      return res.status(403).json({
        success: false,
        message: "Only super admin can delete staff members",
      });
    }

    const staff = await Auth.findOneAndDelete({ _id: id, isStaff: true });

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Staff deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting staff:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting staff",
      error: error.message,
    });
  }
};

// Get Staff Statistics
exports.getStaffStats = async (req, res) => {
  try {
    const totalStaff = await Auth.countDocuments({ isStaff: true });

    // Count staff with full access (all permissions true)
    const allStaff = await Auth.find({ isStaff: true });
    const fullAccessCount = allStaff.filter((staff) => {
      const perms = staff.permissions || {};
      const permValues = Object.values(perms);
      return permValues.length > 0 && permValues.every((val) => val === true);
    }).length;

    // Recently added (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentlyAdded = await Auth.countDocuments({
      isStaff: true,
      createdAt: { $gte: sevenDaysAgo },
    });

    res.status(200).json({
      success: true,
      data: {
        totalStaff,
        activeStaff: totalStaff, // All staff are active by default
        fullAccessStaff: fullAccessCount,
        recentlyAdded,
      },
    });
  } catch (error) {
    console.error("Error fetching staff stats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};
