"use client";
import React, { useState, useEffect } from "react";
import { FaTimes, FaTrash, FaCheckCircle, FaPlus, FaHourglassHalf, FaCalendarAlt, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { EMPLOYEE_API } from "@/config/api";

export default function ManageTasksModal({ show, project, onClose, onRefreshProject }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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
        fetchTasks();
      } else {
        toast.error(data.message || "Failed to post reply");
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    }
  };
  const [activeTab, setActiveTab] = useState("Today Task");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterEmployee, setFilterEmployee] = useState("");

  // Form state
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [taskType, setTaskType] = useState("Today Task");
  const [employeeId, setEmployeeId] = useState("");

  useEffect(() => {
    if (show && project?._id) {
      fetchTasks();
      // Reset form
      setTaskName("");
      setDescription("");
      setTaskType("Today Task");
      setEmployeeId("");
      setFilterStatus("");
      setFilterEmployee("");
    }
  }, [show, project]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(EMPLOYEE_API.GET_PROJECT_TASKS(project._id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setTasks(data.data);
      } else {
        toast.error("Failed to load tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Error loading tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskName || !taskType || !employeeId) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(EMPLOYEE_API.CREATE_PROJECT_TASK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          projectId: project._id,
          employeeId,
          taskName,
          description,
          taskType,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("✅ Task created and assigned successfully!");
        setTaskName("");
        setDescription("");
        fetchTasks();
        if (onRefreshProject) onRefreshProject();
      } else {
        toast.error(data.message || "Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(EMPLOYEE_API.DELETE_PROJECT_TASK(taskId), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("🗑️ Task deleted successfully!");
        fetchTasks();
        if (onRefreshProject) onRefreshProject();
      } else {
        toast.error(data.message || "Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Something went wrong");
    }
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(EMPLOYEE_API.UPDATE_PROJECT_TASK_STATUS(taskId), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`✅ Task status updated to ${newStatus}!`);
        fetchTasks();
        if (onRefreshProject) onRefreshProject();
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Something went wrong");
    }
  };

  if (!show) return null;

  // Group tasks
  const groupedTasks = {
    "Today Task": tasks.filter((t) => t.taskType === "Today Task"),
    "Weekly Task": tasks.filter((t) => t.taskType === "Weekly Task"),
    "Monthly Task": tasks.filter((t) => t.taskType === "Monthly Task"),
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl my-8 flex flex-col md:flex-row overflow-hidden border border-gray-100">
        
        {/* Left Side: Create / Assign Task Form */}
        <div className="w-full md:w-2/5 bg-gray-50 p-6 border-r border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaPlus className="text-indigo-600" /> Assign New Task
          </h3>
          
          <form onSubmit={handleAddTask} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Task Name *
              </label>
              <input
                type="text"
                placeholder="Enter task summary"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
                required
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Description
              </label>
              <textarea
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
                rows="3"
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Task Type *
              </label>
              <select
                value={taskType}
                onChange={(e) => setTaskType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
                required
                disabled={submitting}
              >
                <option value="Today Task">Today Task</option>
                <option value="Weekly Task">Weekly Task</option>
                <option value="Monthly Task">Monthly Task</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-1">
                Assign Employee *
              </label>
              <select
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
                required
                disabled={submitting}
              >
                <option value="">Select Employee</option>
                {project?.assignedEmployees?.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all text-sm disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Assign Task"}
            </button>
          </form>
        </div>

        {/* Right Side: Tasks Listing */}
        <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {project?.projectName}
                </h2>
                <p className="text-sm text-gray-500">Task Management & Tracking</p>
              </div>
              <button
                onClick={onClose}
                className="bg-gray-100 hover:bg-gray-250 text-gray-600 rounded-full p-2 transition-all"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>
                       {/* Tabs Row */}
            <div className="flex border-b border-gray-200 mb-4">
              {["Today Task", "Weekly Task", "Monthly Task"].map((tab) => {
                const count = tasks.filter((t) => t.taskType === tab).length;
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 text-center text-xs font-bold transition-all border-b-2 ${
                      isActive
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200"
                    }`}
                  >
                    {tab === "Today Task" ? "Today Tasks" : tab === "Weekly Task" ? "Weekly Tasks" : "Monthly Tasks"} ({count})
                  </button>
                );
              })}
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-2 gap-3 mb-4 bg-gray-50 p-2.5 rounded-xl border border-gray-150">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">
                  Filter Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 bg-white font-medium text-gray-750"
                >
                  <option value="">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 mb-1 uppercase tracking-wider">
                  Filter Employee
                </label>
                <select
                  value={filterEmployee}
                  onChange={(e) => setFilterEmployee(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 bg-white font-medium text-gray-755"
                >
                  <option value="">All Employees</option>
                  {project?.assignedEmployees?.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-1">
                {(() => {
                  let filteredList = tasks.filter((t) => t.taskType === activeTab);
                  if (filterStatus) {
                    filteredList = filteredList.filter((t) => t.status === filterStatus);
                  }
                  if (filterEmployee) {
                    filteredList = filteredList.filter((t) => (t.employeeId?._id || t.employeeId) === filterEmployee);
                  }

                  if (filteredList.length === 0) {
                    return (
                      <div className="text-center py-12 text-gray-400">
                        <div className="text-4xl mb-2">📋</div>
                        <p className="font-medium text-xs">No tasks match your filters</p>
                      </div>
                    );
                  }
                  return (
                    <div className="space-y-3">
                      {filteredList.map((task) => (
                        <div
                          key={task._id}
                          className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="font-bold text-gray-800 text-sm">
                                {task.taskName}
                              </h5>
                              {task.description && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {task.description}
                                </p>
                              )}
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                              task.status === "Completed"
                                ? "bg-green-100 text-green-700 border-green-300"
                                : task.status === "In Progress"
                                ? "bg-blue-100 text-blue-700 border-blue-300"
                                : "bg-yellow-100 text-yellow-750 border-yellow-300"
                            }`}>
                              {task.status}
                            </span>
                          </div>

                           {task.clientFeedback && (
                             <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-800">
                               <strong>Client Feedback:</strong> {task.clientFeedback}
                             </div>
                           )}

                           {/* Feedback & Replies Thread */}
                           <div className="mt-3 pt-3 border-t border-gray-100 space-y-2">
                             <span className="text-xs font-bold text-gray-700 block">Feedback & Replies ({task.feedbacks?.length || 0})</span>
                             {task.feedbacks && task.feedbacks.length > 0 ? (
                               <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                                 {task.feedbacks.map((fb, idx) => (
                                   <div key={idx} className="bg-gray-50 border rounded p-1.5 text-[11px] space-y-1">
                                     <div className="flex justify-between items-center text-gray-500 font-semibold">
                                       <span className="flex items-center gap-1.5">
                                         <span className={`px-1 rounded-[3px] text-[9px] font-extrabold uppercase ${
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
                               <p className="text-xs text-gray-400 italic">No feedback or replies yet.</p>
                             )}

                             <div className="flex gap-1.5 mt-2">
                               <input
                                 type="text"
                                 placeholder="Type a feedback comment or reply..."
                                 value={newCommentInputs[task._id] || ""}
                                 onChange={(e) => setNewCommentInputs({
                                   ...newCommentInputs,
                                   [task._id]: e.target.value
                                 })}
                                 className="flex-1 px-2.5 py-1 border rounded text-xs focus:ring-1 focus:ring-indigo-500 bg-white"
                               />
                               <button
                                 type="button"
                                 onClick={() => handleAddComment(task._id)}
                                 className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-bold transition-all shadow-sm"
                               >
                                 Reply
                               </button>
                             </div>
                           </div>

                          {/* Task meta (Employee, Dates) */}
                          <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-[11px] text-gray-500">
                            <span className="flex items-center gap-1">
                              <FaUser className="text-gray-400" />
                              Assigned: {task.employeeId?.name || "N/A"}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaCalendarAlt className="text-gray-400" />
                              Created: {new Date(task.createdAt).toLocaleDateString()}
                            </span>
                            {task.completedAt && (
                              <span className="flex items-center gap-1 col-span-2 text-green-600 font-semibold">
                                <FaCheckCircle className="text-green-500" />
                                Completed: {new Date(task.completedAt).toLocaleString()}
                              </span>
                            )}
                          </div>

                          {/* Dropdown and Button for status update */}
                          <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50 p-2 rounded-lg">
                            <span className="text-[11px] font-medium text-gray-500">Change Status:</span>
                            <div className="flex items-center gap-2">
                              <select
                                value={taskStatusUpdates[task._id] !== undefined ? taskStatusUpdates[task._id] : task.status}
                                onChange={(e) => setTaskStatusUpdates({
                                  ...taskStatusUpdates,
                                  [task._id]: e.target.value
                                })}
                                className="px-2 py-1 border border-gray-200 rounded text-xs focus:ring-1 focus:ring-indigo-500 bg-white"
                              >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                              </select>
                              <button
                                type="button"
                                onClick={() => handleUpdateStatus(
                                  task._id,
                                  taskStatusUpdates[task._id] !== undefined ? taskStatusUpdates[task._id] : task.status
                                )}
                                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-semibold transition-all shadow-sm"
                              >
                                Update Status
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          <div className="pt-4 border-t text-center text-xs text-gray-400">
            Project Progress updates automatically with task status modifications.
          </div>
        </div>
        
      </div>
    </div>
  );
}
