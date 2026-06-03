const ProjectTask = require("../models/projectTaskModel");
const Project = require("../models/projectModel");
const Employee = require("../models/employeeModel");

// Helper function to update project progress automatically
const updateProjectProgressAutomatically = async (projectId) => {
  try {
    const totalTasks = await ProjectTask.countDocuments({ projectId });
    const completedTasks = await ProjectTask.countDocuments({ projectId, status: "Completed" });
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    await Project.findByIdAndUpdate(projectId, { progress });
    return progress;
  } catch (error) {
    console.error("Error updating project progress:", error);
    throw error;
  }
};

// Create a Project Task (Admin)
exports.createTask = async (req, res) => {
  try {
    const { projectId, employeeId, taskName, description, taskType } = req.body;

    if (!projectId || !employeeId || !taskName || !taskType) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (projectId, employeeId, taskName, taskType)",
      });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Check if employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const task = await ProjectTask.create({
      projectId,
      employeeId,
      taskName,
      description,
      taskType,
      status: "Pending",
    });

    // Update progress
    await updateProjectProgressAutomatically(projectId);

    // Populate task
    await task.populate("employeeId", "name email");
    await task.populate("projectId", "projectName");

    res.status(201).json({
      success: true,
      message: "Task created and assigned successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      success: false,
      message: "Error creating task",
      error: error.message,
    });
  }
};

// Get Tasks by Project ID (Admin, Employee, Client)
exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await ProjectTask.find({ projectId })
      .populate("employeeId", "name email phone")
      .populate("projectId", "projectName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks by project:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

// Update Task Status (Employee/Admin/Client)
exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    if (!status || !["Pending", "In Progress", "Completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid status (Pending, In Progress, or Completed)",
      });
    }

    const task = await ProjectTask.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.status = status;
    if (status === "Completed") {
      task.completedAt = new Date();
    } else {
      task.completedAt = undefined; // clears the completedAt date
    }

    await task.save();

    // Update progress
    await updateProjectProgressAutomatically(task.projectId);

    res.status(200).json({
      success: true,
      message: `Task marked as ${status} successfully`,
      data: task,
    });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating task status",
      error: error.message,
    });
  }
};

// Update Task Feedback (Client)
exports.updateTaskFeedback = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { clientFeedback, status } = req.body;

    const task = await ProjectTask.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (clientFeedback !== undefined) {
      task.clientFeedback = clientFeedback;
      if (clientFeedback.trim() !== "") {
        task.feedbacks = task.feedbacks || [];
        task.feedbacks.push({
          sender: "Client",
          senderName: req.user.name || req.user.email || "Client",
          comment: clientFeedback.trim(),
          createdAt: new Date(),
        });
        task.status = "Pending";
        task.completedAt = undefined;
      }
    }

    if (status && ["Pending", "In Progress", "Completed"].includes(status)) {
      task.status = status;
      if (status === "Completed") {
        task.completedAt = new Date();
      } else {
        task.completedAt = undefined;
      }
    }

    await task.save();

    // Update progress
    await updateProjectProgressAutomatically(task.projectId);

    res.status(200).json({
      success: true,
      message: "Task feedback updated successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error updating task feedback:", error);
    res.status(500).json({
      success: false,
      message: "Error updating task feedback",
      error: error.message,
    });
  }
};

// Delete Task (Admin)
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await ProjectTask.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const projectId = task.projectId;
    await ProjectTask.findByIdAndDelete(taskId);

    // Update progress
    await updateProjectProgressAutomatically(projectId);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting task",
      error: error.message,
    });
  }
};

// Get tasks assigned to logged-in Employee
exports.getEmployeeTasks = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const tasks = await ProjectTask.find({ employeeId })
      .populate("employeeId", "name email")
      .populate({
        path: "projectId",
        select: "projectName description progress expectedEndDate status client",
        populate: {
          path: "client",
          select: "name email company",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching employee tasks:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

// Get tasks for projects belonging to logged-in Client
exports.getClientTasks = async (req, res) => {
  try {
    const clientId = req.user.id;

    // First find all projects for the client
    const projects = await Project.find({ client: clientId });
    const projectIds = projects.map((p) => p._id);

    const tasks = await ProjectTask.find({ projectId: { $in: projectIds } })
      .populate("employeeId", "name email phone designation")
      .populate("projectId", "projectName progress status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching client tasks:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

// Add Feedback Comment/Reply (Client, Employee, Admin)
exports.addFeedbackComment = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { comment } = req.body;

    if (!comment || comment.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const task = await ProjectTask.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Map role: "employee" -> "Employee", "client" -> "Client", "admin" -> "Admin"
    let senderRole = "Admin";
    if (req.user.role === "employee") {
      senderRole = "Employee";
    } else if (req.user.role === "client") {
      senderRole = "Client";
      task.status = "Pending";
      task.completedAt = undefined;
    }

    const newFeedback = {
      sender: senderRole,
      senderName: req.user.name || req.user.email || "Unknown",
      comment: comment.trim(),
      createdAt: new Date(),
    };

    task.feedbacks = task.feedbacks || [];
    task.feedbacks.push(newFeedback);
    await task.save();

    // Update progress automatically
    await updateProjectProgressAutomatically(task.projectId);

    res.status(200).json({
      success: true,
      message: "Feedback comment added successfully",
      data: task,
    });
  } catch (error) {
    console.error("Error adding feedback comment:", error);
    res.status(500).json({
      success: false,
      message: "Error adding feedback comment",
      error: error.message,
    });
  }
};
