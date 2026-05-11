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
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-xl">
            <FaPaperPlane className="text-3xl text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question or want to work together? Drop us a message and we'll get back to you shortly.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Form */}
            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={submitting}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaEdit className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                      placeholder="How can we help you?"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FaCommentAlt className="absolute left-4 top-4 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      rows="5"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                      placeholder="Tell us more about your project or inquiry..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="text-2xl animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-xl" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Side - Info */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 md:p-12 text-white flex flex-col justify-center">
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Let's Build Something Amazing Together</h3>
                  <p className="text-blue-100 leading-relaxed">
                    We're here to help bring your ideas to life. Whether you need a website, mobile app, or digital marketing services, our team is ready to assist you.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Quick Response</h4>
                      <p className="text-blue-100 text-sm">We typically respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Expert Consultation</h4>
                      <p className="text-blue-100 text-sm">Free consultation for your project</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Dedicated Support</h4>
                      <p className="text-blue-100 text-sm">Ongoing support throughout your journey</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/20">
                  <p className="text-sm text-blue-100 mb-4">Or reach us directly:</p>
                  <div className="space-y-3">
                    <a href="tel:+919981122493" className="flex items-center gap-3 text-white hover:text-blue-200 transition-colors">
                      <FaPhone className="text-lg" />
                      <span className="font-semibold">+91 9981122493</span>
                    </a>
                    <a href="mailto:info.inextets@gmail.com" className="flex items-center gap-3 text-white hover:text-blue-200 transition-colors">
                      <FaEnvelope className="text-lg" />
                      <span className="font-semibold">info.inextets@gmail.com</span>
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
