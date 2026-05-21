"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaSearch, FaFilter } from "react-icons/fa";
import ProjectStats from "@/components/admin/projects/ProjectStats";
import ProjectCard from "@/components/admin/projects/ProjectCard";
import ProjectFormModal from "@/components/admin/projects/ProjectFormModal";
import AssignEmployeeModal from "@/components/admin/projects/AssignEmployeeModal";
import ProjectChatModal from "@/components/admin/projects/ProjectChatModal";
import ProgressUpdateModal from "@/components/admin/projects/ProgressUpdateModal";
import { EMPLOYEE_API, BASE_URL } from "@/config/api";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [clients, setClients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  // Modals
  const [showFormModal, setShowFormModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedProject, setSelectedProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    category: "",
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
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterStatus, filterCategory, filterPriority, projects]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Fetch projects
      const projectsRes = await fetch(EMPLOYEE_API.GET_ALL_PROJECTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

      if (projectsData.success) setProjects(projectsData.data);
      if (statsData.success) setStats(statsData.data);
      if (clientsData.success) setClients(clientsData.clients);
      if (employeesData.success) setEmployees(employeesData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
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
          project.client?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus) {
      filtered = filtered.filter((project) => project.status === filterStatus);
    }

    // Category filter
    if (filterCategory) {
      filtered = filtered.filter((project) => project.category === filterCategory);
    }

    // Priority filter
    if (filterPriority) {
      filtered = filtered.filter((project) => project.priority === filterPriority);
    }

    setFilteredProjects(filtered);
  };

  const handleAddProject = () => {
    setModalMode("add");
    setSelectedProject(null);
    setFormData({
      projectName: "",
      description: "",
      category: "",
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
      category: project.category,
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
          `✅ Project ${modalMode === "add" ? "created" : "updated"} successfully!`
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
        }
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
        fetchAllData();
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Project Management
          </h1>
          <p className="text-gray-600">Manage all ongoing projects</p>
        </div>

        {/* Stats */}
        <ProjectStats stats={stats} />

        {/* Filters & Search */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Status Filter */}
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

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App">Mobile App</option>
              <option value="E-commerce">E-commerce</option>
              <option value="CMS">CMS</option>
              <option value="Custom Software">Custom Software</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="SEO">SEO</option>
              <option value="Other">Other</option>
            </select>

            {/* Priority Filter */}
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddProject}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all flex items-center gap-2"
            >
              <FaPlus /> Add New Project
            </button>
            {(searchTerm || filterStatus || filterCategory || filterPriority) && (
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
            {!searchTerm && !filterStatus && !filterCategory && !filterPriority && (
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
