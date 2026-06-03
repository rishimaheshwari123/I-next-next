'use client';

import SupportForm from '@/components/SupportForm';
import { FaHeadset } from 'react-icons/fa';

export default function EmployeeSupportPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <FaHeadset className="text-blue-600" />
          Employee Support
        </h1>
        <p className="text-gray-600">Get help from the administration team</p>
      </div>

      <SupportForm userType="Employee" />
    </div>
  );
}
