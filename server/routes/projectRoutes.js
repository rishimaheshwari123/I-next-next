const express = require("express");
const router = express.Router();
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectStats,
  assignEmployees,
  updateProgress,
  getClientProjects,
  getEmployeeProjects,
  getProjectsByClientId,
} = require("../controllers/projectCtrl");
const { auth, isAdmin, isClient } = require("../middleware/auth");

// Client routes (must come before dynamic routes)
router.get("/client/my-projects", auth, isClient, getClientProjects);

// Employee routes
router.get("/employee/my-projects", auth, getEmployeeProjects);

// Admin routes
router.post("/", auth, isAdmin, createProject);
router.get("/all", auth, isAdmin, getAllProjects);
router.get("/stats", auth, isAdmin, getProjectStats);
router.get("/client/:clientId", auth, isAdmin, getProjectsByClientId); // Admin route to get projects by client ID
router.get("/:id", auth, getProjectById);
router.put("/:id", auth, updateProject);
router.delete("/:id", auth, isAdmin, deleteProject);
router.put("/:id/assign", auth, isAdmin, assignEmployees);
router.put("/:id/progress", auth, updateProgress);

module.exports = router;
