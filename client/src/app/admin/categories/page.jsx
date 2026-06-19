"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaTrash, FaEdit, FaTimes, FaClipboardList, FaSpinner } from "react-icons/fa";
import { EMPLOYEE_API } from "@/config/api";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(EMPLOYEE_API.GET_ALL_CATEGORIES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      } else {
        toast.error(data.message || "Failed to load categories");
      }
    } catch (error) {
      console.error("Error loading categories:", error);
      toast.error("Error loading categories");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setModalMode("add");
    setSelectedCategory(null);
    setCategoryName("");
    setShowModal(true);
  };

  const handleOpenEditModal = (category) => {
    setModalMode("edit");
    setSelectedCategory(category);
    setCategoryName(category.name);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const url =
        modalMode === "add"
          ? EMPLOYEE_API.CREATE_CATEGORY
          : EMPLOYEE_API.UPDATE_CATEGORY(selectedCategory._id);
      
      const method = modalMode === "add" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: categoryName }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(`✅ Category ${modalMode === "add" ? "created" : "updated"} successfully!`);
        setShowModal(false);
        fetchCategories();
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error submitting category:", error);
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category? Any projects using it will lose this category reference.")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(EMPLOYEE_API.DELETE_CATEGORY(id), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        toast.success("🗑️ Category deleted successfully!");
        fetchCategories();
      } else {
        toast.error(data.message || "Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh]">
        <FaSpinner className="animate-spin text-5xl text-indigo-600 mb-4" />
        <p className="text-gray-600 font-semibold">Loading Categories...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3">
              <FaClipboardList className="text-indigo-600" /> Category Management
            </h1>
            <p className="text-gray-600 mt-1">Manage project classification categories</p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all flex items-center gap-2"
          >
            <FaPlus /> Add Category
          </button>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-150">
          {categories.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-2">📁</div>
              <p className="font-semibold">No Categories Found</p>
              <p className="text-xs">Click "Add Category" to create one.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-55/50 border-b">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Category Name</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700">Created At</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-700 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {categories.map((category) => (
                    <tr key={category._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-800">{category.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(category.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(category)}
                          className="p-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 rounded-lg transition-all"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-5 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {modalMode === "add" ? "Create Category" : "Edit Category"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                disabled={submitting}
                className="text-white/80 hover:text-white transition-all disabled:opacity-50"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Social Media Marketing"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                  required
                  disabled={submitting}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold disabled:opacity-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all disabled:opacity-50 text-sm"
                >
                  {submitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
