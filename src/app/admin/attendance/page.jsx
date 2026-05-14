"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { EMPLOYEE_API } from "@/config/api";
import { toast } from "react-toastify";
import {
  FaCalendarCheck,
  FaCalendarAlt,
  FaUserCheck,
  FaUserTimes,
  FaClock,
  FaFilter,
} from "react-icons/fa";

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [viewMode, setViewMode] = useState("daily"); // daily, monthly, employee

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, [selectedDate, selectedEmployee, viewMode]);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.GET_ALL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setEmployees(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem("token");
      let response;

      if (viewMode === "daily") {
        response = await axios.get(EMPLOYEE_API.ALL_ATTENDANCE, {
          headers: { Authorization: `Bearer ${token}` },
          params: { date: selectedDate },
        });
      } else if (viewMode === "employee" && selectedEmployee) {
        response = await axios.get(
          EMPLOYEE_API.EMPLOYEE_ATTENDANCE(selectedEmployee),
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      if (response?.data.success) {
        setAttendanceData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast.error("Failed to fetch attendance");
    } finally {
      setLoading(false);
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

  const getTodayStats = () => {
    const present = attendanceData.filter(
      (a) => a.status === "present" || a.status === "late"
    ).length;
    const absent = attendanceData.filter((a) => a.status === "absent").length;
    const onLeave = attendanceData.filter((a) => a.status === "on-leave").length;
    const late = attendanceData.filter((a) => a.status === "late").length;

    return { present, absent, onLeave, late };
  };

  const stats = getTodayStats();

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
          Attendance Management
        </h1>
        <p className="text-gray-600 mt-1">Track employee attendance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Present</h3>
              <p className="text-4xl font-bold mt-2">{stats.present}</p>
            </div>
            <FaUserCheck className="text-5xl opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Absent</h3>
              <p className="text-4xl font-bold mt-2">{stats.absent}</p>
            </div>
            <FaUserTimes className="text-5xl opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">On Leave</h3>
              <p className="text-4xl font-bold mt-2">{stats.onLeave}</p>
            </div>
            <FaCalendarAlt className="text-5xl opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Late Arrivals</h3>
              <p className="text-4xl font-bold mt-2">{stats.late}</p>
            </div>
            <FaClock className="text-5xl opacity-50" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("daily")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                viewMode === "daily"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Daily View
            </button>
            <button
              onClick={() => setViewMode("employee")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                viewMode === "employee"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Employee View
            </button>
          </div>

          {viewMode === "daily" && (
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            />
          )}

          {viewMode === "employee" && (
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name} ({emp.employeeId})
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Employee ID</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Department</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Punch In</th>
                <th className="px-6 py-4 text-left">Punch Out</th>
                <th className="px-6 py-4 text-left">Total Hours</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((attendance) => (
                <tr key={attendance._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-emerald-600">
                    {attendance.employeeId?.employeeId}
                  </td>
                  <td className="px-6 py-4">{attendance.employeeId?.name}</td>
                  <td className="px-6 py-4">
                    {attendance.employeeId?.department} 
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

          {attendanceData.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FaCalendarCheck className="text-6xl mx-auto mb-4 opacity-30" />
              <p className="text-xl">No attendance records found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
