'use client';

import { useState, useEffect } from 'react';
import { EMPLOYEE_API } from '@/config/api';
import {
  FaEnvelope,
  FaSearch,
  FaEye,
  FaTimes,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaRupeeSign,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function MyInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    contacted: 'bg-blue-100 text-blue-700',
    converted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  const statusIcons = {
    pending: <FaClock className="text-yellow-600" />,
    contacted: <FaEnvelope className="text-blue-600" />,
    converted: <FaCheckCircle className="text-green-600" />,
    rejected: <FaTimesCircle className="text-red-600" />,
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    let filtered = inquiries;

    if (searchTerm) {
      filtered = filtered.filter(
        (inquiry) =>
          inquiry.serviceId?.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.variantName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((inquiry) => inquiry.status === statusFilter);
    }

    setFilteredInquiries(filtered);
  }, [searchTerm, statusFilter, inquiries]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(EMPLOYEE_API.GET_MY_INQUIRIES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setInquiries(data.data);
        setFilteredInquiries(data.data);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInquiry(null);
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
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-2">My Inquiries</h1>
        <p className="text-lg opacity-90">Track your service inquiries and their status</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by service or variant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {inquiries.filter((i) => i.status === 'pending').length}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-600">Contacted</p>
            <p className="text-2xl font-bold text-blue-600">
              {inquiries.filter((i) => i.status === 'contacted').length}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600">Converted</p>
            <p className="text-2xl font-bold text-green-600">
              {inquiries.filter((i) => i.status === 'converted').length}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm text-gray-600">Rejected</p>
            <p className="text-2xl font-bold text-red-600">
              {inquiries.filter((i) => i.status === 'rejected').length}
            </p>
          </div>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {searchTerm || statusFilter ? 'No inquiries found' : 'No inquiries yet'}
            </p>
          </div>
        ) : (
          filteredInquiries.map((inquiry) => (
            <div
              key={inquiry._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                {/* Left Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {inquiry.serviceId?.serviceName}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                        statusColors[inquiry.status]
                      }`}
                    >
                      {statusIcons[inquiry.status]}
                      {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-3">{inquiry.variantName || 'N/A'}</p>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <FaRupeeSign className="text-blue-600" />
                      <span>₹{inquiry.variantAmount?.toLocaleString('en-IN') || '0'}</span>
                    </div>
                    <div className="text-gray-500">
                      {new Date(inquiry.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Action */}
                <button
                  onClick={() => handleOpenModal(inquiry)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-600 rounded-lg font-semibold hover:bg-blue-200 transition-all whitespace-nowrap"
                >
                  <FaEye />
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center sticky top-0">
              <h2 className="text-2xl font-bold">Inquiry Details</h2>
              <button
                onClick={handleCloseModal}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Status */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Status</h3>
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                    statusColors[selectedInquiry.status]
                  }`}
                >
                  {statusIcons[selectedInquiry.status]}
                  {selectedInquiry.status.charAt(0).toUpperCase() +
                    selectedInquiry.status.slice(1)}
                </div>
              </div>

              {/* Service Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Service Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p>
                    <span className="font-semibold text-gray-700">Service:</span>{' '}
                    {selectedInquiry.serviceId?.serviceName}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Category:</span>{' '}
                    {selectedInquiry.serviceId?.category?.name || selectedInquiry.serviceId?.category}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Variant:</span>{' '}
                    {selectedInquiry.variantName || 'N/A'}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Amount:</span> ₹
                    {selectedInquiry.variantAmount?.toLocaleString('en-IN') || '0'}
                  </p>
                </div>
              </div>

              {/* Your Message */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Your Message</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedInquiry.message}</p>
                </div>
              </div>

              {/* Requirements */}
              {selectedInquiry.requirements && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Your Requirements</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedInquiry.requirements}</p>
                  </div>
                </div>
              )}

              {/* Admin Notes */}
              {selectedInquiry.adminNotes && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Admin Notes</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-gray-700">{selectedInquiry.adminNotes}</p>
                  </div>
                </div>
              )}

              {/* Submitted Date */}
              <div className="text-sm text-gray-600 pt-4 border-t">
                <p>
                  Submitted on{' '}
                  {new Date(selectedInquiry.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
