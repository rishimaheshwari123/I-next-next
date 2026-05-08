const express = require("express");
const router = express.Router();
const {
  createPlan,
  getAllPlans,
  getPlansByUserId,
  updatePlanStatus,
  deletePlan,
} = require("../controllers/planCtrl");

// Create a new plan purchase
router.post("/create", createPlan);

// Get all plans (Admin)
router.get("/all", getAllPlans);

// Get plans by user ID (Client)
router.get("/user/:userId", getPlansByUserId);

// Update plan status (Admin)
router.put("/status/:planId", updatePlanStatus);

// Delete plan (Admin)
router.delete("/:planId", deletePlan);

module.exports = router;
