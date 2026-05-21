'use client';

import { FaTimes } from 'react-icons/fa';
import ServiceForm from './ServiceForm';

export default function ServiceModal({
  isOpen,
  editingService,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">
              {editingService ? '✏️ Edit Service' : '➕ Create New Service'}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              {editingService ? 'Update service details and packages' : 'Set up a new service with multiple pricing tiers'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto">
          <ServiceForm
            editingService={editingService}
            onSubmit={onSubmit}
            onClose={onClose}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
