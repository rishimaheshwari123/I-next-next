"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaTrash,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuilding,
  FaPlus,
  FaEdit,
  FaListUl,
  FaShoppingCart,
  FaGift,
  FaInfoCircle,
  FaStar,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { BASE_URL, EMPLOYEE_API } from "@/config/api";
import PlanTemplateModal from "@/components/admin/plans/PlanTemplateModal";

const AdminPlans = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("purchases"); // "purchases" or "templates"
  const [purchases, setPurchases] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, active, pending, expired, rejected

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  useEffect(() => {
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

    fetchAllData();
  }, [router]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Fetch Purchases
      const purchaseRes = await fetch(`${BASE_URL}/plan/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const purchaseData = await purchaseRes.json();
      if (purchaseData.success) setPurchases(purchaseData.purchases);

      // Fetch Templates
      const templateRes = await fetch(`${BASE_URL}/plan/templates`);
      const templateData = await templateRes.json();
      if (templateData.success) setTemplates(templateData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseStatusUpdate = async (purchaseId, newStatus) => {
    const loadingToast = toast.loading(`Updating status to ${newStatus}...`);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/plan/status/${purchaseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (data.success) {
        toast.update(loadingToast, {
          render: `Status updated to ${newStatus}! 🎉`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        fetchAllData();
      } else {
        toast.update(loadingToast, {
          render: data.message || "Update failed",
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.update(loadingToast, {
        render: "Network error",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    }
  };

  const handleDeleteTemplate = async (id) => {
    if (!confirm("Are you sure you want to delete this plan template?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/plan/template/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Template deleted successfully");
        fetchAllData();
      }
    } catch (error) {
      toast.error("Failed to delete template");
    }
  };

  const handleDeletePurchase = async (id) => {
    if (!confirm("Are you sure you want to delete this purchase record?"))
      return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/plan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Purchase record deleted");
        fetchAllData();
      }
    } catch (error) {
      toast.error("Failed to delete purchase record");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
            <FaCheckCircle /> Active
          </span>
        );
      case "pending":
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
            <FaHourglassHalf /> Pending
          </span>
        );
      case "expired":
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
            <FaTimesCircle /> Expired
          </span>
        );
      case "rejected":
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold flex items-center gap-1 w-fit">
            <FaTimesCircle /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const filteredPurchases = purchases.filter(
    (p) => filter === "all" || p.status === filter,
  );

  const stats = {
    total: purchases.length,
    active: purchases.filter((p) => p.status === "active").length,
    pending: purchases.filter((p) => p.status === "pending").length,
    expired: purchases.filter((p) => p.status === "expired").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Plans Management</h1>
          <p className="text-blue-100">
            Manage plan templates and client purchases
          </p>
        </div>
        {activeTab === "templates" && (
          <button
            onClick={() => {
              setEditingPlan(null);
              setShowModal(true);
            }}
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all shadow-lg"
          >
            <FaPlus /> Create Plan
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("purchases")}
          className={`pb-4 px-4 font-bold text-sm transition-all flex items-center gap-2 ${activeTab === "purchases" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
        >
          <FaShoppingCart /> Client Purchases
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={`pb-4 px-4 font-bold text-sm transition-all flex items-center gap-2 ${activeTab === "templates" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
        >
          <FaListUl /> Plan Templates
        </button>
      </div>

      {activeTab === "purchases" ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">
                Total Purchases
              </h3>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">
                Active Plans
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {stats.active}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-yellow-500">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">
                Pending Approval
              </h3>
              <p className="text-3xl font-bold text-yellow-600">
                {stats.pending}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
              <h3 className="text-gray-600 text-sm font-semibold mb-2">
                Expired Plans
              </h3>
              <p className="text-3xl font-bold text-red-600">{stats.expired}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 bg-white p-2 rounded-xl shadow-md w-fit">
            {["all", "pending", "active", "expired", "rejected"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${filter === f ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Purchases Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                    Plan Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPurchases.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                          {p.userId?.name?.[0] || "?"}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-900">
                            {p.userId?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {p.userId?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-sm text-gray-900">
                        {p.planId?.name || "N/A"}
                      </p>
                      <p className="text-xs text-blue-600 font-semibold">
                        {p.planId?.category?.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Duration: {p.planId?.durationDays} Days
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-orange-600">
                        {p.planId?.priceRange}
                      </p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">
                        {p.paymentMethod}
                      </p>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(p.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {p.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handlePurchaseStatusUpdate(p._id, "active")
                              }
                              className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                              title="Approve"
                            >
                              <FaCheckCircle />
                            </button>
                            <button
                              onClick={() =>
                                handlePurchaseStatusUpdate(p._id, "rejected")
                              }
                              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                              title="Reject"
                            >
                              <FaTimesCircle />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDeletePurchase(p._id)}
                          className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* Plan Templates Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t) => (
            <div
              key={t._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {t.category?.name}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-2">
                      {t.name}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingPlan(t);
                        setShowModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteTemplate(t._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                  {t.description}
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-xs text-gray-400 font-bold uppercase">
                      Price Range
                    </span>
                    <span className="text-sm font-bold text-orange-600">
                      {t.priceRange}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-xs text-gray-400 font-bold uppercase">
                      Duration
                    </span>
                    <span className="text-sm font-bold text-gray-700">
                      {t.durationDays} Days
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  {/* Key Features Section */}
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
                      <FaListUl className="text-blue-500" /> Key Features
                    </p>
                    <div className="space-y-1.5">
                      {t.keyFeatures?.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-gray-600"
                        >
                          <FaCheckCircle className="text-green-500 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits Section */}
                  {t.benefits && t.benefits.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
                        <FaGift className="text-purple-500" /> Benefits
                      </p>
                      <div className="space-y-1.5">
                        {t.benefits.map((b, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-xs text-gray-600"
                          >
                            <FaStar className="text-yellow-500 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Features Section */}
                  {t.additionalFeatures && (
                    <div className="pt-2 border-t border-gray-50">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                        <FaInfoCircle className="text-indigo-500" /> Additional
                        Info
                      </p>
                      <p className="text-xs text-gray-500 leading-relaxed italic">
                        {t.additionalFeatures}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {templates.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-bold">
                No plan templates created yet
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 text-blue-600 font-bold hover:underline flex items-center gap-2 mx-auto"
              >
                <FaPlus /> Create your first plan
              </button>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <PlanTemplateModal
          editingPlan={editingPlan}
          onClose={() => setShowModal(false)}
          onSuccess={fetchAllData}
        />
      )}
    </div>
  );
};

export default AdminPlans;
