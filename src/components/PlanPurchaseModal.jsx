"use client";
import React, { useState } from "react";
import { FaCheck, FaTimes, FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { BASE_URL } from "@/config/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const PlanPurchaseModal = ({ isOpen, onClose, plan, serviceName }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  if (!isOpen || !plan) return null;

  const handlePurchase = async () => {
    if (!agreed) {
      toast.warning("Please confirm that you want to purchase this plan");
      return;
    }

    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      toast.warning("Please login to purchase a plan");
      onClose();
      router.push("/login");
      return;
    }

    const user = JSON.parse(userData);

    // Check if user is client
    if (user.role !== "client") {
      toast.error("Only clients can purchase plans");
      onClose();
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Processing your plan purchase...");

    try {
      const response = await fetch(`${BASE_URL}/plan/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          serviceName: serviceName,
          planType: plan.name,
          planPrice: plan.price,
          planFeatures: plan.features,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.update(loadingToast, {
          render: "Plan purchased successfully! Waiting for admin approval 🎉",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        onClose();
        setAgreed(false);

        // Redirect to client plans page after 2 seconds
        setTimeout(() => {
          router.push("/client/plans");
        }, 2000);
      } else {
        toast.update(loadingToast, {
          render: data.message || "Failed to purchase plan",
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
      console.error("Error purchasing plan:", error);
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

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className={`bg-gradient-to-r ${plan.popular ? 'from-orange-500 to-red-500' : 'from-blue-600 to-purple-600'} p-6 text-white relative`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200"
            >
              <FaTimes className="text-xl" />
            </button>
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaShoppingCart className="text-3xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Confirm Your Purchase</h2>
                <p className="text-white/90 text-lg">Review plan details before proceeding</p>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-8">
            {/* Service & Plan Info */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 mb-6 border-2 border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Service</p>
                  <h3 className="text-2xl font-bold text-gray-900">{serviceName}</h3>
                </div>
                {plan.popular && (
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
              </div>
              
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-sm text-gray-600">Plan Type:</p>
                <p className="text-xl font-bold text-gray-900">{plan.name}</p>
              </div>

              <div className="flex items-baseline gap-2">
                <p className="text-sm text-gray-600">Price:</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  {plan.price}
                </p>
                {plan.period && (
                  <p className="text-gray-600 text-lg">/{plan.period}</p>
                )}
              </div>

              {plan.description && (
                <p className="text-gray-600 mt-4 leading-relaxed">{plan.description}</p>
              )}
            </div>

            {/* Features List */}
            <div className="mb-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaInfoCircle className="text-blue-600" />
                What's Included
              </h4>
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
                <ul className="grid md:grid-cols-2 gap-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-0.5 flex-shrink-0">
                        <FaCheck className="text-green-600 text-sm" />
                      </div>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <FaInfoCircle className="text-blue-600 text-2xl mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-2 text-lg">Important Information</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Your plan will be activated after admin approval</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>You will receive a notification once your plan is activated</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>You can track your plan status in the "My Plans" section</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Our team will contact you within 24 hours to discuss the details</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Confirmation Checkbox */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-6 mb-6">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-1">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-6 h-6 rounded-lg border-2 border-orange-400 text-orange-600 focus:ring-2 focus:ring-orange-500 cursor-pointer"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                    I confirm that I want to purchase this plan
                  </p>
                  <p className="text-sm text-gray-600">
                    By checking this box, you agree to proceed with the purchase of the <span className="font-semibold">{plan.name}</span> plan for <span className="font-semibold">{serviceName}</span>.
                  </p>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-6 py-4 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all duration-300 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handlePurchase}
                disabled={loading || !agreed}
                className={`flex-1 px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  loading || !agreed
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transform hover:scale-105"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                    >
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
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FaShoppingCart />
                    Confirm Purchase
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanPurchaseModal;
