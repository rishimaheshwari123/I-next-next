'use client';

import { FaBox, FaEdit, FaTrash, FaTag, FaCheckCircle } from 'react-icons/fa';

export default function ServicesGrid({
  services,
  onEdit,
  onDelete,
}) {
  if (services.length === 0) {
    return (
      <div className="col-span-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-16 text-center border-2 border-dashed border-gray-300">
        <FaBox className="text-6xl text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600 text-lg font-semibold">No services created yet</p>
        <p className="text-gray-500 text-sm mt-2">Create your first service to get started</p>
      </div>
    );
  }

  return (
    <>
      {services.map((service) => (
        <div
          key={service._id}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
        >
          {/* Header with Category Badge */}
          <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>

          {/* Content */}
          <div className="p-6">
            {/* Title and Category */}
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900 flex-1">
                {service.serviceName}
              </h3>
              <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-xs font-bold whitespace-nowrap ml-2">
                {service.category?.name || service.category}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {service.description}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <FaTag className="text-blue-600 text-sm" />
                <span className="text-xs font-semibold text-gray-700">
                  {service.variants?.length || 0} Package{service.variants?.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-600 text-sm" />
                <span className="text-xs font-semibold text-gray-700">Active</span>
              </div>
            </div>

            {/* Variants Preview */}
            {service.variants && service.variants.length > 0 && (
              <div className="mb-4 space-y-2">
                <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Packages:</p>
                <div className="grid grid-cols-1 gap-2">
                  {service.variants.slice(0, 3).map((variant, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200"
                    >
                      <span className="text-sm font-semibold text-gray-900">
                        {variant.name}
                      </span>
                      <span className="text-sm font-bold text-blue-600">
                        ₹{variant.amount?.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                  {service.variants.length > 3 && (
                    <p className="text-xs text-gray-500 text-center py-1">
                      +{service.variants.length - 3} more package{service.variants.length - 3 !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => onEdit(service)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100 transition-all border border-blue-200"
              >
                <FaEdit className="text-sm" />
                Edit
              </button>
              <button
                onClick={() => onDelete(service._id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-all border border-red-200"
              >
                <FaTrash className="text-sm" />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
