const express = require("express");
const router = express.Router();
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave,
  cancelLeave,
  getLeaveStats,
} = require("../controllers/leaveCtrl");
const { auth, isAdmin, isEmployee } = require("../middleware/auth");

// Employee routes
router.post("/apply", auth, isEmployee, applyLeave);
router.get("/my-leaves", auth, isEmployee, getMyLeaves);
router.delete("/cancel/:id", auth, isEmployee, cancelLeave);

// Admin routes
router.get("/all", auth, isAdmin, getAllLeaves);
router.put("/approve/:id", auth, isAdmin, approveLeave);
router.put("/reject/:id", auth, isAdmin, rejectLeave);
router.get("/stats", auth, isAdmin, getLeaveStats);

module.exports = router;
