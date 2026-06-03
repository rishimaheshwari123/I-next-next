'use client';

import { useState, useEffect } from 'react';
import { BASE_URL, EMPLOYEE_API } from '@/config/api';
import { 
  FaUsers, 
  FaUser, 
  FaEnvelope, 
  FaPhone,
  FaBuilding,
  FaCalendar,
  FaSearch,
  FaProjectDiagram,
  FaTimes
} from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function AdminClientsPage() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProjectsModal, setShowProjectsModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientProjects, setClientProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

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

  const fetchClientProjects = async (clientId) => {
    setLoadingProjects(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(EMPLOYEE_API.GET_PROJECTS_BY_CLIENT_ID(clientId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setClientProjects(data.data);
      } else {
        toast.error(data.message || 'Failed to load projects');
      }
    } catch (error) {
      console.error('Error fetching client projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleSeeProjects = (client) => {
    setSelectedClient(client);
    setShowProjectsModal(true);
    fetchClientProjects(client._id);
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
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FaCalendar />
                    Registered
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
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
                      {client.isActive !== false ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-300">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-300">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          Inactive
                        </span>
                      )}
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleSeeProjects(client)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                      >
                        <FaProjectDiagram />
                        See Projects
                      </button>
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

      {/* Client Projects Modal */}
      {showProjectsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 relative">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <FaProjectDiagram />
                {selectedClient?.name}'s Projects
              </h2>
              <p className="text-sm opacity-90 mt-1">
                {selectedClient?.company && `${selectedClient.company} • `}
                {selectedClient?.email}
              </p>
              <button
                onClick={() => setShowProjectsModal(false)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {loadingProjects ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
                </div>
              ) : clientProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <FaProjectDiagram className="text-6xl mb-4" />
                  <p className="text-lg font-semibold">No Projects Found</p>
                  <p className="text-sm">This client doesn't have any projects yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {clientProjects.map((project) => (
                    <div
                      key={project._id}
                      className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900 flex-1">
                          {project.projectName}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            project.status === 'Completed'
                              ? 'bg-green-100 text-green-700'
                              : project.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-700'
                              : project.status === 'On Hold'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Category:</span>
                          <div className="flex flex-wrap gap-1 justify-end">
                            {Array.isArray(project.category) ? (
                              project.category.map((cat, idx) => (
                                <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-semibold border border-blue-100">
                                  {cat.name || cat}
                                </span>
                              ))
                            ) : project.category ? (
                              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-semibold border border-blue-100">
                                {project.category.name || project.category}
                              </span>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Type:</span>
                          <span className="font-semibold text-gray-900">
                            {project.projectType}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Priority:</span>
                          <span
                            className={`font-semibold ${
                              project.priority === 'High'
                                ? 'text-red-600'
                                : project.priority === 'Medium'
                                ? 'text-yellow-600'
                                : 'text-green-600'
                            }`}
                          >
                            {project.priority}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Progress:</span>
                          <span className="font-semibold text-blue-600">
                            {project.progress}%
                          </span>
                        </div>
                        {project.budget && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Budget:</span>
                            <span className="font-semibold text-gray-900">
                              ₹{project.budget.toLocaleString('en-IN')}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-gray-500">Start Date:</span>
                          <span className="text-gray-900">
                            {new Date(project.startDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Expected End:</span>
                          <span className="text-gray-900">
                            {new Date(project.expectedEndDate).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Assigned Employees */}
                      {project.assignedEmployees && project.assignedEmployees.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-xs text-gray-500 mb-2">Assigned To:</p>
                          <div className="flex flex-wrap gap-2">
                            {project.assignedEmployees.map((emp) => (
                              <span
                                key={emp._id}
                                className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold"
                              >
                                {emp.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Total Projects: <span className="font-bold text-blue-600">{clientProjects.length}</span>
              </p>
              <button
                onClick={() => setShowProjectsModal(false)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
