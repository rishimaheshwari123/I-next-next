"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaProjectDiagram, FaFileInvoice, FaTicketAlt, FaChartLine, FaClock, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaTasks, FaComment, FaSave } from "react-icons/fa";
import { toast } from 'react-toastify';
import { BASE_URL, EMPLOYEE_API } from "@/config/api";

const ClientDashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [clientTasks, setClientTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [feedbackInputs, setFeedbackInputs] = useState({});
  const [newCommentInputs, setNewCommentInputs] = useState({});

  const handleAddComment = async (taskId) => {
    const commentText = newCommentInputs[taskId] || "";
    if (!commentText.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${EMPLOYEE_API.ADD_PROJECT_TASK_COMMENT(taskId)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ comment: commentText })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("💬 Feedback comment posted!");
        setNewCommentInputs(prev => ({ ...prev, [taskId]: "" }));
        fetchClientTasks();
      } else {
        toast.error(data.message || "Failed to post comment");
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      toast.error("Please login to access dashboard");
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    
    // Check if user is client
    if (parsedUser.role !== "client") {
      toast.error("Access denied. Client access only.");
      router.push("/login");
      return;
    }

    setUser(parsedUser);
    setLoading(false);

    // Fetch user plans
    fetchUserPlans(parsedUser.id || parsedUser._id);
    fetchClientTasks();

    // Show welcome toast only once per session
    const welcomeShown = sessionStorage.getItem("welcomeShown");
    if (!welcomeShown) {
      setTimeout(() => {
        // toast.success(`Welcome back, ${parsedUser.name}! 🎉`, {
        //   position: "top-right",
        //   autoClose: 3000,
        // });
        sessionStorage.setItem("welcomeShown", "true");
      }, 500);
    }
  }, [router]);

  const fetchUserPlans = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/plan/user/${userId}`);
      const data = await response.json();

      if (data.success) {
        setPlans(data.plans);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setPlansLoading(false);
    }
  };

  const fetchClientTasks = async () => {
    try {
      setTasksLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(EMPLOYEE_API.GET_CLIENT_PROJECT_TASKS, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setClientTasks(data.data);
        // Prepopulate feedback inputs
        const inputs = {};
        data.data.forEach(t => {
          inputs[t._id] = t.clientFeedback || "";
        });
        setFeedbackInputs(inputs);
      }
    } catch (error) {
      console.error("Error fetching tasks for client:", error);
    } finally {
      setTasksLoading(false);
    }
  };

  const handleSaveFeedback = async (taskId, currentStatus) => {
    const feedback = feedbackInputs[taskId] || "";
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(EMPLOYEE_API.UPDATE_PROJECT_TASK_FEEDBACK(taskId), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          clientFeedback: feedback,
          status: currentStatus
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success("✅ Feedback saved successfully!");
        fetchClientTasks();
      } else {
        toast.error("Failed to save feedback");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };


  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
            <FaCheckCircle /> Active
          </span>
        );
      case "inactive":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
            <FaHourglassHalf /> Pending Approval
          </span>
        );
      case "expired":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
            <FaTimesCircle /> Expired
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const activePlans = plans.filter(p => p.status === "active").length;
  const pendingPlans = plans.filter(p => p.status === "inactive").length;

  const stats = [
    {
      title: "Active Plans",
      value: activePlans.toString(),
      icon: FaCheckCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Pending Approval",
      value: pendingPlans.toString(),
      icon: FaHourglassHalf,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      title: "Total Plans",
      value: plans.length.toString(),
      icon: FaProjectDiagram,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Support Tickets",
      value: "0",
      icon: FaTicketAlt,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: "Welcome to I Next ETS",
      description: "Your account has been created successfully",
      time: "Just now",
      icon: FaCheckCircle,
      color: "text-green-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Manage your plans and services from your dashboard
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <FaChartLine className="text-5xl" />
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
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <Icon className={`text-2xl ${stat.textColor}`} />
                </div>
                <div className={`px-3 py-1 bg-gradient-to-r ${stat.color} text-white text-xs font-bold rounded-full`}>
                  Active
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-semibold mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* My Plans Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Plans</h2>
          <Link
            href="/inboudmarket"
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-semibold text-sm"
          >
            Browse Services
          </Link>
        </div>

        {plansLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading plans...</p>
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <FaProjectDiagram className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Plans Yet</h3>
            <p className="text-gray-600 mb-6">Start by purchasing a plan to grow your business</p>
            <Link
              href="/inboudmarket"
              className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-semibold"
            >
              Explore Our Services
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan._id}
                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.serviceName}</h3>
                    <p className="text-sm text-gray-600">{plan.planType} Plan</p>
                  </div>
                  {getStatusBadge(plan.status)}
                </div>

                <div className="mb-4">
                  <p className="text-2xl font-bold text-orange-500">{plan.planPrice}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Purchased: {new Date(plan.purchaseDate).toLocaleDateString()}
                  </p>
                </div>

                {plan.status === "active" && plan.expiryDate && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <p className="text-xs text-green-700 font-semibold">
                      Expires: {new Date(plan.expiryDate).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {plan.status === "inactive" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-xs text-yellow-700 font-semibold">
                      ⏳ Waiting for admin approval
                    </p>
                  </div>
                )}

                {plan.planFeatures && plan.planFeatures.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Features:</p>
                    <ul className="space-y-1">
                      {plan.planFeatures.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                          <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {plan.planFeatures.length > 3 && (
                        <li className="text-xs text-gray-500 italic">
                          +{plan.planFeatures.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Tasks & Client Feedback Section */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FaTasks className="text-indigo-600" /> Project Tasks & Feedback
        </h2>

        {tasksLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading project tasks...</p>
          </div>
        ) : clientTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500 italic bg-gray-50 rounded-xl">
            No tasks created for your projects yet.
          </div>
        ) : (
          <div className="space-y-6">
            {clientTasks.map((task) => (
              <div
                key={task._id}
                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 justify-between"
              >
                {/* Task Summary */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-extrabold rounded-lg">
                      {task.projectId?.projectName}
                    </span>
                    <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded">
                      {task.taskType}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      task.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {task.status}
                    </span>
                  </div>

                   <h4 className="text-lg font-bold text-gray-800">{task.taskName}</h4>
                  {task.description && <p className="text-sm text-gray-600 leading-relaxed">{task.description}</p>}
                  
                  {/* Feedback & Replies Thread */}
                  <div className="mt-3 pt-3 border-t border-gray-150 space-y-2">
                    <span className="text-[11px] font-bold text-gray-700 block">Feedback & Replies ({task.feedbacks?.length || 0})</span>
                    {task.feedbacks && task.feedbacks.length > 0 ? (
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {task.feedbacks.map((fb, idx) => (
                          <div key={idx} className="bg-gray-50 border rounded p-1.5 text-[10px] space-y-1">
                            <div className="flex justify-between items-center text-gray-550 font-semibold">
                              <span className="flex items-center gap-1.5">
                                <span className={`px-1 rounded-[3px] text-[8px] font-extrabold uppercase ${
                                  fb.sender === "Client"
                                    ? "bg-blue-100 text-blue-700"
                                    : fb.sender === "Employee"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-purple-100 text-purple-700"
                                }`}>
                                  {fb.sender}
                                </span>
                                <span className="text-gray-700 font-bold">{fb.senderName}</span>
                              </span>
                              <span>{new Date(fb.createdAt).toLocaleString()}</span>
                            </div>
                            <p className="text-gray-800 font-medium whitespace-pre-wrap">{fb.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] text-gray-400 italic">No feedback or replies yet.</p>
                    )}

                    <div className="flex gap-1.5 mt-2">
                      <input
                        type="text"
                        placeholder="Type a feedback comment or reply..."
                        value={newCommentInputs[task._id] || ""}
                        onChange={(e) => setNewCommentInputs({
                          ...newCommentInputs,
                          [task._id]: e.target.value
                        })}
                        className="flex-1 px-2 py-1 border rounded text-[10px] focus:ring-1 focus:ring-indigo-500 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddComment(task._id)}
                        className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-750 text-white rounded text-[10px] font-bold"
                      >
                        Send
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-gray-400 pt-2 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Assigned To: <strong>{task.employeeId?.name || "N/A"}</strong></span>
                    <span>Created: {new Date(task.createdAt).toLocaleString()}</span>
                    {task.completedAt && (
                      <span className="text-green-600 font-semibold">Completed: {new Date(task.completedAt).toLocaleString()}</span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-500 text-white p-3 rounded-xl">
            <FaChartLine className="text-2xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help Getting Started?</h3>
            <p className="text-gray-600 mb-4">
              Our team is here to help you with your plans. Feel free to reach out anytime!
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
