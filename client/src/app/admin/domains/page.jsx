'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaEye, FaFilter, FaDownload } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { BASE_URL } from "@/config/api";

export default function AdminDomainsPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/domain/getAll`);
      if (response.data.success) {
        setInquiries(response.data.inquiries);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to fetch domain inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/domain/update-status/${id}`,
        { status: newStatus }
      );

      if (response.data.success) {
        toast.success('Status updated successfully');
        fetchInquiries();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${BASE_URL}/domain/delete/${id}`
        );

        if (response.data.success) {
          toast.success('Domain inquiry deleted successfully');
          fetchInquiries();
        }
      } catch (error) {
        console.error('Error deleting inquiry:', error);
        toast.error('Failed to delete inquiry');
      }
    }
  };

  const handleViewDetails = (inquiry) => {
    Swal.fire({
      title: 'Domain Inquiry Details',
      html: `
        <div style="text-align: left; padding: 20px;">
          <p><strong>Name:</strong> ${inquiry.name}</p>
          <p><strong>Email:</strong> ${inquiry.email}</p>
          <p><strong>Phone:</strong> ${inquiry.phone}</p>
          <p><strong>Address:</strong> ${inquiry.address}</p>
          <p><strong>Domain:</strong> ${inquiry.domain}</p>
          <p><strong>Years:</strong> ${inquiry.years}</p>
          <p><strong>Status:</strong> <span style="color: ${getStatusColor(inquiry.status)}">${inquiry.status}</span></p>
          <p><strong>Created:</strong> ${new Date(inquiry.createdAt).toLocaleString()}</p>
        </div>
      `,
      width: 600,
      confirmButtonText: 'Close',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#f59e0b';
      case 'contacted':
        return '#3b82f6';
      case 'completed':
        return '#10b981';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Address', 'Domain', 'Years', 'Status', 'Created At'];
    const csvData = filteredInquiries.map((inquiry) => [
      inquiry.name,
      inquiry.email,
      inquiry.phone,
      inquiry.address,
      inquiry.domain,
      inquiry.years,
      inquiry.status,
      new Date(inquiry.createdAt).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `domain-inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesFilter = filter === 'all' || inquiry.status === filter;
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.phone.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: inquiries.length,
    pending: inquiries.filter((i) => i.status === 'pending').length,
    contacted: inquiries.filter((i) => i.status === 'contacted').length,
    completed: inquiries.filter((i) => i.status === 'completed').length,
    cancelled: inquiries.filter((i) => i.status === 'cancelled').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Domain Inquiries</h1>
          <p className="text-gray-600">Manage all domain booking requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-sm text-gray-600 mb-1">Total</div>
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow-md p-6 border border-yellow-200">
            <div className="text-sm text-yellow-700 mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-800">{stats.pending}</div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow-md p-6 border border-blue-200">
            <div className="text-sm text-blue-700 mb-1">Contacted</div>
            <div className="text-3xl font-bold text-blue-800">{stats.contacted}</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow-md p-6 border border-green-200">
            <div className="text-sm text-green-700 mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-800">{stats.completed}</div>
          </div>
          <div className="bg-red-50 rounded-lg shadow-md p-6 border border-red-200">
            <div className="text-sm text-red-700 mb-1">Cancelled</div>
            <div className="text-3xl font-bold text-red-800">{stats.cancelled}</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, email, domain, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Export Button */}
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaDownload />
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Domain
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Years
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No domain inquiries found
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inquiry) => (
                    <tr key={inquiry._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{inquiry.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{inquiry.email}</div>
                        <div className="text-sm text-gray-500">{inquiry.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-blue-600">{inquiry.domain}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{inquiry.years} year(s)</div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={inquiry.status}
                          onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                            inquiry.status
                          )} border-0 cursor-pointer`}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(inquiry.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(inquiry)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => handleDelete(inquiry._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Showing {filteredInquiries.length} of {inquiries.length} inquiries
        </div>
      </div>
    </div>
  );
}
