const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryCtrl");
const { auth, isAdmin } = require("../middleware/auth");

// Get all categories (Authenticated)
router.get("/all", auth, getAllCategories);

// Create Category (Admin only)
router.post("/", auth, isAdmin, createCategory);

// Update Category (Admin only)
router.put("/:id", auth, isAdmin, updateCategory);

// Delete Category (Admin only)
router.delete("/:id", auth, isAdmin, deleteCategory);

module.exports = router;
