"use client";
import {
  FaChartLine,
  FaUserPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaDollarSign,
  FaBell,
} from "react-icons/fa";

export default function LeadStats({ stats }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">Total Leads</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalLeads}</p>
          </div>
          <FaChartLine className="text-4xl opacity-50" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">New Leads</h3>
            <p className="text-3xl font-bold mt-2">{stats.newLeads}</p>
          </div>
          <FaUserPlus className="text-4xl opacity-50" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">Qualified</h3>
            <p className="text-3xl font-bold mt-2">{stats.qualifiedLeads}</p>
          </div>
          <FaCheckCircle className="text-4xl opacity-50" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">Won Deals</h3>
            <p className="text-3xl font-bold mt-2">{stats.wonLeads}</p>
          </div>
          <FaCheckCircle className="text-4xl opacity-50" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">Lost Deals</h3>
            <p className="text-3xl font-bold mt-2">{stats.lostLeads}</p>
          </div>
          <FaTimesCircle className="text-4xl opacity-50" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">Revenue</h3>
            <p className="text-2xl font-bold mt-2">
              ₹{(stats.totalRevenue / 1000).toFixed(0)}K
            </p>
          </div>
          <FaDollarSign className="text-4xl opacity-50" />
        </div>
      </div>
    </div>
  );
}
