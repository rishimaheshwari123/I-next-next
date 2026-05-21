"use client";
import {
  FaProjectDiagram,
  FaSpinner,
  FaCheckCircle,
  FaPauseCircle,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaClipboardList,
  FaVial,
} from "react-icons/fa";

export default function ProjectStats({ stats }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">Total Projects</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalProjects}</p>
          </div>
          <FaProjectDiagram className="text-4xl opacity-50" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">In Progress</h3>
            <p className="text-3xl font-bold mt-2">{stats.inProgress}</p>
          </div>
          <FaSpinner className="text-4xl opacity-50" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">Completed</h3>
            <p className="text-3xl font-bold mt-2">{stats.completed}</p>
          </div>
          <FaCheckCircle className="text-4xl opacity-50" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">Overdue</h3>
            <p className="text-3xl font-bold mt-2">{stats.overdue}</p>
          </div>
          <FaExclamationTriangle className="text-4xl opacity-50" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">Planning</h3>
            <p className="text-3xl font-bold mt-2">{stats.planning}</p>
          </div>
          <FaClipboardList className="text-4xl opacity-50" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">Testing</h3>
            <p className="text-3xl font-bold mt-2">{stats.testing}</p>
          </div>
          <FaVial className="text-4xl opacity-50" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">On Hold</h3>
            <p className="text-3xl font-bold mt-2">{stats.onHold}</p>
          </div>
          <FaPauseCircle className="text-4xl opacity-50" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold opacity-90">This Month</h3>
            <p className="text-3xl font-bold mt-2">{stats.thisMonth}</p>
          </div>
          <FaCalendarAlt className="text-4xl opacity-50" />
        </div>
      </div>
    </div>
  );
}
