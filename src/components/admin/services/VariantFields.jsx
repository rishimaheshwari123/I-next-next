'use client';

import { SERVICE_CATEGORIES } from '@/config/serviceCategories';
import { FaMinus, FaPlus, FaCheck } from 'react-icons/fa';
import { useMemo } from 'react';

export default function VariantFields({
  variant,
  variantIndex,
  category,
  onVariantChange,
  onRemoveFeature,
  onAddFeature,
  onRemoveVariant,
  canRemove,
}) {
  const categoryConfig = SERVICE_CATEGORIES[category];
  const fields = categoryConfig?.fields || [];

  // Group fields by section
  const fieldsBySection = useMemo(() => {
    const grouped = {};
    fields.forEach((field) => {
      const section = field.section || 'General';
      if (!grouped[section]) {
        grouped[section] = [];
      }
      grouped[section].push(field);
    });
    return grouped;
  }, [fields]);

  const handleFieldChange = (fieldName, value) => {
    onVariantChange(variantIndex, fieldName, value);
  };

  const getFieldValue = (fieldName) => {
    const value = variant[fieldName];
    // Handle undefined/null values
    if (value === undefined || value === null) {
      return '';
    }
    return value;
  };

  const renderField = (field) => {
    const fieldValue = getFieldValue(field.name);

    if (field.type === 'checkbox') {
      const isChecked = fieldValue === true || fieldValue === 'true' || fieldValue === 1;
      return (
        <div key={field.name} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-all">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => handleFieldChange(field.name, e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
          <label className="text-sm font-medium text-gray-700 cursor-pointer flex-1">
            {field.label}
          </label>
          {isChecked && <FaCheck className="text-green-500 text-sm" />}
        </div>
      );
    }

    if (field.type === 'select') {
      return (
        <div key={field.name}>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {field.label}
          </label>
          <select
            value={fieldValue || ''}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm bg-white hover:border-gray-300"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (field.type === 'multiselect') {
      const selectedValues = Array.isArray(fieldValue) ? fieldValue : [];
      return (
        <div key={field.name} className="col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {field.label}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {field.options?.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 cursor-pointer transition-all"
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(opt)}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...selectedValues, opt]
                      : selectedValues.filter((v) => v !== opt);
                    handleFieldChange(field.name, newValues);
                  }}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }

    // Default: text or number input
    return (
      <div key={field.name}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {field.label}
        </label>
        <input
          type={field.type}
          value={fieldValue}
          onChange={(e) => handleFieldChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm hover:border-gray-300"
        />
      </div>
    );
  };

  return (
    <div className="p-6 border-2 border-gray-200 rounded-xl space-y-6 bg-gradient-to-br from-gray-50 to-white hover:border-blue-300 transition-all">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <div>
          <h4 className="font-bold text-lg text-gray-900">
            Variant {variantIndex + 1}
          </h4>
          <p className="text-xs text-gray-500 mt-1">Configure package details and features</p>
        </div>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemoveVariant(variantIndex)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Remove variant"
          >
            <FaMinus className="text-lg" />
          </button>
        )}
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Package Name *
          </label>
          <input
            type="text"
            value={getFieldValue('name')}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            placeholder="e.g., Starter, Professional, Enterprise"
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price (₹) *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">₹</span>
            <input
              type="number"
              value={getFieldValue('amount')}
              onChange={(e) => handleFieldChange('amount', e.target.value)}
              placeholder="0"
              className="w-full pl-8 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-semibold text-lg"
              required
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Package Description
        </label>
        <textarea
          value={getFieldValue('description')}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          placeholder="Describe what's included in this package..."
          rows="2"
          className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      {/* Category-Specific Fields */}
      {Object.keys(fieldsBySection).length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
            <h5 className="font-bold text-gray-900">Package Specifications</h5>
          </div>

          {Object.entries(fieldsBySection).map(([section, sectionFields]) => (
            <div key={section} className="space-y-3">
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider px-2">
                {section}
              </p>
              <div className="grid grid-cols-2 gap-3 pl-2">
                {sectionFields.map((field) => renderField(field))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Features */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <label className="block text-sm font-bold text-gray-900">
              ✨ Features Included
            </label>
            <p className="text-xs text-gray-500 mt-1">List all features in this package</p>
          </div>
          <button
            type="button"
            onClick={() => {
              console.log('Add feature clicked for variant', variantIndex);
              onAddFeature(variantIndex);
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all text-sm font-semibold"
          >
            <FaPlus className="text-xs" />
            Add Feature
          </button>
        </div>

        <div className="space-y-2">
          {(() => {
            const features = getFieldValue('features');
            const featuresList = Array.isArray(features) ? features : [];
            
            console.log('Features list:', featuresList, 'Length:', featuresList.length);
            
            // If no features at all, show empty state
            if (featuresList.length === 0) {
              return (
                <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500 text-sm">
                  No features added yet. Click "Add Feature" to get started.
                </div>
              );
            }
            
            // Show all features (including empty ones)
            return featuresList.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex gap-2 items-start">
                <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-all">
                  <span className="text-blue-600 font-bold">✓</span>
                  <input
                    type="text"
                    value={feature || ''}
                    onChange={(e) => {
                      const newFeatures = [...featuresList];
                      newFeatures[featureIndex] = e.target.value;
                      handleFieldChange('features', newFeatures);
                    }}
                    placeholder="e.g., Responsive Design, 24/7 Support"
                    className="flex-1 bg-transparent outline-none text-sm"
                    autoFocus={feature === ''}
                  />
                </div>
                {featuresList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveFeature(variantIndex, featureIndex)}
                    className="p-2.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                  >
                    <FaMinus className="text-sm" />
                  </button>
                )}
              </div>
            ));
          })()}
        </div>
      </div>
    </div>
  );
}
