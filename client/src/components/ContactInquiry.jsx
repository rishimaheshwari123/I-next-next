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
    <section id="contact" className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
            Get In Touch
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Have a question or want to work together? Drop us a message and we'll get back to you shortly.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      suppressHydrationWarning
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      className="w-full pl-11 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all disabled:bg-gray-50 placeholder:text-slate-400"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
                      <input
                        suppressHydrationWarning
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                        className="w-full pl-11 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all disabled:bg-gray-50 placeholder:text-slate-400"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
                      <input
                        suppressHydrationWarning
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                        className="w-full pl-11 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all disabled:bg-gray-50 placeholder:text-slate-400"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaEdit className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      suppressHydrationWarning
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      className="w-full pl-11 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all disabled:bg-gray-50 placeholder:text-slate-400"
                      placeholder="How can we help you?"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaCommentAlt className="absolute left-4 top-3 text-slate-400 text-sm" />
                    <textarea
                      suppressHydrationWarning
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      rows="3"
                      className="w-full pl-11 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-all disabled:bg-gray-50 placeholder:text-slate-400"
                      placeholder="Tell us more about your project or inquiry..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  suppressHydrationWarning
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="text-lg animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-sm" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Side - Info */}
            <div className="bg-blue-600 p-6 md:p-8 text-white flex flex-col justify-center">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">Let's Build Something Amazing Together</h3>
                  <p className="text-blue-100/90 text-xs leading-relaxed">
                    We're here to help bring your ideas to life. Whether you need a website, mobile app, or digital marketing services, our team is ready to assist you.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-base" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs">Quick Response</h4>
                      <p className="text-blue-100/80 text-[10px]">We typically respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-base" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs">Expert Consultation</h4>
                      <p className="text-blue-100/80 text-[10px]">Free consultation for your project</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-base" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs">Dedicated Support</h4>
                      <p className="text-blue-100/80 text-[10px]">Ongoing support throughout your journey</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <p className="text-[10px] text-blue-100/80 mb-2">Or reach us directly:</p>
                  <div className="space-y-2">
                    <a href="tel:+919981122493" className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors text-xs font-semibold">
                      <FaPhone className="text-sm" />
                      <span>+91 9981122493</span>
                    </a>
                    <a href="mailto:info.inextets@gmail.com" className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors text-xs font-semibold">
                      <FaEnvelope className="text-sm" />
                      <span>info.inextets@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
