'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const whatsappNumber = '919981122493';
  const message = encodeURIComponent('Hi! I am interested in your services.');

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      suppressHydrationWarning
      onClick={handleWhatsAppClick}
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="text-2xl sm:text-3xl text-white group-hover:scale-105 transition-transform" />
      
      {/* Tooltip */}
      <div className="hidden sm:block absolute left-16 bg-gray-900 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg">
        Chat with us on WhatsApp
        <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
      </div>
    </button>
  );
}
