"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { EMPLOYEE_API } from "@/config/api";
import { toast } from "react-toastify";
import {
  FaChartLine,
  FaDollarSign,
  FaProjectDiagram,
  FaHandshake,
  FaServicestack,
  FaCalendarAlt,
  FaTrophy,
  FaFilter,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function RevenuePage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [period, setPeriod] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchRevenueStats();
  }, [period]);

  const fetchRevenueStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.GET_REVENUE_STATS, {
        headers: { Authorization: `Bearer ${token}` },
        params: { period },
      });

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching revenue stats:", error);
      toast.error("Failed to fetch revenue statistics");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const COLORS = ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
              <FaChartLine className="text-yellow-300" />
              Company Revenue
            </h1>
            <p className="text-blue-100 text-lg">
              Track revenue from leads, projects, and services
            </p>
          </div>

          {/* Period Filter */}
          <div className="flex gap-2 bg-white/10 backdrop-blur-md rounded-xl p-2">
            {[
              { value: "today", label: "Today" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
              { value: "year", label: "Year" },
              { value: "all", label: "All Time" },
            ].map((p) => (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  period === p.value
                    ? "bg-white text-purple-600 font-semibold shadow-lg"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Total Revenue Card */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-lg mb-2 flex items-center gap-2">
              <FaDollarSign className="text-2xl" />
              Total Revenue
            </p>
            <h2 className="text-5xl font-bold">
              {formatCurrency(stats?.totalRevenue || 0)}
            </h2>
            <p className="text-green-100 mt-2">
              From {stats?.counts?.wonLeads + stats?.counts?.completedProjects + stats?.counts?.convertedServices || 0} converted sources
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-full p-6">
            <FaTrophy className="text-6xl text-yellow-300" />
          </div>
        </div>
      </div>

      {/* Revenue by Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Leads Revenue */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <FaHandshake className="text-3xl text-purple-600" />
            </div>
            <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
              {stats?.counts?.wonLeads || 0} Won
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Leads Revenue
          </h3>
          <p className="text-3xl font-bold text-gray-800">
            {formatCurrency(stats?.leadsRevenue || 0)}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{
                  width: `${
                    stats?.revenueBySource?.find((s) => s.source === "Leads")
                      ?.percentage || 0
                  }%`,
                }}
              ></div>
            </div>
            <span className="text-sm font-semibold text-gray-600">
              {stats?.revenueBySource
                ?.find((s) => s.source === "Leads")
                ?.percentage.toFixed(1) || 0}
              %
            </span>
          </div>
        </div>

        {/* Projects Revenue */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <FaProjectDiagram className="text-3xl text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              {stats?.counts?.completedProjects || 0} Done
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Projects Revenue
          </h3>
          <p className="text-3xl font-bold text-gray-800">
            {formatCurrency(stats?.projectsRevenue || 0)}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${
                    stats?.revenueBySource?.find((s) => s.source === "Projects")
                      ?.percentage || 0
                  }%`,
                }}
              ></div>
            </div>
            <span className="text-sm font-semibold text-gray-600">
              {stats?.revenueBySource
                ?.find((s) => s.source === "Projects")
                ?.percentage.toFixed(1) || 0}
              %
            </span>
          </div>
        </div>

        {/* Services Revenue */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <FaServicestack className="text-3xl text-green-600" />
            </div>
            <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
              {stats?.counts?.convertedServices || 0} Sold
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">
            Services Revenue
          </h3>
          <p className="text-3xl font-bold text-gray-800">
            {formatCurrency(stats?.servicesRevenue || 0)}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${
                    stats?.revenueBySource?.find((s) => s.source === "Services")
                      ?.percentage || 0
                  }%`,
                }}
              ></div>
            </div>
            <span className="text-sm font-semibold text-gray-600">
              {stats?.revenueBySource
                ?.find((s) => s.source === "Services")
                ?.percentage.toFixed(1) || 0}
              %
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaCalendarAlt className="text-blue-600" />
            Monthly Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats?.monthlyRevenue || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="leads"
                stroke="#8B5CF6"
                strokeWidth={2}
                name="Leads"
              />
              <Line
                type="monotone"
                dataKey="projects"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Projects"
              />
              <Line
                type="monotone"
                dataKey="services"
                stroke="#10B981"
                strokeWidth={2}
                name="Services"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Distribution Pie Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaChartLine className="text-purple-600" />
            Revenue Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats?.revenueBySource || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ source, percentage }) =>
                  `${source}: ${percentage.toFixed(1)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="amount"
              >
                {stats?.revenueBySource?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Revenue Sources */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaTrophy className="text-yellow-500" />
          Top 10 Revenue Sources
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Rank
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Client
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {stats?.topRevenueSources?.map((source, index) => (
                <tr
                  key={source.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                        index === 0
                          ? "bg-yellow-100 text-yellow-600"
                          : index === 1
                          ? "bg-gray-100 text-gray-600"
                          : index === 2
                          ? "bg-orange-100 text-orange-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {source.title}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{source.client}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        source.type === "Lead"
                          ? "bg-purple-100 text-purple-600"
                          : source.type === "Project"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {source.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-green-600">
                    {formatCurrency(source.amount)}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(source.date).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
