"use client";
import { FaTimes } from "react-icons/fa";

export default function StaffFormModal({
  show,
  mode,
  formData,
  setFormData,
  submitting,
  onSubmit,
  onClose,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-t-xl relative">
          <h2 className="text-2xl font-bold">
            {mode === "add" ? "Create New Staff" : "Edit Staff"}
          </h2>
          <button
            onClick={onClose}
            disabled={submitting}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all disabled:opacity-50"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Name *
            </label>
            <input
              type="text"
              placeholder="Enter staff name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email *
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
              disabled={submitting || mode === "edit"}
            />
            {mode === "edit" && (
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Phone
            </label>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password {mode === "edit" && "(Leave blank to keep current)"}
            </label>
            <input
              type="password"
              placeholder={
                mode === "add" ? "Enter password" : "Enter new password"
              }
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required={mode === "add"}
              disabled={submitting}
            />
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
              {submitting
                ? "Processing..."
                : mode === "add"
                ? "Create Staff"
                : "Update Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
