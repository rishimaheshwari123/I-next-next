"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaSearch, FaComments } from "react-icons/fa";
import ProjectCard from "@/components/admin/projects/ProjectCard";
import ProjectChatModal from "@/components/admin/projects/ProjectChatModal";
import ProgressUpdateModal from "@/components/admin/projects/ProgressUpdateModal";
import { EMPLOYEE_API } from "@/config/api";

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
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all border ${
                  activeTab === "all"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                All ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab("ongoing")}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all border ${
                  activeTab === "ongoing"
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                Ongoing ({projects.filter((p) => ["In Progress", "Testing", "Planning"].includes(p.status)).length})
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all border ${
                  activeTab === "completed"
                    ? "bg-green-600 text-white border-green-600 shadow-md shadow-green-100"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                Completed ({projects.filter((p) => p.status === "Completed").length})
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all border ${
                  activeTab === "pending"
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
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          project.status === "Completed"
                            ? "bg-green-100 text-green-700 border-green-300"
                            : project.status === "In Progress"
                            ? "bg-blue-100 text-blue-700 border-blue-300"
                            : "bg-gray-100 text-gray-700 border-gray-300"
                        }`}
                      >
                        {project.status}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                        {project.category}
                      </span>
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
                    onClick={() => handleUpdateProgress(project)}
                    className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 font-semibold transition-all"
                  >
                    Update Progress
                  </button>
                  <button
                    onClick={() => handleOpenChat(project)}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 font-semibold transition-all"
                  >
                    <FaComments /> Chat
                  </button>
                </div>
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
