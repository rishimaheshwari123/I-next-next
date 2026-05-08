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
  FaInfoCircle
} from "react-icons/fa";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/api";

const ClientPlans = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, active, inactive, expired

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      toast.error("Please login to access this page");
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);

    // Check if user is client
    if (parsedUser.role !== "client") {
      toast.error("Access denied. Client access only.");
      router.push("/login");
      return;
    }

    setUser(parsedUser);
    fetchUserPlans(parsedUser._id);
  }, [router]);

  const fetchUserPlans = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/plan/user/${userId}`);
      const data = await response.json();

      if (data.success) {
        setPlans(data.plans);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Failed to fetch plans");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold">
            <FaCheckCircle className="text-lg" />
            <span>Active</span>
          </div>
        );
      case "inactive":
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-bold">
            <FaHourglassHalf className="text-lg" />
            <span>Pending Approval</span>
          </div>
        );
      case "expired":
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full font-bold">
            <FaTimesCircle className="text-lg" />
            <span>Expired</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "from-green-500 to-green-600";
      case "inactive":
        return "from-yellow-500 to-yellow-600";
      case "expired":
        return "from-red-500 to-red-600";
      default:
        return "from-gray-500 to-gray-600";
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
          <p className="mt-4 text-gray-600 font-semibold">Loading your plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">My Plans</h1>
            <p className="text-blue-100 text-lg">
              View and manage all your purchased plans
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <FaShoppingCart className="text-5xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-semibold">Total Plans</h3>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaShoppingCart className="text-blue-600 text-xl" />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-semibold">Active Plans</h3>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
          </div>
          <p className="text-4xl font-bold text-green-600">{stats.active}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-semibold">Pending</h3>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FaHourglassHalf className="text-yellow-600 text-xl" />
            </div>
          </div>
          <p className="text-4xl font-bold text-yellow-600">{stats.inactive}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-semibold">Expired</h3>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <FaTimesCircle className="text-red-600 text-xl" />
            </div>
          </div>
          <p className="text-4xl font-bold text-red-600">{stats.expired}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === "all"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Plans ({stats.total})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === "active"
                ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Active ({stats.active})
          </button>
          <button
            onClick={() => setFilter("inactive")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === "inactive"
                ? "bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-lg transform scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pending ({stats.inactive})
          </button>
          <button
            onClick={() => setFilter("expired")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === "expired"
                ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transform scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Expired ({stats.expired})
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      {filteredPlans.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShoppingCart className="text-6xl text-gray-300" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">
            {filter === "all" ? "No Plans Yet" : `No ${filter.charAt(0).toUpperCase() + filter.slice(1)} Plans`}
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            {filter === "all" 
              ? "Start by purchasing a plan to grow your business" 
              : `You don't have any ${filter} plans at the moment`}
          </p>
          <Link
            href="/inboudmarket"
            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl"
          >
            Browse Our Services
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <div
              key={plan._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-orange-300 transform hover:-translate-y-1"
            >
              {/* Plan Header */}
              <div className={`bg-gradient-to-r ${getStatusColor(plan.status)} p-6 text-white`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{plan.serviceName}</h3>
                    <p className="text-sm opacity-90">{plan.planType} Plan</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <FaShoppingCart className="text-2xl" />
                  </div>
                </div>
                <div className="text-4xl font-bold">{plan.planPrice}</div>
              </div>

              {/* Plan Body */}
              <div className="p-6">
                {/* Status Badge */}
                <div className="mb-6 flex justify-center">
                  {getStatusBadge(plan.status)}
                </div>

                {/* Dates Information */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCalendarAlt className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Purchased On</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(plan.purchaseDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {plan.activationDate && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaCheckCircle className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Activated On</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(plan.activationDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  )}

                  {plan.expiryDate && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaClock className="text-orange-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Expires On</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(plan.expiryDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Status Messages */}
                {plan.status === "inactive" && (
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <FaInfoCircle className="text-yellow-600 text-xl mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-yellow-800 mb-1">
                          Waiting for Admin Approval
                        </p>
                        <p className="text-xs text-yellow-700">
                          Your plan purchase is under review. You'll be notified once it's activated.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {plan.status === "active" && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-600 text-xl mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-green-800 mb-1">
                          Plan is Active
                        </p>
                        <p className="text-xs text-green-700">
                          Your plan is currently active and all features are available.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {plan.status === "expired" && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <FaTimesCircle className="text-red-600 text-xl mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-red-800 mb-1">
                          Plan Expired
                        </p>
                        <p className="text-xs text-red-700">
                          This plan has expired. Contact us to renew or upgrade.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features */}
                {plan.planFeatures && plan.planFeatures.length > 0 && (
                  <div className="border-t-2 border-gray-100 pt-4">
                    <p className="text-sm font-bold text-gray-700 mb-3">Plan Features:</p>
                    <ul className="space-y-2">
                      {plan.planFeatures.slice(0, 5).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {plan.planFeatures.length > 5 && (
                        <li className="text-xs text-gray-500 italic pl-6">
                          +{plan.planFeatures.length - 5} more features
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="bg-orange-500 text-white p-4 rounded-xl">
              <FaShoppingCart className="text-3xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Need More Services?
              </h3>
              <p className="text-gray-600 text-lg">
                Explore our wide range of digital marketing and development services to grow your business.
              </p>
            </div>
          </div>
          <Link
            href="/inboudmarket"
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            Browse Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientPlans;
