"use client";
import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaBlog,
  FaUsers,
  FaChartLine,
  FaCalendar,
  FaClock,
} from "react-icons/fa";
import { dashboardToasts } from '@/config/toast';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setUser(user);
      
      // Show welcome toast only once per session
      // const hasShownWelcome = sessionStorage.getItem("welcomeShown");
      // if (!hasShownWelcome) {
      //   setTimeout(() => {
      //     dashboardToasts.welcome(user.name);
      //     sessionStorage.setItem("welcomeShown", "true");
      //   }, 1000);
      // }
    }

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      title: "Total Contacts",
      value: "0",
      icon: FaEnvelope,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Total Blogs",
      value: "0",
      icon: FaBlog,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Total Users",
      value: "1",
      icon: FaUsers,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Site Visits",
      value: "0",
      icon: FaChartLine,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
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
              Here's what's happening with your website today
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                >
                  <Icon className={`text-2xl ${stat.textColor}`} />
                </div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Live
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/contacts"
            className="flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 border border-blue-200 group"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FaEnvelope className="text-white text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">View Contacts</h3>
              <p className="text-sm text-gray-600">Manage inquiries</p>
            </div>
          </a>

          <a
            href="/admin/blogs"
            className="flex items-center gap-4 p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 border border-purple-200 group"
          >
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FaBlog className="text-white text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Manage Blogs</h3>
              <p className="text-sm text-gray-600">Create & edit posts</p>
            </div>
          </a>

          <a
            href="/"
            className="flex items-center gap-4 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-300 border border-green-200 group"
          >
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FaChartLine className="text-white text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">View Website</h3>
              <p className="text-sm text-gray-600">Go to homepage</p>
            </div>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recent Activity
        </h2>
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaChartLine className="text-4xl text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">No recent activity</p>
          <p className="text-gray-400 text-sm mt-2">
            Activity will appear here once you start managing content
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
