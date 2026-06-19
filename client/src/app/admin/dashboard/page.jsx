"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { EMPLOYEE_API } from "@/config/api";
import {
  FaCalendar,
  FaClock,
  FaDollarSign,
  FaHandshake,
  FaProjectDiagram,
  FaTasks,
  FaUserTie,
  FaCheckCircle,
  FaServicestack,
  FaRunning,
  FaUserFriends,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Fetch dashboard stats
    fetchDashboardStats();

    return () => clearInterval(timer);
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const response = await axios.get(EMPLOYEE_API.GET_DASHBOARD_STATS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setDashboardData(response.data.data);
        console.log("Dashboard Data:", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
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

  if (loading || !dashboardData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  }

  const mainStats = [
    {
      title: "Total Leads",
      value: dashboardData.leads.total,
      subtitle: `${dashboardData.leads.active} Active • ${dashboardData.leads.won} Won`,
      icon: FaHandshake,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      link: "/admin/leads",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(dashboardData.revenue.total),
      subtitle: "From all sources",
      icon: FaDollarSign,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      link: "/admin/revenue",
    },
    {
      title: "Total Projects",
      value: dashboardData.projects.total,
      subtitle: `${dashboardData.projects.running} Running • ${dashboardData.projects.completed} Done`,
      icon: FaProjectDiagram,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      link: "/admin/projects",
    },
    {
      title: "Total Employees",
      value: dashboardData.employees.total,
      subtitle: `${dashboardData.employees.active} Active`,
      icon: FaUserTie,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      link: "/admin/employees",
    },
  ];

  const secondaryStats = [
    {
      title: "Total Clients",
      value: dashboardData.clients.total,
      subtitle: `${dashboardData.clients.active} Active`,
      icon: FaUserFriends,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      link: "/admin/clients",
    },
    {
      title: "Running Projects",
      value: dashboardData.projects.running,
      subtitle: "In Progress",
      icon: FaRunning,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-600",
      link: "/admin/projects",
    },
    {
      title: "Available Services",
      value: dashboardData.services.total,
      subtitle: `${dashboardData.services.active} Active`,
      icon: FaServicestack,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
      link: "/admin/services",
    },
    {
      title: "Active Employees",
      value: dashboardData.employees.active,
      subtitle: "Working Today",
      icon: FaCheckCircle,
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
      link: "/admin/employees",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, {user?.name || "Admin"}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Here's what's happening with your business today
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
            <div className="flex items-center gap-3 text-white">
              <FaCalendar className="text-2xl" />
              <div>
                <p className="text-sm opacity-90">
                  {currentTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-xl font-bold flex items-center gap-2">
                  <FaClock className="text-lg" />
                  {currentTime.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, index) => (
          <Link
            key={index}
            href={stat.link}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`text-3xl ${stat.textColor}`} />
                </div>
                <div className={`bg-gradient-to-r ${stat.color} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                  View
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800 mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.subtitle}</p>
            </div>
            <div className={`h-1 bg-gradient-to-r ${stat.color}`}></div>
          </Link>
        ))}
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {secondaryStats.map((stat, index) => (
          <Link
            key={index}
            href={stat.link}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`text-2xl ${stat.textColor}`} />
                </div>
              </div>
              <h3 className="text-gray-600 text-xs font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-gray-800 mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            </div>
            <div className={`h-0.5 bg-gradient-to-r ${stat.color}`}></div>
          </Link>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads Status Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaHandshake className="text-purple-600" />
            Leads by Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.charts.leads}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="status" 
                angle={-45}
                textAnchor="end"
                height={80}
                style={{ fontSize: '12px' }}
              />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Projects Status Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaProjectDiagram className="text-blue-600" />
            Projects by Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.charts.projects}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="status" 
                angle={-45}
                textAnchor="end"
                height={80}
                style={{ fontSize: '12px' }}
              />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaTasks className="text-blue-600" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/leads"
            className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-all group"
          >
            <div className="bg-purple-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
              <FaHandshake className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Manage Leads</h3>
              <p className="text-sm text-gray-600">Track and convert leads</p>
            </div>
          </Link>

          <Link
            href="/admin/projects"
            className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all group"
          >
            <div className="bg-blue-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
              <FaProjectDiagram className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">View Projects</h3>
              <p className="text-sm text-gray-600">Monitor project progress</p>
            </div>
          </Link>

          <Link
            href="/admin/revenue"
            className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all group"
          >
            <div className="bg-green-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
              <FaDollarSign className="text-2xl text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Revenue Report</h3>
              <p className="text-sm text-gray-600">View financial insights</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
