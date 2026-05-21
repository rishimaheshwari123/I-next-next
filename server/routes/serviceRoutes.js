const express = require("express");
const router = express.Router();
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  getServiceStats,
} = require("../controllers/serviceCtrl");
const {
  createVariant,
  getVariantsByService,
  getVariantById,
  updateVariant,
  deleteVariant,
} = require("../controllers/serviceVariantCtrl");
const {
  createInquiry,
  getAllInquiries,
  getMyInquiries,
  getInquiryById,
  updateInquiryStatus,
  getInquiryStats,
} = require("../controllers/serviceInquiryCtrl");
const { auth, isAdmin, isClient } = require("../middleware/auth");

// Service Routes (Admin)
router.post("/", auth, isAdmin, createService);
router.get("/all", getAllServices);
router.get("/stats", auth, isAdmin, getServiceStats);
router.get("/:id", getServiceById);
router.put("/:id", auth, isAdmin, updateService);
router.delete("/:id", auth, isAdmin, deleteService);

// Service Variant Routes (Admin)
router.post("/:serviceId/variant", auth, isAdmin, createVariant);
router.get("/:serviceId/variants", getVariantsByService);
router.get("/variant/:id", getVariantById);
router.put("/variant/:id", auth, isAdmin, updateVariant);
router.delete("/variant/:id", auth, isAdmin, deleteVariant);

// Service Inquiry Routes
router.post("/inquiry/create", auth, isClient, createInquiry);
router.get("/inquiry/all", auth, isAdmin, getAllInquiries);
router.get("/inquiry/my-inquiries", auth, isClient, getMyInquiries);
router.get("/inquiry/stats", auth, isAdmin, getInquiryStats);
router.get("/inquiry/:id", auth, getInquiryById);
router.put("/inquiry/:id/status", auth, isAdmin, updateInquiryStatus);

module.exports = router;
