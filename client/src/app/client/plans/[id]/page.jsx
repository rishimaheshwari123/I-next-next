"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaCalendarAlt,
  FaClock,
  FaGem,
  FaChevronLeft,
  FaListUl,
  FaGift,
  FaInfoCircle,
  FaStar,
  FaCreditCard,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/api";

const PlanDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchaseDetails();
  }, [id]);

  const fetchPurchaseDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/plan/purchase/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setPurchase(data.purchase);
      } else {
        toast.error(data.message || "Failed to load plan details");
        router.push("/client/plans");
      }
    } catch (error) {
      console.error("Error fetching plan details:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold flex items-center gap-2">
            <FaCheckCircle /> Active Subscription
          </span>
        );
      case "pending":
        return (
          <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold flex items-center gap-2">
            <FaHourglassHalf /> Pending Approval
          </span>
        );
      case "expired":
        return (
          <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-bold flex items-center gap-2">
            <FaTimesCircle /> Expired
          </span>
        );
      case "rejected":
        return (
          <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-bold flex items-center gap-2">
            <FaTimesCircle /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!purchase) return null;

  const plan = purchase.planId;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 font-bold transition-colors group"
      >
        <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
        Back to Plans
      </button>

      {/* Hero Section */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div
          className={`h-3 bg-gradient-to-r ${purchase.status === "active" ? "from-green-500 to-green-600" : "from-yellow-500 to-yellow-600"}`}
        ></div>
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest">
                  {plan?.category?.name}
                </span>
                {getStatusBadge(purchase.status)}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                {plan?.name}
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
                {plan?.description}
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center min-w-[240px]">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
                Price Range
              </p>
              <p className="text-4xl font-black text-gray-900">
                {plan?.priceRange}
              </p>
              <p className="text-sm font-bold text-blue-600 mt-2">
                Duration: {plan?.durationDays} Days
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Subscription Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FaInfoCircle className="text-blue-500" /> Subscription Info
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-sm text-gray-500 font-medium">
                  Purchased On
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {new Date(purchase.purchaseDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-50">
                <span className="text-sm text-gray-500 font-medium">
                  Payment Method
                </span>
                <span className="text-sm font-bold text-blue-600 flex items-center gap-1">
                  <FaCreditCard className="text-xs" /> {purchase.paymentMethod}
                </span>
              </div>
              {purchase.activationDate && (
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-sm text-gray-500 font-medium">
                    Activated On
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    {new Date(purchase.activationDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              {purchase.expiryDate && (
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm text-gray-500 font-medium">
                    Expires On
                  </span>
                  <span className="text-sm font-bold text-red-500">
                    {new Date(purchase.expiryDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {purchase.adminNotes && (
            <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
              <h3 className="text-sm font-black text-amber-800 uppercase tracking-widest mb-3">
                Admin Notes
              </h3>
              <p className="text-amber-900 text-sm italic">
                {purchase.adminNotes}
              </p>
            </div>
          )}
        </div>

        {/* Plan Features & Benefits */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Key Features */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FaListUl className="text-blue-500" /> Key Features
                </h3>
                <div className="space-y-4">
                  {plan?.keyFeatures?.map((f, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className="mt-1 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 group-hover:bg-green-500 transition-colors">
                        <FaCheckCircle className="text-green-600 text-[10px] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-gray-700 font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FaStar className="text-yellow-500" /> Plan Benefits
                </h3>
                <div className="space-y-4">
                  {plan?.benefits?.map((b, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className="mt-1 w-5 h-5 bg-yellow-50 rounded-full flex items-center justify-center shrink-0 group-hover:bg-yellow-400 transition-colors">
                        <FaStar className="text-yellow-600 text-[10px] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-gray-700 font-medium">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {plan?.additionalFeatures && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaInfoCircle className="text-indigo-500" /> Additional
                  Details
                </h3>
                <p className="text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-100 italic">
                  {plan.additionalFeatures}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsPage;
