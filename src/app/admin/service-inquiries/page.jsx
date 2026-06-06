"use client";

import { useState, useEffect } from "react";
import { BASE_URL, EMPLOYEE_API } from "@/config/api";
import {
  FaEnvelope,
  FaSearch,
  FaEye,
  FaTimes,
  FaCheckCircle,
  FaTimesCircle,
  FaPhone,
  FaUserCircle,
  FaProjectDiagram,
  FaClipboardList,
  FaTasks,
  FaUserTie,
} from "react-icons/fa";
import { toast } from "react-toastify";
import ManageTasksModal from "@/components/admin/projects/ManageTasksModal";

export default function ServiceInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [staffList, setStaffList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Client History States (Now Inline)
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState({
    client: null,
    projects: [],
    inquiries: [],
  });
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Tasks Modal States (Still modal as it's complex)
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    contacted: "bg-blue-100 text-blue-700",
    converted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
    fetchInquiries();
    fetchStaffList();
  }, []);

  useEffect(() => {
    let filtered = inquiries;

    if (searchTerm) {
      filtered = filtered.filter(
        (inquiry) =>
          inquiry.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.clientEmail
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          inquiry.serviceId?.serviceName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((inquiry) => inquiry.status === statusFilter);
    }

    setFilteredInquiries(filtered);
  }, [searchTerm, statusFilter, inquiries]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(EMPLOYEE_API.GET_ALL_INQUIRIES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setInquiries(data.data);
        setFilteredInquiries(data.data);
      }
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      toast.error("Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(EMPLOYEE_API.GET_ALL_STAFF, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setStaffList(data.data);
      }
    } catch (error) {
      console.error("Error fetching staff list:", error);
    }
  };

  const handleOpenModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setStatusUpdate(inquiry.status);
    setAdminNotes(inquiry.adminNotes || "");
    setAssignedTo(inquiry.assignedTo?._id || inquiry.assignedTo || "");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInquiry(null);
    setStatusUpdate("");
    setAdminNotes("");
    setAssignedTo("");
    setShowHistory(false);
    setHistoryData({ client: null, projects: [], inquiries: [] });
  };

  const handleViewClientHistory = async (clientId) => {
    if (!clientId) {
      toast.error("Client ID not found for this inquiry");
      return;
    }

    // If already showing, just hide it (Toggle)
    if (showHistory) {
      setShowHistory(false);
      return;
    }

    const targetId = clientId?._id || clientId;
    setLoadingHistory(true);
    setShowHistory(true);

    try {
      const token = localStorage.getItem("token");

      // 1. Fetch Client Details
      const clientsRes = await fetch(`${BASE_URL}/auth/clients`);
      const clientsData = await clientsRes.json();
      const client = clientsData.success
        ? clientsData.clients.find((c) => c._id === targetId)
        : null;

      // 2. Fetch Projects
      const projectsRes = await fetch(
        EMPLOYEE_API.GET_PROJECTS_BY_CLIENT_ID(targetId),
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const projectsData = await projectsRes.json();

      // 3. Fetch All Inquiries for this client
      const inquiriesRes = await fetch(
        `${EMPLOYEE_API.GET_ALL_INQUIRIES}?clientId=${targetId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const inquiriesData = await inquiriesRes.json();

      setHistoryData({
        client: client || {
          name: selectedInquiry.clientName,
          email: selectedInquiry.clientEmail,
          phone: selectedInquiry.clientPhone,
          createdAt:
            typeof selectedInquiry.clientId === "object"
              ? selectedInquiry.clientId?.createdAt
              : null,
        },
        projects: projectsData.success ? projectsData.data : [],
        inquiries: inquiriesData.success ? inquiriesData.data : [],
      });
    } catch (error) {
      console.error("Error fetching client history:", error);
      toast.error("Failed to load client history");
      setShowHistory(false);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!statusUpdate) {
      toast.error("Please select a status");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        EMPLOYEE_API.UPDATE_INQUIRY_STATUS(selectedInquiry._id),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: statusUpdate,
            adminNotes,
            assignedTo: assignedTo || null,
          }),
        },
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Inquiry updated successfully");
        fetchInquiries();
        handleCloseModal();
      } else {
        toast.error(data.message || "Failed to update inquiry");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <FaEnvelope className="text-blue-600" />
            Service Inquiries
          </h1>
          <p className="text-gray-600">
            Manage and respond to client inquiries
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {inquiries.filter((i) => i.status === "pending").length}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600">Contacted</p>
            <p className="text-2xl font-bold text-blue-600">
              {inquiries.filter((i) => i.status === "contacted").length}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600">Converted</p>
            <p className="text-2xl font-bold text-green-600">
              {inquiries.filter((i) => i.status === "converted").length}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm text-gray-600">Rejected</p>
            <p className="text-2xl font-bold text-red-600">
              {inquiries.filter((i) => i.status === "rejected").length}
            </p>
          </div>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Service
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Variant
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Assigned To
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No inquiries found</p>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <tr
                    key={inquiry._id}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {inquiry.clientName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {inquiry.clientEmail}
                        </p>
                        {inquiry.clientPhone && (
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <FaPhone className="text-xs" />
                            {inquiry.clientPhone}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        {inquiry.serviceId?.serviceName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {inquiry.serviceId?.category?.name ||
                          inquiry.serviceId?.category}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        {inquiry.variantName || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        ₹{inquiry.variantAmount?.toLocaleString("en-IN") || "0"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {inquiry.assignedTo ? (
                        <div className="flex items-center gap-2">
                          <FaUserTie className="text-blue-500" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {inquiry.assignedTo.name}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {inquiry.assignedTo.email}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">
                          Not Assigned
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          statusColors[inquiry.status]
                        }`}
                      >
                        {inquiry.status.charAt(0).toUpperCase() +
                          inquiry.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(inquiry.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleOpenModal(inquiry)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-semibold hover:bg-blue-200 transition-all"
                      >
                        <FaEye />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-2xl font-bold">Inquiry Details</h2>
              <button
                onClick={handleCloseModal}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Client Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Client Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p>
                    <span className="font-semibold text-gray-700">Name:</span>{" "}
                    {selectedInquiry.clientName}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Email:</span>{" "}
                    <a
                      href={`mailto:${selectedInquiry.clientEmail}`}
                      className="text-blue-600 hover:underline"
                    >
                      {selectedInquiry.clientEmail}
                    </a>
                  </p>
                  {selectedInquiry.clientPhone && (
                    <p>
                      <span className="font-semibold text-gray-700">
                        Phone:
                      </span>{" "}
                      <a
                        href={`tel:${selectedInquiry.clientPhone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedInquiry.clientPhone}
                      </a>
                    </p>
                  )}
                </div>
                {/* View Full History Toggle Button */}
                <button
                  onClick={() =>
                    handleViewClientHistory(selectedInquiry.clientId)
                  }
                  className={`w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold transition-all border-2 shadow-sm group ${
                    showHistory
                      ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                      : "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200"
                  }`}
                >
                  <FaUserCircle
                    className={`text-xl transition-transform ${showHistory ? "rotate-180" : "group-hover:scale-110"}`}
                  />
                  {showHistory
                    ? "Hide Client Profile & History"
                    : "View Full Client Profile & History"}
                </button>

                {/* Inline History Section */}
                {showHistory && (
                  <div className="mt-6 border-t-2 border-dashed border-gray-200 pt-6 animate-in slide-in-from-top duration-300">
                    {loadingHistory ? (
                      <div className="flex flex-col justify-center items-center py-12 gap-4 bg-gray-50 rounded-xl">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div>
                        <p className="text-gray-500 font-semibold animate-pulse">
                          Fetching Client Data...
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {/* Section 1: Client Details */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2 uppercase tracking-wide">
                            <FaUserCircle className="text-indigo-600" />
                            Personal Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                                Full Name
                              </p>
                              <p className="text-sm text-gray-900 font-semibold">
                                {historyData.client?.name || "N/A"}
                              </p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                                Email
                              </p>
                              <p className="text-sm text-blue-600 font-semibold truncate">
                                {historyData.client?.email || "N/A"}
                              </p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                                Member Since
                              </p>
                              <p className="text-sm text-gray-900 font-semibold">
                                {historyData.client?.createdAt
                                  ? new Date(
                                      historyData.client.createdAt,
                                    ).toLocaleDateString("en-IN", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : "N/A"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Section 2: Projects */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b pb-2 uppercase tracking-wide">
                            <FaProjectDiagram className="text-blue-600" />
                            Client Projects ({historyData.projects.length})
                          </h3>
                          {historyData.projects.length === 0 ? (
                            <div className="bg-white rounded-xl p-6 text-center border-2 border-dashed border-gray-200">
                              <p className="text-gray-500 text-sm">
                                No projects assigned yet.
                              </p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {historyData.projects.map((project) => (
                                <div
                                  key={project._id}
                                  className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-gray-900 text-sm">
                                      {project.projectName}
                                    </h4>
                                    <span
                                      className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                        project.status === "Completed"
                                          ? "bg-green-100 text-green-700"
                                          : "bg-blue-100 text-blue-700"
                                      }`}
                                    >
                                      {project.status}
                                    </span>
                                  </div>
                                  <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                      <span className="text-gray-500">
                                        Progress:
                                      </span>
                                      <span className="font-bold text-blue-600">
                                        {project.progress}%
                                      </span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1">
                                      <div
                                        className="bg-blue-600 h-1 rounded-full"
                                        style={{
                                          width: `${project.progress}%`,
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                  <div className="mt-3 pt-2 border-t flex justify-end">
                                    <button
                                      onClick={() => {
                                        setSelectedProject(project);
                                        setShowTasksModal(true);
                                      }}
                                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 rounded-md text-[10px] font-bold transition-all"
                                    >
                                      <FaTasks className="text-[9px]" />
                                      Tasks & Feedback
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Section 3: Inquiries */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b pb-2 uppercase tracking-wide">
                            <FaClipboardList className="text-purple-600" />
                            Service Inquiries ({historyData.inquiries.length})
                          </h3>
                          {historyData.inquiries.length === 0 ? (
                            <div className="bg-white rounded-xl p-6 text-center border-2 border-dashed border-gray-200">
                              <p className="text-gray-500 text-sm">
                                No inquiries found.
                              </p>
                            </div>
                          ) : (
                            <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto shadow-sm">
                              <table className="w-full text-left text-xs">
                                <thead className="bg-gray-50 border-b">
                                  <tr>
                                    <th className="px-3 py-2 font-bold text-gray-700">
                                      Service
                                    </th>
                                    <th className="px-3 py-2 font-bold text-gray-700 text-center">
                                      Amount
                                    </th>
                                    <th className="px-3 py-2 font-bold text-gray-700 text-center">
                                      Status
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y">
                                  {historyData.inquiries.map((inq) => (
                                    <tr
                                      key={inq._id}
                                      className="hover:bg-gray-50 transition-colors"
                                    >
                                      <td className="px-3 py-2">
                                        <p className="font-semibold text-gray-900 truncate max-w-[150px]">
                                          {inq.serviceId?.serviceName || "N/A"}
                                        </p>
                                        <p className="text-[10px] text-gray-500">
                                          {new Date(
                                            inq.createdAt,
                                          ).toLocaleDateString()}
                                        </p>
                                      </td>
                                      <td className="px-3 py-2 font-bold text-blue-600 text-center">
                                        ₹{inq.variantAmount?.toLocaleString()}
                                      </td>
                                      <td className="px-3 py-2 text-center">
                                        <span
                                          className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${
                                            inq.status === "pending"
                                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                              : inq.status === "converted"
                                                ? "bg-green-50 text-green-700 border-green-200"
                                                : "bg-blue-50 text-blue-700 border-blue-200"
                                          }`}
                                        >
                                          {inq.status}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Service Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Service Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p>
                    <span className="font-semibold text-gray-700">
                      Service:
                    </span>{" "}
                    {selectedInquiry.serviceId?.serviceName}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">
                      Variant:
                    </span>{" "}
                    {selectedInquiry.variantName || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Amount:</span>{" "}
                    ₹
                    {selectedInquiry.variantAmount?.toLocaleString("en-IN") ||
                      "0"}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Client Message
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedInquiry.message}</p>
                </div>
              </div>

              {/* Requirements */}
              {selectedInquiry.requirements && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Requirements
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      {selectedInquiry.requirements}
                    </p>
                  </div>
                </div>
              )}

              {/* Status Update */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Update Status
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={statusUpdate}
                      onChange={(e) => setStatusUpdate(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Admin Notes
                    </label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add notes about this inquiry..."
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {currentUser?.role === "admin" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Assign to Staff
                      </label>
                      <select
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select Staff</option>
                        {staffList.map((staff) => (
                          <option key={staff._id} value={staff._id}>
                            {staff.name} ({staff.email})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStatus}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tasks Modal */}
      {showTasksModal && selectedProject && (
        <ManageTasksModal
          show={showTasksModal}
          onClose={() => {
            setShowTasksModal(false);
            setSelectedProject(null);
          }}
          project={selectedProject}
          onRefreshProject={() => {
            if (historyData.client?._id) {
              handleViewClientHistory(historyData.client._id);
            }
          }}
        />
      )}
    </div>
  );
}
