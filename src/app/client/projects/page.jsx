"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaProjectDiagram, FaPlus, FaClock, FaCheckCircle, FaSpinner, FaEye } from "react-icons/fa";
import { toast } from 'react-toastify';

const ClientProjects = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      toast.error("Please login to access this page");
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== "client") {
      toast.error("Access denied. Client access only.");
      router.push("/login");
      return;
    }

    setUser(parsedUser);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading projects...</p>
        </div>
      </div>
    );
  }

  // Sample projects data (will be replaced with API data later)
  const projects = [];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "bg-blue-100 text-blue-700", icon: FaSpinner },
      completed: { color: "bg-green-100 text-green-700", icon: FaCheckCircle },
      pending: { color: "bg-orange-100 text-orange-700", icon: FaClock },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
        <Icon className="text-sm" />
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center space-x-3">
              <FaProjectDiagram className="text-4xl" />
              <span>My Projects</span>
            </h1>
            <p className="text-blue-100 text-lg">
              Track and manage all your projects in one place
            </p>
          </div>
          <Link
            href="/contact"
            className="hidden md:flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <FaPlus />
            <span>New Project</span>
          </Link>
        </div>
      </div>

      {/* Mobile New Project Button */}
      <Link
        href="/contact"
        className="md:hidden flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
      >
        <FaPlus />
        <span>Start New Project</span>
      </Link>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaProjectDiagram className="text-5xl text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Projects Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't started any projects yet. Let's create your first project and bring your ideas to life!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FaPlus />
              <span>Start Your First Project</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                {getStatusBadge(project.status)}
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  Started: {new Date(project.startDate).toLocaleDateString()}
                </span>
                <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  <FaEye />
                  <span>View</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help with Your Project?</h3>
        <p className="text-gray-600 mb-4">
          Our team is ready to assist you with any questions or concerns about your projects.
        </p>
        <Link
          href="/client/support"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default ClientProjects;
