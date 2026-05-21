const express = require("express");
const router = express.Router();
const {
  employeeLogin,
  registerEmployee,
  getAllEmployees,
  getEmployeeById,
  getMyProfile,
  updateEmployee,
  updateMyProfile,
  deleteEmployee,
  getEmployeeStats,
} = require("../controllers/employeeCtrl");
const { auth, isAdmin, isEmployee } = require("../middleware/auth");

// Public routes
router.post("/login", employeeLogin);

// Admin routes
router.post("/register", auth, isAdmin, registerEmployee);
router.get("/all", auth, isAdmin, getAllEmployees);
router.get("/stats", auth, isAdmin, getEmployeeStats);
router.get("/:id", auth, getEmployeeById);
router.put("/:id", auth, isAdmin, updateEmployee);
router.delete("/:id", auth, isAdmin, deleteEmployee);

// Employee routes
router.get("/profile/me", auth, isEmployee, getMyProfile);
router.put("/profile/me", auth, isEmployee, updateMyProfile);

module.exports = router;
