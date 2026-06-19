"use client";
import { FaEdit, FaTrash, FaKey, FaEnvelope, FaPhone } from "react-icons/fa";

export default function StaffCard({ staff, onEditPermissions, onEdit, onDelete }) {
  // Count active permissions
  const activePermissions = Object.values(staff.permissions || {}).filter(
    (val) => val === true
  ).length;
  const totalPermissions = 17; // Total number of permissions

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 border-indigo-500">
      <div className="flex items-start justify-between gap-6">
        {/* Left Section - Staff Info */}
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-3">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {staff.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800">{staff.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                  STAFF MEMBER
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    activePermissions === totalPermissions
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {activePermissions}/{totalPermissions} Permissions
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
              <FaEnvelope className="text-gray-400" />
              <div>
                <span className="text-xs text-gray-500 block">Email</span>
                <span className="font-semibold text-gray-800 text-sm">
                  {staff.email}
                </span>
              </div>
            </div>
            {staff.phone && (
              <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
                <FaPhone className="text-gray-400" />
                <div>
                  <span className="text-xs text-gray-500 block">Phone</span>
                  <span className="font-semibold text-gray-800 text-sm">
                    {staff.phone}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <span className="text-xs text-gray-500 block mb-1">Created On</span>
            <span className="font-semibold text-gray-800">
              {new Date(staff.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex flex-col gap-2 min-w-[160px]">
          <button
            onClick={() => onEditPermissions(staff)}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center justify-center gap-2 font-semibold transition-all"
          >
            <FaKey /> Permissions
          </button>
          <button
            onClick={() => onEdit(staff)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-2 font-semibold transition-all"
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={() => onDelete(staff._id)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 font-semibold transition-all"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      {/* Active Permissions Preview */}
      {activePermissions > 0 && (
        <div className="mt-4 pt-4 border-t">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Active Permissions:
          </h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(staff.permissions || {})
              .filter(([_, value]) => value === true)
              .slice(0, 5)
              .map(([key]) => (
                <span
                  key={key}
                  className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-semibold"
                >
                  {key}
                </span>
              ))}
            {activePermissions > 5 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
                +{activePermissions - 5} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
