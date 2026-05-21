const express = require("express");
const router = express.Router();
const {
  createLead,
  getAllLeads,
  getLeadStats,
  getLeadById,
  updateLead,
  deleteLead,
  updateLeadStatus,
  assignLead,
  getUpcomingFollowUps,
  getMyLeads,
  updateMyLeadStatus,
  addLeadNotes,
  addLeadNotesAdmin,
} = require("../controllers/leadCtrl");
const { auth, isAdmin, isAdminOrEmployee } = require("../middleware/auth");

// Admin routes
router.post("/", auth, isAdmin, createLead);
router.get("/all", auth, isAdmin, getAllLeads);
router.get("/stats", auth, isAdmin, getLeadStats);
router.get("/follow-ups", auth, isAdmin, getUpcomingFollowUps);
router.put("/:id", auth, isAdmin, updateLead);
router.delete("/:id", auth, isAdmin, deleteLead);
router.put("/:id/status", auth, isAdmin, updateLeadStatus);
router.put("/:id/assign", auth, isAdmin, assignLead);
router.post("/:id/admin-notes", auth, isAdmin, addLeadNotesAdmin);

// Employee routes
router.get("/my-leads", auth, isAdminOrEmployee, getMyLeads);
router.put("/:id/my-status", auth, isAdminOrEmployee, updateMyLeadStatus);
router.post("/:id/notes", auth, isAdminOrEmployee, addLeadNotes);

// Shared routes (both admin and employee can view)
router.get("/:id", auth, isAdminOrEmployee, getLeadById);

module.exports = router;
