"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { EMPLOYEE_API } from "@/config/api";
import { toast } from "react-toastify";
import {
  FaTasks,
  FaComments,
  FaPaperPlane,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";

export default function EmployeeTasksPage() {
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [tasks, setTasks] = useState({ all: [], pending: [], inProgress: [], completed: [] });
  const [selectedTask, setSelectedTask] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [unreadCounts, setUnreadCounts] = useState({});
  const chatEndRef = useRef(null);

  useEffect(() => {
    fetchTasks();
    fetchUnreadCounts();
  }, []);

  // Auto-scroll to bottom when chat messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const fetchUnreadCounts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.UNREAD_COUNT, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        // Convert array to object for easy lookup
        const counts = {};
        response.data.data.forEach((item) => {
          counts[item.taskId] = item.unreadCount;
        });
        setUnreadCounts(counts);
      }
    } catch (error) {
      console.error("Error fetching unread counts:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.MY_TASKS, {
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

  const fetchChatMessages = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.GET_MESSAGES(taskId), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setChatMessages(response.data.data);
        
        // Mark all messages as read
        await axios.post(
          EMPLOYEE_API.MARK_ALL_READ(taskId),
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        // Update unread count for this task
        setUnreadCounts((prev) => ({ ...prev, [taskId]: 0 }));
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        EMPLOYEE_API.UPDATE_TASK_STATUS(taskId),
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Task status updated!");
        fetchTasks();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
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

  const openChatModal = (task) => {
    setSelectedTask(task);
    fetchChatMessages(task._id);
    setShowChatModal(true);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
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

  const getTasksByTab = () => {
    switch (activeTab) {
      case "pending":
        return tasks.pending;
      case "in-progress":
        return tasks.inProgress;
      case "completed":
        return tasks.completed;
      default:
        return tasks.all;
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaTasks className="text-rose-600" />
          My Tasks
        </h1>
        <p className="text-gray-600 mt-1">Manage your assigned tasks</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">Total Tasks</h3>
          <p className="text-4xl font-bold mt-2">{tasks.all.length}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-4xl font-bold mt-2">{tasks.pending.length}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">In Progress</h3>
          <p className="text-4xl font-bold mt-2">{tasks.inProgress.length}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold">Completed</h3>
          <p className="text-4xl font-bold mt-2">{tasks.completed.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "all"
                ? "bg-rose-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "pending"
                ? "bg-rose-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveTab("in-progress")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "in-progress"
                ? "bg-rose-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === "completed"
                ? "bg-rose-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Tasks List - One per row */}
      <div className="space-y-4">
        {getTasksByTab().map((task) => (
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

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs text-gray-500 block mb-1">
                      Assigned by:
                    </span>
                    <span className="font-semibold text-gray-800">
                      {task.assignedBy?.name}
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
                </div>

                {/* Status Dropdown */}
                <div className="max-w-xs">
                  <label className="block text-sm text-gray-600 mb-2 font-semibold">
                    Update Status:
                  </label>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusUpdate(task._id, e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border-2 font-semibold cursor-pointer transition-all ${getStatusColor(
                      task.status
                    )}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Right Section - Chat Button */}
              <div className="flex flex-col gap-2 min-w-[140px]">
                <button
                  onClick={() => openChatModal(task)}
                  className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 font-semibold transition-all relative"
                >
                  <FaComments className="text-lg" /> Chat with Admin
                  {unreadCounts[task._id] > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                      {unreadCounts[task._id]}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {getTasksByTab().length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FaTasks className="text-6xl mx-auto mb-4 opacity-30" />
          <p className="text-xl">No tasks found in this category</p>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl h-[600px] flex flex-col">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-xl relative">
              <h2 className="text-2xl font-bold">{selectedTask.title}</h2>
              <p className="text-sm opacity-90">
                Chat with {selectedTask.assignedBy?.name}
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
                    msg.senderRole === "employee"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      msg.senderRole === "employee"
                        ? "bg-green-500 text-white"
                        : "bg-white text-gray-800 shadow"
                    }`}
                  >
                    <p className="text-sm font-semibold mb-1">{msg.senderName}</p>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
