"use client";
import { FaSearch } from "react-icons/fa";

export default function LeadFilters({ filters, setFilters }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      {/* Status Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilters({ ...filters, status: "" })}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filters.status === ""
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilters({ ...filters, status: "New" })}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filters.status === "New"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          New
        </button>
        <button
          onClick={() => setFilters({ ...filters, status: "Contacted" })}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filters.status === "Contacted"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Contacted
        </button>
        <button
          onClick={() => setFilters({ ...filters, status: "Qualified" })}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filters.status === "Qualified"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Qualified
        </button>
        <button
          onClick={() => setFilters({ ...filters, status: "Won" })}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filters.status === "Won"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Won
        </button>
        <button
          onClick={() => setFilters({ ...filters, status: "Lost" })}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            filters.status === "Lost"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Lost
        </button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, number..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={filters.source}
          onChange={(e) => setFilters({ ...filters, source: e.target.value })}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="Facebook">Facebook</option>
          <option value="Instagram">Instagram</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Referral">Referral</option>
          <option value="Cold Call">Cold Call</option>
          <option value="WhatsApp">WhatsApp</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Types</option>
          <option value="Web Development">Web Development</option>
          <option value="App Development">App Development</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="SEO">SEO</option>
          <option value="Graphic Design">Graphic Design</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>
    </div>
  );
}
