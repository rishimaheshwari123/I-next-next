"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { EMPLOYEE_API } from "@/config/api";
import { toast } from "react-toastify";
import { FaChartLine, FaPlus } from "react-icons/fa";
import LeadStats from "@/components/admin/leads/LeadStats";
import LeadFilters from "@/components/admin/leads/LeadFilters";
import LeadCard from "@/components/admin/leads/LeadCard";
import LeadFormModal from "@/components/admin/leads/LeadFormModal";
import LeadViewModal from "@/components/admin/leads/LeadViewModal";
import AdminAddNotesModal from "@/components/admin/leads/AdminAddNotesModal";

export default function LeadsPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedLead, setSelectedLead] = useState(null);

  const [filters, setFilters] = useState({
    status: "",
    source: "",
    type: "",
    priority: "",
    search: "",
  });

  const [formData, setFormData] = useState({
    leadTitle: "",
    clientName: "",
    contactNumber: "",
    email: "",
    leadSource: "",
    leadType: "",
    description: "",
    budget: "",
    priority: "Medium",
    leadStatus: "New",
    assignedTo: "",
    expectedClosingDate: "",
    followUpDate: "",
    remarks: "",
  });

  useEffect(() => {
    fetchLeads();
    fetchStats();
    fetchEmployees();
  }, [filters]);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");
      const params = {};

      if (filters.status) params.status = filters.status;
      if (filters.source) params.source = filters.source;
      if (filters.type) params.type = filters.type;
      if (filters.priority) params.priority = filters.priority;
      if (filters.search) params.search = filters.search;

      const response = await axios.get(EMPLOYEE_API.GET_ALL_LEADS, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      if (response.data.success) {
        setLeads(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.GET_LEAD_STATS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.GET_ALL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setEmployees(response.data.data.filter((emp) => emp.isActive));
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const loadingToast = toast.loading(
      modalMode === "add" ? "Creating lead..." : "Updating lead..."
    );

    try {
      const token = localStorage.getItem("token");
      const submitData = { ...formData };

      // Remove empty fields
      Object.keys(submitData).forEach((key) => {
        if (submitData[key] === "") {
          delete submitData[key];
        }
      });

      if (modalMode === "add") {
        const response = await axios.post(
          EMPLOYEE_API.CREATE_LEAD,
          submitData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          toast.update(loadingToast, {
            render: "Lead created successfully! 🎉",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          fetchLeads();
          fetchStats();
          setShowFormModal(false);
          resetForm();
        }
      } else if (modalMode === "edit") {
        const response = await axios.put(
          EMPLOYEE_API.UPDATE_LEAD(selectedLead._id),
          submitData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          toast.update(loadingToast, {
            render: "Lead updated successfully! ✅",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          fetchLeads();
          fetchStats();
          setShowFormModal(false);
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.update(loadingToast, {
        render: error.response?.data?.message || "Operation failed! ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    const loadingToast = toast.loading("Deleting lead...");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(EMPLOYEE_API.DELETE_LEAD(id), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        toast.update(loadingToast, {
          render: "Lead deleted successfully! 🗑️",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        fetchLeads();
        fetchStats();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.update(loadingToast, {
        render: "Failed to delete lead! ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleAddNotes = async (leadId, notes) => {
    setSubmitting(true);
    const loadingToast = toast.loading("Adding notes...");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        EMPLOYEE_API.ADD_ADMIN_NOTES(leadId),
        { notes },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.update(loadingToast, {
          render: "Notes added successfully! 📝",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        fetchLeads();
        setShowNotesModal(false);
      }
    } catch (error) {
      console.error("Error adding notes:", error);
      toast.update(loadingToast, {
        render: error.response?.data?.message || "Failed to add notes! ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const openFormModal = (mode, lead = null) => {
    setModalMode(mode);
    setSelectedLead(lead);

    if (mode === "edit" && lead) {
      setFormData({
        leadTitle: lead.leadTitle || "",
        clientName: lead.clientName || "",
        contactNumber: lead.contactNumber || "",
        email: lead.email || "",
        leadSource: lead.leadSource || "",
        leadType: lead.leadType || "",
        description: lead.description || "",
        budget: lead.budget || "",
        priority: lead.priority || "Medium",
        leadStatus: lead.leadStatus || "New",
        assignedTo: lead.assignedTo?._id || "",
        expectedClosingDate: lead.expectedClosingDate?.split("T")[0] || "",
        followUpDate: lead.followUpDate?.split("T")[0] || "",
        remarks: lead.remarks || "",
      });
    } else {
      resetForm();
    }

    setShowFormModal(true);
  };

  const openViewModal = (lead) => {
    setSelectedLead(lead);
    setShowViewModal(true);
  };

  const openNotesModal = (lead) => {
    setSelectedLead(lead);
    setShowNotesModal(true);
  };

  const resetForm = () => {
    setFormData({
      leadTitle: "",
      clientName: "",
      contactNumber: "",
      email: "",
      leadSource: "",
      leadType: "",
      description: "",
      budget: "",
      priority: "Medium",
      leadStatus: "New",
      assignedTo: "",
      expectedClosingDate: "",
      followUpDate: "",
      remarks: "",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaChartLine className="text-indigo-600" />
            Lead Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and track your sales leads
          </p>
        </div>
        <button
          onClick={() => openFormModal("add")}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <FaPlus /> Create Lead
        </button>
      </div>

      {/* Stats */}
      <LeadStats stats={stats} />

      {/* Filters */}
      <LeadFilters filters={filters} setFilters={setFilters} />

      {/* Leads List */}
      <div className="space-y-4">
        {leads.map((lead) => (
          <LeadCard
            key={lead._id}
            lead={lead}
            onEdit={(lead) => openFormModal("edit", lead)}
            onDelete={handleDelete}
            onView={openViewModal}
            onAddNotes={openNotesModal}
          />
        ))}
      </div>

      {leads.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FaChartLine className="text-6xl mx-auto mb-4 opacity-30" />
          <p className="text-xl">No leads found</p>
        </div>
      )}

      {/* Form Modal */}
      <LeadFormModal
        show={showFormModal}
        mode={modalMode}
        formData={formData}
        setFormData={setFormData}
        employees={employees}
        submitting={submitting}
        onSubmit={handleSubmit}
        onClose={() => {
          setShowFormModal(false);
          resetForm();
        }}
      />

      {/* View Modal */}
      <LeadViewModal
        show={showViewModal}
        lead={selectedLead}
        onClose={() => setShowViewModal(false)}
      />

      {/* Add Notes Modal */}
      <AdminAddNotesModal
        show={showNotesModal}
        lead={selectedLead}
        submitting={submitting}
        onSubmit={handleAddNotes}
        onClose={() => setShowNotesModal(false)}
      />
    </div>
  );
}
