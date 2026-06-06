const express = require("express");
const router = express.Router();
const {
  createPlanTemplate,
  getAllPlanTemplates,
  updatePlanTemplate,
  deletePlanTemplate,
  purchasePlan,
  getAllPurchases,
  updatePurchaseStatus,
  getUserPurchases,
  deletePurchase,
  getPurchaseById,
} = require("../controllers/planCtrl");
const { auth, isAdmin, isClient } = require("../middleware/auth");

// --- Plan Template Routes ---
router.post("/template", auth, isAdmin, createPlanTemplate);
router.get("/templates", getAllPlanTemplates);
router.put("/template/:id", auth, isAdmin, updatePlanTemplate);
router.delete("/template/:id", auth, isAdmin, deletePlanTemplate);

// --- Plan Purchase Routes ---
router.post("/purchase", auth, isClient, purchasePlan);
router.get("/all", auth, isAdmin, getAllPurchases); // Keep /all for admin dashboard
router.get("/user/:userId", auth, getUserPurchases);
router.get("/purchase/:id", auth, getPurchaseById);
router.put("/status/:purchaseId", auth, isAdmin, updatePurchaseStatus);
router.delete("/:purchaseId", auth, isAdmin, deletePurchase);

module.exports = router;
