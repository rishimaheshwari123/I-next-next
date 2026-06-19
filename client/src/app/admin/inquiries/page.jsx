'use client';

import { useState, useEffect } from 'react';
import { BASE_URL } from '@/config/api';
import { 
  FaEnvelope, 
  FaUser, 
  FaPhone,
  FaCalendar,
  FaInbox,
  FaChartLine
} from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0
  });

  useEffect(() => {
    fetchInquiries();
    fetchStats();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch(`${BASE_URL}/inquiry/getAll`);
      const data = await response.json();
      if (data.success) {
        setInquiries(data.inquiries);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${BASE_URL}/inquiry/stats`);
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

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
              <FaInbox className="text-blue-600" />
              Contact Inquiries
            </h1>
            <p className="text-gray-600">View all customer inquiries and messages</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm font-medium">Total</p>
            <FaInbox className="text-2xl text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm font-medium">Today</p>
            <FaCalendar className="text-2xl text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{stats.today}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm font-medium">This Week</p>
            <FaChartLine className="text-2xl text-green-400" />
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.thisWeek}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm font-medium">This Month</p>
            <FaChartLine className="text-2xl text-purple-400" />
          </div>
          <p className="text-3xl font-bold text-purple-600">{stats.thisMonth}</p>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            All Inquiries
            <span className="text-gray-500 font-normal ml-2">({inquiries.length})</span>
          </h2>
        </div>

        {inquiries.length === 0 ? (
          <div className="p-12 text-center">
            <FaInbox className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No inquiries yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {inquiries.map((inquiry) => (
              <div key={inquiry._id} className="p-6 hover:bg-gray-50 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Section - Inquiry Info */}
                  <div className="flex-1 space-y-4">
                    {/* Subject */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{inquiry.subject}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
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
                    </div>

                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FaUser className="text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500">Name</p>
                          <p className="font-semibold text-gray-900 truncate">{inquiry.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FaEnvelope className="text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="font-semibold text-gray-900 truncate text-sm">{inquiry.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FaPhone className="text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="font-semibold text-gray-900 truncate">{inquiry.phone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Message:</p>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>
                    </div>

                    {/* Contact Actions */}
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all text-sm"
                      >
                        <FaEnvelope />
                        Email Reply
                      </a>
                      <a
                        href={`tel:${inquiry.phone}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all text-sm"
                      >
                        <FaPhone />
                        Call
                      </a>
                    </div>
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
