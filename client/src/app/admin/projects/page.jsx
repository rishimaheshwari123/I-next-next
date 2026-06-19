"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import ProjectStats from "@/components/admin/projects/ProjectStats";
import ProjectCard from "@/components/admin/projects/ProjectCard";
import ProjectFormModal from "@/components/admin/projects/ProjectFormModal";
import AssignEmployeeModal from "@/components/admin/projects/AssignEmployeeModal";
import ProjectChatModal from "@/components/admin/projects/ProjectChatModal";
import ManageTasksModal from "@/components/admin/projects/ManageTasksModal";
import { EMPLOYEE_API, BASE_URL } from "@/config/api";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [customLimit, setCustomLimit] = useState("");

  // Modals
  const [showFormModal, setShowFormModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedProject, setSelectedProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    category: [],
    projectType: "",
    technologies: [],
    startDate: "",
    expectedEndDate: "",
    client: "",
    liveUrl: "",
    budget: "",
    priority: "Medium",
    status: "Planning",
  });

  useEffect(() => {
    fetchAllData();
  }, [
    currentPage,
    limit,
    activeSearch,
    filterStatus,
    filterCategory,
    filterPriority,
  ]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Fetch projects with pagination and backend search
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: limit,
        search: activeSearch,
        status: filterStatus,
        category: filterCategory,
        priority: filterPriority,
      });

      const projectsRes = await fetch(
        `${EMPLOYEE_API.GET_ALL_PROJECTS}?${queryParams}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const projectsData = await projectsRes.json();

      // Fetch stats
      const statsRes = await fetch(EMPLOYEE_API.GET_PROJECT_STATS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const statsData = await statsRes.json();

      // Fetch clients
      const clientsRes = await fetch(`${BASE_URL}/auth/clients`);
      const clientsData = await clientsRes.json();

      // Fetch employees
      const employeesRes = await fetch(EMPLOYEE_API.GET_ALL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const employeesData = await employeesRes.json();

      // Fetch categories
      const categoriesRes = await fetch(EMPLOYEE_API.GET_ALL_CATEGORIES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const categoriesData = await categoriesRes.json();

      if (projectsData.success) {
        setProjects(projectsData.data);
        setFilteredProjects(projectsData.data);
        setTotalPages(projectsData.totalPages);
        setTotalProjects(projectsData.total);
      }
      if (statsData.success) setStats(statsData.data);
      if (clientsData.success) setClients(clientsData.clients);
      if (employeesData.success) setEmployees(employeesData.data);
      if (categoriesData.success) setCategories(categoriesData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setActiveSearch(searchTerm);
  };

  const applyFilters = () => {
    // This is now handled by the backend through useEffect dependencies
    setCurrentPage(1);
  };

  const handleLimitChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setLimit(10); // Default to 10 when switching to custom
      setCustomLimit("10");
    } else {
      setLimit(parseInt(value));
      setCustomLimit("");
    }
    setCurrentPage(1);
  };

  const handleCustomLimitSubmit = (e) => {
    e.preventDefault();
    const val = parseInt(customLimit);
    if (val > 0) {
      setLimit(val);
      setCurrentPage(1);
    }
  };

  const handleAddProject = () => {
    setModalMode("add");
    setSelectedProject(null);
    setFormData({
      projectName: "",
      description: "",
      category: [],
      projectType: "",
      technologies: [],
      startDate: "",
      expectedEndDate: "",
      client: "",
      liveUrl: "",
      budget: "",
      priority: "Medium",
      status: "Planning",
    });
    setShowFormModal(true);
  };

  const handleEditProject = (project) => {
    setModalMode("edit");
    setSelectedProject(project);

    // Ensure technologies is always an array
    const technologies = Array.isArray(project.technologies)
      ? project.technologies
      : [];

    setFormData({
      projectName: project.projectName,
      description: project.description || "",
      category: Array.isArray(project.category)
        ? project.category.map((c) => c._id || c)
        : project.category
          ? [project.category._id || project.category]
          : [],
      projectType: project.projectType,
      technologies: technologies,
      startDate: project.startDate.split("T")[0],
      expectedEndDate: project.expectedEndDate.split("T")[0],
      client: project.client._id,
      liveUrl: project.liveUrl || "",
      budget: project.budget || "",
      priority: project.priority,
      status: project.status,
    });
    setShowFormModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Debug: Log formData to see what's being sent
    console.log("Submitting formData:", formData);
    console.log("Technologies:", formData.technologies);

    try {
      const token = localStorage.getItem("token");
      const url =
        modalMode === "add"
          ? EMPLOYEE_API.CREATE_PROJECT
          : EMPLOYEE_API.UPDATE_PROJECT(selectedProject._id);
      const method = modalMode === "add" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          `✅ Project ${modalMode === "add" ? "created" : "updated"} successfully!`,
        );
        setShowFormModal(false);
        fetchAllData();
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const loadingToast = toast.loading("Deleting project...");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(EMPLOYEE_API.DELETE_PROJECT(id), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        toast.update(loadingToast, {
          render: "🗑️ Project deleted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        fetchAllData();
      } else {
        toast.update(loadingToast, {
          render: data.message || "Failed to delete project",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.update(loadingToast, {
        render: "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleAssignEmployees = (project) => {
    setSelectedProject(project);
    setShowAssignModal(true);
  };

  const handleAssignSubmit = async (employeeIds) => {
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        EMPLOYEE_API.ASSIGN_EMPLOYEES_PROJECT(selectedProject._id),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ employeeIds }),
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success("✅ Employees assigned successfully!");
        setShowAssignModal(false);
        fetchAllData();
      } else {
        toast.error(data.message || "Failed to assign employees");
      }
    } catch (error) {
      console.error("Error assigning employees:", error);
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenChat = (project) => {
    setSelectedProject(project);
    setShowChatModal(true);
  };

  const handleUpdateProgress = (project) => {
    setSelectedProject(project);
    setShowTasksModal(true);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterStatus("");
    setFilterCategory("");
    setFilterPriority("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-semibold">
            Loading projects...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Project Management
          </h1>
          <p className="text-gray-600">Manage all ongoing projects</p>
        </div>

        {/* Stats */}
        <ProjectStats stats={stats} />

        {/* Filters & Search */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <form
              onSubmit={handleSearch}
              className="flex-1 relative flex gap-2"
            >
              <div className="relative flex-1">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md flex items-center gap-2"
              >
                <FaSearch /> Search
              </button>
            </form>

            <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
              <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl shadow-sm">
                <FaFilter className="text-gray-400 text-sm" />
                <select
                  value={filterStatus}
                  onChange={(e) => {
                    setFilterStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent text-sm font-semibold outline-none min-w-[120px]"
                >
                  <option value="">All Status</option>
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Testing">Testing</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl shadow-sm">
                <select
                  value={filterCategory}
                  onChange={(e) => {
                    setFilterCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent text-sm font-semibold outline-none min-w-[120px]"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl shadow-sm">
                <select
                  value={filterPriority}
                  onChange={(e) => {
                    setFilterPriority(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent text-sm font-semibold outline-none min-w-[120px]"
                >
                  <option value="">All Priorities</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddProject}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all flex items-center gap-2"
            >
              <FaPlus /> Add New Project
            </button>
            {(searchTerm ||
              filterStatus ||
              filterCategory ||
              filterPriority) && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold transition-all"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Projects List */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Projects Found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus || filterCategory || filterPriority
                ? "No projects match your filters"
                : "Get started by creating your first project"}
            </p>
            {!searchTerm &&
              !filterStatus &&
              !filterCategory &&
              !filterPriority && (
                <button
                  onClick={handleAddProject}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all"
                >
                  Create First Project
                </button>
              )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onAssign={handleAssignEmployees}
                onChat={handleOpenChat}
                onUpdateProgress={handleUpdateProgress}
              />
            ))}
          </div>
        )}

        {/* Pagination & Limit Control */}
        {!loading && projects.length > 0 && (
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-500">Show:</span>
                <select
                  value={
                    limit === 10 || limit === 50 || limit === 100
                      ? limit
                      : "custom"
                  }
                  onChange={handleLimitChange}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="10">10</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              {((limit !== 10 && limit !== 50 && limit !== 100) ||
                customLimit !== "") && (
                <form
                  onSubmit={handleCustomLimitSubmit}
                  className="flex items-center gap-2"
                >
                  <input
                    type="number"
                    placeholder="Limit"
                    value={customLimit}
                    onChange={(e) => setCustomLimit(e.target.value)}
                    className="w-20 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                    min="1"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              <span className="text-sm text-gray-400 font-medium ml-2">
                Total:{" "}
                <span className="font-bold text-gray-700">{totalProjects}</span>{" "}
                projects
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <FaChevronLeft />
              </button>

              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Only show current page, first, last, and pages around current
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-xl font-bold transition-all ${
                          currentPage === pageNum
                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                            : "text-gray-500 hover:bg-gray-50 border border-transparent"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return (
                      <span key={pageNum} className="px-1 text-gray-300">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ProjectFormModal
        show={showFormModal}
        mode={modalMode}
        formData={formData}
        setFormData={setFormData}
        submitting={submitting}
        onSubmit={handleFormSubmit}
        onClose={() => setShowFormModal(false)}
        clients={clients}
        categories={categories}
      />

      <AssignEmployeeModal
        show={showAssignModal}
        project={selectedProject}
        employees={employees}
        submitting={submitting}
        onSubmit={handleAssignSubmit}
        onClose={() => setShowAssignModal(false)}
      />

      <ProjectChatModal
        show={showChatModal}
        project={selectedProject}
        onClose={() => setShowChatModal(false)}
      />

      <ManageTasksModal
        show={showTasksModal}
        project={selectedProject}
        onClose={() => setShowTasksModal(false)}
        onRefreshProject={fetchAllData}
      />
    </div>
  );
}
