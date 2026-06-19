"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { EMPLOYEE_API } from "@/config/api";
import { toast } from "react-toastify";
import {
  FaCalendarCheck,
  FaClock,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

export default function EmployeeAttendancePage() {
  const [loading, setLoading] = useState(true);
  const [todayStatus, setTodayStatus] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchTodayStatus();
    fetchAttendanceHistory();

    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchTodayStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.TODAY_STATUS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setTodayStatus(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching today's status:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const currentDate = new Date();
      const response = await axios.get(EMPLOYEE_API.MY_ATTENDANCE, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
        },
      });

      if (response.data.success) {
        setAttendanceHistory(response.data.data);
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error("Error fetching attendance history:", error);
    }
  };

  const handlePunchIn = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        EMPLOYEE_API.PUNCH_IN,
        { location: "Office" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Punched in successfully! 🎉");
        fetchTodayStatus();
        fetchAttendanceHistory();
      }
    } catch (error) {
      console.error("Error punching in:", error);
      toast.error(error.response?.data?.message || "Failed to punch in");
    }
  };

  const handlePunchOut = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        EMPLOYEE_API.PUNCH_OUT,
        { location: "Office" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Punched out successfully! See you tomorrow! 👋");
        fetchTodayStatus();
        fetchAttendanceHistory();
      }
    } catch (error) {
      console.error("Error punching out:", error);
      toast.error(error.response?.data?.message || "Failed to punch out");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-700";
      case "absent":
        return "bg-red-100 text-red-700";
      case "late":
        return "bg-yellow-100 text-yellow-700";
      case "half-day":
        return "bg-orange-100 text-orange-700";
      case "on-leave":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
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
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaCalendarCheck className="text-emerald-600" />
          My Attendance
        </h1>
        <p className="text-gray-600 mt-1">Track your daily attendance</p>
      </div>

      {/* Current Time & Punch In/Out */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl shadow-lg p-8 mb-6">
        <div className="text-center mb-6">
          <FaClock className="text-6xl mx-auto mb-4 opacity-80" />
          <h2 className="text-5xl font-bold mb-2">
            {currentTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </h2>
          <p className="text-xl opacity-90">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <button
            onClick={handlePunchIn}
            disabled={todayStatus?.punchIn}
            className={`py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
              todayStatus?.punchIn
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white text-emerald-600 hover:bg-gray-100 shadow-lg hover:shadow-xl"
            }`}
          >
            <FaSignInAlt className="text-2xl" />
            {todayStatus?.punchIn ? "Already Punched In" : "Punch In"}
          </button>

          <button
            onClick={handlePunchOut}
            disabled={!todayStatus?.punchIn || todayStatus?.punchOut}
            className={`py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
              !todayStatus?.punchIn || todayStatus?.punchOut
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white text-red-600 hover:bg-gray-100 shadow-lg hover:shadow-xl"
            }`}
          >
            <FaSignOutAlt className="text-2xl" />
            {todayStatus?.punchOut ? "Already Punched Out" : "Punch Out"}
          </button>
        </div>

        {/* Today's Status */}
        {todayStatus && (
          <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm opacity-80">Punch In</p>
                <p className="text-2xl font-bold">
                  {formatTime(todayStatus.punchIn)}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-80">Punch Out</p>
                <p className="text-2xl font-bold">
                  {formatTime(todayStatus.punchOut)}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-80">Total Hours</p>
                <p className="text-2xl font-bold">
                  {todayStatus.totalHours?.toFixed(2) || "0.00"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Monthly Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-sm">Total Days</p>
            <p className="text-3xl font-bold text-gray-800">{stats.totalDays}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-sm">Present</p>
            <p className="text-3xl font-bold text-green-600">{stats.present}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-sm">Absent</p>
            <p className="text-3xl font-bold text-red-600">{stats.absent}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-sm">Late</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.late}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-sm">On Leave</p>
            <p className="text-3xl font-bold text-blue-600">{stats.onLeave}</p>
          </div>
        </div>
      )}

      {/* Attendance History */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4">
          <h2 className="text-xl font-bold">Attendance History</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Employee ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Punch In
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Punch Out
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Total Hours
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceHistory.map((attendance) => (
                <tr key={attendance._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-emerald-600">
                    {attendance.employeeId?.employeeId}
                  </td>
                  <td className="px-6 py-4">
                    {attendance.employeeId?.name}
                  </td>
                  <td className="px-6 py-4">
                    {attendance.employeeId?.department || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(attendance.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-semibold text-green-600">
                    {formatTime(attendance.punchIn)}
                  </td>
                  <td className="px-6 py-4 font-semibold text-red-600">
                    {formatTime(attendance.punchOut)}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {attendance.totalHours
                      ? `${attendance.totalHours.toFixed(2)} hrs`
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        attendance.status
                      )}`}
                    >
                      {attendance.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {attendanceHistory.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No attendance records found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
