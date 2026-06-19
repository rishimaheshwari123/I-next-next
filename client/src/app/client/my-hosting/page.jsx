"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaServer,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaCalendarAlt,
  FaInfoCircle,
  FaGlobe,
  FaChartLine,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/api";

const MyHosting = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [hostings, setHostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, approved, pending, rejected, completed

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
    fetchUserHostings(parsedUser.id || parsedUser._id);
  }, [router]);

  const fetchUserHostings = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/hosting/user/${userId}`);
      const data = await response.json();

      if (data.success) {
        setHostings(data.hostings);
      }
    } catch (error) {
      console.error("Error fetching hostings:", error);
      toast.error("Failed to fetch hosting plans");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold">
            <FaCheckCircle className="text-lg" />
            <span>Active</span>
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-bold">
            <FaClock className="text-lg" />
            <span>Pending Approval</span>
          </div>
        );
      case "rejected":
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full font-bold">
            <FaTimesCircle className="text-lg" />
            <span>Rejected</span>
          </div>
        );
      case "completed":
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold">
            <FaCheckCircle className="text-lg" />
            <span>Completed</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "from-green-500 to-green-600";
      case "pending":
        return "from-yellow-500 to-yellow-600";
      case "rejected":
        return "from-red-500 to-red-600";
      case "completed":
        return "from-blue-500 to-blue-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const filteredHostings = hostings.filter((hosting) => {
    if (filter === "all") return true;
    return hosting.status === filter;
  });

  const stats = {
    total: hostings.length,
    approved: hostings.filter((h) => h.status === "approved").length,
    pending: hostings.filter((h) => h.status === "pending").length,
    rejected: hostings.filter((h) => h.status === "rejected").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading your hosting plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">My Hosting Plans</h1>
            <p className="text-blue-100 text-lg">
              View and manage all your hosting subscriptions
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <FaServer className="text-5xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-semibold">Total Hosting</h3>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaServer className="text-blue-600 text-xl" />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-semibold">Active</h3>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
          </div>
          <p className="text-4xl font-bold text-green-600">{stats.approved}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-semibold">Pending</h3>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <FaClock className="text-yellow-600 text-xl" />
            </div>
          </div>
          <p className="text-4xl font-bold text-yellow-600">{stats.pending}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 text-sm font-semibold">Rejected</h3>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <FaTimesCircle className="text-red-600 text-xl" />
            </div>
          </div>
          <p className="text-4xl font-bold text-red-600">{stats.rejected}</p>
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
            All Hosting ({stats.total})
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === "approved"
                ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transform scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Active ({stats.approved})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === "pending"
                ? "bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-lg transform scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setFilter("rejected")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === "rejected"
                ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transform scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Rejected ({stats.rejected})
          </button>
        </div>
      </div>

      {/* Hosting Plans Grid */}
      {filteredHostings.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaServer className="text-6xl text-gray-300" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-3">
            {filter === "all" ? "No Hosting Plans Yet" : `No ${filter.charAt(0).toUpperCase() + filter.slice(1)} Hosting Plans`}
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            {filter === "all"
              ? "Start by requesting a hosting plan for your website"
              : `You don't have any ${filter} hosting plans at the moment`}
          </p>
          <Link
            href="/client/hosting"
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl"
          >
            Request Hosting
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHostings.map((hosting) => (
            <div
              key={hosting._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-100 hover:border-green-300 transform hover:-translate-y-1"
            >
              {/* Hosting Header */}
              <div className={`bg-gradient-to-r ${getStatusColor(hosting.status)} p-6 text-white`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{hosting.hostingType}</h3>
                    <p className="text-sm opacity-90">{hosting.serverType}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <FaServer className="text-2xl" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaClock />
                  <span>{hosting.planDuration} Plan</span>
                </div>
              </div>

              {/* Hosting Body */}
              <div className="p-6">
                {/* Status Badge */}
                <div className="mb-6 flex justify-center">
                  {getStatusBadge(hosting.status)}
                </div>

                {/* Hosting Details */}
                <div className="space-y-3 mb-6">
                  {hosting.domainName && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaGlobe className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Domain</p>
                        <p className="font-semibold text-gray-900">{hosting.domainName}</p>
                      </div>
                    </div>
                  )}

                  {hosting.websiteType && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaInfoCircle className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Website Type</p>
                        <p className="font-semibold text-gray-900">{hosting.websiteType}</p>
                      </div>
                    </div>
                  )}

                  {hosting.expectedTraffic && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaChartLine className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Expected Traffic</p>
                        <p className="font-semibold text-gray-900">{hosting.expectedTraffic}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCalendarAlt className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">Requested On</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(hosting.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {hosting.activationDate && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaCheckCircle className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Activated On</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(hosting.activationDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  )}

                  {hosting.expiryDate && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaClock className="text-red-600" />
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs">Expires On</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(hosting.expiryDate).toLocaleDateString("en-US", {
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
                {hosting.status === "pending" && (
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <FaInfoCircle className="text-yellow-600 text-xl mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-yellow-800 mb-1">
                          Waiting for Admin Approval
                        </p>
                        <p className="text-xs text-yellow-700">
                          Your hosting request is under review. You'll be notified once it's approved.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {hosting.status === "approved" && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-600 text-xl mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-green-800 mb-1">
                          Hosting is Active
                        </p>
                        <p className="text-xs text-green-700">
                          Your hosting is currently active and all services are available.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {hosting.status === "rejected" && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <FaTimesCircle className="text-red-600 text-xl mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-red-800 mb-1">
                          Request Rejected
                        </p>
                        <p className="text-xs text-red-700">
                          This hosting request was rejected. Contact us for more information.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {hosting.additionalRequirements && (
                  <div className="border-t-2 border-gray-100 pt-4 mt-4">
                    <p className="text-sm font-bold text-gray-700 mb-2">Additional Requirements:</p>
                    <p className="text-sm text-gray-600">{hosting.additionalRequirements}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="bg-green-500 text-white p-4 rounded-xl">
              <FaServer className="text-3xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Need More Hosting?
              </h3>
              <p className="text-gray-600 text-lg">
                Request additional hosting plans for your growing business needs.
              </p>
            </div>
          </div>
          <Link
            href="/client/hosting"
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            Request Hosting
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyHosting;
