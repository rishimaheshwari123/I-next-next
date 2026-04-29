"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaHome,
  FaInfo,
  FaEnvelope,
  FaQuestion,
  FaWhatsapp,
  FaMinus,
} from "react-icons/fa";

const ButtomIcon = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="fixed bottom-20 right-4 flex flex-col items-center space-y-3 z-50">
      {toggle && (
        <div className="flex flex-col space-y-3 mb-3 animate-fadeIn">
          <Link 
            href="/" 
            className="icon group"
            title="Home"
          >
            <FaHome className="w-10 h-10 text-white bg-blue-600 hover:bg-blue-700 p-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110" />
          </Link>
          <Link 
            href="/about" 
            className="icon group"
            title="About Us"
          >
            <FaInfo className="w-10 h-10 text-white bg-purple-600 hover:bg-purple-700 p-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110" />
          </Link>
          <a
            href="https://wa.me/919981122493?text=Hello%20I%20Next%20ETS!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="icon group"
            title="Chat on WhatsApp"
          >
            <FaWhatsapp className="w-10 h-10 text-white bg-green-600 hover:bg-green-700 p-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110" />
          </a>
          <Link
            href="mailto:info.inextets@gmail.com"
            target="_self"
            className="icon group"
            title="Email Us"
          >
            <FaEnvelope className="w-10 h-10 text-white bg-orange-600 hover:bg-orange-700 p-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110" />
          </Link>
          <Link 
            href="/contact" 
            className="icon group"
            title="Contact Us"
          >
            <FaQuestion className="w-10 h-10 text-white bg-pink-600 hover:bg-pink-700 p-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110" />
          </Link>
        </div>
      )}

      <button
        className="w-16 h-16 flex items-center justify-center text-white bg-green-500 hover:bg-green-600 rounded-full transition-all duration-300 shadow-2xl hover:shadow-green-500/50 hover:scale-110 relative group"
        onClick={handleToggle}
        title={toggle ? "Close Menu" : "WhatsApp Contact"}
      >
        {toggle ? (
          <FaMinus size={28} className="transition-transform duration-300" />
        ) : (
          <>
            <FaWhatsapp size={32} className="transition-transform duration-300 group-hover:rotate-12" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
          </>
        )}
      </button>
    </div>
  );
};

export default ButtomIcon;
