"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { EMPLOYEE_API } from "@/config/api";
import { toast } from "react-toastify";
import {
  FaMoneyBillWave,
  FaDownload,
  FaWallet,
  FaArrowUp,
  FaHistory,
  FaUniversity,
  FaCheckCircle,
} from "react-icons/fa";

export default function EmployeeSalaryPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.GET_MY_PROFILE, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setProfile(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to fetch salary details");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSlip = () => {
    toast.info("Salary slip download feature coming soon!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500"></div>
      </div>
    );
  }

  const salary = profile?.salary || {};
  const allowances = salary.allowances || {};
  const deductions = salary.deductions || {};
  const lastHike = salary.lastHike || {};
  const hikeHistory = salary.hikeHistory || [];

  const totalAllowances =
    (allowances.hra || 0) +
    (allowances.da || 0) +
    (allowances.ta || 0) +
    (allowances.other || 0);

  const totalDeductions =
    (deductions.pf || 0) +
    (deductions.tax || 0) +
    (deductions.insurance || 0) +
    (deductions.other || 0);

  return (
    <div className="px-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 flex items-center gap-3 tracking-tight">
            <div className="p-3 bg-green-100 rounded-2xl text-green-600 shadow-sm">
              <FaMoneyBillWave />
            </div>
            Salary Management
          </h1>
          <p className="text-gray-500 font-medium ml-1">
            Comprehensive overview of your earnings and hikes
          </p>
        </div>
        {/* <button
          onClick={handleDownloadSlip}
          className="w-full md:w-auto bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
        >
          <FaDownload /> Download Salary Slip
        </button> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Salary Card */}
        <div className="lg:col-span-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-[2rem] shadow-2xl p-8 md:p-12 relative overflow-hidden h-full">
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-8">
                  <span className="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-xs font-black uppercase tracking-widest border border-green-500/30">
                    Net Monthly Earnings
                  </span>
                  <span className="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-xs font-black uppercase tracking-widest border border-blue-500/30">
                    {salary.paymentMode || "Bank Transfer"}
                  </span>
                </div>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-2">
                  Total Payable Amount
                </p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-6xl md:text-7xl font-black tracking-tighter">
                    ₹{salary.netSalary?.toLocaleString() || "0"}
                  </h2>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8">
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
                    Basic Salary
                  </p>
                  <p className="text-xl font-bold">
                    ₹{salary.basicSalary?.toLocaleString() || "0"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
                    Account No.
                  </p>
                  <p className="text-xl font-bold">
                    ****{salary.bankDetails?.accountNumber?.slice(-4) || "0000"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
                    Bank Name
                  </p>
                  <p className="text-xl font-bold truncate">
                    {salary.bankDetails?.bankName || "HDFC Bank"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
                    Last Hike
                  </p>
                  <p className="text-xl font-bold text-green-400">
                    +{lastHike.percentage || 0}%
                  </p>
                </div>
              </div>
            </div>
            <FaWallet className="absolute -right-20 -bottom-20 text-[25rem] text-white/5 rotate-12 pointer-events-none" />
          </div>
        </div>

        {/* Latest Hike Info */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100 flex flex-col justify-between h-full group hover:shadow-2xl transition-all">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <FaArrowUp className="text-green-500" /> Latest Hike
                </h3>
                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-lg">
                  {lastHike.date
                    ? new Date(lastHike.date).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>

              <div className="text-center py-6 bg-green-50 rounded-3xl border border-green-100 mb-6">
                <p className="text-5xl font-black text-green-600 mb-1">
                  +{lastHike.percentage || 0}%
                </p>
                <p className="text-sm font-bold text-green-700 uppercase tracking-widest">
                  Salary Increase
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                    Increment Amount
                  </span>
                  <span className="text-gray-900 font-black">
                    ₹{lastHike.amount?.toLocaleString() || "0"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                    Previous Salary
                  </span>
                  <span className="text-gray-900 font-black">
                    ₹
                    {(
                      (salary.netSalary || 0) - (lastHike.amount || 0)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-8 italic border-t pt-4">
              "Your hard work is appreciated and reflected in your growth."
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Earnings Breakdown */}
        <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
                <FaWallet size={20} />
              </div>
              Earnings Breakdown
            </h3>
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
              Total: ₹
              {((salary.basicSalary || 0) + totalAllowances).toLocaleString()}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-blue-50 hover:border-blue-200 transition-all">
              <div>
                <p className="text-sm font-black text-gray-900">Basic Salary</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                  Core component
                </p>
              </div>
              <p className="text-xl font-black text-gray-900">
                ₹{salary.basicSalary?.toLocaleString() || "0"}
              </p>
            </div>

            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-green-50 hover:border-green-200 transition-all">
              <div>
                <p className="text-sm font-black text-gray-900">HRA</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                  House Rent Allowance
                </p>
              </div>
              <p className="text-xl font-black text-green-600">
                +₹{allowances.hra?.toLocaleString() || "0"}
              </p>
            </div>

            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-green-50 hover:border-green-200 transition-all">
              <div>
                <p className="text-sm font-black text-gray-900">DA / TA</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                  Dearness & Travel Allowance
                </p>
              </div>
              <p className="text-xl font-black text-green-600">
                +₹{(allowances.da + allowances.ta || 0).toLocaleString()}
              </p>
            </div>

            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-green-50 hover:border-green-200 transition-all">
              <div>
                <p className="text-sm font-black text-gray-900">
                  Other Allowances
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                  Bonus & special benefits
                </p>
              </div>
              <p className="text-xl font-black text-green-600">
                +₹{allowances.other?.toLocaleString() || "0"}
              </p>
            </div>
          </div>
        </div>

        {/* Deductions & Final Calc */}
        <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-xl text-red-600">
                <FaHistory size={20} />
              </div>
              Deductions Breakdown
            </h3>
            <span className="text-xs font-black text-red-600 uppercase tracking-widest bg-red-50 px-4 py-2 rounded-full border border-red-100">
              Total: ₹{totalDeductions.toLocaleString()}
            </span>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-red-50 hover:border-red-200 transition-all">
              <div>
                <p className="text-sm font-black text-gray-900">
                  Provident Fund (PF)
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                  Retirement savings
                </p>
              </div>
              <p className="text-xl font-black text-red-600">
                -₹{deductions.pf?.toLocaleString() || "0"}
              </p>
            </div>

            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:bg-red-50 hover:border-red-200 transition-all">
              <div>
                <p className="text-sm font-black text-gray-900">
                  Professional Tax & Insurance
                </p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                  Statutory deductions
                </p>
              </div>
              <p className="text-xl font-black text-red-600">
                -₹
                {(deductions.tax + deductions.insurance || 0).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Net Calculation Summary */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-widest opacity-70">
                Gross Earnings
              </span>
              <span className="font-bold">
                ₹
                {((salary.basicSalary || 0) + totalAllowances).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest opacity-70">
                Total Deductions
              </span>
              <span className="font-bold">
                -₹{totalDeductions.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-white/20 pt-4 flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">
                  Take Home Salary
                </p>
                <p className="text-3xl font-black tracking-tight">
                  ₹{salary.netSalary?.toLocaleString() || "0"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">
                  Status
                </p>
                <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30">
                  Processed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hike History & Bank Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Hike History */}
        <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
          <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-xl text-green-600">
              <FaHistory size={20} />
            </div>
            Hike & Increment History
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Effective Date
                  </th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Increment Amount
                  </th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Percentage
                  </th>
                  <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                    Remarks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {hikeHistory.length > 0 ? (
                  hikeHistory.map((h, i) => (
                    <tr
                      key={i}
                      className="group hover:bg-gray-50 transition-all"
                    >
                      <td className="py-4 text-sm font-bold text-gray-900">
                        {h.date ? new Date(h.date).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="py-4 text-sm font-black text-green-600">
                        +₹{h.amount?.toLocaleString() || "0"}
                      </td>
                      <td className="py-4">
                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black border border-green-100">
                          {h.percentage}%
                        </span>
                      </td>
                      <td className="py-4 text-sm text-gray-500 italic text-right">
                        {h.remarks || "Performance Appraisal"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-12 text-center text-gray-400 font-bold italic"
                    >
                      No hike history available yet. Keep up the great work!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bank Details */}
        <div className="lg:col-span-4 bg-white rounded-[2rem] shadow-xl p-8 border border-gray-100">
          <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-xl text-gray-600">
              <FaUniversity size={20} />
            </div>
            Bank Account
          </h3>

          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border border-gray-200">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                Account Holder
              </p>
              <p className="text-lg font-black text-gray-900">
                {salary.bankDetails?.accountHolderName || profile?.name}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Bank
                </span>
                <span className="text-sm font-black text-gray-900">
                  {salary.bankDetails?.bankName || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Account No.
                </span>
                <span className="text-sm font-black text-gray-900">
                  {salary.bankDetails?.accountNumber || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  IFSC Code
                </span>
                <span className="text-sm font-black text-blue-600">
                  {salary.bankDetails?.ifscCode || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Branch
                </span>
                <span className="text-sm font-black text-gray-900">
                  {salary.bankDetails?.branchName || "N/A"}
                </span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest justify-center">
              <FaCheckCircle className="text-green-500" /> Secure Payment Method
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
