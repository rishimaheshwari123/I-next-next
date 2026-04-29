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
} from "react-icons/fa";
import { BASE_URL } from "@/config/api";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/contact/contacts`);
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
    
    try {
      const response = await fetch(`${BASE_URL}/contact/contact/${id}`, {
        method: "DELETE",
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

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${BASE_URL}/contact/contact/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        setContacts(contacts.map(c => c._id === id ? { ...c, status: newStatus } : c));
        setSelectedContact(prev => prev?._id === id ? { ...prev, status: newStatus } : prev);
      }
    } catch (error) {
      console.error("Error updating status:", error);
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
      {selectedContact && (
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
              {/* Status Update */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Update Status
                </label>
                <select
                  value={selectedContact.status}
                  onChange={(e) => updateStatus(selectedContact._id, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Contact Person</label>
                  <p className="text-lg text-gray-900">{selectedContact.contactPersonName}</p>
                </div>
                {selectedContact.companyName && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Company</label>
                    <p className="text-lg text-gray-900">{selectedContact.companyName}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-semibold text-gray-600">Email</label>
                  <p className="text-lg text-gray-900">
                    <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">
                      {selectedContact.email}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Phone</label>
                  <p className="text-lg text-gray-900">
                    <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:underline">
                      {selectedContact.phone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Services */}
              <div>
                <label className="text-sm font-semibold text-gray-600 mb-2 block">Services Interested</label>
                <div className="flex flex-wrap gap-2">
                  {selectedContact.servicesInterested?.map((service, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm font-medium">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              {(selectedContact.budgetRange || selectedContact.expectedTimeframe || selectedContact.urgencyRating) && (
                <div className="bg-blue-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-3">Project Details</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {selectedContact.budgetRange && (
                      <div>
                        <label className="text-xs font-semibold text-gray-600">Budget</label>
                        <p className="text-gray-900">{selectedContact.budgetRange}</p>
                      </div>
                    )}
                    {selectedContact.expectedTimeframe && (
                      <div>
                        <label className="text-xs font-semibold text-gray-600">Timeframe</label>
                        <p className="text-gray-900">{selectedContact.expectedTimeframe}</p>
                      </div>
                    )}
                    {selectedContact.urgencyRating && (
                      <div>
                        <label className="text-xs font-semibold text-gray-600">Urgency</label>
                        <p className="text-gray-900">{selectedContact.urgencyRating}/5</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Target Audience */}
              {selectedContact.targetAudience && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">Target Audience</label>
                  <p className="text-gray-900 leading-relaxed">{selectedContact.targetAudience}</p>
                </div>
              )}

              {/* Additional Comments */}
              {selectedContact.additionalComments && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">Additional Comments</label>
                  <p className="text-gray-900 leading-relaxed">{selectedContact.additionalComments}</p>
                </div>
              )}

              {/* How They Heard */}
              {selectedContact.hearAboutUs && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">How They Heard About Us</label>
                  <p className="text-gray-900">{selectedContact.hearAboutUs}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
