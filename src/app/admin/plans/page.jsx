"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaTrash, FaUser, FaEnvelope, FaPhone, FaBuilding } from "react-icons/fa";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/api";

const AdminPlans = () => {
  const router = useRouter();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, active, inactive, expired

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

    fetchAllPlans();
  }, [router]);

  const fetchAllPlans = async () => {
    try {
      console.log("Fetching plans from:", `${BASE_URL}/plan/all`);
      const response = await fetch(`${BASE_URL}/plan/all`);
      const data = await response.json();

      console.log("API Response:", data);

      if (data.success) {
        console.log("Plans fetched successfully:", data.plans.length);
        setPlans(data.plans);
      } else {
        console.error("API returned error:", data.message);
        toast.error(data.message || "Failed to fetch plans");
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Failed to fetch plans. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (planId, newStatus) => {
    const loadingToast = toast.loading(`Updating plan status to ${newStatus}...`);

    try {
      const response = await fetch(`${BASE_URL}/plan/status/${planId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        toast.update(loadingToast, {
          render: `Plan ${newStatus} successfully! 🎉`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Refresh plans
        fetchAllPlans();
      } else {
        toast.update(loadingToast, {
          render: data.message || "Failed to update plan status",
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
      console.error("Error updating plan status:", error);
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

  const handleDeletePlan = async (planId) => {
    if (!confirm("Are you sure you want to delete this plan?")) {
      return;
    }

    const loadingToast = toast.loading("Deleting plan...");

    try {
      const response = await fetch(`${BASE_URL}/plan/${planId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.update(loadingToast, {
          render: "Plan deleted successfully! 🗑️",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Refresh plans
        fetchAllPlans();
      } else {
        toast.update(loadingToast, {
          render: data.message || "Failed to delete plan",
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
      console.error("Error deleting plan:", error);
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
      case "active":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            <FaCheckCircle /> Active
          </span>
        );
      case "inactive":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
            <FaHourglassHalf /> Pending
          </span>
        );
      case "expired":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
            <FaTimesCircle /> Expired
          </span>
        );
      default:
        return null;
    }
  };

  const filteredPlans = plans.filter((plan) => {
    if (filter === "all") return true;
    return plan.status === filter;
  });

  const stats = {
    total: plans.length,
    active: plans.filter((p) => p.status === "active").length,
    inactive: plans.filter((p) => p.status === "inactive").length,
    expired: plans.filter((p) => p.status === "expired").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Plans Management</h1>
        <p className="text-blue-100 text-lg">Manage client plan purchases and subscriptions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Plans</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Active Plans</h3>
          <p className="text-3xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-yellow-500">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Pending Approval</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.inactive}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Expired Plans</h3>
          <p className="text-3xl font-bold text-red-600">{stats.expired}</p>
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
            All Plans ({stats.total})
          </button>
          <button
            onClick={() => setFilter("inactive")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              filter === "inactive"
                ? "bg-yellow-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pending ({stats.inactive})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              filter === "active"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Active ({stats.active})
          </button>
          <button
            onClick={() => setFilter("expired")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              filter === "expired"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Expired ({stats.expired})
          </button>
        </div>
      </div>

      {/* Plans List */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {filteredPlans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No plans found</p>
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
                    Service & Plan
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPlans.map((plan) => (
                  <tr key={plan._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <FaUser className="text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{plan.userId?.name || "N/A"}</p>
                          <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                            <FaEnvelope className="text-gray-400" />
                            {plan.userId?.email || "N/A"}
                          </p>
                          {plan.userId?.phone && (
                            <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                              <FaPhone className="text-gray-400" />
                              {plan.userId.phone}
                            </p>
                          )}
                          {plan.userId?.company && (
                            <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                              <FaBuilding className="text-gray-400" />
                              {plan.userId.company}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{plan.serviceName}</p>
                      <p className="text-sm text-gray-600">{plan.planType} Plan</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-orange-600 text-lg">{plan.planPrice}</p>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(plan.status)}</td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>
                          <span className="font-semibold">Purchased:</span>{" "}
                          {new Date(plan.purchaseDate).toLocaleDateString()}
                        </p>
                        {plan.activationDate && (
                          <p>
                            <span className="font-semibold">Activated:</span>{" "}
                            {new Date(plan.activationDate).toLocaleDateString()}
                          </p>
                        )}
                        {plan.expiryDate && (
                          <p>
                            <span className="font-semibold">Expires:</span>{" "}
                            {new Date(plan.expiryDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        {plan.status === "inactive" && (
                          <button
                            onClick={() => handleStatusUpdate(plan._id, "active")}
                            className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-semibold"
                          >
                            Activate
                          </button>
                        )}
                        {plan.status === "active" && (
                          <button
                            onClick={() => handleStatusUpdate(plan._id, "expired")}
                            className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-semibold"
                          >
                            Mark Expired
                          </button>
                        )}
                        <button
                          onClick={() => handleDeletePlan(plan._id)}
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

export default AdminPlans;
