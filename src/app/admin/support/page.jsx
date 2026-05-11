'use client';

import { useState, useEffect } from 'react';
import { BASE_URL } from '@/config/api';
import { 
  FaHeadset, 
  FaTrash, 
  FaUser, 
  FaEnvelope, 
  FaPhone,
  FaTicketAlt,
  FaClock,
  FaExclamationCircle,
  FaCheckCircle,
  FaSpinner,
  FaFilter
} from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0
  });
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchTickets();
    fetchStats();
  }, []);

  useEffect(() => {
    if (filterStatus === 'All') {
      setFilteredTickets(tickets);
    } else {
      setFilteredTickets(tickets.filter(ticket => ticket.status === filterStatus));
    }
  }, [filterStatus, tickets]);

  const fetchTickets = async () => {
    try {
      const response = await fetch(`${BASE_URL}/support/getAll`);
      const data = await response.json();
      if (data.success) {
        setTickets(data.tickets);
        setFilteredTickets(data.tickets);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${BASE_URL}/support/stats`);
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    const toastId = toast.loading('Updating status...');

    try {
      const response = await fetch(`${BASE_URL}/support/update/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();

      if (data.success) {
        toast.update(toastId, {
          render: 'Status updated successfully',
          type: 'success',
          isLoading: false,
          autoClose: 2000
        });
        fetchTickets();
        fetchStats();
      } else {
        toast.update(toastId, {
          render: data.message || 'Failed to update status',
          type: 'error',
          isLoading: false,
          autoClose: 3000
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.update(toastId, {
        render: 'Failed to update status',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
    }
  };

  const handleDelete = async (ticketId) => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) {
      return;
    }

    const toastId = toast.loading('Deleting ticket...');

    try {
      const response = await fetch(`${BASE_URL}/support/delete/${ticketId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        toast.update(toastId, {
          render: 'Ticket deleted successfully',
          type: 'success',
          isLoading: false,
          autoClose: 2000
        });
        fetchTickets();
        fetchStats();
      } else {
        toast.update(toastId, {
          render: data.message || 'Failed to delete ticket',
          type: 'error',
          isLoading: false,
          autoClose: 3000
        });
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
      toast.update(toastId, {
        render: 'Failed to delete ticket',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Resolved':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Closed':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
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
              <FaHeadset className="text-blue-600" />
              Support Tickets
            </h1>
            <p className="text-gray-600">Manage customer support requests and tickets</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm font-medium">Total</p>
            <FaTicketAlt className="text-2xl text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm font-medium">Open</p>
            <FaExclamationCircle className="text-2xl text-blue-400" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{stats.open}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm font-medium">In Progress</p>
            <FaSpinner className="text-2xl text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm font-medium">Resolved</p>
            <FaCheckCircle className="text-2xl text-green-400" />
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm font-medium">Closed</p>
            <FaCheckCircle className="text-2xl text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-gray-600">{stats.closed}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 flex-wrap">
          <FaFilter className="text-gray-600" />
          <span className="text-gray-700 font-semibold">Filter by Status:</span>
          {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filterStatus === status
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {filterStatus === 'All' ? 'All Tickets' : `${filterStatus} Tickets`}
            <span className="text-gray-500 font-normal ml-2">({filteredTickets.length})</span>
          </h2>
        </div>

        {filteredTickets.length === 0 ? (
          <div className="p-12 text-center">
            <FaTicketAlt className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No tickets found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredTickets.map((ticket) => (
              <div key={ticket._id} className="p-6 hover:bg-gray-50 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Section - Ticket Info */}
                  <div className="flex-1 space-y-3">
                    {/* Ticket Number & Priority */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold text-sm">
                        {ticket.ticketNumber}
                      </span>
                      <span className={`px-3 py-1 rounded-lg font-semibold text-xs border ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority} Priority
                      </span>
                      <span className={`px-3 py-1 rounded-lg font-semibold text-xs border ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>

                    {/* Subject */}
                    <h3 className="text-xl font-bold text-gray-900">{ticket.subject}</h3>

                    {/* Customer Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-gray-400" />
                        <span>{ticket.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-gray-400" />
                        <span>{ticket.email}</span>
                      </div>
                      {ticket.phone && (
                        <div className="flex items-center gap-2">
                          <FaPhone className="text-gray-400" />
                          <span>{ticket.phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Message */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-gray-700 text-sm leading-relaxed">{ticket.message}</p>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FaClock />
                      <span>
                        Created: {new Date(ticket.createdAt).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Right Section - Actions */}
                  <div className="lg:w-64 space-y-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Change Status
                      </label>
                      <select
                        value={ticket.status}
                        onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>

                    <button
                      onClick={() => handleDelete(ticket._id)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
                    >
                      <FaTrash />
                      Delete Ticket
                    </button>
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
