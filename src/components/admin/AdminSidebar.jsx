"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaTachometerAlt,
  FaEnvelope,
  FaBlog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaGlobe,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Image from "next/image";
import { toast } from 'react-toastify';
import { logoutToasts } from '@/config/toast';

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  // Get user data from localStorage
  React.useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      icon: FaTachometerAlt,
      path: "/admin/dashboard",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Contacts",
      icon: FaEnvelope,
      path: "/admin/contacts",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Blogs",
      icon: FaBlog,
      path: "/admin/blogs",
      color: "from-pink-500 to-pink-600",
    },
    {
      name: "Domain Inquiries",
      icon: FaGlobe,
      path: "/admin/domains",
      color: "from-green-500 to-green-600",
    },
  ];

  const handleLogout = () => {
    const loadingToast = logoutToasts.loading();

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("welcomeShown");
      
      toast.update(loadingToast, {
        render: "Logged out successfully! See you soon! 👋",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }, 800);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white shadow-2xl z-40 transform transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${isCollapsed ? "lg:w-20" : "lg:w-72"}`}
      >
        <div className="flex flex-col h-full relative">
          {/* Desktop Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex absolute -right-3 top-8 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 z-50"
          >
            {isCollapsed ? <FaChevronRight size={12} /> : <FaChevronLeft size={12} />}
          </button>

          {/* Logo Section */}
          <div className="p-6 border-b border-gray-200">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="relative">
                <Image
                  src="https://i.ibb.co/N608STN/inext-ets-logo.jpg"
                  width={isCollapsed ? 40 : 50}
                  height={isCollapsed ? 40 : 50}
                  alt="Logo"
                  className="rounded-xl"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              {!isCollapsed && (
                <div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    I Next ETS
                  </h2>
                  <p className="text-xs text-gray-500 font-medium">Admin Panel</p>
                </div>
              )}
            </div>
          </div>

         

          {/* Collapsed User Avatar */}
          {user && isCollapsed && (
            <div className="p-4 border-b border-gray-200 flex justify-center">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FaUser className="text-white text-lg" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`group relative flex items-center ${
                      isCollapsed ? 'justify-center' : 'space-x-3'
                    } px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105`
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    title={isCollapsed ? item.name : ''}
                  >
                    <Icon className={`text-xl ${isActive ? 'animate-pulse' : ''}`} />
                    {!isCollapsed && (
                      <span className="font-semibold">{item.name}</span>
                    )}
                    {isActive && !isCollapsed && (
                      <div className="absolute right-3 w-2 h-2 bg-white rounded-full animate-ping"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${
                isCollapsed ? 'justify-center' : 'justify-center space-x-3'
              } px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold`}
              title={isCollapsed ? 'Logout' : ''}
            >
              <FaSignOutAlt className="text-xl" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
