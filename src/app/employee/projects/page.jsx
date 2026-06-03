"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaSearch, FaComments } from "react-icons/fa";
import ProjectCard from "@/components/admin/projects/ProjectCard";
import ProjectChatModal from "@/components/admin/projects/ProjectChatModal";
import ProgressUpdateModal from "@/components/admin/projects/ProgressUpdateModal";
import { EMPLOYEE_API } from "@/config/api";


const EmployeeProjectTasksList = ({ projectId, onProgressChange }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
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

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;
      const employeeId = user?.id || user?._id;

      const res = await fetch(`${EMPLOYEE_API.GET_PROJECT_TASKS(projectId)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setTasks(data.data.filter(t => t.employeeId?._id === employeeId || t.employeeId === employeeId));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
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
        if (onProgressChange) onProgressChange();
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (expanded) {
      fetchTasks();
    }
  }, [expanded]);

  const getTaskTypeBadge = (type) => {
    switch (type) {
      case "Today Task":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Weekly Task":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Monthly Task":
        return "bg-pink-50 text-pink-700 border-pink-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left font-bold text-xs text-indigo-600 hover:text-indigo-850 flex items-center justify-between"
      >
        <span> My Project Tasks</span>
        <span>{expanded ? "▲" : "▼"}</span>
      </button>

      {expanded && (
        <div className="mt-2 space-y-2 bg-gray-55 p-2.5 rounded-lg border">
          {loading ? (
            <div className="text-center py-2 text-xs text-gray-500">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-2 text-xs text-gray-400">No tasks assigned to you on this project.</div>
          ) : (
            <div className="space-y-2">
              {tasks.map((task) => (
                <div key={task._id} className="bg-white p-2.5 rounded border shadow-sm text-xs">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-bold text-gray-800">{task.taskName}</span>
                        {task.taskType && (
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getTaskTypeBadge(task.taskType)}`}>
                            {task.taskType}
                          </span>
                        )}
                      </div>
                      {task.description && <p className="text-gray-500 mt-0.5 text-[11px]">{task.description}</p>}
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${task.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-750"
                        }`}
                    >
                      {task.status}
                    </span>
                  </div>
                  {task.clientFeedback && (
                    <p className="mt-1.5 bg-amber-50 p-1.5 rounded text-[10px] text-amber-800 border border-amber-200">
                      <strong>Client Feedback:</strong> {task.clientFeedback}
                    </p>
                  )}
                  {/* Feedback & Replies Thread */}
                  <div className="mt-2.5 pt-2.5 border-t border-gray-100 space-y-2">
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
                  {/* Dropdown and Button for status update */}
                  <div className="mt-2.5 pt-2.5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 bg-gray-50/50 p-1.5 rounded">
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
                        onClick={() => handleUpdateStatus(
                          task._id,
                          taskStatusUpdates[task._id] !== undefined ? taskStatusUpdates[task._id] : task.status
                        )}
                        className="px-2 py-0.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-bold transition-all shadow-sm"
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-[9px] text-gray-400 flex flex-wrap gap-x-2 border-t pt-1.5">
                    <span>Created: {new Date(task.createdAt).toLocaleString()}</span>
                    {task.completedAt && <span className="text-green-600 font-semibold">Completed: {new Date(task.completedAt).toLocaleString()}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function EmployeeProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showChatModal, setShowChatModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, activeTab, projects]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(EMPLOYEE_API.GET_EMPLOYEE_PROJECTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...projects];

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeTab === "ongoing") {
      filtered = filtered.filter((project) =>
        ["In Progress", "Testing", "Planning"].includes(project.status)
      );
    } else if (activeTab === "completed") {
      filtered = filtered.filter((project) => project.status === "Completed");
    } else if (activeTab === "pending") {
      filtered = filtered.filter((project) => project.status === "On Hold");
    }

    setFilteredProjects(filtered);
  };

  const handleOpenChat = (project) => {
    setSelectedProject(project);
    setShowChatModal(true);
  };

  const handleUpdateProgress = (project) => {
    setSelectedProject(project);
    setShowProgressModal(true);
  };

  const handleProgressSubmit = async (progress) => {
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        EMPLOYEE_API.UPDATE_PROJECT_PROGRESS(selectedProject._id),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ progress }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("✅ Progress updated successfully!");
        setShowProgressModal(false);
        fetchProjects();
      } else {
        toast.error(data.message || "Failed to update progress");
      }
    } catch (error) {
      console.error("Error updating progress:", error);
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Projects</h1>
          <p className="text-gray-600">Projects assigned to you</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-semibold opacity-90">Total Projects</h3>
            <p className="text-3xl font-bold mt-2">{projects.length}</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-semibold opacity-90">Ongoing / Active</h3>
            <p className="text-3xl font-bold mt-2">
              {projects.filter((p) => ["In Progress", "Testing", "Planning"].includes(p.status)).length}
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-semibold opacity-90">Completed</h3>
            <p className="text-3xl font-bold mt-2">
              {projects.filter((p) => p.status === "Completed").length}
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-semibold opacity-90">Pending / On Hold</h3>
            <p className="text-3xl font-bold mt-2">
              {projects.filter((p) => p.status === "On Hold").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Status Tab Pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all border ${activeTab === "all"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
              >
                All ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab("ongoing")}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all border ${activeTab === "ongoing"
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
              >
                Ongoing ({projects.filter((p) => ["In Progress", "Testing", "Planning"].includes(p.status)).length})
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all border ${activeTab === "completed"
                    ? "bg-green-600 text-white border-green-600 shadow-md shadow-green-100"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
              >
                Completed ({projects.filter((p) => p.status === "Completed").length})
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all border ${activeTab === "pending"
                    ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-100"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
              >
                Pending ({projects.filter((p) => p.status === "On Hold").length})
              </button>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Projects List */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Projects Found
            </h3>
            <p className="text-gray-600">
              {searchTerm || activeTab !== "all"
                ? "No projects match your filters"
                : "No projects assigned to you yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 border-indigo-500"
              >
                {/* Use simplified card for employee */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {project.projectName}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${project.status === "Completed"
                            ? "bg-green-100 text-green-700 border-green-300"
                            : project.status === "In Progress"
                              ? "bg-blue-100 text-blue-700 border-blue-300"
                              : "bg-gray-100 text-gray-700 border-gray-300"
                          }`}
                      >
                        {project.status}
                      </span>
                      {Array.isArray(project.category) ? (
                        project.category.map((cat, idx) => (
                          <span key={idx} className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                            {cat.name || cat}
                          </span>
                        ))
                      ) : project.category ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 border border-indigo-200">
                          {project.category.name || project.category}
                        </span>
                      ) : null}
                      {project.priority && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${
                            project.priority === "Urgent"
                              ? "bg-red-100 text-red-700 border-red-300 animate-pulse"
                              : project.priority === "High"
                                ? "bg-orange-100 text-orange-700 border-orange-300"
                                : project.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-750 border-yellow-300"
                                  : "bg-green-100 text-green-700 border-green-300"
                          }`}
                        >
                          {project.priority} Priority
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {project.description && (
                  <p className="text-gray-600 mb-4">{project.description}</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs text-gray-500 block mb-1">
                      Client
                    </span>
                    <span className="font-semibold text-gray-800">
                      {project.client?.name || "N/A"}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs text-gray-500 block mb-1">
                      Expected End
                    </span>
                    <span className="font-semibold text-gray-800">
                      {new Date(project.expectedEndDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Team Members */}
                {project.assignedEmployees && project.assignedEmployees.length > 0 && (
                  <div className="mb-4 bg-gray-50 p-3 rounded-lg">
                    <span className="text-xs text-gray-500 block mb-2 font-semibold">
                      Assigned Team Members
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.assignedEmployees.map((emp) => (
                        <span
                          key={emp._id}
                          className="px-2.5 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded text-xs font-semibold"
                        >
                          {emp.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      Progress
                    </span>
                    <span className="text-sm font-bold text-indigo-600">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <button
                    onClick={() => handleOpenChat(project)}
                    className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 font-semibold transition-all"
                  >
                    <FaComments /> Chat with Team
                  </button>
                </div>

                <EmployeeProjectTasksList
                  projectId={project._id}
                  onProgressChange={fetchProjects}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <ProjectChatModal
        show={showChatModal}
        project={selectedProject}
        onClose={() => setShowChatModal(false)}
      />

      <ProgressUpdateModal
        show={showProgressModal}
        project={selectedProject}
        submitting={submitting}
        onSubmit={handleProgressSubmit}
        onClose={() => setShowProgressModal(false)}
      />
    </div>
  );
}
