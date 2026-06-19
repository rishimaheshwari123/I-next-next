"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function UpdateStatusModal({
  show,
  lead,
  submitting,
  onSubmit,
  onClose,
}) {
  const [status, setStatus] = useState(lead?.leadStatus || "");
  const [notes, setNotes] = useState("");

  if (!show || !lead) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(lead._id, status, notes);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-t-xl relative">
          <h2 className="text-2xl font-bold">Update Lead Status</h2>
          <p className="text-sm opacity-90 mt-1">{lead.leadTitle}</p>
          <button
            onClick={onClose}
            disabled={submitting}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all disabled:opacity-50"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              New Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
              disabled={submitting}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Add Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this status update..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows="4"
              disabled={submitting}
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Notes will be added with your name and timestamp
            </p>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
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
              className={`px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? "Updating..." : "Update Status"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
