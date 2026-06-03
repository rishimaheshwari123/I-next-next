"use client";
import {
  FaEdit,
  FaTrash,
  FaUsers,
  FaUser,
  FaCalendar,
  FaLink,
  FaComments,
  FaExclamationCircle,
} from "react-icons/fa";

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
  onAssign,
  onChat,
  onUpdateProgress,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Planning":
        return "bg-purple-100 text-purple-700 border-purple-300";
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Testing":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Completed":
        return "bg-green-100 text-green-700 border-green-300";
      case "On Hold":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Urgent":
        return "bg-red-500 text-white";
      case "High":
        return "bg-orange-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-white";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const isOverdue =
    new Date(project.expectedEndDate) < new Date() &&
    project.status !== "Completed";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-l-4 border-indigo-500">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-gray-800">
              {project.projectName}
            </h3>
            {isOverdue && (
              <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                <FaExclamationCircle /> Overdue
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                project.status
              )}`}
            >
              {project.status}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(
                project.priority
              )}`}
            >
              {project.priority} Priority
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      {project.description && (
        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <span className="text-xs text-gray-500 block mb-2">Category</span>
          <div className="flex flex-wrap gap-1">
            {Array.isArray(project.category) ? (
              project.category.map((cat, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-semibold">
                  {cat.name || cat}
                </span>
              ))
            ) : (
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-semibold">
                {project.category?.name || project.category}
              </span>
            )}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <span className="text-xs text-gray-500 block mb-1">Type</span>
          <span className="font-semibold text-gray-800">
            {project.projectType}
          </span>
        </div>
      </div>

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="mb-4">
          <span className="text-xs text-gray-500 block mb-2">
            Technologies
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-semibold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Client & Employees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg flex items-center gap-3">
          <FaUser className="text-blue-600 text-xl" />
          <div>
            <span className="text-xs text-gray-500 block">Client</span>
            <span className="font-semibold text-gray-800">
              {project.client?.name || "N/A"}
            </span>
          </div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg flex items-center gap-3">
          <FaUsers className="text-green-600 text-xl" />
          <div>
            <span className="text-xs text-gray-500 block">Employees</span>
            <span className="font-semibold text-gray-800">
              {project.assignedEmployees?.length || 0} assigned
            </span>
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
          <FaCalendar className="text-gray-400" />
          <div>
            <span className="text-xs text-gray-500 block">Start Date</span>
            <span className="font-semibold text-gray-800">
              {new Date(project.startDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div
          className={`p-3 rounded-lg flex items-center gap-3 ${
            isOverdue ? "bg-red-50" : "bg-gray-50"
          }`}
        >
          <FaCalendar className={isOverdue ? "text-red-600" : "text-gray-400"} />
          <div>
            <span className="text-xs text-gray-500 block">Expected End</span>
            <span
              className={`font-semibold ${
                isOverdue ? "text-red-700" : "text-gray-800"
              }`}
            >
              {new Date(project.expectedEndDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Live URL */}
      {project.liveUrl && (
        <div className="bg-indigo-50 p-3 rounded-lg flex items-center gap-3 mb-4">
          <FaLink className="text-indigo-600" />
          <div className="flex-1 min-w-0">
            <span className="text-xs text-gray-500 block">Live URL</span>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline truncate block"
            >
              {project.liveUrl}
            </a>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Progress</span>
          <span className="text-sm font-bold text-indigo-600">
            {project.progress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 pt-4 border-t">
        <button
          onClick={() => onUpdateProgress(project)}
          className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center justify-center gap-2 font-semibold transition-all text-sm"
        >
          Manage Tasks
        </button>
        <button
          onClick={() => onAssign(project)}
          className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2 font-semibold transition-all text-sm"
        >
          <FaUsers /> Assign
        </button>
        <button
          onClick={() => onChat(project)}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 font-semibold transition-all text-sm"
        >
          <FaComments /> Chat
        </button>
        <button
          onClick={() => onEdit(project)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center justify-center gap-2 font-semibold transition-all text-sm"
        >
          <FaEdit /> Edit
        </button>
        <button
          onClick={() => onDelete(project._id)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 font-semibold transition-all text-sm"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
}
