"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaServer, FaClock, FaGlobe, FaChartLine, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/api";

const ClientHosting = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    hostingType: "",
    planDuration: "",
    serverType: "",
    domainName: "",
    websiteType: "",
    expectedTraffic: "",
    additionalRequirements: "",
  });

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
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.hostingType || !formData.planDuration || !formData.serverType) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Submitting your hosting inquiry...");

    try {
      const response = await fetch(`${BASE_URL}/hosting/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          ...formData,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.update(loadingToast, {
          render: "Hosting inquiry submitted successfully! 🎉",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Reset form
        setFormData({
          hostingType: "",
          planDuration: "",
          serverType: "",
          domainName: "",
          websiteType: "",
          expectedTraffic: "",
          additionalRequirements: "",
        });

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push("/client/dashboard");
        }, 2000);
      } else {
        toast.update(loadingToast, {
          render: data.message || "Failed to submit inquiry",
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
      console.error("Error submitting hosting inquiry:", error);
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
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading...</p>
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Hosting Plans Inquiry</h1>
            <p className="text-blue-100 text-lg">
              Request your perfect hosting solution with Hostinger
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <FaServer className="text-5xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
          <FaServer className="text-4xl text-green-600 mb-3" />
          <h3 className="font-bold text-lg mb-2">Reliable Hosting</h3>
          <p className="text-gray-600 text-sm">99.9% uptime guarantee with Hostinger</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
          <FaClock className="text-4xl text-blue-600 mb-3" />
          <h3 className="font-bold text-lg mb-2">Fast Setup</h3>
          <p className="text-gray-600 text-sm">Get your hosting activated within 24 hours</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
          <FaChartLine className="text-4xl text-purple-600 mb-3" />
          <h3 className="font-bold text-lg mb-2">Scalable Plans</h3>
          <p className="text-gray-600 text-sm">Upgrade anytime as your business grows</p>
        </div>
      </div>

      {/* Hosting Inquiry Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Hosting Inquiry</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Hosting Type */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Hosting Type <span className="text-red-500">*</span>
              </label>
              <select
                name="hostingType"
                value={formData.hostingType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              >
                <option value="">Select Hosting Type</option>
                <option value="Shared Hosting">Shared Hosting</option>
                <option value="Individual Hosting">Individual Hosting (VPS)</option>
              </select>
            </div>

            {/* Plan Duration */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Plan Duration <span className="text-red-500">*</span>
              </label>
              <select
                name="planDuration"
                value={formData.planDuration}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              >
                <option value="">Select Duration</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            {/* Server Type */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Server Type <span className="text-red-500">*</span>
              </label>
              <select
                name="serverType"
                value={formData.serverType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              >
                <option value="">Select Server Type</option>
                <option value="KVM2">KVM2 (2 CPU Cores, 4GB RAM)</option>
                <option value="KVM4">KVM4 (4 CPU Cores, 8GB RAM)</option>
              </select>
            </div>

            {/* Domain Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Domain Name (Optional)
              </label>
              <div className="relative">
                <FaGlobe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="domainName"
                  value={formData.domainName}
                  onChange={handleChange}
                  placeholder="example.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                />
              </div>
            </div>

            {/* Website Type */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Website Type (Optional)
              </label>
              <input
                type="text"
                name="websiteType"
                value={formData.websiteType}
                onChange={handleChange}
                placeholder="e.g., E-commerce, Blog, Portfolio"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              />
            </div>

            {/* Expected Traffic */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Expected Traffic (Optional)
              </label>
              <input
                type="text"
                name="expectedTraffic"
                value={formData.expectedTraffic}
                onChange={handleChange}
                placeholder="e.g., 10,000 visitors/month"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              />
            </div>
          </div>

          {/* Additional Requirements */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Additional Requirements (Optional)
            </label>
            <textarea
              name="additionalRequirements"
              value={formData.additionalRequirements}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about any specific requirements or questions..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push("/client/dashboard")}
              className="flex-1 px-6 py-4 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all duration-300 font-bold text-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                loading
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FaCheckCircle />
                  Submit Inquiry
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientHosting;
