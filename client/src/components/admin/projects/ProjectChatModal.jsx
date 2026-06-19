"use client";
import { useState, useEffect, useRef } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import { EMPLOYEE_API } from "@/config/api";

export default function ProjectChatModal({ show, project, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (show && project) {
      fetchMessages();
      markAllAsRead();
    }
  }, [show, project]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        EMPLOYEE_API.GET_PROJECT_MESSAGES(project._id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(EMPLOYEE_API.MARK_ALL_READ_PROJECT(project._id), {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        EMPLOYEE_API.SEND_PROJECT_MESSAGE(project._id),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: newMessage,
            senderType: user?.role || "admin", // Use actual user role
            senderName: user?.name || "User",
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setMessages([...messages, data.data]);
        setNewMessage("");
        scrollToBottom();
      } else {
        toast.error(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-xl relative flex-shrink-0">
          <h2 className="text-2xl font-bold">Project Chat</h2>
          <p className="text-sm opacity-90 mt-1">{project?.projectName}</p>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <FaPaperPlane className="text-6xl mb-4" />
              <p className="text-lg">No messages yet</p>
              <p className="text-sm">Start the conversation!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => {
                const isOwnMessage = msg.senderId === user?.id;
                const senderColor =
                  msg.senderType === "admin"
                    ? "bg-blue-500"
                    : msg.senderType === "client"
                    ? "bg-green-500"
                    : "bg-purple-500";

                // Capitalize role for display
                const roleLabel =
                  msg.senderType === "admin"
                    ? "Admin"
                    : msg.senderType === "client"
                    ? "Client"
                    : msg.senderType === "employee"
                    ? "Employee"
                    : msg.senderType;

                return (
                  <div
                    key={msg._id}
                    className={`flex ${
                      isOwnMessage ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="max-w-[70%]">
                      <div
                        className={`rounded-lg p-4 shadow-md ${
                          isOwnMessage
                            ? "bg-blue-600 text-white"
                            : msg.senderType === "client"
                            ? "bg-white text-gray-800 border border-gray-200"
                            : msg.senderType === "admin"
                            ? "bg-green-100 text-gray-800"
                            : "bg-purple-100 text-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`w-2 h-2 rounded-full ${senderColor}`}
                          ></span>
                          <span
                            className={`text-xs font-semibold ${
                              isOwnMessage ? "text-blue-100" : "text-gray-600"
                            }`}
                          >
                            {msg.senderName}
                            {isOwnMessage && " (You)"}
                          </span>
                          <span
                            className={`text-xs ${
                              isOwnMessage ? "text-blue-200" : "text-gray-400"
                            }`}
                          >
                            •
                          </span>
                          <span
                            className={`text-xs ${
                              isOwnMessage ? "text-blue-200" : "text-gray-400"
                            }`}
                          >
                            {roleLabel}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap break-words">
                          {msg.message}
                        </p>
                        <p
                          className={`text-xs mt-2 ${
                            isOwnMessage ? "text-blue-200" : "text-gray-400"
                          }`}
                        >
                          {new Date(msg.createdAt).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Message Input */}
        <form
          onSubmit={handleSendMessage}
          className="p-4 bg-white border-t flex-shrink-0"
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={sending}
            />
            <button
              type="submit"
              disabled={sending || !newMessage.trim()}
              className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2 ${
                sending || !newMessage.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:shadow-lg"
              }`}
            >
              <FaPaperPlane />
              {sending ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
