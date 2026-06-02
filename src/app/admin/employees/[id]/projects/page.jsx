"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaBriefcase,
  FaSearch,
  FaCalendar,
  FaUser,
  FaExclamationCircle,
  FaSpinner,
  FaEnvelope,
  FaUserTag,
  FaBuilding,
  FaCheckCircle,
  FaPlayCircle,
  FaPauseCircle,
} from "react-icons/fa";
import { EMPLOYEE_API } from "@/config/api";

export default function EmployeeProjectsPage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params.id;

  const [employee, setEmployee] = useState(null);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'ongoing', 'completed', 'pending'

  useEffect(() => {
    if (employeeId) {
      fetchData();
    }
  }, [employeeId]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, activeTab, projects]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // 1. Fetch employee details
      const empResponse = await axios.get(EMPLOYEE_API.GET_BY_ID(employeeId), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (empResponse.data.success) {
        setEmployee(empResponse.data.data);
      } else {
        toast.error("Failed to load employee profile");
      }

      // 2. Fetch all projects
      const projectsRes = await fetch(EMPLOYEE_API.GET_ALL_PROJECTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const projectsData = await projectsRes.json();

      if (projectsData.success) {
        // Filter projects assigned to this specific employee
        const assignedProjects = projectsData.data.filter((project) =>
          project.assignedEmployees?.some(
            (emp) => (emp._id === employeeId || emp === employeeId)
          )
        );
        setProjects(assignedProjects);
      } else {
        toast.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Something went wrong while loading data");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...projects];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.client?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.technologies?.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Tab-based status filter
    if (activeTab === "ongoing") {
      // Ongoing includes: In Progress, Testing, Planning
      filtered = filtered.filter((project) =>
        ["In Progress", "Testing", "Planning"].includes(project.status)
      );
    } else if (activeTab === "completed") {
      filtered = filtered.filter((project) => project.status === "Completed");
    } else if (activeTab === "pending") {
      // Pending includes: On Hold
      filtered = filtered.filter((project) => project.status === "On Hold");
    }

    setFilteredProjects(filtered);
  };

  // Helper calculation for Stats
  const getStats = () => {
    const total = projects.length;
    const completed = projects.filter((p) => p.status === "Completed").length;
    const ongoing = projects.filter((p) =>
      ["In Progress", "Testing", "Planning"].includes(p.status)
    ).length;
    const pending = projects.filter((p) => p.status === "On Hold").length;

    return { total, completed, ongoing, pending };
  };

  const stats = getStats();

  const getStatusBadge = (status) => {
    switch (status) {
      case "Planning":
        return (
          <span className="px-3 py-1 bg-purple-100 text-purple-700 border border-purple-300 rounded-full text-xs font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
            Planning
          </span>
        );
      case "In Progress":
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-300 rounded-full text-xs font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Ongoing
          </span>
        );
      case "Testing":
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded-full text-xs font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
            Testing
          </span>
        );
      case "Completed":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 border border-green-300 rounded-full text-xs font-semibold flex items-center gap-1">
            <FaCheckCircle className="text-green-500 text-xs" />
            Completed
          </span>
        );
      case "On Hold":
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 border border-red-300 rounded-full text-xs font-semibold flex items-center gap-1">
            <FaPauseCircle className="text-red-500 text-xs" />
            On Hold / Pending
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 border border-gray-300 rounded-full text-xs font-semibold">
            {status}
          </span>
        );
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-500 text-white";
      case "High":
        return "bg-orange-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-gray-800";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh]">
        <FaSpinner className="animate-spin text-5xl text-cyan-600 mb-4" />
        <p className="text-gray-600 font-semibold">Fetching Employee Projects...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation Header */}
      <button
        onClick={() => router.push("/admin/employees")}
        className="flex items-center gap-2 mb-6 px-4 py-2 text-gray-700 hover:text-cyan-600 transition-all font-semibold"
      >
        <FaArrowLeft /> Back to Employees
      </button>

      {/* Employee Profile Card */}
      {employee && (
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 transition-all hover:shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
              {employee.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-extrabold text-gray-800 flex items-center justify-center md:justify-start gap-3">
                {employee.name}
                <span className="text-sm font-semibold text-cyan-600 px-3 py-1 bg-cyan-50 rounded-full border border-cyan-200">
                  {employee.employeeId}
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-gray-600">
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <FaUserTag className="text-cyan-500" />
                  <strong>Designation:</strong> {employee.designation}
                </p>
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <FaBuilding className="text-cyan-500" />
                  <strong>Department:</strong> {employee.department}
                </p>
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <FaEnvelope className="text-cyan-500" />
                  <strong>Email:</strong> {employee.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-2xl shadow-lg transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium opacity-90">Total Assigned Projects</h3>
              <p className="text-4xl font-extrabold mt-2">{stats.total}</p>
            </div>
            <FaBriefcase className="text-3xl opacity-30" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white p-6 rounded-2xl shadow-lg transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium opacity-90">Ongoing / Active</h3>
              <p className="text-4xl font-extrabold mt-2">{stats.ongoing}</p>
            </div>
            <FaPlayCircle className="text-3xl opacity-30" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-2xl shadow-lg transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium opacity-90">Completed</h3>
              <p className="text-4xl font-extrabold mt-2">{stats.completed}</p>
            </div>
            <FaCheckCircle className="text-3xl opacity-30" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-rose-500 to-red-500 text-white p-6 rounded-2xl shadow-lg transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium opacity-90">Pending / On Hold</h3>
              <p className="text-4xl font-extrabold mt-2">{stats.pending}</p>
            </div>
            <FaPauseCircle className="text-3xl opacity-30" />
          </div>
        </div>
      </div>

      {/* Filter and Search Box */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
          {/* Status Tab Pills */}
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all border ${
                activeTab === "all"
                  ? "bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-100"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
            >
              All Projects ({stats.total})
            </button>
            <button
              onClick={() => setActiveTab("ongoing")}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all border ${
                activeTab === "ongoing"
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
            >
              Ongoing ({stats.ongoing})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all border ${
                activeTab === "completed"
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-100"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
            >
              Completed ({stats.completed})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all border ${
                activeTab === "pending"
                  ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-100"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
              }`}
            >
              Pending / On Hold ({stats.pending})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:max-w-md">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by project name, tech, client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all text-sm shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Projects List Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-16 text-center border border-gray-100">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Projects Found</h3>
          <p className="text-gray-500">
            {searchTerm
              ? "Try adjusting your search terms or filters"
              : "No projects exist under the selected tab for this employee"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const isOverdue =
              new Date(project.expectedEndDate) < new Date() &&
              project.status !== "Completed";

            return (
              <div
                key={project._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 border-cyan-500 border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-850 line-clamp-1 mb-2 hover:text-cyan-600 transition-colors">
                        {project.projectName}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {getStatusBadge(project.status)}
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getPriorityBadge(
                            project.priority
                          )}`}
                        >
                          {project.priority} Priority
                        </span>
                        {isOverdue && (
                          <span className="flex items-center gap-1 px-2.5 py-0.5 bg-rose-100 text-rose-700 rounded-full text-xs font-bold border border-rose-300 animate-pulse">
                            <FaExclamationCircle /> Overdue
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Description */}
                  {project.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  )}

                  {/* Details block */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      <span className="text-xs text-gray-500 block mb-0.5 font-medium">
                        Category
                      </span>
                      <span className="text-sm font-semibold text-gray-800">
                        {project.category || "N/A"}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      <span className="text-xs text-gray-500 block mb-0.5 font-medium">
                        Project Type
                      </span>
                      <span className="text-sm font-semibold text-gray-800">
                        {project.projectType || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Client & Date Details */}
                  <div className="bg-cyan-50/50 border border-cyan-100/50 p-3 rounded-xl flex items-center gap-3 mb-4">
                    <FaUser className="text-cyan-500" />
                    <div>
                      <span className="text-xs text-gray-500 block font-medium">
                        Client Partner
                      </span>
                      <span className="text-sm font-bold text-gray-800">
                        {project.client?.name || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Timeline block */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <FaCalendar className="text-gray-400" />
                      <span>
                        <strong>Start:</strong>{" "}
                        {new Date(project.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <FaCalendar className="text-gray-400" />
                      <span className={isOverdue ? "text-rose-600 font-semibold" : ""}>
                        <strong>End:</strong>{" "}
                        {new Date(project.expectedEndDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Technologies Tags */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-0.5 bg-gray-100 hover:bg-cyan-100 hover:text-cyan-700 transition-colors text-gray-700 rounded text-xs font-semibold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-700">Project Progress</span>
                    <span className="text-xs font-extrabold text-cyan-600">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
