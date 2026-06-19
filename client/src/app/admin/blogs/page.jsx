"use client";
import React, { useState, useEffect } from "react";
import {
  FaBlog,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaCalendar,
  FaTimes,
  FaImage,
  FaSave,
} from "react-icons/fa";
import { BASE_URL } from "@/config/api";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    desc: "",
    category: "General",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    published: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${BASE_URL}/blog/getAll`);
      const data = await response.json();
      if (data.success) {
        setBlogs(data.blogs || []);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
        .replace(/(^-|-$)/g, ""); // Remove leading/trailing hyphens
      
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: slug,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.slug || !formData.desc) {
      showToast("Please fill all required fields", "error");
      return;
    }
    
    if (!imageFile) {
      showToast("Please select an image", "error");
      return;
    }

    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Append all form fields explicitly
      formDataToSend.append("title", formData.title);
      formDataToSend.append("slug", formData.slug);
      formDataToSend.append("desc", formData.desc);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("metaTitle", formData.metaTitle);
      formDataToSend.append("metaDescription", formData.metaDescription);
      formDataToSend.append("keywords", formData.keywords);
      formDataToSend.append("canonicalUrl", formData.canonicalUrl);
      formDataToSend.append("ogTitle", formData.ogTitle);
      formDataToSend.append("ogDescription", formData.ogDescription);
      formDataToSend.append("published", formData.published);

      // Append image
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const response = await fetch(`${BASE_URL}/blog/create`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        showToast("Blog created successfully!", "success");
        setShowCreateModal(false);
        resetForm();
        fetchBlogs();
      } else {
        showToast(data.message || "Failed to create blog", "error");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      showToast("Error creating blog. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      desc: "",
      category: "General",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      canonicalUrl: "",
      ogTitle: "",
      ogDescription: "",
      published: false,
    });
    setImageFile(null);
    setImagePreview(null);
    setEditMode(false);
    setSelectedBlog(null);
  };

  const handleDelete = async (id) => {
    setShowDeleteModal(false);
    setSubmitting(true);

    try {
      const response = await fetch(`${BASE_URL}/blog/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        showToast("Blog deleted successfully!", "success");
        fetchBlogs();
      } else {
        showToast("Failed to delete blog", "error");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      showToast("Error deleting blog", "error");
    } finally {
      setSubmitting(false);
      setSelectedBlog(null);
    }
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
    setShowViewModal(true);
  };

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setEditMode(true);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      desc: blog.desc || "",
      category: blog.category || "General",
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      keywords: blog.keywords || "",
      canonicalUrl: blog.canonicalUrl || "",
      ogTitle: blog.ogTitle || "",
      ogDescription: blog.ogDescription || "",
      published: blog.published || false,
    });
    setImagePreview(blog.image || null);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.desc) {
      showToast("Please fill all required fields", "error");
      return;
    }

    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append("title", formData.title);
      formDataToSend.append("slug", formData.slug);
      formDataToSend.append("desc", formData.desc);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("metaTitle", formData.metaTitle);
      formDataToSend.append("metaDescription", formData.metaDescription);
      formDataToSend.append("keywords", formData.keywords);
      formDataToSend.append("canonicalUrl", formData.canonicalUrl);
      formDataToSend.append("ogTitle", formData.ogTitle);
      formDataToSend.append("ogDescription", formData.ogDescription);
      formDataToSend.append("published", formData.published);

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const response = await fetch(`${BASE_URL}/blog/update/${selectedBlog._id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        showToast("Blog updated successfully!", "success");
        setShowEditModal(false);
        resetForm();
        fetchBlogs();
      } else {
        showToast(data.message || "Failed to update blog", "error");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      showToast("Error updating blog. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (blog) => {
    setSelectedBlog(blog);
    setShowDeleteModal(true);
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-[60] animate-slide-in">
          <div
            className={`px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${
              toast.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <span className="text-lg">
              {toast.type === "success" ? "✓" : "✕"}
            </span>
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Blog Management
            </h1>
            <p className="text-gray-600">Create and manage blog posts</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <FaPlus />
            Create New Blog
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search blogs by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">
                Total Blogs
              </p>
              <p className="text-3xl font-bold text-gray-900">{blogs.length}</p>
            </div>
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaBlog className="text-2xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">
                Published
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {blogs.filter((b) => b.published === true).length}
              </p>
            </div>
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <FaEye className="text-2xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Drafts</p>
              <p className="text-3xl font-bold text-gray-900">
                {blogs.filter((b) => b.published === false).length}
              </p>
            </div>
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaEdit className="text-2xl text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blogs...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-12 text-center">
            <FaBlog className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No blogs found</p>
            <p className="text-gray-400 text-sm mt-2">
              {searchTerm
                ? "Try adjusting your search"
                : "Create your first blog post to get started"}
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Create New Blog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredBlogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                {/* Blog Image */}
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                  {blog.image ? (
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaBlog className="text-6xl text-white opacity-50" />
                  )}
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        blog.published
                          ? "bg-green-100 text-green-600"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {blog.published ? "Published" : "Draft"}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <FaCalendar className="mr-2" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {blog.desc || blog.description}
                  </p>
                  {blog.category && (
                    <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded mb-2">
                      {blog.category}
                    </span>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleView(blog)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200 font-medium"
                    >
                      <FaEye />
                      View
                    </button>
                    <button 
                      onClick={() => handleEditClick(blog)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors duration-200 font-medium"
                    >
                      <FaEdit />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(blog)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Blog Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Create New Blog
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Basic Information
                </h3>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter blog title"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="blog-url-slug"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL-friendly version of the title (auto-generated)
                  </p>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="General">General</option>
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="SEO">SEO</option>
                    <option value="Tutorial">Tutorial</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="desc"
                    value={formData.desc}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Write your blog content here..."
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex-1 flex flex-col items-center px-4 py-6 bg-white border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                      <FaImage className="text-3xl text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        {imageFile ? imageFile.name : "Click to upload image"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        required
                      />
                    </label>
                    {imagePreview && (
                      <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-300">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Published Status */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="published"
                    id="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="published" className="text-sm font-medium text-gray-700">
                    Publish immediately
                  </label>
                </div>
              </div>

              {/* SEO Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  SEO Settings
                </h3>

                {/* Meta Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Leave empty to use blog title"
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="SEO description (recommended: 150-160 characters)"
                  />
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                {/* Canonical URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Canonical URL
                  </label>
                  <input
                    type="url"
                    name="canonicalUrl"
                    value={formData.canonicalUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/blog/post"
                  />
                </div>
              </div>

              {/* Open Graph Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Open Graph (Social Media)
                </h3>

                {/* OG Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OG Title
                  </label>
                  <input
                    type="text"
                    name="ogTitle"
                    value={formData.ogTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Leave empty to use blog title"
                  />
                </div>

                {/* OG Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OG Description
                  </label>
                  <textarea
                    name="ogDescription"
                    value={formData.ogDescription}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Description for social media sharing"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Create Blog
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Blog Modal */}
      {showViewModal && selectedBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">View Blog</h2>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedBlog(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              {/* Image */}
              {selectedBlog.image && (
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <img
                    src={selectedBlog.image}
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Title</h3>
                  <p className="text-lg font-semibold text-gray-900">{selectedBlog.title}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Slug</h3>
                  <p className="text-gray-700">{selectedBlog.slug}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Category</h3>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    {selectedBlog.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    selectedBlog.published ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                  }`}>
                    {selectedBlog.published ? "Published" : "Draft"}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedBlog.desc}</p>
                </div>

                {/* SEO Info */}
                {(selectedBlog.metaTitle || selectedBlog.metaDescription || selectedBlog.keywords) && (
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">SEO Information</h3>
                    
                    {selectedBlog.metaTitle && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Meta Title</h4>
                        <p className="text-gray-700">{selectedBlog.metaTitle}</p>
                      </div>
                    )}

                    {selectedBlog.metaDescription && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Meta Description</h4>
                        <p className="text-gray-700">{selectedBlog.metaDescription}</p>
                      </div>
                    )}

                    {selectedBlog.keywords && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Keywords</h4>
                        <p className="text-gray-700">{selectedBlog.keywords}</p>
                      </div>
                    )}

                    {selectedBlog.canonicalUrl && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-500 mb-1">Canonical URL</h4>
                        <a href={selectedBlog.canonicalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {selectedBlog.canonicalUrl}
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Timestamps */}
                <div className="border-t pt-4 flex gap-6 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">Created:</span> {new Date(selectedBlog.createdAt).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Updated:</span> {new Date(selectedBlog.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedBlog(null);
                }}
                className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Blog Modal */}
      {showEditModal && selectedBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Edit Blog</h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Form - Same as Create but with handleUpdate */}
            <form onSubmit={handleUpdate} className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Basic Information
                </h3>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter blog title"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="blog-url-slug"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="General">General</option>
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="SEO">SEO</option>
                    <option value="Tutorial">Tutorial</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="desc"
                    value={formData.desc}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Write your blog content here..."
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image {!imagePreview && <span className="text-red-500">*</span>}
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex-1 flex flex-col items-center px-4 py-6 bg-white border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                      <FaImage className="text-3xl text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        {imageFile ? imageFile.name : "Click to upload new image"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    {imagePreview && (
                      <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-300">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Published Status */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="published"
                    id="published-edit"
                    checked={formData.published}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="published-edit" className="text-sm font-medium text-gray-700">
                    Published
                  </label>
                </div>
              </div>

              {/* SEO Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  SEO Settings
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                  <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                  <input
                    type="text"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Canonical URL</label>
                  <input
                    type="url"
                    name="canonicalUrl"
                    value={formData.canonicalUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Open Graph Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                  Open Graph (Social Media)
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">OG Title</label>
                  <input
                    type="text"
                    name="ogTitle"
                    value={formData.ogTitle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">OG Description</label>
                  <textarea
                    name="ogDescription"
                    value={formData.ogDescription}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Update Blog
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
              <FaTrash className="text-3xl text-red-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Delete Blog?
            </h2>
            
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete "<strong>{selectedBlog.title}</strong>"? This action cannot be undone.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedBlog(null);
                }}
                disabled={submitting}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedBlog._id)}
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
