"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { EMPLOYEE_API } from "@/config/api";
import { toast } from "react-toastify";
import {
  FaTasks,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaComments,
  FaPaperPlane,
  FaTimes,
} from "react-icons/fa";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedTask, setSelectedTask] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "medium",
    deadline: "",
    estimatedHours: 0,
  });

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  // Auto-scroll to bottom when chat messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.ALL_TASKS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setTasks(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.GET_ALL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setEmployees(response.data.data.filter((emp) => emp.isActive));
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchChatMessages = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.GET_MESSAGES(taskId), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setChatMessages(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const loadingToast = toast.loading(
      modalMode === "add" ? "Creating task..." : "Updating task..."
    );

    try {
      const token = localStorage.getItem("token");

      if (modalMode === "add") {
        const response = await axios.post(EMPLOYEE_API.CREATE_TASK, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          toast.update(loadingToast, {
            render: "Task created successfully! 🎉",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          fetchTasks();
          setShowModal(false);
          resetForm();
        }
      } else if (modalMode === "edit") {
        const response = await axios.put(
          EMPLOYEE_API.UPDATE_TASK(selectedTask._id),
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          toast.update(loadingToast, {
            render: "Task updated successfully! ✅",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          fetchTasks();
          setShowModal(false);
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.update(loadingToast, {
        render: error.response?.data?.message || "Operation failed! ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(EMPLOYEE_API.DELETE_TASK(id), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success("Task deleted successfully!");
        fetchTasks();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete task");
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      toast.warning("Please enter a message");
      return;
    }

    setSendingMessage(true);
    const loadingToast = toast.loading("Sending message...");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        EMPLOYEE_API.SEND_MESSAGE(selectedTask._id),
        { message: newMessage },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.update(loadingToast, {
          render: "Message sent successfully! 📨",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setNewMessage("");
        fetchChatMessages(selectedTask._id);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.update(loadingToast, {
        render: error.response?.data?.message || "Failed to send message! ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setSendingMessage(false);
    }
  };

  const openModal = (mode, task = null) => {
    setModalMode(mode);
    setSelectedTask(task);

    if (mode === "edit" && task) {
      setFormData({
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo._id,
        priority: task.priority,
        deadline: task.deadline?.split("T")[0] || "",
        estimatedHours: task.estimatedHours || 0,
      });
    } else if (mode === "add") {
      resetForm();
    }

    setShowModal(true);
  };

  const openChatModal = (task) => {
    setSelectedTask(task);
    fetchChatMessages(task._id);
    setShowChatModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      assignedTo: "",
      priority: "medium",
      deadline: "",
      estimatedHours: 0,
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaTasks className="text-rose-600" />
            Task Management
          </h1>
          <p className="text-gray-600 mt-1">Assign and track employee tasks</p>
        </div>
        <button
          onClick={() => openModal("add")}
          className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <FaPlus /> Create Task
        </button>
      </div>

      {/* Tasks List - One per row */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 ${
              task.priority === "high"
                ? "border-red-500"
                : task.priority === "medium"
                ? "border-yellow-500"
                : "border-green-500"
            }`}
          >
            <div className="flex items-start justify-between gap-6">
              {/* Left Section - Task Info */}
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-3">
                  <h3 className="text-2xl font-bold text-gray-800 flex-1">
                    {task.title}
                  </h3>
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-bold ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority.toUpperCase()}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 text-base leading-relaxed">
                  {task.description}
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs text-gray-500 block mb-1">
                      Assigned to:
                    </span>
                    <span className="font-semibold text-gray-800">
                      {task.assignedTo?.name}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs text-gray-500 block mb-1">
                      Deadline:
                    </span>
                    <span className="font-semibold text-red-600">
                      {new Date(task.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs text-gray-500 block mb-1">
                      Status:
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold inline-block ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="flex flex-col gap-2 min-w-[120px]">
                <button
                  onClick={() => openChatModal(task)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 font-semibold transition-all"
                  title="Chat"
                >
                  <FaComments /> Chat
                </button>
                <button
                  onClick={() => openModal("edit", task)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-2 font-semibold transition-all"
                  title="Edit"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 font-semibold transition-all"
                  title="Delete"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FaTasks className="text-6xl mx-auto mb-4 opacity-30" />
          <p className="text-xl">No tasks found</p>
        </div>
      )}

      {/* Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-6 rounded-t-xl">
              <h2 className="text-2xl font-bold">
                {modalMode === "add" ? "Create New Task" : "Edit Task"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter task title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Task Description *
                </label>
                <textarea
                  placeholder="Enter detailed task description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Assign To Employee *
                </label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) =>
                    setFormData({ ...formData, assignedTo: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500"
                  required
                >
                  <option value="">Select Employee *</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name} ({emp.employeeId})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Priority Level *
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Deadline Date *
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData({ ...formData, deadline: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Estimated Hours
                </label>
                <input
                  type="number"
                  placeholder="Enter estimated hours (optional)"
                  value={formData.estimatedHours}
                  onChange={(e) =>
                    setFormData({ ...formData, estimatedHours: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500"
                  min="0"
                  step="0.5"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  disabled={submitting}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all ${
                    submitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {submitting
                    ? "Processing..."
                    : modalMode === "add"
                    ? "Create Task"
                    : "Update Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl h-[600px] flex flex-col">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-xl relative">
              <h2 className="text-2xl font-bold">{selectedTask.title}</h2>
              <p className="text-sm opacity-90">
                Chat with {selectedTask.assignedTo?.name}
              </p>
              {/* Close Icon */}
              <button
                onClick={() => setShowChatModal(false)}
                disabled={sendingMessage}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                title="Close"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {chatMessages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex ${
                    msg.senderRole === "admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      msg.senderRole === "admin"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800 shadow"
                    }`}
                  >
                    <p className="text-sm font-semibold mb-1">
                      {msg.senderName}
                    </p>
                    <p>{msg.message}</p>
                    <p className="text-xs mt-2 opacity-70">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

              {chatMessages.length === 0 && (
                <div className="text-center text-gray-500 py-12">
                  <FaComments className="text-6xl mx-auto mb-4 opacity-30" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              )}
              
              {/* Auto-scroll anchor */}
              <div ref={chatEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white rounded-b-xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !sendingMessage) {
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  disabled={sendingMessage}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={sendingMessage || !newMessage.trim()}
                  className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-semibold transition-all ${
                    sendingMessage || !newMessage.trim()
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <FaPaperPlane />
                  {sendingMessage ? "Sending..." : "Send"}
                </button>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                disabled={sendingMessage}
                className="mt-2 text-sm text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Close Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
