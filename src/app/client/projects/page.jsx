"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaSearch, FaComments, FaLink, FaCalendar } from "react-icons/fa";
import ProjectChatModal from "@/components/admin/projects/ProjectChatModal";
import { EMPLOYEE_API } from "@/config/api";

export default function ClientProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterStatus, projects]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(EMPLOYEE_API.GET_CLIENT_PROJECTS, {
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
      filtered = filtered.filter((project) =>
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus) {
      filtered = filtered.filter((project) => project.status === filterStatus);
    }

    setFilteredProjects(filtered);
  };

  const handleOpenChat = (project) => {
    setSelectedProject(project);
    setShowChatModal(true);
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
          <p className="text-gray-600">Track your project progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-semibold opacity-90">Total Projects</h3>
            <p className="text-3xl font-bold mt-2">{projects.length}</p>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-semibold opacity-90">In Progress</h3>
            <p className="text-3xl font-bold mt-2">
              {projects.filter((p) => p.status === "In Progress").length}
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-semibold opacity-90">Completed</h3>
            <p className="text-3xl font-bold mt-2">
              {projects.filter((p) => p.status === "Completed").length}
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-semibold opacity-90">Testing</h3>
            <p className="text-3xl font-bold mt-2">
              {projects.filter((p) => p.status === "Testing").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Status</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Testing">Testing</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
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
              {searchTerm || filterStatus
                ? "No projects match your filters"
                : "No projects available yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 border-indigo-500"
              >
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
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          project.priority === "Urgent"
                            ? "bg-red-500 text-white"
                            : project.priority === "High"
                            ? "bg-orange-500 text-white"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {project.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>

                {project.description && (
                  <p className="text-gray-600 mb-4">{project.description}</p>
                )}

                {/* Technologies */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-4">
                    <span className="text-xs text-gray-500 block mb-2">
                      Technologies
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
                    <FaCalendar className="text-gray-400" />
                    <div>
                      <span className="text-xs text-gray-500 block">
                        Start Date
                      </span>
                      <span className="font-semibold text-gray-800">
                        {new Date(project.startDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
                    <FaCalendar className="text-gray-400" />
                    <div>
                      <span className="text-xs text-gray-500 block">
                        Expected End
                      </span>
                      <span className="font-semibold text-gray-800">
                        {new Date(project.expectedEndDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live URL */}
                {project.liveUrl && (
                  <div className="bg-indigo-50 p-3 rounded-lg flex items-center gap-3 mb-4">
                    <FaLink className="text-indigo-600" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-gray-500 block">
                        Live URL
                      </span>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline truncate block"
                      >
                        {project.liveUrl}
                      </a>
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

                {/* Team */}
                {project.assignedEmployees &&
                  project.assignedEmployees.length > 0 && (
                    <div className="mb-4">
                      <span className="text-xs text-gray-500 block mb-2">
                        Team Members
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.assignedEmployees.map((emp) => (
                          <span
                            key={emp._id}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold"
                          >
                            {emp.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Chat Button */}
                <div className="pt-4 border-t">
                  <button
                    onClick={() => handleOpenChat(project)}
                    className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 font-semibold transition-all"
                  >
                    <FaComments /> Chat with Team
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Modal */}
      <ProjectChatModal
        show={showChatModal}
        project={selectedProject}
        onClose={() => setShowChatModal(false)}
      />
    </div>
  );
}
