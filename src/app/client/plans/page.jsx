"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaShoppingCart,
  FaCalendarAlt,
  FaClock,
  FaListUl,
  FaSearch,
  FaGift,
  FaInfoCircle,
  FaStar,
  FaChevronRight,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/api";
import PlanPurchaseModal from "@/components/PlanPurchaseModal";

const ClientPlans = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("my-plans"); // "my-plans" or "browse"
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Purchase Modal State
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      toast.error("Please login to access this page");
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== "client") {
      toast.error("Access denied. Client access only.");
      router.push("/login");
      return;
    }

    setUser(parsedUser);
    fetchAllData(parsedUser.id || parsedUser._id);
  }, [router]);

  const fetchAllData = async (userId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Fetch User Purchases
      const purchaseRes = await fetch(`${BASE_URL}/plan/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const purchaseData = await purchaseRes.json();
      if (purchaseData.success) setPurchases(purchaseData.purchases);

      // Fetch Available Plan Templates
      const availableRes = await fetch(`${BASE_URL}/plan/templates`);
      const availableData = await availableRes.json();
      if (availableData.success) setAvailablePlans(availableData.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
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
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Plans & Subscriptions</h1>
          <p className="text-blue-100">
            Browse available plans or manage your active subscriptions
          </p>
        </div>
        <div className="hidden md:block">
          <FaShoppingCart className="text-6xl opacity-20" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("my-plans")}
          className={`pb-4 px-4 font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === "my-plans"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <FaListUl /> My Subscriptions
        </button>
        <button
          onClick={() => setActiveTab("browse")}
          className={`pb-4 px-4 font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === "browse"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <FaSearch /> Browse Available Plans
        </button>
      </div>

      {activeTab === "my-plans" ? (
        /* User Subscriptions List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPurchases.map((p) => (
            <Link
              key={p._id}
              href={`/client/plans/${p._id}`}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col"
            >
              <div
                className={`h-2 bg-gradient-to-r ${
                  p.status === "active"
                    ? "from-green-500 to-green-600"
                    : "from-yellow-500 to-yellow-600"
                }`}
              ></div>
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {p.planId?.name}
                    </h3>
                    <p className="text-xs text-blue-600 font-bold uppercase mt-1">
                      {p.planId?.category?.name}
                    </p>
                  </div>
                  {getStatusBadge(p.status)}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <FaCalendarAlt className="text-blue-500" />
                    <span>
                      Purchased: {new Date(p.purchaseDate).toLocaleDateString()}
                    </span>
                  </div>
                  {p.expiryDate && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <FaClock className="text-red-500" />
                      <span>
                        Expires: {new Date(p.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                      Payment Method
                    </p>
                    <p className="text-sm font-bold text-gray-700">
                      {p.paymentMethod}
                    </p>
                  </div>
                  <span className="text-blue-600 text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details <FaChevronRight size={10} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
          {filteredPurchases.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-bold">
                You haven't purchased any plans yet
              </p>
              <button
                onClick={() => setActiveTab("browse")}
                className="mt-4 text-blue-600 font-bold hover:underline flex items-center gap-2 mx-auto"
              >
                Browse Available Plans
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Browse Available Plans Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availablePlans.map((t) => (
            <div
              key={t._id}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all flex flex-col group"
            >
              <div className="p-8 flex-1">
                <div className="mb-6">
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest">
                    {t.category?.name}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-4">
                    {t.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-gray-900">
                      {t.priceRange}
                    </span>
                    <span className="text-gray-400 font-bold">
                      / {t.durationDays} Days
                    </span>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                  {t.description}
                </p>

                <div className="space-y-4 mb-8">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Key Features
                  </p>
                  {t.keyFeatures?.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-gray-700 font-medium"
                    >
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                        <FaCheckCircle className="text-green-600 text-[10px]" />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Plan Benefits
                  </p>
                  {t.benefits?.map((b, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-sm text-gray-600"
                    >
                      <FaStar className="text-yellow-500 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                {t.additionalFeatures && (
                  <div className="mt-6 pt-4 border-t border-gray-50">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                      Additional Information
                    </p>
                    <p className="text-sm text-gray-500 italic leading-relaxed">
                      {t.additionalFeatures}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-8 pt-0">
                <button
                  onClick={() => {
                    setSelectedPlan(t);
                    setShowPurchaseModal(true);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95"
                >
                  Purchase Now
                </button>
              </div>
            </div>
          ))}
          {availablePlans.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-bold">
                No plans available at the moment
              </p>
            </div>
          )}
        </div>
      )}

      {showPurchaseModal && (
        <PlanPurchaseModal
          plan={selectedPlan}
          user={user}
          onClose={() => setShowPurchaseModal(false)}
          onSuccess={() => {
            setActiveTab("my-plans");
            fetchAllData(user.id || user._id);
          }}
        />
      )}
    </div>
  );
};

export default ClientPlans;
