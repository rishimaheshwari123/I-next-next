const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/auth");
const { getDashboardStats } = require("../controllers/dashboardCtrl");

// Dashboard stats route - Admin only
router.get("/stats", auth, isAdmin, getDashboardStats);

module.exports = router;
