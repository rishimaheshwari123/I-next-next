"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { EMPLOYEE_API } from "@/config/api";
import { toast } from "react-toastify";
import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaTasks,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import Link from "next/link";

export default function EmployeeDashboard() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [tasks, setTasks] = useState({ pending: [], inProgress: [] });
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch profile
      const profileRes = await axios.get(EMPLOYEE_API.GET_MY_PROFILE, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (profileRes.data.success) {
        setProfile(profileRes.data.data);
      }

      // Fetch today's attendance
      const attendanceRes = await axios.get(EMPLOYEE_API.TODAY_STATUS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (attendanceRes.data.success) {
        setTodayAttendance(attendanceRes.data.data);
      }




      // Fetch leaves
      const leavesRes = await axios.get(EMPLOYEE_API.MY_LEAVES, {
        headers: { Authorization: `Bearer ${token}` },
        params: { status: "pending" },
      });

      if (leavesRes.data.success) {
        setLeaves(leavesRes.data.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaTachometerAlt className="text-blue-600" />
          Welcome back, {profile?.name}! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your work today
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Today's Status</h3>
              <p className="text-3xl font-bold mt-2">
                {todayAttendance?.status?.toUpperCase() || "ABSENT"}
              </p>
            </div>
            <FaCalendarCheck className="text-5xl opacity-50" />
          </div>
        </div>


        <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Leave Balance</h3>
              <p className="text-3xl font-bold mt-2">
                {profile?.leaveBalance?.casual || 0}
              </p>
            </div>
            <FaCalendarAlt className="text-5xl opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Working Hours</h3>
              <p className="text-3xl font-bold mt-2">
                {todayAttendance?.totalHours?.toFixed(1) || "0.0"}h
              </p>
            </div>
            <FaClock className="text-5xl opacity-50" />
          </div>
        </div>
      </div>

      {/* Today's Attendance */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaCalendarCheck className="text-emerald-600" />
          Today's Attendance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Punch In</p>
            <p className="text-2xl font-bold text-green-600">
              {formatTime(todayAttendance?.punchIn)}
            </p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Punch Out</p>
            <p className="text-2xl font-bold text-red-600">
              {formatTime(todayAttendance?.punchOut)}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Total Hours</p>
            <p className="text-2xl font-bold text-blue-600">
              {todayAttendance?.totalHours?.toFixed(2) || "0.00"} hrs
            </p>
          </div>
        </div>

        <Link
          href="/employee/attendance"
          className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-semibold"
        >
          View Full Attendance →
        </Link>
      </div>



      {/* Recent Leave Requests */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-amber-600" />
          Pending Leave Requests ({leaves.length})
        </h2>

        {leaves.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Start Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    End Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Days
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaves.slice(0, 3).map((leave) => (
                  <tr key={leave._id} className="border-t">
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                        {leave.leaveType.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(leave.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(leave.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      {leave.totalDays}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm">
                        PENDING
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No pending leave requests
          </p>
        )}

        <Link
          href="/employee/leaves"
          className="mt-4 inline-block text-amber-600 hover:text-amber-700 font-semibold"
        >
          View All Leaves →
        </Link>
      </div>
    </div>
  );
}
