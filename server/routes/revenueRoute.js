const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/auth");
const {
  getRevenueStats,
  getRevenueDetails,
} = require("../controllers/revenueCtrl");

// Revenue routes - Admin only
router.get("/stats", auth, isAdmin, getRevenueStats);
router.get("/details", auth, isAdmin, getRevenueDetails);

module.exports = router;
