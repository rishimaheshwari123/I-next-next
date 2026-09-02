'use client';

import { useState } from 'react';
import { BASE_URL } from '@/config/api';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaCommentAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner
} from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function ContactInquiry() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      toast.error('Please fill all fields');
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading('Submitting your inquiry...');

    try {
      const response = await fetch(`${BASE_URL}/inquiry/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast.update(toastId, {
          render: 'Thank you! We will contact you soon.',
          type: 'success',
          isLoading: false,
          autoClose: 3000
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        toast.update(toastId, {
          render: data.message || 'Failed to submit inquiry',
          type: 'error',
          isLoading: false,
          autoClose: 3000
        });
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.update(toastId, {
        render: 'Failed to submit inquiry',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-1.5 h-5 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></span>
            <span className="text-blue-600 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest">
              Let's Connect
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Get In Touch With Us
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Have a question or want to work together? Drop us a message and we'll get back to you shortly.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Side - Form (7 Cols on desktop) */}
            <div className="lg:col-span-7 p-5 sm:p-7 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs" />
                    <input
                      suppressHydrationWarning
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      className="w-full pl-9 sm:pl-10 pr-3.5 py-2 sm:py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-50 placeholder:text-slate-400 outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs" />
                      <input
                        suppressHydrationWarning
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                        className="w-full pl-9 sm:pl-10 pr-3.5 py-2 sm:py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-50 placeholder:text-slate-400 outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs" />
                      <input
                        suppressHydrationWarning
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                        className="w-full pl-9 sm:pl-10 pr-3.5 py-2 sm:py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-50 placeholder:text-slate-400 outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaEdit className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs" />
                    <input
                      suppressHydrationWarning
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      className="w-full pl-9 sm:pl-10 pr-3.5 py-2 sm:py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-50 placeholder:text-slate-400 outline-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaCommentAlt className="absolute left-3.5 top-3 text-slate-400 text-xs" />
                    <textarea
                      suppressHydrationWarning
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      rows="3"
                      className="w-full pl-9 sm:pl-10 pr-3.5 py-2 sm:py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-gray-50 placeholder:text-slate-400 outline-none"
                      placeholder="Tell us more about your project..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  suppressHydrationWarning
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.01] active:scale-98"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="text-sm animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-xs" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Side - Info Box (5 Cols on desktop) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 to-indigo-700 p-5 sm:p-7 md:p-8 text-white flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1.5">Let's Build Something Great</h3>
                  <p className="text-blue-100/90 text-xs leading-relaxed">
                    We're here to help bring your ideas to life. Whether you need a website, mobile app, or digital marketing services, our team is ready to assist you.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-xs" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs">Quick Response</h4>
                      <p className="text-blue-100/80 text-[10px]">We typically respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-xs" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs">Expert Consultation</h4>
                      <p className="text-blue-100/80 text-[10px]">Free initial consultation for your project</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-xs" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs">Dedicated Support</h4>
                      <p className="text-blue-100/80 text-[10px]">Ongoing support throughout your journey</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/20 space-y-2">
                <p className="text-[10px] text-blue-100/80">Direct Contact:</p>
                <div className="space-y-1.5">
                  <a href="tel:+919981122493" className="flex items-center gap-2 text-white hover:text-orange-300 transition-colors text-xs font-semibold">
                    <FaPhone className="text-xs" />
                    <span>+91 9981122493</span>
                  </a>
                  <a href="mailto:info.inextets@gmail.com" className="flex items-center gap-2 text-white hover:text-orange-300 transition-colors text-xs font-semibold truncate">
                    <FaEnvelope className="text-xs" />
                    <span className="truncate">info.inextets@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
