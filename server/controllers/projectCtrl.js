const Project = require("../models/projectModel");
const Auth = require("../models/authModel");
const Employee = require("../models/employeeModel");

// Create Project
exports.createProject = async (req, res) => {
  try {
    const adminId = req.user.id;
    const {
      projectName,
      description,
      category,
      projectType,
      technologies,
      startDate,
      expectedEndDate,
      client,
      assignedEmployees,
      liveUrl,
      budget,
      priority,
    } = req.body;

    // Validate required fields
    if (!projectName || !category || !projectType || !startDate || !expectedEndDate || !client) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if client exists
    const clientExists = await Auth.findById(client);
    if (!clientExists) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    // Create project
    const project = await Project.create({
      projectName,
      description,
      category,
      projectType,
      technologies: technologies || [],
      startDate,
      expectedEndDate,
      client,
      assignedEmployees: assignedEmployees || [],
      liveUrl,
      budget,
      priority,
      createdBy: adminId,
    });

    // Populate client and employees
    await project.populate("category", "name");
    await project.populate("client", "name email");
    await project.populate("assignedEmployees", "name email");

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      success: false,
      message: "Error creating project",
      error: error.message,
    });
  }
};

// Get All Projects (Admin)
exports.getAllProjects = async (req, res) => {
  try {
    const { status, category, priority, search, page = 1, limit = 10 } = req.query;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;

    if (search) {
      filter.$or = [
        { projectName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const projects = await Project.find(filter)
      .populate("category", "name")
      .populate("client", "name email company")
      .populate("assignedEmployees", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Project.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: projects.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
      error: error.message,
    });
  }
};

// Get Project by ID
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id)
      .populate("category", "name")
      .populate("client", "name email company phone")
      .populate("assignedEmployees", "name email phone")
      .populate("createdBy", "name email");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching project",
      error: error.message,
    });
  }
};

// Update Project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const project = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("category", "name")
      .populate("client", "name email company")
      .populate("assignedEmployees", "name email");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      success: false,
      message: "Error updating project",
      error: error.message,
    });
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting project",
      error: error.message,
    });
  }
};

// Get Project Statistics
exports.getProjectStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const inProgress = await Project.countDocuments({ status: "In Progress" });
    const completed = await Project.countDocuments({ status: "Completed" });
    const onHold = await Project.countDocuments({ status: "On Hold" });
    const planning = await Project.countDocuments({ status: "Planning" });
    const testing = await Project.countDocuments({ status: "Testing" });

    // Overdue projects (expectedEndDate passed and not completed)
    const overdue = await Project.countDocuments({
      expectedEndDate: { $lt: new Date() },
      status: { $ne: "Completed" },
    });

    // This month projects
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const thisMonth = await Project.countDocuments({
      createdAt: { $gte: startOfMonth },
    });

    res.status(200).json({
      success: true,
      data: {
        totalProjects,
        inProgress,
        completed,
        onHold,
        planning,
        testing,
        overdue,
        thisMonth,
      },
    });
  } catch (error) {
    console.error("Error fetching project stats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};

// Assign Employees to Project
exports.assignEmployees = async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeIds } = req.body;

    if (!employeeIds || !Array.isArray(employeeIds)) {
      return res.status(400).json({
        success: false,
        message: "Please provide employee IDs as an array",
      });
    }

    const project = await Project.findByIdAndUpdate(
      id,
      { assignedEmployees: employeeIds },
      { new: true }
    )
      .populate("category", "name")
      .populate("client", "name email")
      .populate("assignedEmployees", "name email");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employees assigned successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error assigning employees:", error);
    res.status(500).json({
      success: false,
      message: "Error assigning employees",
      error: error.message,
    });
  }
};

// Update Project Progress
exports.updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;

    if (progress === undefined || progress < 0 || progress > 100) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid progress (0-100)",
      });
    }

    const project = await Project.findByIdAndUpdate(
      id,
      { progress },
      { new: true }
    )
      .populate("category", "name")
      .populate("client", "name email")
      .populate("assignedEmployees", "name email");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project progress updated successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({
      success: false,
      message: "Error updating progress",
      error: error.message,
    });
  }
};

// Upload Project Legal Documents
exports.uploadProjectDocuments = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Check if user is the client of this project
    if (project.client.toString() !== user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to upload documents for this project",
      });
    }

    if (!req.files || !req.files.legalDocs) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const files = Array.isArray(req.files.legalDocs) ? req.files.legalDocs : [req.files.legalDocs];

    // Limit to 5 documents total
    if ((project.legalDocuments?.length || 0) + files.length > 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum 5 legal documents are allowed per project",
      });
    }

    const { uploadImageToCloudinary } = require("../config/imageUploader");
    const folder = `projects/${project.projectName}/legal-docs`;
    const newDocs = [];

    for (const file of files) {
      if (file.mimetype !== "application/pdf") {
        return res.status(400).json({
          success: false,
          message: "Only PDF files are allowed",
        });
      }

      const result = await uploadImageToCloudinary(file, folder);
      newDocs.push({
        name: file.name,
        url: result.secure_url,
        uploadedBy: "Client",
      });
    }

    project.legalDocuments.push(...newDocs);
    await project.save();

    res.status(200).json({
      success: true,
      message: "Documents uploaded successfully",
      data: project.legalDocuments,
    });
  } catch (error) {
    console.error("Error uploading project documents:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading documents",
      error: error.message,
    });
  }
};

// Get Client's Projects
exports.getClientProjects = async (req, res) => {
  try {
    const clientId = req.user.id;

    const projects = await Project.find({ client: clientId })
      .populate("category", "name")
      .populate("assignedEmployees", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching client projects:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
      error: error.message,
    });
  }
};

// Get Employee's Assigned Projects
exports.getEmployeeProjects = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const projects = await Project.find({ assignedEmployees: employeeId })
      .populate("category", "name")
      .populate("client", "name email company")
      .populate("assignedEmployees", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching employee projects:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
      error: error.message,
    });
  }
};

// Get Projects by Client ID (Admin)
exports.getProjectsByClientId = async (req, res) => {
  try {
    const { clientId } = req.params;

    const projects = await Project.find({ client: clientId })
      .populate("category", "name")
      .populate("client", "name email company")
      .populate("assignedEmployees", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects by client ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
      error: error.message,
    });
  }
};
