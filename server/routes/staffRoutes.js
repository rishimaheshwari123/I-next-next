const express = require("express");
const router = express.Router();
const {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  updateStaffPermissions,
  deleteStaff,
  getStaffStats,
} = require("../controllers/staffCtrl");
const { auth, isAdmin } = require("../middleware/auth");

// All routes require authentication and admin access
router.post("/", auth, isAdmin, createStaff);
router.get("/", auth, isAdmin, getAllStaff);
router.get("/stats", auth, isAdmin, getStaffStats);
router.get("/:id", auth, isAdmin, getStaffById);
router.put("/:id", auth, isAdmin, updateStaff);
router.put("/:id/permissions", auth, isAdmin, updateStaffPermissions);
router.delete("/:id", auth, isAdmin, deleteStaff);

module.exports = router;
