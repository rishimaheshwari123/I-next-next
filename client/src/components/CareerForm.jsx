"use client";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "@/config/api";
import { FaUser, FaEnvelope, FaPhone, FaBriefcase, FaMoneyBillWave, FaClock, FaGraduationCap, FaCalendar, FaUpload } from "react-icons/fa";

const CareerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    applicationFor: "",
    experienceType: "experienced", // default to experienced
    totalExperience: "",
    currentCTC: "",
    noticePeriod: "",
    currentCompany: "",
    highestEducation: "",
    passoutYear: "",
    technologies: [],
    resume: null,
  });

  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddTech = (e) => {
    e.preventDefault();
    const trimmed = techInput.trim();
    if (trimmed && !formData.technologies.includes(trimmed)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, trimmed]
      }));
      setTechInput("");
    }
  };

  const handleRemoveTech = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleTechKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTech(e);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          title: "Invalid File",
          text: "Please upload only PDF, DOC, or DOCX files",
          icon: "error",
        });
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: "File Too Large",
          text: "Please upload a file smaller than 5MB",
          icon: "error",
        });
        return;
      }
      setFormData({
        ...formData,
        resume: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.technologies.length === 0) {
      Swal.fire({
        title: "Missing Skills",
        text: "Please add at least one technology / skill that you work on.",
        icon: "warning",
        confirmButtonColor: "#2563EB",
      });
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("contact", formData.contact);
    data.append("applicationFor", formData.applicationFor);
    data.append("experienceType", formData.experienceType);
    
    // Clear experience fields if candidate is a fresher
    data.append("totalExperience", formData.experienceType === "fresher" ? "" : formData.totalExperience);
    data.append("currentCTC", formData.experienceType === "fresher" ? "" : formData.currentCTC);
    data.append("noticePeriod", formData.experienceType === "fresher" ? "" : formData.noticePeriod);
    data.append("currentCompany", formData.experienceType === "fresher" ? "" : formData.currentCompany);
    
    data.append("highestEducation", formData.highestEducation);
    data.append("passoutYear", formData.passoutYear);
    data.append("technologies", JSON.stringify(formData.technologies));
    data.append("resume", formData.resume);

    try {
      const response = await axios.post(
        `${BASE_URL}/contact/career`,
        data
      );

      if (response?.data?.success) {
        Swal.fire({
          title: "Application Submitted!",
          text: "Thank you for applying. We'll get back to you soon!",
          icon: "success",
          confirmButtonColor: "#2563EB",
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          contact: "",
          applicationFor: "",
          experienceType: "experienced",
          totalExperience: "",
          currentCTC: "",
          noticePeriod: "",
          currentCompany: "",
          highestEducation: "",
          passoutYear: "",
          technologies: [],
          resume: null,
        });
        setTechInput("");
        
        // Reset file input
        document.getElementById("resume").value = "";
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "#DC2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Application Form</h2>
          <p className="text-gray-600">Fill in your details and upload your resume</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="name">
                <FaUser className="inline mr-2 text-blue-600" />
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
                <FaEnvelope className="inline mr-2 text-blue-600" />
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="contact">
                <FaPhone className="inline mr-2 text-blue-600" />
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="contact"
                name="contact"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="+91 9876543210"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="applicationFor">
                <FaBriefcase className="inline mr-2 text-blue-600" />
                Position Applied For <span className="text-red-500">*</span>
              </label>
              <select
                id="applicationFor"
                name="applicationFor"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={formData.applicationFor}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Position --</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Graphic Designer">Graphic Designer</option>
                <option value="Mobile App Developer">Mobile App Developer</option>
                <option value="SEO Developer">SEO Developer</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="SEO Marketing">SEO Marketing</option>
                <option value="AI/ML Developer">AI/ML Developer</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="React JS Developer">React JS Developer</option>
                <option value="Node.js Developer">Node.js Developer</option>
                <option value="MERN Stack Developer">MERN Stack Developer</option>
                <option value="Content Writer">Content Writer</option>
                <option value="Social Media Manager">Social Media Manager</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Project Manager">Project Manager</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Cloud Engineer">Cloud Engineer</option>
              </select>
            </div>
          </div>

          {/* Professional Information */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Details</h3>

            {/* Experience Type Segmented Toggle */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, experienceType: "fresher" }))}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.experienceType === "fresher"
                    ? "border-blue-600 bg-blue-50/50 text-blue-700 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 text-gray-500"
                }`}
              >
                <FaGraduationCap className={`text-2xl mb-2 ${formData.experienceType === 'fresher' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-semibold text-sm">Fresher</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, experienceType: "experienced" }))}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                  formData.experienceType === "experienced"
                    ? "border-blue-600 bg-blue-50/50 text-blue-700 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 text-gray-500"
                }`}
              >
                <FaBriefcase className={`text-2xl mb-2 ${formData.experienceType === 'experienced' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-semibold text-sm">Experienced</span>
              </button>
            </div>
            
            {formData.experienceType === "experienced" && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Total Experience */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="totalExperience">
                    <FaBriefcase className="inline mr-2 text-orange-600" />
                    Total Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="totalExperience"
                    name="totalExperience"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    value={formData.totalExperience}
                    onChange={handleChange}
                    required={formData.experienceType === "experienced"}
                    placeholder="e.g., 3 years"
                  />
                </div>

                {/* Current Company */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="currentCompany">
                    <FaBriefcase className="inline mr-2 text-orange-600" />
                    Current Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="currentCompany"
                    name="currentCompany"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    value={formData.currentCompany}
                    onChange={handleChange}
                    required={formData.experienceType === "experienced"}
                    placeholder="e.g., ABC Technologies"
                  />
                </div>

                {/* Current CTC */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="currentCTC">
                    <FaMoneyBillWave className="inline mr-2 text-orange-600" />
                    Current CTC <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="currentCTC"
                    name="currentCTC"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    value={formData.currentCTC}
                    onChange={handleChange}
                    required={formData.experienceType === "experienced"}
                    placeholder="e.g., ₹5 LPA"
                  />
                </div>

                {/* Notice Period */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="noticePeriod">
                    <FaClock className="inline mr-2 text-orange-600" />
                    Notice Period <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="noticePeriod"
                    name="noticePeriod"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    value={formData.noticePeriod}
                    onChange={handleChange}
                    required={formData.experienceType === "experienced"}
                  >
                    <option value="">-- Select Notice Period --</option>
                    <option value="Immediate">Immediate</option>
                    <option value="15 Days">15 Days</option>
                    <option value="1 Month">1 Month</option>
                    <option value="2 Months">2 Months</option>
                    <option value="3 Months">3 Months</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Technologies / Skills */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Technologies / Skills</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="techInput">
                <FaBriefcase className="inline mr-2 text-blue-600" />
                Technologies You Work On <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="techInput"
                  name="techInput"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={handleTechKeyDown}
                  placeholder="e.g., React, Node.js, Express, Python (type and press Enter)"
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-sm"
                >
                  Add
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Type each technology/skill and press Enter or click Add to build your list.
              </p>

              {/* Technologies Badges */}
              {formData.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  {formData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-100 transition-all duration-200 hover:bg-blue-100"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(index)}
                        className="text-blue-500 hover:text-blue-700 font-bold focus:outline-none"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {formData.technologies.length === 0 && (
                <p className="text-sm text-red-500 mt-2">
                  Please add at least one technology.
                </p>
              )}
            </div>
          </div>

          {/* Educational Information */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Educational Details</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Highest Education */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="highestEducation">
                  <FaGraduationCap className="inline mr-2 text-blue-600" />
                  Highest Education <span className="text-red-500">*</span>
                </label>
                <select
                  id="highestEducation"
                  name="highestEducation"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={formData.highestEducation}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Education --</option>
                  <option value="B.Tech/B.E.">B.Tech/B.E.</option>
                  <option value="M.Tech/M.E.">M.Tech/M.E.</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="M.Sc">M.Sc</option>
                  <option value="MBA">MBA</option>
                  <option value="BBA">BBA</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Passout Year */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="passoutYear">
                  <FaCalendar className="inline mr-2 text-blue-600" />
                  Passout Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="passoutYear"
                  name="passoutYear"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={formData.passoutYear}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 2020"
                  maxLength="4"
                />
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="resume">
              <FaUpload className="inline mr-2 text-blue-600" />
              Upload Resume <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                id="resume"
                name="resume"
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Accepted formats: PDF, DOC, DOCX (Max size: 5MB)
            </p>
            {formData.resume && (
              <p className="text-sm text-green-600 mt-2">
                ✓ {formData.resume.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-bold rounded-xl hover:from-blue-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CareerForm;
