'use client';

import { useState, useEffect } from 'react';
import { BASE_URL } from '@/config/api';
import { 
  FaUsers, 
  FaUser, 
  FaEnvelope, 
  FaPhone,
  FaBuilding,
  FaCalendar,
  FaSearch
} from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function AdminClientsPage() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = clients.filter(client => 
        client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone?.includes(searchTerm)
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clients);
    }
  }, [searchTerm, clients]);

  const fetchClients = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/clients`);
      const data = await response.json();
      if (data.success) {
        setClients(data.clients);
        setFilteredClients(data.clients);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Failed to load clients');
    } finally {
      setLoading(false);
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
              <FaUsers className="text-blue-600" />
              Manage Clients
            </h1>
            <p className="text-gray-600">View all registered clients</p>
          </div>
          <div className="bg-blue-50 px-6 py-3 rounded-xl border border-blue-200">
            <p className="text-sm text-gray-600">Total Clients</p>
            <p className="text-3xl font-bold text-blue-600">{clients.length}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, company, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FaUser />
                    Name
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FaEnvelope />
                    Email
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FaPhone />
                    Phone
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FaBuilding />
                    Company
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FaCalendar />
                    Registered
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">
                      {searchTerm ? 'No clients found matching your search' : 'No clients registered yet'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredClients.map((client, index) => (
                  <tr 
                    key={client._id} 
                    className="hover:bg-blue-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900">
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                          {client.name?.charAt(0).toUpperCase() || 'C'}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {client.name || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href={`mailto:${client.email}`}
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {client.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {client.phone ? (
                        <a 
                          href={`tel:${client.phone}`}
                          className="text-sm text-gray-900 hover:text-blue-600"
                        >
                          {client.phone}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {client.company || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {new Date(client.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Footer */}
      {filteredClients.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <p className="text-gray-700">
              Showing <span className="font-bold text-blue-600">{filteredClients.length}</span> of{' '}
              <span className="font-bold text-blue-600">{clients.length}</span> clients
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all text-sm"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
