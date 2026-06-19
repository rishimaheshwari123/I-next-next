"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaFileInvoice,
  FaTicketAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaHome,
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaShoppingCart,
  FaClipboardList,
  FaHeadset,
  FaGem,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Image from "next/image";
import { toast } from "react-toastify";
import { BASE_URL } from "@/config/api";

const ClientSidebar = ({
  isCollapsed: propCollapsed,
  setIsCollapsed: propSetCollapsed,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [activePlans, setActivePlans] = useState([]);
  const [showPlansDropdown, setShowPlansDropdown] = useState(true);

  const isCollapsed =
    propCollapsed !== undefined ? propCollapsed : internalCollapsed;
  const setIsCollapsed =
    propSetCollapsed !== undefined ? propSetCollapsed : setInternalCollapsed;

  const [user, setUser] = useState(null);

  // Get user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchActivePlans(parsedUser.id || parsedUser._id);
    }
  }, []);

  const fetchActivePlans = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/plan/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        // Filter only active plans
        setActivePlans(data.purchases.filter((p) => p.status === "active"));
      }
    } catch (error) {
      console.error("Error fetching sidebar plans:", error);
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: FaTachometerAlt,
      path: "/client/dashboard",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "My Projects",
      icon: FaProjectDiagram,
      path: "/client/projects",
      color: "from-teal-500 to-teal-600",
    },

    {
      name: "Our Services",
      icon: FaShoppingCart,
      path: "/client/services",
      color: "from-cyan-500 to-blue-600",
    },
    {
      name: "My Service Inquiries",
      icon: FaClipboardList,
      path: "/client/my-inquiries",
      color: "from-lime-500 to-green-600",
    },
    {
      name: "My Plans",
      icon: FaProjectDiagram,
      path: "/client/plans",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "My Hosting",
      icon: FaProjectDiagram,
      path: "/client/my-hosting",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Hosting Inquiry",
      icon: FaProjectDiagram,
      path: "/client/hosting",
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "Customer Support",
      icon: FaHeadset,
      path: "/client/support",
      color: "from-blue-600 to-indigo-600",
    },
  ];

  const handleLogout = () => {
    const loadingToast = toast.loading("Logging out...");

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

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
        router.push("/");
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
            {isCollapsed ? (
              <FaChevronRight size={12} />
            ) : (
              <FaChevronLeft size={12} />
            )}
          </button>

          {/* Logo Section */}
          <div className="p-6 border-b border-gray-200">
            <div
              className={`flex items-center ${isCollapsed ? "justify-center" : "space-x-3"}`}
            >
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
                  <p className="text-xs text-gray-500 font-medium">
                    Client Portal
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* User Info Section */}
          {/* {user && !isCollapsed && (
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FaUser className="text-white text-xl" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )} */}

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
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
                      isCollapsed ? "justify-center" : "space-x-3"
                    } px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105`
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    title={isCollapsed ? item.name : ""}
                  >
                    <Icon
                      className={`text-xl ${isActive ? "animate-pulse" : ""}`}
                    />
                    {!isCollapsed && (
                      <span className="font-semibold">{item.name}</span>
                    )}
                    {isActive && !isCollapsed && (
                      <div className="absolute right-3 w-2 h-2 bg-white rounded-full animate-ping"></div>
                    )}
                  </Link>
                );
              })}

              {/* Active Plans Submenu */}
              {activePlans.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  {!isCollapsed && (
                    <button
                      onClick={() => setShowPlansDropdown(!showPlansDropdown)}
                      className="w-full flex items-center justify-between px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors"
                    >
                      <span>Active Subscriptions</span>
                      {showPlansDropdown ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  )}

                  {showPlansDropdown && (
                    <div className="mt-2 space-y-1">
                      {activePlans.map((purchase) => (
                        <Link
                          key={purchase._id}
                          href={`/client/plans/${purchase._id}`}
                          onClick={() => setIsSidebarOpen(false)}
                          className={`group flex items-center ${
                            isCollapsed ? "justify-center" : "space-x-3"
                          } px-4 py-2.5 rounded-xl transition-all duration-200 ${
                            pathname === `/client/plans/${purchase._id}`
                              ? "bg-blue-50 text-blue-600 font-bold"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                          title={isCollapsed ? purchase.planId?.name : ""}
                        >
                          <FaGem
                            className={`text-sm ${pathname === `/client/plans/${purchase._id}` ? "text-blue-600" : "text-gray-400 group-hover:text-blue-500"}`}
                          />
                          {!isCollapsed && (
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm truncate">
                                {purchase.planId?.name}
                              </span>
                              <span className="text-[10px] text-gray-400 font-medium truncate uppercase tracking-tighter">
                                {purchase.planId?.category?.name}
                              </span>
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center" : "justify-center space-x-3"
              } px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold`}
              title={isCollapsed ? "Logout" : ""}
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

export default ClientSidebar;
