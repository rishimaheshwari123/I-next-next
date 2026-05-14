"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { EMPLOYEE_API } from "@/config/api";
import { toast } from "react-toastify";
import { FaMoneyBillWave, FaDownload, FaWallet } from "react-icons/fa";

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
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaMoneyBillWave className="text-green-600" />
            My Salary
          </h1>
          <p className="text-gray-600 mt-1">View your salary details</p>
        </div>
        <button
          onClick={handleDownloadSlip}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <FaDownload /> Download Slip
        </button>
      </div>

      {/* Net Salary Card */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg p-8 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg opacity-90 mb-2">Net Monthly Salary</p>
            <h2 className="text-5xl font-bold">
              ₹{salary.netSalary?.toLocaleString() || "0"}
            </h2>
            <p className="text-sm opacity-80 mt-2">
              Payment Mode: {salary.paymentMode || "Bank Transfer"}
            </p>
          </div>
          <FaWallet className="text-8xl opacity-30" />
        </div>
      </div>

      {/* Salary Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Basic Salary */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Basic Salary</h3>
          <p className="text-4xl font-bold text-blue-600">
            ₹{salary.basicSalary?.toLocaleString() || "0"}
          </p>
        </div>

        {/* Total Allowances */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Total Allowances
          </h3>
          <p className="text-4xl font-bold text-green-600">
            +₹{totalAllowances.toLocaleString()}
          </p>
        </div>

        {/* Total Deductions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Total Deductions
          </h3>
          <p className="text-4xl font-bold text-red-600">
            -₹{totalDeductions.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Allowances */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-green-600">+</span> Allowances
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="font-semibold text-gray-700">
                HRA (House Rent Allowance)
              </span>
              <span className="text-xl font-bold text-green-600">
                ₹{allowances.hra?.toLocaleString() || "0"}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="font-semibold text-gray-700">
                DA (Dearness Allowance)
              </span>
              <span className="text-xl font-bold text-green-600">
                ₹{allowances.da?.toLocaleString() || "0"}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="font-semibold text-gray-700">
                TA (Travel Allowance)
              </span>
              <span className="text-xl font-bold text-green-600">
                ₹{allowances.ta?.toLocaleString() || "0"}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="font-semibold text-gray-700">Other Allowances</span>
              <span className="text-xl font-bold text-green-600">
                ₹{allowances.other?.toLocaleString() || "0"}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-green-100 rounded-lg border-2 border-green-300">
              <span className="font-bold text-gray-800">Total Allowances</span>
              <span className="text-2xl font-bold text-green-600">
                ₹{totalAllowances.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Deductions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="text-red-600">-</span> Deductions
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
              <span className="font-semibold text-gray-700">
                PF (Provident Fund)
              </span>
              <span className="text-xl font-bold text-red-600">
                ₹{deductions.pf?.toLocaleString() || "0"}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
              <span className="font-semibold text-gray-700">Tax Deduction</span>
              <span className="text-xl font-bold text-red-600">
                ₹{deductions.tax?.toLocaleString() || "0"}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
              <span className="font-semibold text-gray-700">Insurance</span>
              <span className="text-xl font-bold text-red-600">
                ₹{deductions.insurance?.toLocaleString() || "0"}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
              <span className="font-semibold text-gray-700">Other Deductions</span>
              <span className="text-xl font-bold text-red-600">
                ₹{deductions.other?.toLocaleString() || "0"}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-red-100 rounded-lg border-2 border-red-300">
              <span className="font-bold text-gray-800">Total Deductions</span>
              <span className="text-2xl font-bold text-red-600">
                ₹{totalDeductions.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Details */}
      {salary.bankDetails && (
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Bank Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm mb-1">Account Number</p>
              <p className="text-lg font-semibold">
                {salary.bankDetails.accountNumber || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">IFSC Code</p>
              <p className="text-lg font-semibold">
                {salary.bankDetails.ifscCode || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">Bank Name</p>
              <p className="text-lg font-semibold">
                {salary.bankDetails.bankName || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">Branch Name</p>
              <p className="text-lg font-semibold">
                {salary.bankDetails.branchName || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Salary Calculation Formula */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Salary Calculation
        </h3>
        <div className="space-y-2 text-gray-700">
          <p className="flex justify-between">
            <span>Basic Salary:</span>
            <span className="font-semibold">
              ₹{salary.basicSalary?.toLocaleString() || "0"}
            </span>
          </p>
          <p className="flex justify-between text-green-600">
            <span>+ Total Allowances:</span>
            <span className="font-semibold">₹{totalAllowances.toLocaleString()}</span>
          </p>
          <p className="flex justify-between text-red-600">
            <span>- Total Deductions:</span>
            <span className="font-semibold">₹{totalDeductions.toLocaleString()}</span>
          </p>
          <div className="border-t-2 border-gray-300 pt-2 mt-2">
            <p className="flex justify-between text-xl font-bold text-gray-800">
              <span>Net Salary:</span>
              <span className="text-green-600">
                ₹{salary.netSalary?.toLocaleString() || "0"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
