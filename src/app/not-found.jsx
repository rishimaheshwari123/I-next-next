"use client";
import React from "react";
import { useRouter } from "next/navigation";
const NotFound = () => {
  const navigate = useRouter();

  const handleButtonClick = () => {
    navigate.push("/");
  };

  return (
    <div className="lg:flex lg:justify-center lg:items-center lg:h-screen lg:w-screen lg:my-16 mt-20">
      <div className="relative">
        <img src="/notfound.gif" alt="Not Found" className="w-full h-auto" />
        <button
          onClick={handleButtonClick}
          className="absolute bottom-6  left-1/2 lg:bottom-28 lg:left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-5 py-2 lg:px-8 lg:py-4 hover:bg-blue-600"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
