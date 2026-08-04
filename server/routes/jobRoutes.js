const express = require("express");
const router = express.Router();
const {
  createJobCtrl,
  getAllJobsCtrl,
  getSingleJobCtrl,
  updateJobCtrl,
  deleteJobCtrl,
} = require("../controllers/jobCtrl");
const { auth, isAdmin } = require("../middleware/auth");

// Public routes
router.get("/getAll", getAllJobsCtrl);
router.get("/get/:id", getSingleJobCtrl);

// Admin-only / Staff-authorized routes
router.post("/create", auth, isAdmin, createJobCtrl);
router.put("/update/:id", auth, isAdmin, updateJobCtrl);
router.delete("/delete/:id", auth, isAdmin, deleteJobCtrl);

module.exports = router;
