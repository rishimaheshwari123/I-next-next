"use client";
import { FaTimes, FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function LeadViewModal({ show, lead, onClose }) {
  if (!show || !lead) return null;

  const getStatusColor = (status) => {
    const colors = {
      New: "bg-blue-100 text-blue-700",
      Contacted: "bg-yellow-100 text-yellow-700",
      Qualified: "bg-purple-100 text-purple-700",
      "Proposal Sent": "bg-orange-100 text-orange-700",
      Negotiation: "bg-cyan-100 text-cyan-700",
      Won: "bg-green-100 text-green-700",
      Lost: "bg-red-100 text-red-700",
      "On Hold": "bg-gray-100 text-gray-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-t-xl relative">
          <h2 className="text-2xl font-bold">Lead Details</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Title & Status */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {lead.leadTitle}
            </h3>
            <div className="flex gap-2">
              <span
                className={`px-4 py-1 rounded-full text-sm font-bold ${getStatusColor(
                  lead.leadStatus
                )}`}
              >
                {lead.leadStatus}
              </span>
              <span className="px-4 py-1 rounded-full text-sm font-bold bg-gray-100 text-gray-700">
                {lead.priority} Priority
              </span>
            </div>
          </div>

          {/* Client Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-3">Client Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Client Name</p>
                <p className="font-semibold text-gray-800">{lead.clientName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Number</p>
                <p className="font-semibold text-gray-800">
                  {lead.contactNumber}
                </p>
              </div>
              {lead.email && (
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-800">{lead.email}</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-4">
              <a
                href={`tel:${lead.contactNumber}`}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 font-semibold"
              >
                <FaPhone /> Call
              </a>
              {lead.email && (
                <a
                  href={`mailto:${lead.email}`}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 font-semibold"
                >
                  <FaEnvelope /> Email
                </a>
              )}
              <a
                href={`https://wa.me/${lead.contactNumber.replace(
                  /[^0-9]/g,
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 font-semibold"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>

          {/* Lead Details */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-3">Lead Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Lead Source</p>
                <p className="font-semibold text-gray-800">{lead.leadSource}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Lead Type</p>
                <p className="font-semibold text-gray-800">{lead.leadType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Received Date</p>
                <p className="font-semibold text-gray-800">
                  {new Date(lead.receivedDate).toLocaleDateString()}
                </p>
              </div>
              {lead.budget && (
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="font-semibold text-green-600">
                    ₹{lead.budget.toLocaleString()}
                  </p>
                </div>
              )}
              {lead.assignedTo && (
                <div>
                  <p className="text-sm text-gray-600">Assigned To</p>
                  <p className="font-semibold text-gray-800">
                    {lead.assignedTo.name} ({lead.assignedTo.employeeId})
                  </p>
                </div>
              )}
              {lead.expectedClosingDate && (
                <div>
                  <p className="text-sm text-gray-600">Expected Closing Date</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(lead.expectedClosingDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              {lead.followUpDate && (
                <div>
                  <p className="text-sm text-gray-600">Follow-up Date</p>
                  <p className="font-semibold text-orange-600">
                    {new Date(lead.followUpDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-2">Description</h4>
            <p className="text-gray-700 whitespace-pre-wrap">
              {lead.description}
            </p>
          </div>

          {/* Remarks */}
          {lead.remarks && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-800 mb-2">Remarks</h4>
              <p className="text-gray-700 whitespace-pre-wrap">{lead.remarks}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 p-6 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
