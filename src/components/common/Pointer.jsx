import React, { useState, useEffect } from 'react';
import './CustomPointer.css'; // Import CSS for styling

const CustomPointer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener('mousemove', handleMouseMove);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  // Update position of the pointer on mouse move
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="custom-pointer" style={{ left: position.x, top: position.y }}></div>
  );
};

export default CustomPointer;
