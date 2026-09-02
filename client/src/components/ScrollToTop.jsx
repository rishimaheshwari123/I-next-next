"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {isVisible && (
        <button
          suppressHydrationWarning
          aria-label="Scroll to top"
          className="fixed bottom-18 right-4 sm:bottom-22 sm:right-6 z-40 w-10 h-10 sm:w-11 sm:h-11 bg-slate-900/90 hover:bg-blue-600 text-white rounded-full shadow-lg backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
          onClick={scrollToTop}
        >
          <FaArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
