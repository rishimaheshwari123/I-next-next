'use client';

import { useState, useEffect } from 'react';
import { EMPLOYEE_API } from '@/config/api';
import { FaPlus, FaBox, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ServiceModal from '@/components/admin/services/ServiceModal';
import ServiceSearch from '@/components/admin/services/ServiceSearch';
import ServicesGrid from '@/components/admin/services/ServicesGrid';

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = services.filter((service) => {
        const categoryName = service.category?.name || service.category || '';
        return (
          service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          categoryName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredServices(filtered);
    } else {
      setFilteredServices(services);
    }
  }, [searchTerm, services]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(EMPLOYEE_API.GET_ALL_SERVICES, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
        setFilteredServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (service = null) => {
    setEditingService(service || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const url = editingService
        ? EMPLOYEE_API.UPDATE_SERVICE(editingService._id)
        : EMPLOYEE_API.CREATE_SERVICE;
      const method = editingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(
          editingService ? 'Service updated successfully' : 'Service created successfully'
        );
        fetchServices();
        handleCloseModal();
      } else {
        toast.error(data.message || 'Failed to save service');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Failed to save service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (serviceId) => {
    if (!confirm('Are you sure you want to delete this service? This action cannot be undone.')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(EMPLOYEE_API.DELETE_SERVICE(serviceId), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Service deleted successfully');
        fetchServices();
      } else {
        toast.error(data.message || 'Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 gap-4">
        <FaSpinner className="text-5xl text-blue-600 animate-spin" />
        <p className="text-gray-600 font-semibold">Loading services...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <FaBox className="text-3xl" />
              Service Management
            </h1>
            <p className="text-blue-100 text-lg">
              Create and manage services with multiple pricing packages
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105"
          >
            <FaPlus />
            Create Service
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-600">
          <p className="text-gray-600 text-sm font-semibold">Total Services</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{services.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-600">
          <p className="text-gray-600 text-sm font-semibold">Total Packages</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {services.reduce((sum, s) => sum + (s.variants?.length || 0), 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-600">
          <p className="text-gray-600 text-sm font-semibold">Active</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {services.filter((s) => s.isActive).length}
          </p>
        </div>
      </div>

      {/* Search */}
      <ServiceSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServicesGrid
          services={filteredServices}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal */}
      <ServiceModal
        isOpen={showModal}
        editingService={editingService}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
