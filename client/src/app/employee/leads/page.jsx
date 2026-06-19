"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { EMPLOYEE_API } from "@/config/api";
import { toast } from "react-toastify";
import { FaChartLine, FaSearch } from "react-icons/fa";
import MyLeadCard from "@/components/employee/leads/MyLeadCard";
import UpdateStatusModal from "@/components/employee/leads/UpdateStatusModal";
import AddNotesModal from "@/components/employee/leads/AddNotesModal";

export default function EmployeeLeadsPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMyLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, filterStatus, searchQuery]);

  const fetchMyLeads = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.MY_LEADS, {
        headers: { Authorization: `Bearer ${token}` },
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

  const filterLeads = () => {
    let filtered = [...leads];

    // Filter by status
    if (filterStatus) {
      filtered = filtered.filter((lead) => lead.leadStatus === filterStatus);
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (lead) =>
          lead.leadTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.contactNumber.includes(searchQuery)
      );
    }

    setFilteredLeads(filtered);
  };

  const handleUpdateStatus = async (leadId, status, notes) => {
    setSubmitting(true);
    const loadingToast = toast.loading("Updating lead status...");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        EMPLOYEE_API.UPDATE_MY_LEAD_STATUS(leadId),
        { status, notes },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.update(loadingToast, {
          render: "Lead status updated successfully! ✅",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        fetchMyLeads();
        setShowStatusModal(false);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.update(loadingToast, {
        render: error.response?.data?.message || "Failed to update status! ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddNotes = async (leadId, notes) => {
    setSubmitting(true);
    const loadingToast = toast.loading("Adding notes...");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        EMPLOYEE_API.ADD_LEAD_NOTES(leadId),
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
        fetchMyLeads();
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

  const openStatusModal = (lead) => {
    setSelectedLead(lead);
    setShowStatusModal(true);
  };

  const openNotesModal = (lead) => {
    setSelectedLead(lead);
    setShowNotesModal(true);
  };

  // Calculate stats
  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.leadStatus === "New").length,
    contacted: leads.filter((l) => l.leadStatus === "Contacted").length,
    qualified: leads.filter((l) => l.leadStatus === "Qualified").length,
    won: leads.filter((l) => l.leadStatus === "Won").length,
    lost: leads.filter((l) => l.leadStatus === "Lost").length,
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaChartLine className="text-indigo-600" />
          My Leads
        </h1>
        <p className="text-gray-600 mt-1">Manage your assigned leads</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm font-semibold opacity-90">Total Leads</h3>
          <p className="text-3xl font-bold mt-2">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm font-semibold opacity-90">New</h3>
          <p className="text-3xl font-bold mt-2">{stats.new}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm font-semibold opacity-90">Contacted</h3>
          <p className="text-3xl font-bold mt-2">{stats.contacted}</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm font-semibold opacity-90">Qualified</h3>
          <p className="text-3xl font-bold mt-2">{stats.qualified}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm font-semibold opacity-90">Won</h3>
          <p className="text-3xl font-bold mt-2">{stats.won}</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-sm font-semibold opacity-90">Lost</h3>
          <p className="text-3xl font-bold mt-2">{stats.lost}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setFilterStatus("")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === ""
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus("New")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === "New"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            New
          </button>
          <button
            onClick={() => setFilterStatus("Contacted")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === "Contacted"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Contacted
          </button>
          <button
            onClick={() => setFilterStatus("Qualified")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === "Qualified"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Qualified
          </button>
          <button
            onClick={() => setFilterStatus("Won")}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === "Won"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Won
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, client name, or number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => (
          <MyLeadCard
            key={lead._id}
            lead={lead}
            onUpdateStatus={openStatusModal}
            onAddNotes={openNotesModal}
          />
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <FaChartLine className="text-6xl mx-auto mb-4 opacity-30" />
          <p className="text-xl">No leads found</p>
        </div>
      )}

      {/* Update Status Modal */}
      <UpdateStatusModal
        show={showStatusModal}
        lead={selectedLead}
        submitting={submitting}
        onSubmit={handleUpdateStatus}
        onClose={() => setShowStatusModal(false)}
      />

      {/* Add Notes Modal */}
      <AddNotesModal
        show={showNotesModal}
        lead={selectedLead}
        submitting={submitting}
        onSubmit={handleAddNotes}
        onClose={() => setShowNotesModal(false)}
      />
    </div>
  );
}
