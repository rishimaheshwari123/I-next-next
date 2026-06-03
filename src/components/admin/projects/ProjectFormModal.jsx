"use client";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function ProjectFormModal({
  show,
  mode,
  formData,
  setFormData,
  submitting,
  onSubmit,
  onClose,
  clients,
  categories = [],
}) {
  if (!show) return null;



  const projectTypes = [
    "Custom",
    "Template Based",
    "Maintenance",
    "Redesign",
    "Migration",
  ];

  const priorities = ["Low", "Medium", "High", "Urgent"];

  const statuses = ["Planning", "In Progress", "Testing", "Completed", "On Hold"];

  const handleTechAdd = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const tech = e.target.value.trim();
      
      // Ensure technologies is an array
      const currentTechs = Array.isArray(formData.technologies) 
        ? formData.technologies 
        : [];
      
      if (!currentTechs.includes(tech)) {
        const updatedTechs = [...currentTechs, tech];
        console.log("Adding technology:", tech);
        console.log("Updated technologies:", updatedTechs);
        setFormData({
          ...formData,
          technologies: updatedTechs,
        });
      }
      e.target.value = "";
    }
  };

  const handleTechRemove = (tech) => {
    // Ensure technologies is an array
    const currentTechs = Array.isArray(formData.technologies) 
      ? formData.technologies 
      : [];
      
    setFormData({
      ...formData,
      technologies: currentTechs.filter((t) => t !== tech),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl my-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-t-xl relative">
          <h2 className="text-2xl font-bold">
            {mode === "add" ? "Create New Project" : "Edit Project"}
          </h2>
          <button
            onClick={onClose}
            disabled={submitting}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all disabled:opacity-50"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Project Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Project Name *
            </label>
            <input
              type="text"
              placeholder="Enter project name"
              value={formData.projectName}
              onChange={(e) =>
                setFormData({ ...formData, projectName: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
              disabled={submitting}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter project description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows="3"
              disabled={submitting}
            />
          </div>

          {/* Category (Full width) */}
          <div className="w-full">
            <label className="block text-gray-700 font-semibold mb-2">
              Category * (Select one or more)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {categories.map((cat) => {
                const catId = cat._id || cat;
                const catName = cat.name || cat;
                const isSelected = Array.isArray(formData.category)
                  ? formData.category.includes(catId)
                  : formData.category === catId;
                
                return (
                  <button
                    key={catId}
                    type="button"
                    disabled={submitting}
                    onClick={() => {
                      let updatedCategory;
                      if (Array.isArray(formData.category)) {
                        updatedCategory = isSelected
                          ? formData.category.filter((c) => c !== catId)
                          : [...formData.category, catId];
                      } else {
                        // Handled legacy string categories
                        updatedCategory = isSelected ? [] : [formData.category, catId].filter(Boolean);
                        if (formData.category === catId) {
                          updatedCategory = [];
                        } else {
                          updatedCategory = [formData.category, catId].filter((c) => c !== "");
                        }
                      }
                      setFormData({ ...formData, category: updatedCategory });
                    }}
                    className={`px-3 py-2 rounded-lg border text-xs font-semibold transition-all text-center ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {catName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Project Type *
            </label>
            <select
              value={formData.projectType}
              onChange={(e) =>
                setFormData({ ...formData, projectType: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
              disabled={submitting}
            >
              <option value="">Select Type</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Technologies (Press Enter to add)
            </label>
            <input
              type="text"
              placeholder="e.g., React, Node.js, MongoDB"
              onKeyDown={handleTechAdd}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              disabled={submitting}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {Array.isArray(formData.technologies) && formData.technologies.length > 0 ? (
                formData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold flex items-center gap-2"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleTechRemove(tech)}
                      className="text-indigo-500 hover:text-indigo-700 text-lg font-bold"
                      disabled={submitting}
                    >
                      ×
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400 italic">
                  No technologies added yet. Press Enter to add.
                </span>
              )}
            </div>
          </div>

          {/* Client */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Client *
            </label>
            <select
              value={formData.client}
              onChange={(e) =>
                setFormData({ ...formData, client: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
              disabled={submitting || mode === "edit"}
            >
              <option value="">Select Client</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name} ({client.email})
                </option>
              ))}
            </select>
            {mode === "edit" && (
              <p className="text-xs text-gray-500 mt-1">
                Client cannot be changed
              </p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Start Date *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Expected End Date *
              </label>
              <input
                type="date"
                value={formData.expectedEndDate}
                onChange={(e) =>
                  setFormData({ ...formData, expectedEndDate: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
                disabled={submitting}
              />
            </div>
          </div>

          {/* Priority & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                disabled={submitting}
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>

            {mode === "edit" && (
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  disabled={submitting}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Budget & Live URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Budget (₹)
              </label>
              <input
                type="number"
                placeholder="Enter budget"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                disabled={submitting}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Live URL
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                value={formData.liveUrl}
                onChange={(e) =>
                  setFormData({ ...formData, liveUrl: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                disabled={submitting}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting
                ? "Processing..."
                : mode === "add"
                ? "Create Project"
                : "Update Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
