"use client";
import React from "react";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-md transition-all duration-300">
      {/* Animated Glowing Ring & Logo inside */}
      <div className="relative flex items-center justify-center w-32 h-32 mb-6">
        {/* Glowing aura */}
        <div className="absolute inset-0 m-auto bg-gradient-to-tr from-blue-500 to-orange-500 opacity-20 w-24 h-24 rounded-full blur-xl animate-pulse"></div>
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-orange-500 border-b-transparent border-l-transparent animate-spin"></div>
        {/* Inner reverse-spinning ring */}
        <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-orange-400 border-l-indigo-400 animate-[spin_1.5s_linear_infinite] [animation-direction:reverse]"></div>
        
        {/* Center Logo */}
        <div className="w-16 h-16 relative bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400 text-lg">
            I Next
          </span>
        </div>
      </div>

      {/* Loading text with bouncing dots */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-xl font-bold text-white tracking-widest uppercase animate-pulse">
          Loading
        </h3>
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.1s]"></span>
          <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
        </div>
        <p className="text-xs text-gray-400 mt-2 font-medium tracking-wide">
          Preparing your digital experience...
        </p>
      </div>
    </div>
  );
}
