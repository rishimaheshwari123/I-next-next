"use client";

import { useState, useEffect } from "react";
import { EMPLOYEE_API, BASE_URL } from "@/config/api";
import { FaPlus, FaTrash, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

export default function PlanTemplateModal({ editingPlan, onClose, onSuccess }) {
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    priceRange: "",
    durationDays: 30,
    benefits: [""],
    keyFeatures: [""],
    additionalFeatures: "",
  });

  useEffect(() => {
    fetchCategories();
    if (editingPlan) {
      setFormData({
        name: editingPlan.name || "",
        description: editingPlan.description || "",
        category:
          typeof editingPlan.category === "object"
            ? editingPlan.category._id
            : editingPlan.category || "",
        priceRange: editingPlan.priceRange || "",
        durationDays: editingPlan.durationDays || 30,
        benefits:
          editingPlan.benefits?.length > 0 ? editingPlan.benefits : [""],
        keyFeatures:
          editingPlan.keyFeatures?.length > 0 ? editingPlan.keyFeatures : [""],
        additionalFeatures: editingPlan.additionalFeatures || "",
      });
    }
  }, [editingPlan]);

  const fetchCategories = async () => {
    try {
      setLoadingCats(true);
      const token = localStorage.getItem("token");
      const response = await fetch(EMPLOYEE_API.GET_ALL_CATEGORIES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Failed to load categories", error);
      toast.error("Failed to load categories");
    } finally {
      setLoadingCats(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, field, value) => {
    const newArr = [...formData[field]];
    newArr[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArr }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (index, field) => {
    if (formData[field].length === 1) return;
    const newArr = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: newArr }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.category ||
      !formData.priceRange ||
      !formData.durationDays
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const url = editingPlan
        ? `${BASE_URL}/plan/template/${editingPlan._id}`
        : `${BASE_URL}/plan/template`;

      const response = await fetch(url, {
        method: editingPlan ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          benefits: formData.benefits.filter((b) => b.trim()),
          keyFeatures: formData.keyFeatures.filter((k) => k.trim()),
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(
          editingPlan
            ? "Plan updated successfully"
            : "Plan created successfully",
        );
        onSuccess();
        onClose();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting plan:", error);
      toast.error("Failed to save plan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h2 className="text-2xl font-bold">
            {editingPlan ? "Edit Plan" : "Create New Plan"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Plan Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. Startup Growth Plan"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                placeholder="Brief description of the plan..."
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Price Range *
              </label>
              <input
                type="text"
                name="priceRange"
                value={formData.priceRange}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. ₹5,000 - ₹10,000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Duration (Days) *
              </label>
              <input
                type="number"
                name="durationDays"
                value={formData.durationDays}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Benefits
              </label>
              <div className="space-y-2">
                {formData.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) =>
                        handleArrayChange(idx, "benefits", e.target.value)
                      }
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter a benefit..."
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(idx, "benefits")}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("benefits")}
                  className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:text-blue-700"
                >
                  <FaPlus /> Add Benefit
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Key Features
              </label>
              <div className="space-y-2">
                {formData.keyFeatures.map((feature, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleArrayChange(idx, "keyFeatures", e.target.value)
                      }
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter a key feature..."
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem(idx, "keyFeatures")}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("keyFeatures")}
                  className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:text-blue-700"
                >
                  <FaPlus /> Add Feature
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Additional Features
              </label>
              <textarea
                name="additionalFeatures"
                value={formData.additionalFeatures}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                placeholder="Any other special features..."
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border-2 border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : editingPlan
                  ? "Update Plan"
                  : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
