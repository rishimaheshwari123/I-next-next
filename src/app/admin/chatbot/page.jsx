'use client';

import { useState, useEffect } from 'react';
import { BASE_URL } from '@/config/api';
import { 
  FaRobot, 
  FaUser, 
  FaEnvelope, 
  FaPhone,
  FaCalendar,
  FaChartLine,
  FaComments,
  FaDollarSign,
  FaClock,
  FaProjectDiagram
} from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function AdminChatbotPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    serviceBreakdown: []
  });
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInquiries();
    fetchStats();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch(`${BASE_URL}/chatbot/getAll`);
      const data = await response.json();
      if (data.success) {
        setInquiries(data.inquiries);
      }
    } catch (error) {
      console.error('Error fetching chatbot inquiries:', error);
      toast.error('Failed to load chatbot inquiries');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${BASE_URL}/chatbot/stats`);
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => 
    inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.phone.includes(searchTerm) ||
    inquiry.serviceInterest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <FaRobot className="text-blue-600" />
              AI Chatbot Inquiries
            </h1>
            <p className="text-gray-600">View all AI chatbot conversations and leads</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-blue-100 text-sm font-medium">Total Inquiries</p>
            <FaRobot className="text-3xl text-blue-200" />
          </div>
          <p className="text-4xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-green-100 text-sm font-medium">Today</p>
            <FaCalendar className="text-3xl text-green-200" />
          </div>
          <p className="text-4xl font-bold">{stats.today}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-purple-100 text-sm font-medium">This Week</p>
            <FaChartLine className="text-3xl text-purple-200" />
          </div>
          <p className="text-4xl font-bold">{stats.thisWeek}</p>
        </div>
      </div>

      {/* Service Breakdown */}
      {stats.serviceBreakdown && stats.serviceBreakdown.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaChartLine className="text-blue-600" />
            Service Interest Breakdown
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.serviceBreakdown.map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1 truncate">{service._id}</p>
                <p className="text-2xl font-bold text-gray-900">{service.count}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
        <input
          type="text"
          placeholder="Search by name, email, phone, or service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Inquiries List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            All Chatbot Inquiries
            <span className="text-gray-500 font-normal ml-2">({filteredInquiries.length})</span>
          </h2>
        </div>

        {filteredInquiries.length === 0 ? (
          <div className="p-12 text-center">
            <FaRobot className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'No inquiries match your search' : 'No chatbot inquiries yet'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredInquiries.map((inquiry) => (
              <div key={inquiry._id} className="p-6 hover:bg-gray-50 transition-all">
                <div className="space-y-4">
                  {/* Header - Date & Service */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaCalendar />
                      <span>
                        {new Date(inquiry.createdAt).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold text-sm">
                      <FaProjectDiagram />
                      {inquiry.serviceInterest}
                    </div>
                  </div>

                  {/* Customer Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaUser className="text-white text-lg" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 mb-1">Name</p>
                        <p className="font-bold text-gray-900 truncate">{inquiry.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                      <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaEnvelope className="text-white text-lg" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <p className="font-bold text-gray-900 truncate text-sm">{inquiry.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaPhone className="text-white text-lg" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                        <p className="font-bold text-gray-900 truncate">{inquiry.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Project Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {inquiry.budget && (
                      <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                        <FaDollarSign className="text-2xl text-yellow-600" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Budget</p>
                          <p className="font-semibold text-gray-900">{inquiry.budget}</p>
                        </div>
                      </div>
                    )}

                    {inquiry.timeline && (
                      <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                        <FaClock className="text-2xl text-indigo-600" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Timeline</p>
                          <p className="font-semibold text-gray-900">{inquiry.timeline}</p>
                        </div>
                      </div>
                    )}

                    {inquiry.projectDetails && (
                      <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-xl border border-pink-100 md:col-span-1">
                        <FaProjectDiagram className="text-2xl text-pink-600" />
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Has Details</p>
                          <p className="font-semibold text-gray-900">Yes</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  {inquiry.projectDetails && (
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FaComments className="text-blue-600" />
                        Project Details:
                      </p>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{inquiry.projectDetails}</p>
                    </div>
                  )}

                  {/* Conversation History */}
                  {inquiry.conversationHistory && inquiry.conversationHistory.length > 0 && (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                      <button
                        onClick={() => setSelectedInquiry(selectedInquiry === inquiry._id ? null : inquiry._id)}
                        className="w-full flex items-center justify-between text-left"
                      >
                        <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <FaComments className="text-blue-600" />
                          Conversation History ({inquiry.conversationHistory.length} messages)
                        </p>
                        <span className="text-blue-600 font-bold">
                          {selectedInquiry === inquiry._id ? '−' : '+'}
                        </span>
                      </button>
                      
                      {selectedInquiry === inquiry._id && (
                        <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
                          {inquiry.conversationHistory.map((chat, index) => (
                            <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                              <p className="text-xs font-semibold text-blue-600 mb-1">Q: {chat.question}</p>
                              <p className="text-sm text-gray-800">A: {chat.answer}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Contact Actions */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all text-sm shadow-lg hover:shadow-xl"
                    >
                      <FaEnvelope />
                      Email Reply
                    </a>
                    <a
                      href={`tel:${inquiry.phone}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all text-sm shadow-lg hover:shadow-xl"
                    >
                      <FaPhone />
                      Call Now
                    </a>
                    <a
                      href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all text-sm shadow-lg hover:shadow-xl"
                    >
                      <FaPhone />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
