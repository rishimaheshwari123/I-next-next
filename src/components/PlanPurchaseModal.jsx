"use client";

import { useState } from "react";
import { BASE_URL } from "@/config/api";
import { FaCheckCircle, FaTimes, FaCashRegister } from "react-icons/fa";
import { toast } from "react-toastify";

export default function PlanPurchaseModal({
  plan,
  user: initialUser,
  onClose,
  onSuccess,
  isOpen = true, // Default to true for cases where it's conditionally rendered by parent
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  if (!isOpen) return null;

  const handlePurchase = async () => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      const user = initialUser || (userData ? JSON.parse(userData) : null);

      if (!user) {
        toast.error("Please login to purchase a plan");
        return;
      }

      const response = await fetch(`${BASE_URL}/plan/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id || user._id,
          planId: plan._id,
          paymentMethod,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Purchase request sent! Waiting for admin approval.");
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast.error(data.message || "Purchase failed");
      }
    } catch (error) {
      console.error("Error purchasing plan:", error);
      toast.error("Failed to initiate purchase");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h2 className="text-xl font-bold">Confirm Purchase</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
            <p className="text-orange-600 font-bold text-xl">
              {plan.priceRange || plan.price}
            </p>
            {plan.category?.name && (
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {plan.category.name}
              </span>
            )}
          </div>

          <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Duration</span>
              <span className="font-bold text-gray-900">
                {plan.durationDays || plan.period || "N/A"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-bold text-blue-600 flex items-center gap-1">
                <FaCashRegister className="text-xs" /> {paymentMethod}
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <p className="text-xs text-gray-400 text-center">
              By clicking "Confirm Purchase", your request will be sent to the
              admin for approval. Once approved, your plan will be activated.
            </p>
            <button
              onClick={handlePurchase}
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 active:scale-95"
            >
              {isSubmitting ? "Processing..." : "Confirm Purchase"}
            </button>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full py-3 text-gray-500 font-bold hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
