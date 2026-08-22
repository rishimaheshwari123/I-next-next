const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/auth");
const {
  trackPageView,
  trackPing,
  getAnalyticsStats,
} = require("../controllers/analyticsCtrl");

// Public Tracking Endpoints
router.post("/track", trackPageView);
router.post("/ping", trackPing);

// Protected Admin Analytics Endpoint
router.get("/stats", auth, isAdmin, getAnalyticsStats);

module.exports = router;
