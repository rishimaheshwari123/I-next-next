'use client';

import { useState } from 'react';
import { CATEGORY_LIST, SERVICE_CATEGORIES } from '@/config/serviceCategories';
import { FaPlus, FaLightbulb } from 'react-icons/fa';
import { toast } from 'react-toastify';
import VariantFields from './VariantFields';

export default function ServiceForm({
  editingService,
  onSubmit,
  onClose,
  isSubmitting,
}) {
  const [formData, setFormData] = useState(() => {
    if (editingService?.variants && editingService.variants.length > 0) {
      return {
        serviceName: editingService.serviceName || '',
        description: editingService.description || '',
        category: editingService.category || 'Web Development',
        variants: editingService.variants.map((v) => ({
          ...v,
          features: Array.isArray(v.features) && v.features.length > 0 ? v.features : [''],
        })),
      };
    }
    return {
      serviceName: editingService?.serviceName || '',
      description: editingService?.description || '',
      category: editingService?.category || 'Web Development',
      variants: [
        {
          name: '',
          description: '',
          amount: '',
          features: [''],
        },
      ],
    };
  });

  const categoryConfig = SERVICE_CATEGORIES[formData.category];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      variants: newVariants,
    }));
  };

  const handleFeatureChange = (variantIndex, featureIndex, value) => {
    const newVariants = [...formData.variants];
    newVariants[variantIndex].features[featureIndex] = value;
    setFormData((prev) => ({
      ...prev,
      variants: newVariants,
    }));
  };

  const addFeature = (variantIndex) => {
    setFormData((prev) => {
      const newVariants = [...prev.variants];
      const currentFeatures = Array.isArray(newVariants[variantIndex].features)
        ? newVariants[variantIndex].features
        : [];
      newVariants[variantIndex].features = [...currentFeatures, ''];
      return {
        ...prev,
        variants: newVariants,
      };
    });
  };

  const removeFeature = (variantIndex, featureIndex) => {
    setFormData((prev) => {
      const newVariants = [...prev.variants];
      const currentFeatures = Array.isArray(newVariants[variantIndex].features)
        ? newVariants[variantIndex].features
        : [];
      newVariants[variantIndex].features = currentFeatures.filter(
        (_, idx) => idx !== featureIndex
      );
      return {
        ...prev,
        variants: newVariants,
      };
    });
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          name: '',
          description: '',
          amount: '',
          features: [''],
        },
      ],
    }));
  };

  const removeVariant = (index) => {
    if (formData.variants.length === 1) {
      toast.error('At least one variant is required');
      return;
    }
    const newVariants = formData.variants.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      variants: newVariants,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.serviceName || !formData.description) {
      toast.error('Please fill all required fields');
      return;
    }

    if (formData.variants.some((v) => !v.name || !v.amount)) {
      toast.error('Please fill all variant required fields');
      return;
    }

    // Clean up empty features and prepare data
    const cleanedData = {
      ...formData,
      variants: formData.variants.map((v) => ({
        ...v,
        features: Array.isArray(v.features) 
          ? v.features.filter((f) => f && f.trim() !== '')
          : [],
      })),
    };

    onSubmit(cleanedData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(90vh-120px)] overflow-y-auto">
      {/* Service Details Section */}
      <div className="space-y-4 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
          <h3 className="text-xl font-bold text-gray-900">Service Information</h3>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Service Name *
          </label>
          <input
            type="text"
            name="serviceName"
            value={formData.serviceName}
            onChange={handleInputChange}
            placeholder="e.g., Web Development, Mobile App Development"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Service Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe what this service includes and its benefits..."
            rows="3"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Service Category *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORY_LIST.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, category: cat }))}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  formData.category === cat
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-lg mb-1">{SERVICE_CATEGORIES[cat].icon}</div>
                <p className="text-sm font-semibold text-gray-900">{cat}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Variants Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Service Packages</h3>
              <p className="text-xs text-gray-500 mt-1">Create different pricing tiers for this service</p>
            </div>
          </div>
          <button
            type="button"
            onClick={addVariant}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold text-sm"
          >
            <FaPlus />
            Add Package
          </button>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded-lg flex gap-3">
          <FaLightbulb className="text-blue-600 text-lg flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold">Pro Tip:</p>
            <p>Create multiple packages (Basic, Professional, Enterprise) to cater to different client needs and budgets.</p>
          </div>
        </div>

        {/* Variants */}
        <div className="space-y-4">
          {formData.variants.map((variant, variantIndex) => (
            <VariantFields
              key={variantIndex}
              variant={variant}
              variantIndex={variantIndex}
              category={formData.category}
              onVariantChange={handleVariantChange}
              onRemoveFeature={removeFeature}
              onAddFeature={addFeature}
              onRemoveVariant={removeVariant}
              canRemove={formData.variants.length > 1}
            />
          ))}
        </div>
      </div>

      {/* Modal Footer */}
      <div className="flex gap-3 pt-4 border-t sticky bottom-0 bg-white">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
        </button>
      </div>
    </form>
  );
}
