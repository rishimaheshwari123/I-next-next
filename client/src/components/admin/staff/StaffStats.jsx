"use client";
import { FaUsers, FaUserCheck, FaUserShield, FaUserPlus } from "react-icons/fa";

export default function StaffStats({ stats }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">Total Staff</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalStaff}</p>
          </div>
          <FaUsers className="text-4xl opacity-50" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">Active Staff</h3>
            <p className="text-3xl font-bold mt-2">{stats.activeStaff}</p>
          </div>
          <FaUserCheck className="text-4xl opacity-50" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">Full Access</h3>
            <p className="text-3xl font-bold mt-2">{stats.fullAccessStaff}</p>
          </div>
          <FaUserShield className="text-4xl opacity-50" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">Recently Added</h3>
            <p className="text-3xl font-bold mt-2">{stats.recentlyAdded}</p>
          </div>
          <FaUserPlus className="text-4xl opacity-50" />
        </div>
      </div>
    </div>
  );
}
