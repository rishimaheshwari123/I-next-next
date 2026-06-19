'use client';

import { useState, useEffect } from 'react';
import { BASE_URL } from '@/config/api';
import { 
  FaPlus, 
  FaExternalLinkAlt, 
  FaTrash, 
  FaEye, 
  FaEyeSlash, 
  FaImage,
  FaSpinner,
  FaTimes,
  FaBullhorn
} from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function AdminAdvertisementsPage() {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    targetUrl: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const response = await fetch(`${BASE_URL}/advertisements/getAll`);
      const data = await response.json();
      if (data.success) {
        setAdvertisements(data.advertisements);
      }
    } catch (error) {
      console.error('Error fetching advertisements:', error);
      toast.error('Failed to load advertisements');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      toast.error('Please select an image');
      return;
    }

    if (!formData.targetUrl) {
      toast.error('Please enter target URL');
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading('Creating advertisement...');

    const data = new FormData();
    data.append('targetUrl', formData.targetUrl);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await fetch(`${BASE_URL}/advertisements/create`, {
        method: 'POST',
        body: data
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.update(toastId, {
          render: 'Advertisement created successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 3000
        });
        
        setFormData({ targetUrl: '', image: null });
        setImagePreview('');
        setShowForm(false);
        fetchAdvertisements();
      } else {
        toast.update(toastId, {
          render: result.message || 'Failed to create advertisement',
          type: 'error',
          isLoading: false,
          autoClose: 3000
        });
      }
    } catch (error) {
      console.error('Error creating advertisement:', error);
      toast.update(toastId, {
        render: error.message || 'Failed to create advertisement',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActive = async (id, currentStatus) => {
    const toastId = toast.loading(currentStatus ? 'Deactivating...' : 'Activating...');
    
    try {
      const response = await fetch(`${BASE_URL}/advertisements/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.update(toastId, {
          render: currentStatus ? 'Advertisement deactivated' : 'Advertisement activated',
          type: 'success',
          isLoading: false,
          autoClose: 2000
        });
        fetchAdvertisements();
      } else {
        toast.update(toastId, {
          render: data.message || 'Failed to update advertisement',
          type: 'error',
          isLoading: false,
          autoClose: 3000
        });
      }
    } catch (error) {
      console.error('Error updating advertisement:', error);
      toast.update(toastId, {
        render: 'Failed to update advertisement',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this advertisement?')) {
      return;
    }

    const toastId = toast.loading('Deleting advertisement...');
    
    try {
      const response = await fetch(`${BASE_URL}/advertisements/delete/${id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.update(toastId, {
          render: 'Advertisement deleted successfully',
          type: 'success',
          isLoading: false,
          autoClose: 2000
        });
        fetchAdvertisements();
      } else {
        toast.update(toastId, {
          render: data.message || 'Failed to delete advertisement',
          type: 'error',
          isLoading: false,
          autoClose: 3000
        });
      }
    } catch (error) {
      console.error('Error deleting advertisement:', error);
      toast.update(toastId, {
        render: 'Failed to delete advertisement',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
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
              <FaBullhorn className="text-blue-600" />
              Advertisement Management
            </h1>
            <p className="text-gray-600">Create and manage banner advertisements for your website</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {showForm ? (
              <>
                <FaTimes className="text-lg" />
                Cancel
              </>
            ) : (
              <>
                <FaPlus className="text-lg" />
                Add Advertisement
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Total Ads</p>
              <p className="text-3xl font-bold text-gray-900">{advertisements.length}</p>
            </div>
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <FaBullhorn className="text-2xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Active</p>
              <p className="text-3xl font-bold text-gray-900">
                {advertisements.filter((ad) => ad.isActive).length}
              </p>
            </div>
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <FaEye className="text-2xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">Inactive</p>
              <p className="text-3xl font-bold text-gray-900">
                {advertisements.filter((ad) => !ad.isActive).length}
              </p>
            </div>
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
              <FaEyeSlash className="text-2xl text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <FaPlus />
              Create New Advertisement
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Advertisement Image <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-all bg-gray-50">
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-80 rounded-lg shadow-lg mx-auto"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setFormData({ ...formData, image: null });
                      }}
                      disabled={submitting}
                      className="absolute -top-3 -right-3 bg-red-600 text-white p-3 rounded-full hover:bg-red-700 shadow-lg disabled:opacity-50 transition-all"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <FaImage className="text-6xl text-gray-400 mx-auto mb-4" />
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 font-semibold text-lg">
                        Click to upload image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleImageChange}
                        disabled={submitting}
                        className="hidden"
                      />
                    </label>
                    <p className="text-gray-500 text-sm mt-2">PNG, JPG, JPEG up to 5MB</p>
                    <p className="text-gray-400 text-xs mt-1">Recommended: 1200x400px</p>
                  </div>
                )}
              </div>
            </div>

            {/* Target URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Target URL <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaExternalLinkAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  required
                  value={formData.targetUrl}
                  onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                  disabled={submitting}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:bg-gray-100"
                  placeholder="https://example.com"
                />
              </div>
              <p className="text-gray-500 text-xs mt-2">Enter the URL where users will be redirected when they click the ad</p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({ targetUrl: '', image: null });
                  setImagePreview('');
                }}
                disabled={submitting}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <FaSpinner className="text-xl animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <FaPlus />
                    Create Advertisement
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Advertisements Grid */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">All Advertisements</h2>
          <p className="text-gray-600 text-sm mt-1">Manage your advertisement banners</p>
        </div>

        {advertisements.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaImage className="text-4xl text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">No advertisements yet</p>
            <p className="text-gray-400 text-sm mt-2 mb-6">Create your first advertisement to get started</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
            >
              Create Advertisement
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {advertisements.map((ad) => (
              <div 
                key={ad._id} 
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                {/* Image */}
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={ad.imageUrl}
                    alt="Advertisement"
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg ${
                    ad.isActive
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    {ad.isActive ? <FaEye /> : <FaEyeSlash />}
                    {ad.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <FaExternalLinkAlt className="text-blue-600 mt-1 flex-shrink-0" />
                    <a
                      href={ad.targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-medium truncate flex-1 hover:underline"
                      title={ad.targetUrl}
                    >
                      {ad.targetUrl}
                    </a>
                  </div>

                  <p className="text-xs text-gray-500">
                    Created: {new Date(ad.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => toggleActive(ad._id, ad.isActive)}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        ad.isActive
                          ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {ad.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="px-4 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-all font-semibold"
                    >
                      <FaTrash />
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
