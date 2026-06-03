"use client";

import { useState, useEffect } from "react";
import { BASE_URL } from "@/config/api";
import {
  FaHeadset,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaCommentAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaTicketAlt,
  FaClock,
  FaStickyNote,
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function SupportForm({ userType }) {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    priority: "Medium",
  });
  const [submitting, setSubmitting] = useState(false);
  const [ticketCreated, setTicketCreated] = useState(null);
  const [myTickets, setMyTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData((prev) => ({
        ...prev,
        name: parsedUser.name || "",
        email: parsedUser.email || "",
      }));
      fetchMyTickets(parsedUser._id || parsedUser.id);
    }
  }, []);

  const fetchMyTickets = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/support/my-tickets/${userId}`);
      const data = await response.json();
      if (data.success) {
        setMyTickets(data.tickets);
      }
    } catch (error) {
      console.error("Error fetching my tickets:", error);
    } finally {
      setLoadingTickets(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading("Creating support ticket...");

    try {
      const payload = {
        ...formData,
        userId: user?._id || user?.id,
        userType: userType || "Guest",
      };

      const response = await fetch(`${BASE_URL}/support/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        toast.update(toastId, {
          render: "Support ticket created successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        setTicketCreated(data.ticket);
        setFormData({
          ...formData,
          subject: "",
          message: "",
          priority: "Medium",
        });
        if (user) fetchMyTickets(user._id || user.id);
      } else {
        toast.update(toastId, {
          render: data.message || "Failed to create ticket",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.update(toastId, {
        render: "Failed to create support ticket",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Resolved":
        return "bg-green-100 text-green-700";
      case "Closed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (ticketCreated) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="text-3xl text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ticket Created!
        </h2>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
          <p className="text-gray-600 text-sm mb-1">Ticket Number</p>
          <p className="text-2xl font-bold text-blue-600">
            {ticketCreated.ticketNumber}
          </p>
        </div>
        <button
          onClick={() => setTicketCreated(null)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Create Another Ticket
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-blue-600 p-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FaEdit />
              New Support Ticket
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Priority
                </label>
                <div className="relative">
                  <FaExclamationTriangle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm appearance-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Message
              </label>
              <div className="relative">
                <FaCommentAlt className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  placeholder="Describe your issue..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {submitting ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaHeadset />
              )}
              Submit Ticket
            </button>
          </form>
        </div>

        {/* Tickets List Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gray-800 p-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FaTicketAlt />
              My Support Tickets
            </h2>
          </div>

          <div className="p-4 max-h-[500px] overflow-y-auto custom-scrollbar">
            {loadingTickets ? (
              <div className="flex justify-center py-8">
                <FaSpinner className="text-3xl text-blue-600 animate-spin" />
              </div>
            ) : myTickets.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FaTicketAlt className="text-4xl mx-auto mb-2 opacity-20" />
                <p>No tickets found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myTickets.map((ticket) => (
                  <div
                    key={ticket._id}
                    className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-blue-600">
                        {ticket.ticketNumber}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor(ticket.status)}`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">
                      {ticket.subject}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                      {ticket.message}
                    </p>

                    {/* Admin Notes in My Tickets */}
                    {ticket.notes && ticket.notes.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                          <FaStickyNote /> Admin Response
                        </p>
                        {ticket.notes.map((note, idx) => (
                          <div
                            key={idx}
                            className="bg-yellow-50 border border-yellow-100 rounded-lg p-2"
                          >
                            <p className="text-[11px] text-gray-700">
                              {note.note}
                            </p>
                            <p className="text-[9px] text-gray-400 mt-1">
                              By {note.addedBy}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-3 pt-3 border-t border-gray-50">
                      <FaClock />
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
