"use client";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function AddNotesModal({
  show,
  lead,
  submitting,
  onSubmit,
  onClose,
}) {
  const [notes, setNotes] = useState("");

  if (!show || !lead) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!notes.trim()) return;
    onSubmit(lead._id, notes);
    setNotes("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-t-xl relative">
          <h2 className="text-2xl font-bold">Add Notes</h2>
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
              Your Notes *
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter your notes about this lead..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              rows="6"
              required
              disabled={submitting}
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Your notes will be saved with your name and timestamp
            </p>
          </div>

          {/* Existing Notes */}
          {lead.remarks && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Previous Notes:
              </label>
              <div className="bg-gray-50 p-4 rounded-lg max-h-48 overflow-y-auto">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {lead.remarks}
                </p>
              </div>
            </div>
          )}

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
              disabled={submitting || !notes.trim()}
              className={`px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all ${
                submitting || !notes.trim()
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {submitting ? "Adding..." : "Add Notes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
