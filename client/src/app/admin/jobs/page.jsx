"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaTimes,
  FaBriefcase,
  FaSpinner,
  FaCheck,
  FaEye,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { JOB_API } from "@/config/api";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [selectedJob, setSelectedJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    experience: "",
    skills: "",
    budget: "",
    description: "",
    isActive: true,
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(JOB_API.GET_ALL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setJobs(data.data || []);
      } else {
        toast.error(data.message || "Failed to load jobs");
      }
    } catch (error) {
      console.error("Error loading jobs:", error);
      toast.error("Error loading jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setModalMode("add");
    setSelectedJob(null);
    setFormData({
      title: "",
      experience: "",
      skills: "",
      budget: "",
      description: "",
      isActive: true,
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (job) => {
    setModalMode("edit");
    setSelectedJob(job);
    setFormData({
      title: job.title || "",
      experience: job.experience || "",
      skills: job.skills || "",
      budget: job.budget || "",
      description: job.description || "",
      isActive: job.isActive !== undefined ? job.isActive : true,
    });
    setShowModal(true);
  };

  const handleOpenViewModal = (job) => {
    setSelectedJob(job);
    setShowViewModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error("Job title is required");
      return;
    }
    if (!formData.experience.trim()) {
      toast.error("Experience details are required");
      return;
    }
    if (!formData.skills.trim()) {
      toast.error("Skills details are required");
      return;
    }
    if (!formData.budget.trim()) {
      toast.error("Budget is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Job description is required");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const url =
        modalMode === "add"
          ? JOB_API.CREATE
          : JOB_API.UPDATE(selectedJob._id);
      
      const method = modalMode === "add" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`✅ Job ${modalMode === "add" ? "created" : "updated"} successfully!`);
        setShowModal(false);
        fetchJobs();
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error submitting job:", error);
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job listing?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(JOB_API.DELETE(id), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        toast.success("🗑️ Job deleted successfully!");
        fetchJobs();
      } else {
        toast.error(data.message || "Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleToggleStatus = async (job) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(JOB_API.UPDATE(job._id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !job.isActive }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(`Status updated to ${!job.isActive ? "Active" : "Inactive"}`);
        fetchJobs();
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error toggling job status:", error);
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh]">
        <FaSpinner className="animate-spin text-5xl text-blue-600 mb-4" />
        <p className="text-gray-600 font-semibold">Loading Jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3">
              <FaBriefcase className="text-blue-600" /> Career Job Listings
            </h1>
            <p className="text-gray-600 mt-1">Manage positions and requirements displayed on the Careers page</p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all flex items-center gap-2"
          >
            <FaPlus /> Post a Job
          </button>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-150">
          {jobs.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-2">💼</div>
              <p className="font-semibold">No Job Postings Found</p>
              <p className="text-xs">Click "Post a Job" to list career opportunities.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Role Title</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Experience</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Budget</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {jobs.map((job) => (
                    <tr key={job._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-800">
                        <div>
                          {job.title}
                          <div className="text-xs font-normal text-gray-500 mt-0.5 truncate max-w-xs">
                            Skills: {job.skills}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{job.experience}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{job.budget}</td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleToggleStatus(job)}
                          className="flex items-center gap-1.5 focus:outline-none"
                          title="Click to toggle status"
                        >
                          {job.isActive ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                              Inactive
                            </span>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenViewModal(job)}
                          className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleOpenEditModal(job)}
                          className="p-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 rounded-lg transition-all"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 relative flex-shrink-0">
              <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
              <p className="text-sm opacity-90 mt-1">Preview of the job posting description and details</p>
              <button
                onClick={() => setShowViewModal(false)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 font-semibold uppercase">Experience Required</p>
                  <p className="text-gray-800 font-medium">{selectedJob.experience}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 font-semibold uppercase">Budget / Package</p>
                  <p className="text-gray-800 font-medium">{selectedJob.budget}</p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 font-semibold uppercase">Required Skills</p>
                <p className="text-gray-800 font-medium">{selectedJob.skills}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-2 uppercase">Job Description</p>
                <div className="bg-gray-55 border border-gray-200 p-4 rounded-xl text-gray-700 whitespace-pre-wrap leading-relaxed font-sans text-sm min-h-[150px]">
                  {selectedJob.description}
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-end flex-shrink-0">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-medium transition-all"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 relative flex-shrink-0">
              <h2 className="text-2xl font-bold">
                {modalMode === "add" ? "Post a New Job" : "Edit Job Posting"}
              </h2>
              <p className="text-sm opacity-90 mt-1">Specify role requirements, budget, and description</p>
              <button
                onClick={() => setShowModal(false)}
                disabled={submitting}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all disabled:opacity-50"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
              <div className="p-6 overflow-y-auto flex-1 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. Frontend Developer"
                    required
                  />
                </div>

                {/* Experience & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Experience Required <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="e.g. 2-4 Years / Fresher"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Budget / Package <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                      placeholder="e.g. ₹5,00,000 - ₹8,00,000 / Year"
                      required
                    />
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Required Skills <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. React.js, Next.js, Node.js, Tailwind CSS"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <div className="text-xs text-blue-600 mb-1.5 font-medium">
                    💡 Spaces, newlines, and bullet formatting written below will be preserved exactly when displayed to applicants.
                  </div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-sans"
                    placeholder="Describe the job role, day-to-day responsibilities, perks, and expectations..."
                    required
                  ></textarea>
                </div>

                {/* Status Toggle */}
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-semibold text-gray-700 cursor-pointer">
                    Publish immediately (Active listing)
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t bg-gray-50 flex justify-end gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-750 font-semibold transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Submit Posting"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
