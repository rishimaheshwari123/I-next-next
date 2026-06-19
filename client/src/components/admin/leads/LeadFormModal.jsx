"use client";
import { FaTimes } from "react-icons/fa";

export default function LeadFormModal({
  show,
  mode,
  formData,
  setFormData,
  employees,
  submitting,
  onSubmit,
  onClose,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-t-xl relative">
          <h2 className="text-2xl font-bold">
            {mode === "add" ? "Create New Lead" : "Edit Lead"}
          </h2>
          <button
            onClick={onClose}
            disabled={submitting}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all disabled:opacity-50"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Lead Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Lead Title *
            </label>
            <input
              type="text"
              placeholder="e.g., Website Development for ABC Company"
              value={formData.leadTitle}
              onChange={(e) =>
                setFormData({ ...formData, leadTitle: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
              disabled={submitting}
            />
          </div>

          {/* Client Name & Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Client Name *
              </label>
              <input
                type="text"
                placeholder="Enter client name"
                value={formData.clientName}
                onChange={(e) =>
                  setFormData({ ...formData, clientName: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
                disabled={submitting}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Contact Number *
              </label>
              <input
                type="text"
                placeholder="+91 9876543210"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({ ...formData, contactNumber: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
                disabled={submitting}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              placeholder="client@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              disabled={submitting}
            />
          </div>

          {/* Lead Source & Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Lead Source *
              </label>
              <select
                value={formData.leadSource}
                onChange={(e) =>
                  setFormData({ ...formData, leadSource: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
                disabled={submitting}
              >
                <option value="">Select Source</option>
                <option value="Website">Website</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Referral">Referral</option>
                <option value="Cold Call">Cold Call</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Lead Type *
              </label>
              <select
                value={formData.leadType}
                onChange={(e) =>
                  setFormData({ ...formData, leadType: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
                disabled={submitting}
              >
                <option value="">Select Type</option>
                <option value="Web Development">Web Development</option>
                <option value="App Development">App Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="SEO">SEO</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description *
            </label>
            <textarea
              placeholder="Enter detailed lead description..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows="4"
              required
              disabled={submitting}
            ></textarea>
          </div>

          {/* Budget & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Budget (Optional)
              </label>
              <input
                type="number"
                placeholder="Enter budget amount"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                min="0"
                disabled={submitting}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Priority *
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
                disabled={submitting}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Status & Assign To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Lead Status *
              </label>
              <select
                value={formData.leadStatus}
                onChange={(e) =>
                  setFormData({ ...formData, leadStatus: e.target.value })
                }
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
                Assign To (Optional)
              </label>
              <select
                value={formData.assignedTo}
                onChange={(e) =>
                  setFormData({ ...formData, assignedTo: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                disabled={submitting}
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name} ({emp.employeeId})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Expected Closing Date (Optional)
              </label>
              <input
                type="date"
                value={formData.expectedClosingDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    expectedClosingDate: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                disabled={submitting}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Follow-up Date (Optional)
              </label>
              <input
                type="date"
                value={formData.followUpDate}
                onChange={(e) =>
                  setFormData({ ...formData, followUpDate: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                disabled={submitting}
              />
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Remarks (Optional)
            </label>
            <textarea
              placeholder="Add any additional notes..."
              value={formData.remarks}
              onChange={(e) =>
                setFormData({ ...formData, remarks: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows="3"
              disabled={submitting}
            ></textarea>
          </div>

          {/* Buttons */}
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
                ? "Create Lead"
                : "Update Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
