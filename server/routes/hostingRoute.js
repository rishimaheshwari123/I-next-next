const express = require("express");
const router = express.Router();
const {
  createHostingInquiry,
  getAllHostingInquiries,
  getHostingByUserId,
  updateHostingStatus,
  deleteHostingInquiry,
} = require("../controllers/hostingCtrl");

// Create a new hosting inquiry
router.post("/create", createHostingInquiry);

// Get all hosting inquiries (Admin)
router.get("/all", getAllHostingInquiries);

// Get hosting inquiries by user ID (Client)
router.get("/user/:userId", getHostingByUserId);

// Update hosting inquiry status (Admin)
router.put("/status/:hostingId", updateHostingStatus);

// Delete hosting inquiry (Admin)
router.delete("/:hostingId", deleteHostingInquiry);

module.exports = router;
