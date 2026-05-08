"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaServer,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaTrash,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaGlobe,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/api";

const AdminHosting = () => {
  const router = useRouter();
  const [hostings, setHostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected, completed

  useEffect(() => {
    // Check if user is admin
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      toast.error("Please login to access admin panel");
      router.push("/login");
      return;
    }

    const user = JSON.parse(userData);
    if (user.role !== "admin") {
      toast.error("Access denied. Admin access only.");
      router.push("/login");
      return;
    }

    fetchAllHostings();
  }, [router]);

  const fetchAllHostings = async () => {
    try {
      console.log("Fetching hostings from:", `${BASE_URL}/hosting/all`);
      const response = await fetch(`${BASE_URL}/hosting/all`);
      const data = await response.json();

      console.log("API Response:", data);

      if (data.success) {
        console.log("Hostings fetched successfully:", data.hostings.length);
        setHostings(data.hostings);
      } else {
        console.error("API returned error:", data.message);
        toast.error(data.message || "Failed to fetch hosting inquiries");
      }
    } catch (error) {
      console.error("Error fetching hostings:", error);
      toast.error("Failed to fetch hosting inquiries. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (hostingId, newStatus) => {
    const loadingToast = toast.loading(`Updating status to ${newStatus}...`);

    try {
      const response = await fetch(`${BASE_URL}/hosting/status/${hostingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        toast.update(loadingToast, {
          render: `Hosting inquiry ${newStatus} successfully! 🎉`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Refresh hostings
        fetchAllHostings();
      } else {
        toast.update(loadingToast, {
          render: data.message || "Failed to update status",
          type: "error",
          isLoading: false,
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.update(loadingToast, {
        render: "Network error. Please try again!",
        type: "error",
        isLoading: false,
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleDelete = async (hostingId) => {
    if (!confirm("Are you sure you want to delete this hosting inquiry?")) {
      return;
    }

    const loadingToast = toast.loading("Deleting hosting inquiry...");

    try {
      const response = await fetch(`${BASE_URL}/hosting/${hostingId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.update(loadingToast, {
          render: "Hosting inquiry deleted successfully! 🗑️",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Refresh hostings
        fetchAllHostings();
      } else {
        toast.update(loadingToast, {
          render: data.message || "Failed to delete inquiry",
          type: "error",
          isLoading: false,
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting hosting:", error);
      toast.update(loadingToast, {
        render: "Network error. Please try again!",
        type: "error",
        isLoading: false,
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            <FaCheckCircle /> Approved
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
            <FaClock /> Pending
          </span>
        );
      case "rejected":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
            <FaTimesCircle /> Rejected
          </span>
        );
      case "completed":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
            <FaCheckCircle /> Completed
          </span>
        );
      default:
        return null;
    }
  };

  const filteredHostings = hostings.filter((hosting) => {
    if (filter === "all") return true;
    return hosting.status === filter;
  });

  const stats = {
    total: hostings.length,
    pending: hostings.filter((h) => h.status === "pending").length,
    approved: hostings.filter((h) => h.status === "approved").length,
    rejected: hostings.filter((h) => h.status === "rejected").length,
    completed: hostings.filter((h) => h.status === "completed").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading hosting inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Hosting Plans Management</h1>
        <p className="text-blue-100 text-lg">Manage client hosting inquiries and requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Inquiries</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-yellow-500">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Approved</h3>
          <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Rejected</h3>
          <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Completed</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.completed}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl p-4 shadow-lg">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              filter === "pending"
                ? "bg-yellow-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              filter === "approved"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Approved ({stats.approved})
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              filter === "rejected"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Rejected ({stats.rejected})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              filter === "completed"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Completed ({stats.completed})
          </button>
        </div>
      </div>

      {/* Hosting Inquiries List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {filteredHostings.length === 0 ? (
          <div className="text-center py-12">
            <FaServer className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No hosting inquiries found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Client Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Hosting Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Additional Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredHostings.map((hosting) => (
                  <tr key={hosting._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaUser className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {hosting.userId?.name || "N/A"}
                          </p>
                          <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                            <FaEnvelope className="text-gray-400" />
                            {hosting.userId?.email || "N/A"}
                          </p>
                          {hosting.userId?.phone && (
                            <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                              <FaPhone className="text-gray-400" />
                              {hosting.userId.phone}
                            </p>
                          )}
                          {hosting.userId?.company && (
                            <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                              <FaBuilding className="text-gray-400" />
                              {hosting.userId.company}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="font-semibold text-gray-900">{hosting.hostingType}</p>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Duration:</span> {hosting.planDuration}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Server:</span> {hosting.serverType}
                        </p>
                        {hosting.domainName && (
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <FaGlobe className="text-gray-400" />
                            {hosting.domainName}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-600 space-y-1">
                        {hosting.websiteType && (
                          <p>
                            <span className="font-semibold">Type:</span> {hosting.websiteType}
                          </p>
                        )}
                        {hosting.expectedTraffic && (
                          <p>
                            <span className="font-semibold">Traffic:</span> {hosting.expectedTraffic}
                          </p>
                        )}
                        {hosting.additionalRequirements && (
                          <p className="max-w-xs truncate">
                            <span className="font-semibold">Notes:</span>{" "}
                            {hosting.additionalRequirements}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(hosting.status)}</td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>
                          <span className="font-semibold">Requested:</span>{" "}
                          {new Date(hosting.createdAt).toLocaleDateString()}
                        </p>
                        {hosting.activationDate && (
                          <p className="text-green-600">
                            <span className="font-semibold">Activated:</span>{" "}
                            {new Date(hosting.activationDate).toLocaleDateString()}
                          </p>
                        )}
                        {hosting.expiryDate && (
                          <p className="text-red-600">
                            <span className="font-semibold">Expires:</span>{" "}
                            {new Date(hosting.expiryDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        {hosting.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(hosting._id, "approved")}
                              className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-semibold"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(hosting._id, "rejected")}
                              className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-semibold"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {hosting.status === "approved" && (
                          <button
                            onClick={() => handleStatusUpdate(hosting._id, "completed")}
                            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-semibold"
                          >
                            Mark Complete
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(hosting._id)}
                          className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm font-semibold flex items-center justify-center gap-1"
                        >
                          <FaTrash className="text-xs" /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHosting;
