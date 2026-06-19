"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { EMPLOYEE_API } from "@/config/api";
import { toast } from "react-toastify";
import {
  FaCalendarAlt,
  FaPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

export default function EmployeeLeavesPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [leaves, setLeaves] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: "casual",
    startDate: "",
    endDate: "",
    reason: "",
  });

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.MY_LEAVES, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setLeaves(response.data.data);
        setLeaveBalance(response.data.leaveBalance);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
      toast.error("Failed to fetch leaves");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const loadingToast = toast.loading("Submitting leave application...");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(EMPLOYEE_API.APPLY_LEAVE, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.update(loadingToast, {
          render: "Leave application submitted successfully! 🎉",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        fetchLeaves();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error applying leave:", error);
      toast.update(loadingToast, {
        render: error.response?.data?.message || "Failed to apply leave! ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (id) => {
    if (!confirm("Are you sure you want to cancel this leave request?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(EMPLOYEE_API.CANCEL_LEAVE(id), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.success("Leave request cancelled");
        fetchLeaves();
      }
    } catch (error) {
      console.error("Error cancelling leave:", error);
      toast.error("Failed to cancel leave");
    }
  };

  const resetForm = () => {
    setFormData({
      leaveType: "casual",
      startDate: "",
      endDate: "",
      reason: "",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getLeaveTypeColor = (type) => {
    switch (type) {
      case "casual":
        return "bg-blue-100 text-blue-700";
      case "sick":
        return "bg-red-100 text-red-700";
      case "earned":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaCalendarAlt className="text-amber-600" />
            My Leaves
          </h1>
          <p className="text-gray-600 mt-1">Manage your leave requests</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <FaPlus /> Apply Leave
        </button>
      </div>

      {/* Leave Balance */}
      {leaveBalance && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Casual Leave</h3>
            <p className="text-4xl font-bold">{leaveBalance.casual}</p>
            <p className="text-sm opacity-80 mt-1">days remaining</p>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Sick Leave</h3>
            <p className="text-4xl font-bold">{leaveBalance.sick}</p>
            <p className="text-sm opacity-80 mt-1">days remaining</p>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Earned Leave</h3>
            <p className="text-4xl font-bold">{leaveBalance.earned}</p>
            <p className="text-sm opacity-80 mt-1">days remaining</p>
          </div>
        </div>
      )}

      {/* Leaves Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Leave Type</th>
                <th className="px-6 py-4 text-left">Start Date</th>
                <th className="px-6 py-4 text-left">End Date</th>
                <th className="px-6 py-4 text-left">Days</th>
                <th className="px-6 py-4 text-left">Reason</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Applied On</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getLeaveTypeColor(
                        leave.leaveType
                      )}`}
                    >
                      {leave.leaveType.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-semibold">{leave.totalDays}</td>
                  <td className="px-6 py-4 max-w-xs truncate">{leave.reason}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        leave.status
                      )}`}
                    >
                      {leave.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(leave.appliedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {leave.status === "pending" && (
                      <button
                        onClick={() => handleCancel(leave._id)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm"
                      >
                        Cancel
                      </button>
                    )}
                    {leave.status === "approved" && (
                      <FaCheckCircle className="text-green-600 text-xl mx-auto" />
                    )}
                    {leave.status === "rejected" && (
                      <FaTimesCircle className="text-red-600 text-xl mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {leaves.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FaCalendarAlt className="text-6xl mx-auto mb-4 opacity-30" />
              <p className="text-xl">No leave requests found</p>
            </div>
          )}
        </div>
      </div>

      {/* Apply Leave Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 rounded-t-xl">
              <h2 className="text-2xl font-bold">Apply for Leave</h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Leave Type *
                </label>
                <select
                  value={formData.leaveType}
                  onChange={(e) =>
                    setFormData({ ...formData, leaveType: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                  required
                >
                  <option value="casual">Casual Leave</option>
                  <option value="sick">Sick Leave</option>
                  <option value="earned">Earned Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Reason *
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                  rows="4"
                  placeholder="Please provide a reason for your leave..."
                  required
                ></textarea>
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
                  className={`px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all ${
                    submitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
