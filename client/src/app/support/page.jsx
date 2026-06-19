'use client';

import { useState } from 'react';
import { BASE_URL } from '@/config/api';
import { 
  FaHeadset, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaEdit, 
  FaCommentAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner
} from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'Medium'
  });
  const [submitting, setSubmitting] = useState(false);
  const [ticketCreated, setTicketCreated] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill all required fields');
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading('Creating support ticket...');

    try {
      const response = await fetch(`${BASE_URL}/support/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast.update(toastId, {
          render: 'Support ticket created successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 3000
        });

        setTicketCreated(data.ticket);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          priority: 'Medium'
        });
      } else {
        toast.update(toastId, {
          render: data.message || 'Failed to create ticket',
          type: 'error',
          isLoading: false,
          autoClose: 3000
        });
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast.update(toastId, {
        render: 'Failed to create support ticket',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (ticketCreated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-5xl text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Ticket Created Successfully!
            </h1>
            
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
              <p className="text-gray-600 mb-2">Your Ticket Number</p>
              <p className="text-3xl font-bold text-blue-600 mb-4">
                {ticketCreated.ticketNumber}
              </p>
              <p className="text-sm text-gray-500">
                Please save this ticket number for future reference
              </p>
            </div>

            <div className="space-y-3 text-left bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-semibold text-gray-900">{ticketCreated.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold text-gray-900">{ticketCreated.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subject:</span>
                <span className="font-semibold text-gray-900">{ticketCreated.subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {ticketCreated.status}
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              We have received your support request and will get back to you within 24-48 hours.
              A confirmation email has been sent to your email address.
            </p>

            <button
              onClick={() => setTicketCreated(null)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            >
              Create Another Ticket
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <FaHeadset className="text-4xl text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Customer Support
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Need help? Submit a support ticket and our team will get back to you as soon as possible.
          </p>
        </div>

        {/* Support Form */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <FaEdit />
              Submit Support Ticket
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
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
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Phone & Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={submitting}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priority Level
                </label>
                <div className="relative">
                  <FaExclamationTriangle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    disabled={submitting}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 appearance-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={submitting}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                placeholder="Brief description of your issue"
              />
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
                  rows="6"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100"
                  placeholder="Please describe your issue in detail..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <FaSpinner className="text-2xl animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <FaHeadset className="text-2xl" />
                  Submit Support Ticket
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <FaCheckCircle className="text-blue-600" />
            What happens next?
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>You will receive a confirmation email with your ticket number</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Our support team will review your ticket within 24-48 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>We will contact you via email with updates or solutions</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
