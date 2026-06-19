"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { EMPLOYEE_API } from "@/config/api";
import { toast } from "react-toastify";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaEye,
} from "react-icons/fa";

export default function LeavesPage() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adminComments, setAdminComments] = useState("");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchLeaves();
    fetchStats();
  }, [filterStatus]);

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.ALL_LEAVES, {
        headers: { Authorization: `Bearer ${token}` },
        params: { status: filterStatus },
      });

      if (response.data.success) {
        setLeaves(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
      toast.error("Failed to fetch leave requests");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.LEAVE_STATS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleApprove = async (leaveId) => {
    setApproving(true);
    const loadingToast = toast.loading("Approving leave request...");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        EMPLOYEE_API.APPROVE_LEAVE(leaveId),
        { adminComments },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.update(loadingToast, {
          render: "Leave approved successfully! ✅",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        fetchLeaves();
        fetchStats();
        setShowModal(false);
        setAdminComments("");
      }
    } catch (error) {
      console.error("Error approving leave:", error);
      toast.update(loadingToast, {
        render: error.response?.data?.message || "Failed to approve leave! ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setApproving(false);
    }
  };

  const handleReject = async (leaveId) => {
    if (!adminComments.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }

    setRejecting(true);
    const loadingToast = toast.loading("Rejecting leave request...");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        EMPLOYEE_API.REJECT_LEAVE(leaveId),
        { adminComments },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.update(loadingToast, {
          render: "Leave rejected successfully! ❌",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        fetchLeaves();
        fetchStats();
        setShowModal(false);
        setAdminComments("");
      }
    } catch (error) {
      console.error("Error rejecting leave:", error);
      toast.update(loadingToast, {
        render: error.response?.data?.message || "Failed to reject leave! ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setRejecting(false);
    }
  };

  const openModal = (leave) => {
    setSelectedLeave(leave);
    setAdminComments("");
    setShowModal(true);
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaCalendarAlt className="text-amber-600" />
          Leave Management
        </h1>
        <p className="text-gray-600 mt-1">Manage employee leave requests</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Pending</h3>
                <p className="text-4xl font-bold mt-2">{stats.totalPending}</p>
              </div>
              <FaClock className="text-5xl opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Approved</h3>
                <p className="text-4xl font-bold mt-2">{stats.totalApproved}</p>
              </div>
              <FaCheckCircle className="text-5xl opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Rejected</h3>
                <p className="text-4xl font-bold mt-2">{stats.totalRejected}</p>
              </div>
              <FaTimesCircle className="text-5xl opacity-50" />
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus("")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === ""
                ? "bg-amber-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus("pending")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === "pending"
                ? "bg-amber-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus("approved")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === "approved"
                ? "bg-amber-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilterStatus("rejected")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === "rejected"
                ? "bg-amber-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Leaves Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Employee</th>
                <th className="px-6 py-4 text-left">Leave Type</th>
                <th className="px-6 py-4 text-left">Start Date</th>
                <th className="px-6 py-4 text-left">End Date</th>
                <th className="px-6 py-4 text-left">Days</th>
                <th className="px-6 py-4 text-left">Applied On</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold">{leave.employeeId?.name}</p>
                      <p className="text-sm text-gray-500">
                        {leave.employeeId?.employeeId}
                      </p>
                    </div>
                  </td>
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
                  <td className="px-6 py-4">
                    {new Date(leave.appliedDate).toLocaleDateString()}
                  </td>
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
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openModal(leave)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      {leave.status === "pending" && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedLeave(leave);
                              handleApprove(leave._id);
                            }}
                            className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                            title="Approve"
                          >
                            <FaCheckCircle />
                          </button>
                          <button
                            onClick={() => openModal(leave)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                            title="Reject"
                          >
                            <FaTimesCircle />
                          </button>
                        </>
                      )}
                    </div>
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

      {/* Modal */}
      {showModal && selectedLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 rounded-t-xl">
              <h2 className="text-2xl font-bold">Leave Request Details</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Employee Name</p>
                  <p className="font-semibold text-lg">
                    {selectedLeave.employeeId?.name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Employee ID</p>
                  <p className="font-semibold text-lg">
                    {selectedLeave.employeeId?.employeeId}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Leave Type</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getLeaveTypeColor(
                      selectedLeave.leaveType
                    )}`}
                  >
                    {selectedLeave.leaveType.toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Days</p>
                  <p className="font-semibold text-lg">
                    {selectedLeave.totalDays} days
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Start Date</p>
                  <p className="font-semibold">
                    {new Date(selectedLeave.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">End Date</p>
                  <p className="font-semibold">
                    {new Date(selectedLeave.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-2">Reason</p>
                <p className="bg-gray-50 p-4 rounded-lg">{selectedLeave.reason}</p>
              </div>

              {selectedLeave.status === "pending" && (
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Admin Comments (Optional for approval, Required for rejection)
                  </label>
                  <textarea
                    value={adminComments}
                    onChange={(e) => setAdminComments(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                    rows="3"
                    placeholder="Enter your comments..."
                  ></textarea>
                </div>
              )}

              {selectedLeave.adminComments && (
                <div>
                  <p className="text-gray-600 text-sm mb-2">Admin Comments</p>
                  <p className="bg-gray-50 p-4 rounded-lg">
                    {selectedLeave.adminComments}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 p-6 border-t">
              <button
                onClick={() => {
                  setShowModal(false);
                  setAdminComments("");
                }}
                disabled={approving || rejecting}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Close
              </button>
              {selectedLeave.status === "pending" && (
                <>
                  <button
                    onClick={() => handleApprove(selectedLeave._id)}
                    disabled={approving || rejecting}
                    className={`px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 font-semibold transition-all ${
                      approving || rejecting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <FaCheckCircle /> {approving ? "Approving..." : "Approve"}
                  </button>
                  <button
                    onClick={() => handleReject(selectedLeave._id)}
                    disabled={approving || rejecting}
                    className={`px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 font-semibold transition-all ${
                      approving || rejecting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <FaTimesCircle /> {rejecting ? "Rejecting..." : "Reject"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
