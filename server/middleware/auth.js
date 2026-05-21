const jwt = require("jsonwebtoken");
const Auth = require("../models/authModel");
const Employee = require("../models/employeeModel");

// Verify JWT token
exports.auth = async (req, res, next) => {
  try {
    // Get token from header
    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.cookies?.token ||
      req.body.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user is employee or admin/client based on role in token
    if (decoded.role === "employee") {
      // Get employee from database
      const employee = await Employee.findById(decoded.id);

      if (!employee) {
        return res.status(401).json({
          success: false,
          message: "Invalid token. Employee not found.",
        });
      }

      // Check if employee is active
      if (!employee.isActive) {
        return res.status(403).json({
          success: false,
          message: "Your account has been deactivated.",
        });
      }

      // Attach employee to request
      req.user = {
        id: employee._id,
        email: employee.email,
        role: employee.role || "employee",
        name: employee.name,
        employeeId: employee.employeeId,
        designation: employee.designation,
        department: employee.department,
      };
    } else {
      // Get admin/client from Auth database
      const user = await Auth.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid token. User not found.",
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: "Your account has been deactivated.",
        });
      }

      // Attach user to request
      req.user = {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        isStaff: user.isStaff || false,
        permissions: user.permissions || {},
      };
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};

// Check if user is admin
exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in admin authorization",
      error: error.message,
    });
  }
};

// Check if user is employee
exports.isEmployee = (req, res, next) => {
  try {
    if (req.user.role !== "employee") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Employee only.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in employee authorization",
      error: error.message,
    });
  }
};

// Check if user is admin or employee
exports.isAdminOrEmployee = (req, res, next) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "employee") {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in authorization",
      error: error.message,
    });
  }
};

// Check if user is client
exports.isClient = (req, res, next) => {
  try {
    if (req.user.role !== "client") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Client only.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in client authorization",
      error: error.message,
    });
  }
};
