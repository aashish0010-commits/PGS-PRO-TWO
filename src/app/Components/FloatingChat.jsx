"use client";
import React, { useState, useEffect } from 'react';
import { FaComments } from 'react-icons/fa';

function FloatingChat() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-4 left-4">
          <a
            href="/doctor-chat"
            className="bg-customPrimary text-white md:p-[10px] p-[8px] rounded-full shadow-lg hover:bg-customDark focus:outline-none transition-all duration-500 flex items-center justify-center"
          >
            <FaComments className="w-12 h-12" />
          </a>
        </div>
      )}
    </>
  );
}

export default FloatingChat;