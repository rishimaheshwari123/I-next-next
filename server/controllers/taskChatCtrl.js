const TaskChat = require("../models/taskChatModel");
const Task = require("../models/taskModel");
const Employee = require("../models/employeeModel");

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { message, attachments } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    // Verify task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Get sender info
    let senderName, senderModel, senderId;

    if (userRole === "employee") {
      const employee = await Employee.findOne({ userId });
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
        });
      }
      senderName = employee.name;
      senderId = employee._id;
      senderModel = "Employee";
    } else {
      // Admin
      const Auth = require("../models/authModel");
      const admin = await Auth.findById(userId);
      senderName = admin.name;
      senderId = userId;
      senderModel = "auth";
    }

    // Create chat message
    const chat = await TaskChat.create({
      taskId,
      senderId,
      senderModel,
      senderName,
      senderRole: userRole,
      message,
      attachments,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: chat,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message,
    });
  }
};

// Get all messages for a task
exports.getTaskMessages = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Verify task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const messages = await TaskChat.find({ taskId }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error: error.message,
    });
  }
};

// Edit message
exports.editMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { message } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    const chat = await TaskChat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Verify sender
    let senderId;
    if (userRole === "employee") {
      const employee = await Employee.findOne({ userId });
      senderId = employee._id;
    } else {
      senderId = userId;
    }

    if (chat.senderId.toString() !== senderId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to edit this message",
      });
    }

    chat.message = message;
    chat.isEdited = true;
    chat.editedAt = new Date();
    await chat.save();

    res.status(200).json({
      success: true,
      message: "Message updated successfully",
      data: chat,
    });
  } catch (error) {
    console.error("Error editing message:", error);
    res.status(500).json({
      success: false,
      message: "Error editing message",
      error: error.message,
    });
  }
};

// Delete message
exports.deleteMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const chat = await TaskChat.findById(chatId);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Verify sender
    let senderId;
    if (userRole === "employee") {
      const employee = await Employee.findOne({ userId });
      senderId = employee._id;
    } else {
      senderId = userId;
    }

    if (chat.senderId.toString() !== senderId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this message",
      });
    }

    await TaskChat.findByIdAndDelete(chatId);

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting message",
      error: error.message,
    });
  }
};

// Mark message as read
exports.markAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await TaskChat.findByIdAndUpdate(
      chatId,
      { isRead: true },
      { new: true }
    );

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: chat,
    });
  } catch (error) {
    console.error("Error marking as read:", error);
    res.status(500).json({
      success: false,
      message: "Error marking as read",
      error: error.message,
    });
  }
};

// Get unread message count
exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let unreadCount;

    if (userRole === "employee") {
      const employee = await Employee.findOne({ userId });

      // Get tasks assigned to employee
      const tasks = await Task.find({ assignedTo: employee._id });
      const taskIds = tasks.map((t) => t._id);

      // Count unread messages from admin
      unreadCount = await TaskChat.countDocuments({
        taskId: { $in: taskIds },
        senderRole: "admin",
        isRead: false,
      });
    } else {
      // Admin - count unread messages from all employees
      unreadCount = await TaskChat.countDocuments({
        senderRole: "employee",
        isRead: false,
      });
    }

    res.status(200).json({
      success: true,
      data: { unreadCount },
    });
  } catch (error) {
    console.error("Error fetching unread count:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching unread count",
      error: error.message,
    });
  }
};

// Mark all messages as read for a task
exports.markAllAsRead = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    // Mark all messages from the other party as read
    const senderRole = userRole === "admin" ? "employee" : "admin";

    await TaskChat.updateMany(
      { taskId, senderRole, isRead: false },
      { isRead: true }
    );

    res.status(200).json({
      success: true,
      message: "All messages marked as read",
    });
  } catch (error) {
    console.error("Error marking all as read:", error);
    res.status(500).json({
      success: false,
      message: "Error marking all as read",
      error: error.message,
    });
  }
};
