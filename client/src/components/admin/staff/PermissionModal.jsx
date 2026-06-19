"use client";
import { useState, useEffect } from "react";
import { FaTimes, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function PermissionModal({
  show,
  staff,
  submitting,
  onSubmit,
  onClose,
}) {
  const [permissions, setPermissions] = useState({
    dashboard: false,
    leadManagement: false,
    revenue: false,
    staffManagement: false,
    projects: false,
    categories: false,
    services: false,
    serviceInquiries: false,
    employees: false,
    manageClients: false,
    clientPlans: false,
    serverHosting: false,
    contacts: false,
    domainInquiries: false,
    blogs: false,
    advertisements: false,
    supportTickets: false,
    contactInquiries: false,
    aiChatbot: false,
    attendance: false,
    leaveRequests: false,
    tasks: false,
  });

  useEffect(() => {
    if (staff && staff.permissions) {
      setPermissions({ ...permissions, ...staff.permissions });
    }
  }, [staff]);

  const handleSelectAll = () => {
    const allTrue = {};
    Object.keys(permissions).forEach((key) => {
      allTrue[key] = true;
    });
    setPermissions(allTrue);
  };

  const handleDeselectAll = () => {
    const allFalse = {};
    Object.keys(permissions).forEach((key) => {
      allFalse[key] = false;
    });
    setPermissions(allFalse);
  };

  const handleToggle = (key) => {
    setPermissions({ ...permissions, [key]: !permissions[key] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(permissions);
  };

  if (!show) return null;

  const permissionGroups = {
    "General Management": [
      { key: "dashboard", label: "Dashboard" },
      { key: "revenue", label: "Company Revenue" },
      { key: "projects", label: "Projects" },
      { key: "categories", label: "Categories" },
      { key: "blogs", label: "Blogs" },
    ],
    "Sales & Clients": [
      { key: "leadManagement", label: "Lead Management" },
      { key: "manageClients", label: "Manage Clients" },
      { key: "clientPlans", label: "Client Plans" },
    ],
    "Services & Support": [
      { key: "services", label: "Services Management" },
      { key: "serviceInquiries", label: "Service Inquiries" },
      { key: "serverHosting", label: "Server Hosting" },
      { key: "domainInquiries", label: "Domain Inquiries" },
      { key: "supportTickets", label: "Support Tickets" },
      { key: "contactInquiries", label: "Contact Inquiries" },
      { key: "contacts", label: "Contacts" },
      { key: "advertisements", label: "Advertisements" },
      { key: "aiChatbot", label: "AI Chatbot" },
    ],
    "Staff & HR": [
      { key: "staffManagement", label: "Staff Management" },
      { key: "employees", label: "Employees" },
      { key: "attendance", label: "Attendance" },
      { key: "leaveRequests", label: "Leave Requests" },
      { key: "tasks", label: "Tasks" },
    ],
  };

  const activeCount = Object.values(permissions).filter((val) => val).length;
  const totalCount = Object.keys(permissions).length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 relative flex-shrink-0">
          <h2 className="text-2xl font-bold">
            Manage Permissions - {staff?.name}
          </h2>
          <p className="text-sm opacity-90 mt-1">
            {activeCount} of {totalCount} permissions enabled
          </p>
          <button
            onClick={onClose}
            disabled={submitting}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all disabled:opacity-50"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="p-6 overflow-y-auto flex-1">
            {/* Quick Actions */}
            <div className="flex gap-3 mb-6">
              <button
                type="button"
                onClick={handleSelectAll}
                disabled={submitting}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <FaCheckCircle /> Select All
              </button>
              <button
                type="button"
                onClick={handleDeselectAll}
                disabled={submitting}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <FaTimesCircle /> Deselect All
              </button>
            </div>

            {/* Permission Groups */}
            <div className="space-y-6">
              {Object.entries(permissionGroups).map(([groupName, items]) => (
                <div key={groupName} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    {groupName}
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                      {items.filter((item) => permissions[item.key]).length}/
                      {items.length}
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {items.map((item) => (
                      <label
                        key={item.key}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                          permissions[item.key]
                            ? "bg-indigo-100 border-2 border-indigo-500"
                            : "bg-white border-2 border-gray-200 hover:border-gray-300"
                        } ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={permissions[item.key]}
                          onChange={() => handleToggle(item.key)}
                          disabled={submitting}
                          className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                        />
                        <span
                          className={`font-semibold ${
                            permissions[item.key]
                              ? "text-indigo-700"
                              : "text-gray-700"
                          }`}
                        >
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Actions - Always Visible */}
          <div className="p-6 border-t bg-gray-50 flex justify-end gap-4 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? "Updating..." : "Update Permissions"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
