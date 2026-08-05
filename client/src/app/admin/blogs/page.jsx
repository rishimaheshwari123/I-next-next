"use client";
import React, { useState, useEffect, useRef } from "react";
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
  FaUndo,
  FaRedo,
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaCode,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaMinus,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaLink,
  FaEraser,
  FaArrowLeft,
  FaChevronDown,
  FaGlobe,
} from "react-icons/fa";
import { BASE_URL } from "@/config/api";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [currentView, setCurrentView] = useState("list"); // "list", "create", "edit"
  const [selectedBlog, setSelectedBlog] = useState(null);
  
  // Editor and preview tab state
  const [editorTab, setEditorTab] = useState("editor"); // "editor", "html", "preview"
  
  // Tag input state
  const [tagInput, setTagInput] = useState("");

  // Blog Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    desc: "", // rich text html content
    category: "Venue Tips",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    published: false,
    
    // New Fields
    shortDescription: "",
    author: "Admin",
    tags: [],
    altText: "",
    focusKeyword: "",
    noIndex: false,
    faqs: [], // Array of { question, answer }
    articleSchema: true,
    faqSchema: false,
    breadcrumbSchema: true
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const editorRef = useRef(null);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Sync contentEditable content on view switch or blog load
  useEffect(() => {
    if (editorRef.current && (currentView === "create" || currentView === "edit")) {
      if (editorRef.current.innerHTML !== formData.desc) {
        editorRef.current.innerHTML = formData.desc || "";
      }
    }
  }, [currentView, selectedBlog]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
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

  // Word & Character Counter
  const getWordCharCount = () => {
    const text = formData.desc ? formData.desc.replace(/<[^>]*>/g, " ") : "";
    const cleanText = text.trim();
    const words = cleanText ? cleanText.split(/\s+/).length : 0;
    const chars = cleanText.length;
    return { words, chars };
  };

  // Dynamic Read Time Calculator
  const getReadTime = () => {
    const { words } = getWordCharCount();
    const wpm = 200; // Average reading speed
    const minutes = Math.ceil(words / wpm);
    return `${minutes} min read`;
  };

  // Dynamic SEO Score Calculation
  const calculateSEOScore = () => {
    let score = 0;
    const suggestions = [];

    // Focus Keyword presence (+15)
    if (formData.focusKeyword.trim()) {
      score += 15;
      
      // Keyword in Title (+15)
      if (formData.title.toLowerCase().includes(formData.focusKeyword.toLowerCase())) {
        score += 15;
      } else {
        suggestions.push("Focus keyword not found in the Title.");
      }

      // Keyword in Meta Description (+15)
      if (formData.metaDescription.toLowerCase().includes(formData.focusKeyword.toLowerCase())) {
        score += 15;
      } else {
        suggestions.push("Focus keyword not found in the Meta Description.");
      }

      // Keyword in Content Body (+15)
      if (formData.desc.toLowerCase().includes(formData.focusKeyword.toLowerCase())) {
        score += 15;
      } else {
        suggestions.push("Focus keyword not found in the blog content.");
      }
    } else {
      score += 0;
      suggestions.push("Set a focus keyword to evaluate search optimization.");
    }

    // Meta Title length check (+10)
    if (formData.metaTitle.trim()) {
      const len = formData.metaTitle.length;
      if (len >= 40 && len <= 60) {
        score += 10;
      } else {
        score += 5;
        suggestions.push(`Meta Title should be 40-60 characters (currently ${len}).`);
      }
    } else {
      suggestions.push("Define a Meta Title for search results preview.");
    }

    // Meta Description length check (+10)
    if (formData.metaDescription.trim()) {
      const len = formData.metaDescription.length;
      if (len >= 120 && len <= 160) {
        score += 10;
      } else {
        score += 5;
        suggestions.push(`Meta Description should be 120-160 characters (currently ${len}).`);
      }
    } else {
      suggestions.push("Define a Meta Description to optimize SERP snippet.");
    }

    // Short Description (+10)
    if (formData.shortDescription.trim()) {
      score += 10;
    } else {
      suggestions.push("Add a short description for cards listing.");
    }

    // Image Alt text check (+10)
    if (formData.altText.trim()) {
      score += 10;
    } else {
      suggestions.push("Add Image Alt text for accessibility and search ranking.");
    }

    // Tags (+10)
    if (formData.tags && formData.tags.length >= 2) {
      score += 10;
    } else if (formData.tags && formData.tags.length > 0) {
      score += 5;
      suggestions.push("Add at least 2 tags to group relevant content.");
    } else {
      suggestions.push("Add tags to classify this blog post.");
    }

    return { score, suggestions };
  };

  // Rich Editor Formatting Actions
  const execEditorCommand = (command, value = null) => {
    if (typeof document !== "undefined" && editorRef.current) {
      document.execCommand(command, false, value);
      updateDescFromEditor();
    }
  };

  const updateDescFromEditor = () => {
    if (editorRef.current) {
      setFormData(prev => ({
        ...prev,
        desc: editorRef.current.innerHTML
      }));
    }
  };

  // Tag Helpers
  const handleAddTag = (e) => {
    e.preventDefault();
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    }));
  };

  // FAQ Helpers
  const handleAddFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }]
    }));
  };

  const handleRemoveFaq = (index) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, idx) => idx !== index)
    }));
  };

  const handleFaqChange = (index, field, value) => {
    setFormData(prev => {
      const updatedFaqs = [...prev.faqs];
      updatedFaqs[index] = {
        ...updatedFaqs[index],
        [field]: value
      };
      return {
        ...prev,
        faqs: updatedFaqs
      };
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      desc: "",
      category: "Venue Tips",
      metaTitle: "",
      metaDescription: "",
      keywords: "",
      canonicalUrl: "",
      ogTitle: "",
      ogDescription: "",
      published: false,
      shortDescription: "",
      author: "Admin",
      tags: [],
      altText: "",
      focusKeyword: "",
      noIndex: false,
      faqs: [],
      articleSchema: true,
      faqSchema: false,
      breadcrumbSchema: true
    });
    setImageFile(null);
    setImagePreview(null);
    setSelectedBlog(null);
    setEditorTab("editor");
  };

  const handleCreateNewClick = () => {
    resetForm();
    setCurrentView("create");
  };

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      desc: blog.desc || "",
      category: blog.category || "Venue Tips",
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
      keywords: blog.keywords || "",
      canonicalUrl: blog.canonicalUrl || "",
      ogTitle: blog.ogTitle || "",
      ogDescription: blog.ogDescription || "",
      published: blog.published || false,
      shortDescription: blog.shortDescription || "",
      author: blog.author || "Admin",
      tags: blog.tags || [],
      altText: blog.altText || "",
      focusKeyword: blog.focusKeyword || "",
      noIndex: blog.noIndex || false,
      faqs: blog.faqs || [],
      articleSchema: blog.articleSchema !== undefined ? blog.articleSchema : true,
      faqSchema: blog.faqSchema || false,
      breadcrumbSchema: blog.breadcrumbSchema !== undefined ? blog.breadcrumbSchema : true
    });
    setImagePreview(blog.image || null);
    setCurrentView("edit");
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.slug || !formData.desc) {
      showToast("Please fill all required fields (Title, Slug, Body Content)", "error");
      return;
    }
    
    if (currentView === "create" && !imageFile) {
      showToast("Please select a featured image", "error");
      return;
    }

    setSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Append core fields
      formDataToSend.append("title", formData.title);
      formDataToSend.append("slug", formData.slug);
      formDataToSend.append("desc", formData.desc);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("metaTitle", formData.metaTitle || formData.title);
      formDataToSend.append("metaDescription", formData.metaDescription || formData.shortDescription);
      formDataToSend.append("keywords", formData.keywords);
      formDataToSend.append("canonicalUrl", formData.canonicalUrl);
      formDataToSend.append("ogTitle", formData.ogTitle || formData.title);
      formDataToSend.append("ogDescription", formData.ogDescription || formData.shortDescription);
      formDataToSend.append("published", formData.published);
      
      // Append new fields
      formDataToSend.append("shortDescription", formData.shortDescription);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("altText", formData.altText);
      formDataToSend.append("focusKeyword", formData.focusKeyword);
      formDataToSend.append("noIndex", formData.noIndex);
      formDataToSend.append("articleSchema", formData.articleSchema);
      formDataToSend.append("faqSchema", formData.faqSchema);
      formDataToSend.append("breadcrumbSchema", formData.breadcrumbSchema);
      formDataToSend.append("tags", JSON.stringify(formData.tags));
      formDataToSend.append("faqs", JSON.stringify(formData.faqs));

      // Append image
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const url = currentView === "create" 
        ? `${BASE_URL}/blog/create`
        : `${BASE_URL}/blog/update/${selectedBlog._id}`;
      
      const method = currentView === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        showToast(
          currentView === "create" ? "Blog created successfully!" : "Blog updated successfully!",
          "success"
        );
        setCurrentView("list");
        resetForm();
        fetchBlogs();
      } else {
        showToast(data.message || "Operation failed", "error");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
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

  const handleDeleteClick = (blog) => {
    setSelectedBlog(blog);
    setShowDeleteModal(true);
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.desc?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { score: seoScore, suggestions: seoSuggestions } = calculateSEOScore();

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-[60] animate-slide-in">
          <div
            className={`px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${
              toast.type === "success"
                ? "bg-green-500 text-white"
                : toast.type === "info"
                ? "bg-blue-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <span className="text-lg">
              {toast.type === "success" ? "✓" : toast.type === "info" ? "ℹ" : "✕"}
            </span>
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      {currentView === "list" ? (
        <>
          {/* Header */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Blog Management
                </h1>
                <p className="text-gray-600">Create, edit and manage seo optimized blog posts</p>
              </div>
              <button
                onClick={handleCreateNewClick}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-750 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
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
                placeholder="Search blogs by title or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Stats Grid */}
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
                  onClick={handleCreateNewClick}
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
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex flex-col justify-between"
                  >
                    {/* Blog Image */}
                    <div>
                      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-650 flex items-center justify-center overflow-hidden relative">
                        {blog.image ? (
                          <img 
                            src={blog.image} 
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FaBlog className="text-6xl text-white opacity-50" />
                        )}
                        {blog.focusKeyword && (
                          <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold shadow">
                            🔑 {blog.focusKeyword}
                          </span>
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
                          <div className="flex items-center text-gray-500 text-xs font-semibold">
                            <FaCalendar className="mr-2" />
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-3 mb-4 font-normal">
                          {blog.shortDescription || blog.desc?.replace(/<[^>]*>/g, " ")}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {blog.category && (
                            <span className="inline-block px-2.5 py-0.5 bg-blue-55 text-blue-700 text-xs font-semibold rounded">
                              {blog.category}
                            </span>
                          )}
                          {blog.author && (
                            <span className="inline-block px-2.5 py-0.5 bg-slate-100 text-gray-700 text-xs font-semibold rounded">
                              👤 {blog.author}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-gray-100 flex items-center gap-2">
                      <button 
                        onClick={() => handleEditClick(blog)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-semibold text-sm"
                      >
                        <FaEdit />
                        Edit / Customize
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(blog)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                        title="Delete Post"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        /* Workspace Editor View - Matches Screenshots Exactly */
        <div className="min-h-screen bg-slate-50 rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          
          {/* Top Bar Workspace Navigation */}
          <div className="bg-white border-b border-gray-200 p-4 px-6 sticky top-0 z-30 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setCurrentView("list");
                  resetForm();
                }}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold transition-all"
              >
                <FaArrowLeft /> Back to Blogs
              </button>
              <div className="h-6 w-[1px] bg-gray-300"></div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {currentView === "create" ? "New Blog Post" : "Edit Blog Post"}
                </h2>
                <p className="text-xs text-gray-500">{formData.title || "Untitled"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Draft/Published Selector */}
              <select
                name="published"
                value={formData.published}
                onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.value === "true" }))}
                className="px-3.5 py-2 border border-gray-300 rounded-lg font-semibold text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="false">Draft</option>
                <option value="true">Published</option>
              </select>

              <button
                onClick={() => handleSubmit()}
                disabled={submitting}
                className="px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-sm shadow hover:shadow-md hover:from-orange-600 hover:to-orange-700 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave />
                    {currentView === "create" ? "Create Blog" : "Save Blog"}
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* LEFT COLUMN: EDITOR & FAQ */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Heading Block */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full text-3xl font-bold border-none outline-none focus:ring-0 placeholder-gray-300 p-0"
                    placeholder="Blog Title..."
                    required
                  />
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                    <span className="font-mono">
                      Slug: <span className="text-gray-400">{formData.slug || "auto-generated-slug"}</span>
                    </span>
                    <span className="font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                      {getReadTime()}
                    </span>
                  </div>
                </div>

                {/* Editor Tabs and Workspace */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[550px]">
                  
                  {/* Tab Selector */}
                  <div className="flex border-b border-gray-200 bg-gray-50/50">
                    {["editor", "html", "preview"].map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setEditorTab(tab)}
                        className={`px-6 py-3.5 text-sm font-bold border-b-2 capitalize transition-all focus:outline-none ${
                          editorTab === tab
                            ? "border-orange-500 text-orange-600 bg-white"
                            : "border-transparent text-gray-500 hover:text-gray-800"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Editor Toolbars */}
                  {editorTab === "editor" && (
                    <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 bg-gray-50/20 text-gray-600">
                      <button type="button" onClick={() => execEditorCommand("undo")} className="p-2 hover:bg-gray-100 rounded" title="Undo"><FaUndo size={13} /></button>
                      <button type="button" onClick={() => execEditorCommand("redo")} className="p-2 hover:bg-gray-100 rounded" title="Redo"><FaRedo size={13} /></button>
                      <div className="w-[1px] h-6 bg-gray-200 mx-1 align-self-center"></div>
                      
                      <button type="button" onClick={() => execEditorCommand("formatBlock", "<h1>")} className="px-2 py-1 text-xs font-extrabold hover:bg-gray-100 rounded" title="H1">H1</button>
                      <button type="button" onClick={() => execEditorCommand("formatBlock", "<h2>")} className="px-2 py-1 text-xs font-extrabold hover:bg-gray-100 rounded" title="H2">H2</button>
                      <button type="button" onClick={() => execEditorCommand("formatBlock", "<h3>")} className="px-2 py-1 text-xs font-extrabold hover:bg-gray-100 rounded" title="H3">H3</button>
                      <div className="w-[1px] h-6 bg-gray-200 mx-1 align-self-center"></div>

                      <button type="button" onClick={() => execEditorCommand("bold")} className="p-2 hover:bg-gray-100 rounded font-bold" title="Bold"><FaBold size={13} /></button>
                      <button type="button" onClick={() => execEditorCommand("italic")} className="p-2 hover:bg-gray-100 rounded italic" title="Italic"><FaItalic size={13} /></button>
                      <button type="button" onClick={() => execEditorCommand("underline")} className="p-2 hover:bg-gray-100 rounded underline" title="Underline"><FaUnderline size={13} /></button>
                      <button type="button" onClick={() => execEditorCommand("strikeThrough")} className="p-2 hover:bg-gray-100 rounded line-through" title="Strikethrough"><FaStrikethrough size={13} /></button>
                      <button type="button" onClick={() => execEditorCommand("formatBlock", "<pre>")} className="p-2 hover:bg-gray-100 rounded" title="Code Block"><FaCode size={13} /></button>
                      <div className="w-[1px] h-6 bg-gray-200 mx-1 align-self-center"></div>

                      <button type="button" onClick={() => execEditorCommand("insertUnorderedList")} className="p-2 hover:bg-gray-100 rounded" title="Unordered List"><FaListUl size={13} /></button>
                      <button type="button" onClick={() => execEditorCommand("insertOrderedList")} className="p-2 hover:bg-gray-100 rounded" title="Ordered List"><FaListOl size={13} /></button>
                      <button type="button" onClick={() => execEditorCommand("formatBlock", "<blockquote>")} className="p-2 hover:bg-gray-100 rounded" title="Quote"><FaQuoteRight size={13} /></button>
                      <button type="button" onClick={() => execEditorCommand("insertHorizontalRule")} className="p-2 hover:bg-gray-100 rounded" title="Horizontal Rule"><FaMinus size={13} /></button>
                      <div className="w-[1px] h-6 bg-gray-200 mx-1 align-self-center"></div>

                      <button type="button" onClick={() => execEditorCommand("justifyLeft")} className="p-2 hover:bg-gray-100 rounded" title="Align Left"><FaAlignLeft size={13} /></button>
                      <button type="button" onClick={() => execEditorCommand("justifyCenter")} className="p-2 hover:bg-gray-100 rounded" title="Align Center"><FaAlignCenter size={13} /></button>
                      <button type="button" onClick={() => execEditorCommand("justifyRight")} className="p-2 hover:bg-gray-100 rounded" title="Align Right"><FaAlignRight size={13} /></button>
                      <button type="button" onClick={() => execEditorCommand("justifyFull")} className="p-2 hover:bg-gray-100 rounded" title="Justify"><FaAlignJustify size={13} /></button>
                      <div className="w-[1px] h-6 bg-gray-200 mx-1 align-self-center"></div>

                      <button type="button" onClick={() => {
                        const url = prompt("Enter hyperlink URL:");
                        if (url) execEditorCommand("createLink", url);
                      }} className="p-2 hover:bg-gray-100 rounded" title="Insert Link"><FaLink size={13} /></button>
                      
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          const savedRange = (() => {
                            if (typeof window !== "undefined") {
                              const sel = window.getSelection();
                              if (sel.rangeCount > 0) {
                                const range = sel.getRangeAt(0);
                                if (editorRef.current && editorRef.current.contains(range.commonAncestorContainer)) {
                                  return range;
                                }
                              }
                            }
                            return null;
                          })();

                          const input = document.createElement("input");
                          input.type = "file";
                          input.accept = "image/*";
                          input.onchange = async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;

                            showToast("Uploading image...", "info");

                            try {
                              const formDataToSend = new FormData();
                              formDataToSend.append("thumbnail", file);

                              const response = await fetch(`${BASE_URL}/image/upload`, {
                                method: "POST",
                                body: formDataToSend,
                              });

                              const data = await response.json();
                              if (data.success && data.thumbnailImage && data.thumbnailImage.secure_url) {
                                const imageUrl = data.thumbnailImage.secure_url;
                                
                                const img = document.createElement("img");
                                img.src = imageUrl;
                                img.alt = "Uploaded image";
                                img.style.maxWidth = "100%";
                                img.style.height = "auto";
                                img.style.margin = "1rem 0";
                                img.style.borderRadius = "0.5rem";
                                img.style.display = "block";

                                if (savedRange) {
                                  savedRange.deleteContents();
                                  savedRange.insertNode(img);

                                  const newRange = document.createRange();
                                  newRange.setStartAfter(img);
                                  newRange.collapse(true);

                                  const sel = window.getSelection();
                                  sel.removeAllRanges();
                                  sel.addRange(newRange);
                                } else if (editorRef.current) {
                                  editorRef.current.appendChild(img);
                                }
                                
                                if (editorRef.current) {
                                  editorRef.current.focus();
                                }
                                updateDescFromEditor();
                                showToast("Image uploaded successfully!", "success");
                              } else {
                                showToast(data.message || "Failed to upload image", "error");
                              }
                            } catch (error) {
                              console.error("Error uploading image to editor:", error);
                              showToast("Error uploading image", "error");
                            }
                          };
                          input.click();
                        }}
                        className="p-2 hover:bg-gray-100 rounded"
                        title="Upload Image"
                      >
                        <FaImage size={13} />
                      </button>

                      <button type="button" onClick={() => execEditorCommand("removeFormat")} className="p-2 hover:bg-gray-100 rounded" title="Clear Formatting"><FaEraser size={13} /></button>

                      {/* Character/Word Stats */}
                      <span className="ml-auto mr-2 py-2 text-[11px] font-semibold text-gray-400">
                        {getWordCharCount().words} words · {getWordCharCount().chars} chars
                      </span>
                    </div>
                  )}

                  {/* Tab Contents */}
                  <div className="flex-1 p-6 min-h-[400px]">
                    {editorTab === "editor" && (
                      <div
                        ref={editorRef}
                        contentEditable
                        onInput={updateDescFromEditor}
                        className="w-full h-full min-h-[380px] focus:outline-none overflow-y-auto text-gray-800 leading-relaxed font-sans text-base prose prose-slate max-w-none"
                        style={{ border: "none" }}
                      ></div>
                    )}

                    {editorTab === "html" && (
                      <textarea
                        name="desc"
                        value={formData.desc}
                        onChange={handleInputChange}
                        className="w-full h-full min-h-[380px] p-4 font-mono text-sm text-gray-700 bg-gray-50 border border-gray-250 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-y"
                        placeholder="<html>Write or paste HTML code here</html>"
                      ></textarea>
                    )}

                    {editorTab === "preview" && (
                      <div
                        className="w-full h-full min-h-[380px] prose prose-orange max-w-none overflow-y-auto"
                        dangerouslySetInnerHTML={{ __html: formData.desc || "<p className='text-gray-400 italic'>No content written yet</p>" }}
                      />
                    )}
                  </div>
                </div>

                {/* Short Description */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Short Description <span className="text-gray-400 font-normal">(shown in blog cards)</span>
                  </label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm text-gray-700"
                    placeholder="Brief summary of the blog post..."
                  />
                </div>

                {/* FAQ Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">FAQ Section</h3>
                    <button
                      type="button"
                      onClick={handleAddFaq}
                      className="px-3.5 py-1.5 bg-orange-50 text-orange-600 rounded-lg border border-orange-100 hover:bg-orange-100 transition-all font-bold text-xs flex items-center gap-1"
                    >
                      <FaPlus /> Add FAQ
                    </button>
                  </div>

                  {formData.faqs.length === 0 ? (
                    <p className="text-sm text-gray-400 italic text-center py-4">No FAQs added yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {formData.faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 p-4 rounded-xl relative bg-gray-50/30">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                              FAQ {index + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFaq(index)}
                              className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                              title="Delete FAQ"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm font-semibold text-gray-800"
                              placeholder="Question..."
                            />
                            <textarea
                              value={faq.answer}
                              onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                              rows="2"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm text-gray-700"
                              placeholder="Answer..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* RIGHT COLUMN: SETTINGS, SEO, AND SCHEMA */}
              <div className="space-y-6">

                {/* SEO Score Block */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-base font-bold text-gray-800">SEO Score</span>
                    <span className={`text-2xl font-black ${
                      seoScore >= 80 ? "text-green-600" : seoScore >= 50 ? "text-orange-500" : "text-red-500"
                    }`}>
                      {seoScore}/100
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        seoScore >= 80 ? "bg-green-500" : seoScore >= 50 ? "bg-orange-500" : "bg-red-500"
                      }`} 
                      style={{ width: `${Math.min(100, seoScore)}%` }}
                    ></div>
                  </div>

                  {/* Suggestion list */}
                  {seoSuggestions.length > 0 && (
                    <div className="space-y-2 mt-4 max-h-[150px] overflow-y-auto">
                      {seoSuggestions.map((sug, idx) => (
                        <div key={idx} className="flex gap-2 items-start text-xs text-red-500">
                          <span className="mt-0.5">⚠️</span>
                          <span className="leading-tight font-medium">{sug}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {seoSuggestions.length === 0 && (
                    <div className="flex gap-2 items-center text-xs text-green-600 font-bold bg-green-50 p-2 rounded-lg mt-2">
                      <span>🎉 Awesome! Your post satisfies all basic SEO metrics.</span>
                    </div>
                  )}
                </div>

                {/* Post Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b pb-2">
                    Post Settings
                  </h3>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Venue Tips">Venue Tips</option>
                      <option value="Technology">Technology</option>
                      <option value="Business">Business</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Design">Design</option>
                      <option value="Development">Development</option>
                      <option value="SEO">SEO</option>
                      <option value="Tutorial">Tutorial</option>
                    </select>
                  </div>

                  {/* Author */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700"
                      placeholder="e.g. Admin"
                    />
                  </div>

                  {/* Tags input */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">
                      Tags
                    </label>
                    <form onSubmit={handleAddTag} className="flex gap-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        className="flex-1 px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700"
                        placeholder="Add tag..."
                      />
                      <button
                        type="submit"
                        className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-gray-300 rounded-lg font-bold text-xs text-gray-800 transition-all"
                      >
                        Add
                      </button>
                    </form>
                    
                    {/* Tags display */}
                    {formData.tags && formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {formData.tags.map((tag) => (
                          <span
                            key={tag}
                            onClick={() => handleRemoveTag(tag)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-orange-50 border border-orange-100 text-orange-700 text-xs font-bold cursor-pointer hover:bg-orange-100 transition-all"
                            title="Click to remove tag"
                          >
                            {tag} <span className="opacity-60 text-[9px]">✕</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Featured Image */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b pb-2">
                    Featured Image
                  </h3>

                  <div className="space-y-3">
                    <label className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-xl px-4 py-8 cursor-pointer hover:bg-gray-50 transition-all bg-white relative overflow-hidden min-h-[140px]">
                      {imagePreview ? (
                        <div className="absolute inset-0 w-full h-full bg-slate-100">
                          <img
                            src={imagePreview}
                            alt="Featured preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-all text-white font-bold text-xs">
                            Change Image
                          </div>
                        </div>
                      ) : (
                        <>
                          <FaImage className="text-3xl text-gray-300 mb-2" />
                          <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Click to upload</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>

                    {/* Image Alt Text */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                        Alt Text
                      </label>
                      <input
                        type="text"
                        name="altText"
                        value={formData.altText}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700"
                        placeholder="Describe the image..."
                      />
                    </div>
                  </div>
                </div>

                {/* SEO Settings & Google Preview */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b pb-2 flex items-center gap-1.5">
                    <FaGlobe className="text-orange-500" /> SEO Settings
                  </h3>

                  {/* Focus Keyword */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                      Focus Keyword
                    </label>
                    <input
                      type="text"
                      name="focusKeyword"
                      value={formData.focusKeyword}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700"
                      placeholder="e.g. venue booking tips"
                    />
                  </div>

                  {/* Meta Title */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase">
                        Meta Title
                      </label>
                      <span className={`text-[10px] font-mono ${
                        formData.metaTitle.length >= 40 && formData.metaTitle.length <= 60 ? "text-green-600 font-bold" : "text-gray-400"
                      }`}>
                        ({formData.metaTitle.length}/60)
                      </span>
                    </div>
                    <input
                      type="text"
                      name="metaTitle"
                      value={formData.metaTitle}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700"
                      placeholder="Leave empty to use title"
                    />
                  </div>

                  {/* Meta Description */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-semibold text-gray-500 uppercase">
                        Meta Description
                      </label>
                      <span className={`text-[10px] font-mono ${
                        formData.metaDescription.length >= 120 && formData.metaDescription.length <= 160 ? "text-green-600 font-bold" : "text-gray-400"
                      }`}>
                        ({formData.metaDescription.length}/160)
                      </span>
                    </div>
                    <textarea
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700"
                      placeholder="Meta description..."
                    />
                  </div>

                  {/* Canonical URL */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                      Canonical URL
                    </label>
                    <input
                      type="url"
                      name="canonicalUrl"
                      value={formData.canonicalUrl}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700"
                      placeholder="https://..."
                    />
                  </div>

                  {/* Google Preview */}
                  <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Google Preview</p>
                    <div className="space-y-1 font-sans">
                      <h4 className="text-blue-800 text-base font-bold hover:underline leading-snug break-words">
                        {formData.metaTitle || formData.title || "Blog Title"}
                      </h4>
                      <p className="text-green-700 text-xs truncate">
                        rentalmeet.com/blog/{formData.slug || "slug"}
                      </p>
                      <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                        {formData.metaDescription || formData.shortDescription || "Meta description..."}
                      </p>
                    </div>
                  </div>

                  {/* OG Title */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                      OG Title
                    </label>
                    <input
                      type="text"
                      name="ogTitle"
                      value={formData.ogTitle}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700"
                      placeholder="Facebook open graph title"
                    />
                  </div>

                  {/* OG Description */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                      OG Description
                    </label>
                    <textarea
                      name="ogDescription"
                      value={formData.ogDescription}
                      onChange={handleInputChange}
                      rows="2"
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700"
                      placeholder="Description for social sharing"
                    />
                  </div>

                  {/* No Index Toggle */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="noIndex"
                      name="noIndex"
                      checked={formData.noIndex}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="noIndex" className="text-xs font-semibold text-gray-600 cursor-pointer">
                      No Index (hide from search engines)
                    </label>
                  </div>
                </div>

                {/* Schema Markup Block - Custom Switches */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b pb-2">
                    Schema Markup
                  </h3>

                  {/* Article Schema */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Article Schema</p>
                      <p className="text-[10px] text-gray-500">Inject structured Article metadata</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, articleSchema: !prev.articleSchema }))}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        formData.articleSchema ? "bg-orange-500" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          formData.articleSchema ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* FAQ Page Schema */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">FAQ Page Schema</p>
                      <p className="text-[10px] text-gray-500">Inject dynamic FAQ structured code</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, faqSchema: !prev.faqSchema }))}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        formData.faqSchema ? "bg-orange-500" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          formData.faqSchema ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Breadcrumb Schema */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Breadcrumb Schema</p>
                      <p className="text-[10px] text-gray-500">Inject post navigation schema</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, breadcrumbSchema: !prev.breadcrumbSchema }))}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        formData.breadcrumbSchema ? "bg-orange-500" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          formData.breadcrumbSchema ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
              <FaTrash className="text-3xl text-red-650" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Delete Blog?
            </h2>
            
            <p className="text-gray-600 text-center mb-6 text-sm">
              Are you sure you want to delete "<strong>{selectedBlog.title}</strong>"? This action cannot be undone.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedBlog(null);
                }}
                disabled={submitting}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedBlog._id)}
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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
