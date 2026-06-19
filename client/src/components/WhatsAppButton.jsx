'use client';

import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  // Company WhatsApp number
  const whatsappNumber = '919981122493';
  const message = encodeURIComponent('Hi! I am interested in your services.');

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-bounce hover:animate-none group"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="text-4xl text-white group-hover:scale-110 transition-transform" />
      
      {/* Tooltip */}
      <div className="absolute left-20 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Chat with us on WhatsApp
        <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
      </div>
    </button>
  );
}
