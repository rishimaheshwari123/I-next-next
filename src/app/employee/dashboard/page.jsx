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
  const [employeeTasks, setEmployeeTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [taskStatusUpdates, setTaskStatusUpdates] = useState({});
  const [newCommentInputs, setNewCommentInputs] = useState({});

  const handleAddComment = async (taskId) => {
    const commentText = newCommentInputs[taskId] || "";
    if (!commentText.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${EMPLOYEE_API.ADD_PROJECT_TASK_COMMENT(taskId)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ comment: commentText })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("💬 Reply posted!");
        setNewCommentInputs(prev => ({ ...prev, [taskId]: "" }));
        fetchDashboardData();
      } else {
        toast.error(data.message || "Failed to post reply");
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    }
  };

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

      // Fetch employee tasks
      const tasksRes = await axios.get(EMPLOYEE_API.GET_EMPLOYEE_PROJECT_TASKS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (tasksRes.data.success) {
        setEmployeeTasks(tasksRes.data.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };
 
  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        EMPLOYEE_API.UPDATE_PROJECT_TASK_STATUS(taskId),
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success(`✅ Task status updated to ${newStatus}!`);
        fetchDashboardData();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const formatTime = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
   const renderTaskCard = (task) => {
    return (
      <div key={task._id} className="bg-gray-50 border rounded-xl p-4 hover:shadow-md transition-all flex flex-col justify-between h-full">
        <div>
          <div className="flex justify-between items-start gap-2">
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              {task.projectId?.projectName || "Unknown Project"}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                task.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : task.status === "In Progress"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-750"
              }`}
            >
              {task.status}
            </span>
          </div>
          <h4 className="font-bold text-gray-800 text-sm mt-2">{task.taskName}</h4>
          {task.description && <p className="text-xs text-gray-500 mt-1">{task.description}</p>}
          
          {task.clientFeedback && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-2 text-[10px] text-amber-800">
              <strong>Feedback:</strong> {task.clientFeedback}
            </div>
          )}
          
          {/* Feedback & Replies Thread */}
          <div className="mt-3 pt-3 border-t border-gray-150 space-y-2">
            <span className="text-[10px] font-bold text-gray-700 block">Feedback & Replies ({task.feedbacks?.length || 0})</span>
            {task.feedbacks && task.feedbacks.length > 0 ? (
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {task.feedbacks.map((fb, idx) => (
                  <div key={idx} className="bg-gray-50 border rounded p-1.5 text-[10px] space-y-1">
                    <div className="flex justify-between items-center text-gray-550 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <span className={`px-1 rounded-[3px] text-[8px] font-extrabold uppercase ${
                          fb.sender === "Client"
                            ? "bg-blue-100 text-blue-700"
                            : fb.sender === "Employee"
                              ? "bg-green-100 text-green-700"
                              : "bg-purple-100 text-purple-700"
                        }`}>
                          {fb.sender}
                        </span>
                        <span className="text-gray-700 font-bold">{fb.senderName}</span>
                      </span>
                      <span>{new Date(fb.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-800 font-medium whitespace-pre-wrap">{fb.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[10px] text-gray-400 italic">No feedback or replies yet.</p>
            )}

            <div className="flex gap-1.5 mt-2">
              <input
                type="text"
                placeholder="Reply to feedback..."
                value={newCommentInputs[task._id] || ""}
                onChange={(e) => setNewCommentInputs({
                  ...newCommentInputs,
                  [task._id]: e.target.value
                })}
                className="flex-1 px-2 py-1 border rounded text-[10px] focus:ring-1 focus:ring-indigo-500 bg-white"
              />
              <button
                type="button"
                onClick={() => handleAddComment(task._id)}
                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-750 text-white rounded text-[10px] font-bold"
              >
                Reply
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown and Button for status update */}
        <div className="mt-3 pt-3 border-t border-gray-150 flex flex-wrap items-center justify-between gap-2 bg-gray-50/50 p-1.5 rounded">
          <span className="text-[10px] font-semibold text-gray-500">Change Status:</span>
          <div className="flex items-center gap-1.5">
            <select
              value={taskStatusUpdates[task._id] !== undefined ? taskStatusUpdates[task._id] : task.status}
              onChange={(e) => setTaskStatusUpdates({
                ...taskStatusUpdates,
                [task._id]: e.target.value
              })}
              className="px-1.5 py-0.5 border border-gray-200 rounded text-[10px] focus:ring-1 focus:ring-indigo-500 bg-white text-gray-700 font-medium"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              type="button"
              onClick={() => handleUpdateTaskStatus(
                task._id,
                taskStatusUpdates[task._id] !== undefined ? taskStatusUpdates[task._id] : task.status
              )}
              className="px-2 py-0.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-bold transition-all shadow-sm"
            >
              Update Status
            </button>
          </div>
        </div>
 
        <div className="mt-3 pt-3 border-t text-[10px] text-gray-400 space-y-1">
          <div>Created: {new Date(task.createdAt).toLocaleString()}</div>
          {task.completedAt && (
            <div className="text-green-655 font-semibold">
              Completed: {new Date(task.completedAt).toLocaleString()}
            </div>
          )}
        </div>
      </div>
    );
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

      {/* Project Tasks Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaTasks className="text-indigo-600" />
          My Assigned Project Tasks ({employeeTasks.length})
        </h2>

        {employeeTasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No tasks assigned to you currently.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today Tasks */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gray-500 border-b pb-2 uppercase tracking-wider">
                Today Tasks ({employeeTasks.filter(t => t.taskType === "Today Task").length})
              </h3>
              <div className="space-y-3">
                {employeeTasks.filter(t => t.taskType === "Today Task").map(task => renderTaskCard(task))}
                {employeeTasks.filter(t => t.taskType === "Today Task").length === 0 && <p className="text-xs text-gray-400 italic">No tasks for today.</p>}
              </div>
            </div>

            {/* Weekly Tasks */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gray-500 border-b pb-2 uppercase tracking-wider">
                Weekly Tasks ({employeeTasks.filter(t => t.taskType === "Weekly Task").length})
              </h3>
              <div className="space-y-3">
                {employeeTasks.filter(t => t.taskType === "Weekly Task").map(task => renderTaskCard(task))}
                {employeeTasks.filter(t => t.taskType === "Weekly Task").length === 0 && <p className="text-xs text-gray-400 italic">No tasks for this week.</p>}
              </div>
            </div>

            {/* Monthly Tasks */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gray-500 border-b pb-2 uppercase tracking-wider">
                Monthly Tasks ({employeeTasks.filter(t => t.taskType === "Monthly Task").length})
              </h3>
              <div className="space-y-3">
                {employeeTasks.filter(t => t.taskType === "Monthly Task").map(task => renderTaskCard(task))}
                {employeeTasks.filter(t => t.taskType === "Monthly Task").length === 0 && <p className="text-xs text-gray-400 italic">No tasks for this month.</p>}
              </div>
            </div>
          </div>
        )}
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
