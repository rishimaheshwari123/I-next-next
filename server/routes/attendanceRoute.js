const express = require("express");
const router = express.Router();
const {
  punchIn,
  punchOut,
  getMyAttendance,
  getEmployeeAttendance,
  getAllAttendance,
  getTodayStatus,
  markAttendance,
  getAttendanceReport,
} = require("../controllers/attendanceCtrl");
const { auth, isAdmin, isEmployee } = require("../middleware/auth");

// Employee routes
router.post("/punch-in", auth, isEmployee, punchIn);
router.post("/punch-out", auth, isEmployee, punchOut);
router.get("/my-attendance", auth, isEmployee, getMyAttendance);
router.get("/today-status", auth, isEmployee, getTodayStatus);

// Admin routes
router.get("/all", auth, isAdmin, getAllAttendance);
router.get("/employee/:employeeId", auth, isAdmin, getEmployeeAttendance);
router.post("/mark", auth, isAdmin, markAttendance);
router.get("/report", auth, isAdmin, getAttendanceReport);

module.exports = router;
