"use client";
import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaUser,
  FaCalendar,
  FaTrash,
  FaEye,
  FaSearch,
  FaBriefcase,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaGlobe,
  FaShareAlt,
  FaChartLine,
  FaHandshake,
  FaDollarSign,
  FaListUl,
} from "react-icons/fa";

const DetailItem = ({ label, value }) => {
  if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) return null;
  
  return (
    <div className="bg-gray-50/50 hover:bg-gray-50 p-3 rounded-xl border border-gray-100 transition-colors duration-150">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">
        {label}
      </span>
      <div className="text-sm font-medium text-gray-900 leading-relaxed">
        {Array.isArray(value) ? (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {value.map((item, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-md text-xs font-semibold border border-blue-100"
              >
                {item}
              </span>
            ))}
          </div>
        ) : (
          value
        )}
      </div>
    </div>
  );
};
import { BASE_URL } from "@/config/api";
import { getCurrentUser } from "@/utils/permissions";
import { toast } from "react-toastify";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  
  const [currentUser, setCurrentUser] = useState(null);
  const [staffList, setStaffList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [noteText, setNoteText] = useState("");

  const [tempStatus, setTempStatus] = useState("");
  const [tempAssignedTo, setTempAssignedTo] = useState("");
  const [tempAssignedToModel, setTempAssignedToModel] = useState("");

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    fetchContacts();

    if (user && user.role === 'admin' && !user.isStaff) {
      fetchStaffAndEmployees();
    }
  }, []);

  useEffect(() => {
    if (selectedContact) {
      setTempStatus(selectedContact.status || "new");
      setTempAssignedTo(selectedContact.assignedTo?._id || selectedContact.assignedTo || "");
      setTempAssignedToModel(selectedContact.assignedToModel || "");
    } else {
      setTempStatus("");
      setTempAssignedTo("");
      setTempAssignedToModel("");
    }
  }, [selectedContact]);

  const fetchStaffAndEmployees = async () => {
    const token = localStorage.getItem("token");
    try {
      // Fetch staff
      const staffRes = await fetch(`${BASE_URL}/staff`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const staffData = await staffRes.json();
      if (staffData.success) {
        setStaffList(staffData.data || staffData.staff || []);
      }

      // Fetch employees
      const empRes = await fetch(`${BASE_URL}/employee/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const empData = await empRes.json();
      if (empData.success) {
        setEmployeeList(empData.data || empData.employees || []);
      }
    } catch (error) {
      console.error("Error fetching staff or employees:", error);
    }
  };

  const fetchContacts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/contact/contacts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      console.log(data, "data")
      if (data.success) {
        setContacts(data.contacts || []);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;
    
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/contact/contact/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setContacts(contacts.filter(c => c._id !== id));
        alert("Contact deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact");
    }
  };

  const updateStatus = async (id, updateParam) => {
    const token = localStorage.getItem("token");
    const updateBody = typeof updateParam === "string" ? { status: updateParam } : updateParam;
    
    try {
      const response = await fetch(`${BASE_URL}/contact/contact/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updateBody),
      });
      const data = await response.json();
      if (data.success) {
        setContacts(contacts.map(c => c._id === id ? data.contact : c));
        setSelectedContact(prev => prev?._id === id ? data.contact : prev);
      }
    } catch (error) {
      console.error("Error updating contact status/assignment/notes:", error);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = 
      contact.contactPersonName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone?.includes(searchTerm) ||
      contact.companyName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || contact.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { color: "bg-blue-100 text-blue-600", icon: FaExclamationCircle, label: "New" },
      "in-progress": { color: "bg-yellow-100 text-yellow-600", icon: FaClock, label: "In Progress" },
      completed: { color: "bg-green-100 text-green-600", icon: FaCheckCircle, label: "Completed" },
      archived: { color: "bg-gray-100 text-gray-600", icon: FaCheckCircle, label: "Archived" },
    };
    
    const config = statusConfig[status] || statusConfig.new;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
        <Icon className="text-xs" />
        {config.label}
      </span>
    );
  };

  const getUrgencyBadge = (rating) => {
    if (!rating) return null;
    if (rating >= 4) {
      return <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-semibold">High Priority</span>;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Contact Inquiries
            </h1>
            <p className="text-gray-600">
              Manage and respond to customer inquiries
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-xl font-semibold">
              {filteredContacts.length} Total
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Contacts List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading contacts...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="p-12 text-center">
            <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No contacts found</p>
            <p className="text-gray-400 text-sm mt-2">
              {searchTerm
                ? "Try adjusting your search"
                : "Contacts will appear here once submitted"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Services
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr
                      key={contact._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <FaUser className="text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 flex items-center gap-2">
                            {contact.contactPersonName}
                            {getUrgencyBadge(contact.urgencyRating)}
                          </div>
                          {contact.companyName && (
                            <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <FaBriefcase className="text-xs" />
                              {contact.companyName}
                            </div>
                          )}
                          <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <FaEnvelope className="text-xs" />
                            {contact.email}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <FaPhone className="text-xs" />
                            {contact.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {contact.servicesInterested?.slice(0, 2).map((service, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-xs font-medium"
                          >
                            {service}
                          </span>
                        ))}
                        {contact.servicesInterested?.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                            +{contact.servicesInterested.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(contact.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaCalendar className="mr-2 text-gray-400" />
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedContact(contact)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => deleteContact(contact._id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (() => {
        const hasWebsiteDetails = 
          selectedContact.websiteType ||
          selectedContact.websiteVision ||
          selectedContact.websitePages ||
          selectedContact.brandGuidelinesReady ||
          selectedContact.specificIntegrations ||
          selectedContact.preferredCMS ||
          selectedContact.primaryCTA ||
          selectedContact.websitePurpose ||
          selectedContact.existingWebsite ||
          (selectedContact.ongoingMaintenance && selectedContact.ongoingMaintenance.length > 0);

        const hasSocialMediaDetails = 
          selectedContact.socialMediaGoals ||
          selectedContact.postingFrequency ||
          selectedContact.targetDemographic ||
          (selectedContact.socialMediaPlatforms && selectedContact.socialMediaPlatforms.length > 0) ||
          (selectedContact.contentType && selectedContact.contentType.length > 0);

        const hasDigitalMarketingDetails = 
          selectedContact.currentChallenges ||
          selectedContact.competitorsAdmire ||
          selectedContact.uniqueSellingProposition ||
          selectedContact.geographicTarget ||
          selectedContact.digitalMarketingFamiliarity ||
          (selectedContact.kpisImportant && selectedContact.kpisImportant.length > 0);

        const hasPartnershipFactors = 
          selectedContact.partnershipFactors?.transparentReporting ||
          selectedContact.partnershipFactors?.proactiveCommunication ||
          selectedContact.partnershipFactors?.dataDrivenStrategies ||
          selectedContact.partnershipFactors?.longTermPartnership;

        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white p-6 border-b border-gray-200 z-10">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Contact Details
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Submitted on {new Date(selectedContact.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Status Update */}
                  <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 flex flex-col justify-between gap-2">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-1">
                        Update Status
                      </label>
                      <p className="text-xs text-gray-500">Track and update the lead workflow status</p>
                    </div>
                    <select
                      value={tempStatus}
                      onChange={(e) => setTempStatus(e.target.value)}
                      className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white font-medium text-gray-700"
                    >
                      <option value="new">New</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  {/* Lead Assignment */}
                  <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 flex flex-col justify-between gap-2">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-1">
                        Lead Assignment
                      </label>
                      <p className="text-xs text-gray-500">Assign this lead to a staff member or employee</p>
                    </div>
                    {currentUser && currentUser.role === 'admin' && !currentUser.isStaff ? (
                      <select
                        value={tempAssignedTo}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (!val) {
                            setTempAssignedTo("");
                            setTempAssignedToModel("");
                          } else {
                            const isEmp = employeeList.some(emp => emp._id === val);
                            setTempAssignedTo(val);
                            setTempAssignedToModel(isEmp ? 'Employee' : 'auth');
                          }
                        }}
                        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white font-medium text-gray-700"
                      >
                        <option value="">Unassigned</option>
                        {staffList.length > 0 && (
                          <optgroup label="Staff Members">
                            {staffList.map(st => (
                              <option key={st._id} value={st._id}>{st.name} ({st.email})</option>
                            ))}
                          </optgroup>
                        )}
                        {employeeList.length > 0 && (
                          <optgroup label="Employees">
                            {employeeList.map(emp => (
                              <option key={emp._id} value={emp._id}>{emp.name} ({emp.email})</option>
                            ))}
                          </optgroup>
                        )}
                      </select>
                    ) : (
                      <div className="mt-2 text-sm font-semibold text-gray-800 bg-white px-4 py-2 border border-gray-200 rounded-lg">
                        {selectedContact.assignedTo ? (
                          <span>Assigned to: {selectedContact.assignedTo.name || "Staff Member"}</span>
                        ) : (
                          <span className="text-gray-500 font-normal">Unassigned</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Save/Update Button */}
                  <div className="md:col-span-2 flex justify-end">
                    <button
                      onClick={async () => {
                        await updateStatus(selectedContact._id, {
                          status: tempStatus,
                          assignedTo: tempAssignedTo || null,
                          assignedToModel: tempAssignedToModel || null,
                        });
                        toast.success("Contact lead updated successfully!");
                        setSelectedContact(null);
                      }}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all duration-150 shadow-md hover:shadow-lg active:scale-95"
                    >
                      Update Contact Lead
                    </button>
                  </div>
                </div>

                {/* 1. Basic Information */}
                <div>
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
                    <FaUser className="text-blue-500 text-lg" />
                    <h3 className="font-bold text-gray-900 text-base">Basic Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailItem label="Contact Person" value={selectedContact.contactPersonName} />
                    <DetailItem label="Company" value={selectedContact.companyName} />
                    <DetailItem 
                      label="Email" 
                      value={selectedContact.email ? (
                        <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                          {selectedContact.email}
                        </a>
                      ) : null} 
                    />
                    <DetailItem 
                      label="Phone" 
                      value={selectedContact.phone ? (
                        <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:underline">
                          {selectedContact.phone}
                        </a>
                      ) : null} 
                    />
                    <DetailItem label="Preferred Communication" value={selectedContact.preferredCommunication} />
                    <DetailItem label="How They Heard About Us" value={selectedContact.hearAboutUs} />
                  </div>
                </div>

                {/* 2. Services Interested */}
                <div>
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
                    <FaBriefcase className="text-blue-500 text-lg" />
                    <h3 className="font-bold text-gray-900 text-base">Services Interested</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Interested Services</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedContact.servicesInterested?.map((service, idx) => (
                          <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold border border-purple-200">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedContact.otherServicesSpecify && (
                      <DetailItem label="Other Services Description" value={selectedContact.otherServicesSpecify} />
                    )}
                  </div>
                </div>

                {/* 3. Project & Timeline */}
                <div>
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
                    <FaDollarSign className="text-blue-500 text-lg" />
                    <h3 className="font-bold text-gray-900 text-base">Project & Timeline Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailItem label="Budget Range" value={selectedContact.budgetRange} />
                    <DetailItem label="Expected Timeframe" value={selectedContact.expectedTimeframe} />
                    <DetailItem 
                      label="Preferred Start Date" 
                      value={selectedContact.preferredStartDate ? new Date(selectedContact.preferredStartDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : null} 
                    />
                    <DetailItem label="Project Deadline Preference" value={selectedContact.projectDeadline} />
                    <DetailItem 
                      label="Urgency Rating" 
                      value={selectedContact.urgencyRating ? `${selectedContact.urgencyRating} / 5` : null} 
                    />
                    <DetailItem label="Expected Results" value={selectedContact.expectedResults} />
                  </div>
                </div>

                {/* 4. Website Development Details (Conditional) */}
                {hasWebsiteDetails && (
                  <div>
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
                      <FaGlobe className="text-blue-500 text-lg" />
                      <h3 className="font-bold text-gray-900 text-base">Website Development Specifics</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DetailItem label="Website Type" value={selectedContact.websiteType} />
                      <DetailItem label="Website Pages" value={selectedContact.websitePages} />
                      <DetailItem label="Brand Guidelines Ready" value={selectedContact.brandGuidelinesReady} />
                      <DetailItem label="Preferred CMS" value={selectedContact.preferredCMS} />
                      <DetailItem label="Primary CTA" value={selectedContact.primaryCTA} />
                      <DetailItem label="Existing Website" value={selectedContact.existingWebsite} />
                      <DetailItem label="Ongoing Maintenance Needed" value={selectedContact.ongoingMaintenance} />
                      <div className="md:col-span-2">
                        <DetailItem label="Website Vision" value={selectedContact.websiteVision} />
                      </div>
                      <div className="md:col-span-2">
                        <DetailItem label="Specific Integrations Required" value={selectedContact.specificIntegrations} />
                      </div>
                      <div className="md:col-span-2">
                        <DetailItem label="Website Purpose" value={selectedContact.websitePurpose} />
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Social Media Marketing Specifics (Conditional) */}
                {hasSocialMediaDetails && (
                  <div>
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
                      <FaShareAlt className="text-blue-500 text-lg" />
                      <h3 className="font-bold text-gray-900 text-base">Social Media Specifics</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DetailItem label="Platforms Interested" value={selectedContact.socialMediaPlatforms} />
                      <DetailItem label="Posting Frequency" value={selectedContact.postingFrequency} />
                      <DetailItem label="Target Demographic" value={selectedContact.targetDemographic} />
                      <DetailItem label="Content Types Preferred" value={selectedContact.contentType} />
                      <div className="md:col-span-2">
                        <DetailItem label="Social Media Goals" value={selectedContact.socialMediaGoals} />
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. Digital Marketing / SEO Specifics (Conditional) */}
                {hasDigitalMarketingDetails && (
                  <div>
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
                      <FaChartLine className="text-blue-500 text-lg" />
                      <h3 className="font-bold text-gray-900 text-base">Digital Marketing & SEO Specifics</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DetailItem label="Geographic Target" value={selectedContact.geographicTarget} />
                      <DetailItem label="Digital Marketing Familiarity" value={selectedContact.digitalMarketingFamiliarity} />
                      <DetailItem label="KPIs Most Important" value={selectedContact.kpisImportant} />
                      <div className="md:col-span-2">
                        <DetailItem label="Current Challenges" value={selectedContact.currentChallenges} />
                      </div>
                      <div className="md:col-span-2">
                        <DetailItem label="Competitors They Admire" value={selectedContact.competitorsAdmire} />
                      </div>
                      <div className="md:col-span-2">
                        <DetailItem label="Unique Selling Proposition (USP)" value={selectedContact.uniqueSellingProposition} />
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. Design & Visual Preferences */}
                {(selectedContact.targetAudience || selectedContact.visualStyle || selectedContact.designInspiration || selectedContact.existingMarketingMaterials || selectedContact.additionalComments) && (
                  <div>
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
                      <FaListUl className="text-blue-500 text-lg" />
                      <h3 className="font-bold text-gray-900 text-base">Design & Brand Info</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DetailItem label="Existing Marketing Materials" value={selectedContact.existingMarketingMaterials} />
                      <DetailItem label="Visual Style Preference" value={selectedContact.visualStyle} />
                      <DetailItem label="Design Inspiration" value={selectedContact.designInspiration} />
                      <div className="md:col-span-2">
                        <DetailItem label="Target Audience" value={selectedContact.targetAudience} />
                      </div>
                      <div className="md:col-span-2">
                        <DetailItem label="Additional Comments" value={selectedContact.additionalComments} />
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. Partnership Factors & Ratings */}
                {(hasPartnershipFactors || selectedContact.proposalImportance || selectedContact.involvementLevel || selectedContact.clarityRating) && (
                  <div>
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-4">
                      <FaHandshake className="text-blue-500 text-lg" />
                      <h3 className="font-bold text-gray-900 text-base">Partnership & Ratings</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DetailItem 
                        label="Proposal Importance" 
                        value={selectedContact.proposalImportance ? `${selectedContact.proposalImportance} / 10` : null} 
                      />
                      <DetailItem 
                        label="Involvement Level" 
                        value={selectedContact.involvementLevel ? `${selectedContact.involvementLevel} / 5` : null} 
                      />
                      <DetailItem 
                        label="Clarity Rating" 
                        value={selectedContact.clarityRating ? `${selectedContact.clarityRating} / 5` : null} 
                      />
                      
                      {hasPartnershipFactors && (
                        <div className="md:col-span-2 bg-gray-50/50 p-4 rounded-xl border border-gray-100 mt-2">
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-3">Key Partnership Factors Importance</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <DetailItem label="Transparent Reporting" value={selectedContact.partnershipFactors?.transparentReporting} />
                            <DetailItem label="Proactive Communication" value={selectedContact.partnershipFactors?.proactiveCommunication} />
                            <DetailItem label="Data-Driven Strategies" value={selectedContact.partnershipFactors?.dataDrivenStrategies} />
                            <DetailItem label="Long-Term Partnership" value={selectedContact.partnershipFactors?.longTermPartnership} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Notes Section */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FaListUl className="text-blue-500 text-lg" />
                    <h3 className="font-bold text-gray-900 text-base">Internal Notes</h3>
                  </div>
                  
                  {/* Notes List */}
                  <div className="space-y-3 max-h-[250px] overflow-y-auto mb-4 pr-2">
                    {selectedContact.notes && selectedContact.notes.length > 0 ? (
                      selectedContact.notes.map((note, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex flex-col gap-1">
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span className="font-semibold text-gray-700">{note.addedBy}</span>
                            <span>{new Date(note.createdAt).toLocaleString()}</span>
                          </div>
                          <p className="text-sm text-gray-800 leading-relaxed font-medium whitespace-pre-wrap">
                            {note.text}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 italic p-2">No notes added yet.</p>
                    )}
                  </div>

                  {/* Add Note Form */}
                  <div className="flex gap-2">
                    <textarea
                      placeholder="Add an internal note or update about this lead..."
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none h-12 align-middle transition-all duration-200"
                    />
                    <button
                      onClick={() => {
                        if (!noteText.trim()) return;
                        updateStatus(selectedContact._id, { noteText: noteText.trim() });
                        setNoteText("");
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors duration-150 self-end h-12"
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default Contacts;
