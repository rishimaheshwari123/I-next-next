"use client";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaUsers,
  FaPhoneAlt,
  FaStickyNote,
} from "react-icons/fa";

export default function LeadCard({ lead, onEdit, onDelete, onView, onAddNotes }) {
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

  const getPriorityColor = (priority) => {
    const colors = {
      Low: "bg-green-100 text-green-700",
      Medium: "bg-yellow-100 text-yellow-700",
      High: "bg-orange-100 text-orange-700",
      Urgent: "bg-red-100 text-red-700",
    };
    return colors[priority] || "bg-gray-100 text-gray-700";
  };

  const getSourceIcon = (source) => {
    const icons = {
      Website: <FaGlobe />,
      Facebook: <FaFacebook />,
      Instagram: <FaInstagram />,
      LinkedIn: <FaLinkedin />,
      Referral: <FaUsers />,
      "Cold Call": <FaPhoneAlt />,
      WhatsApp: <FaWhatsapp />,
    };
    return icons[source] || <FaGlobe />;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 border-indigo-500">
      <div className="flex items-start justify-between gap-6">
        {/* Left Section - Lead Info */}
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-3">
            <h3 className="text-2xl font-bold text-gray-800 flex-1">
              {lead.leadTitle}
            </h3>
            <div className="flex gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                  lead.leadStatus
                )}`}
              >
                {lead.leadStatus.toUpperCase()}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(
                  lead.priority
                )}`}
              >
                {lead.priority}
              </span>
            </div>
          </div>

          <p className="text-gray-600 mb-4 line-clamp-2">{lead.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-xs text-gray-500 block mb-1">Client</span>
              <span className="font-semibold text-gray-800">
                {lead.clientName}
              </span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-xs text-gray-500 block mb-1">Contact</span>
              <span className="font-semibold text-gray-800">
                {lead.contactNumber}
              </span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-xs text-gray-500 block mb-1">Source</span>
              <span className="font-semibold text-gray-800 flex items-center gap-2">
                {getSourceIcon(lead.leadSource)}
                {lead.leadSource}
              </span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-xs text-gray-500 block mb-1">Type</span>
              <span className="font-semibold text-gray-800 text-sm">
                {lead.leadType}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-xs text-gray-500 block mb-1">
                Received Date
              </span>
              <span className="font-semibold text-gray-800">
                {new Date(lead.receivedDate).toLocaleDateString()}
              </span>
            </div>
            {lead.budget && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-xs text-gray-500 block mb-1">Budget</span>
                <span className="font-semibold text-green-600">
                  ₹{lead.budget.toLocaleString()}
                </span>
              </div>
            )}
            {lead.assignedTo && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-xs text-gray-500 block mb-1">
                  Assigned To
                </span>
                <span className="font-semibold text-gray-800">
                  {lead.assignedTo.name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex flex-col gap-2 min-w-[140px]">
          <button
            onClick={() => onView(lead)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 font-semibold transition-all"
          >
            <FaEye /> View
          </button>
          <button
            onClick={() => onEdit(lead)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-2 font-semibold transition-all"
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={() => onAddNotes(lead)}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center justify-center gap-2 font-semibold transition-all"
          >
            <FaStickyNote /> Add Notes
          </button>
          <button
            onClick={() => onDelete(lead._id)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 font-semibold transition-all"
          >
            <FaTrash /> Delete
          </button>

          {/* Quick Actions */}
          <div className="flex gap-2 mt-2">
            <a
              href={`tel:${lead.contactNumber}`}
              className="flex-1 p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 flex items-center justify-center"
              title="Call"
            >
              <FaPhone />
            </a>
            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                className="flex-1 p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 flex items-center justify-center"
                title="Email"
              >
                <FaEnvelope />
              </a>
            )}
            <a
              href={`https://wa.me/${lead.contactNumber.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 flex items-center justify-center"
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Remarks/Notes Section */}
      {lead.remarks && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Notes & Remarks:
          </h4>
          <div className="bg-gray-50 p-3 rounded-lg max-h-32 overflow-y-auto">
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {lead.remarks}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
