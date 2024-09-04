"use client"
import React, { useState, useRef, useEffect } from "react";
import "../../app/Components/Uni.css";
import Image from "next/image";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      <section className="bg-[#07092B]">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-3 text-xs px-5">
          <div className="text-white mb-3 md:mb-0">
            <ul className="flex md:flex-row gap-2 md:gap-6">
              <li>
                <a href="">
                  <i className="bi bi-envelope px-2"></i>info@danphehealth.com
                </a>
              </li>
              <li>
                <a href="">
                  <i className="bi bi-telephone px-2 "></i>+977 9869100966
                </a>
              </li>
            </ul>
          </div>

          <div className="text-white">
            <ul className="flex flex-row gap-3">
              <li className="border-2 border-solid border-white w-10 h-10 flex items-center justify-center rounded-full">
                <a href="">
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
              <li className="border-2 border-solid border-white w-10 h-10 flex items-center justify-center rounded-full">
                <a href="">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
              <li className="border border-solid p-2 rounded-md hover:bg-white hover:text-black flex items-center justify-center">
                <a href="" className="flex items-center">
                  <i className="bi bi-people px-2"></i>
                  Partners
                </a>
              </li>
              <li className="border border-solid p-2 rounded-md hover:bg-white hover:text-black flex items-center justify-center">
                <a href="" className="flex items-center">
                  <i className="bi bi-telephone-inbound px-2"></i>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#F2FBF8]">
        <div className="container mx-auto py-5 px-5 flex justify-between items-center text-sm">
          <a href="" className="flex-shrink-0">
            <Image
              src="https://danphehealth.com/frontend/img/logo.png"
              alt="Logo"
              width={120}
              height={0}
            />
          </a>
          <div className="hidden md:flex flex-grow justify-end items-center gap-7">
            <ul className="flex gap-7 nav-item">
              <li><a href="">Company</a></li>
              <li><a href="">Our Solution</a></li>
              <li><a href="">Our Clients</a></li>
              <li><a href="">News & Events</a></li>
              <li><a href="">Career</a></li>
              <li><a href="">Danphe Community</a></li>
            </ul>
            <button className="py-2 px-4 rounded-md bg-[#207EF6] text-white hover:bg-[#07092B]">
              <i className="bi bi-calendar2-minus-fill pr-2"></i>
              Schedule a Demo
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#07092B] focus:outline-none text-2xl"
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>

        {/* Sidebar for mobile and tablet screens */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="flex flex-col p-5 text-[#07092B]">
            <div className="flex justify-between items-center border-b border-[#cccccc] pb-4">
              <h2 className="text-lg font-semibold">Danphe Health Menu</h2>
              <button onClick={toggleMenu} className="text-[#07092B] focus:outline-none text-2xl">
                <i className="bi bi-x"></i>
              </button>
            </div>
            <ul className="flex flex-col gap-3 mt-5">
              <li><a href="">Company</a></li>
              <li><a href="">Our Solution</a></li>
              <li><a href="">Our Clients</a></li>
              <li><a href="">News & Events</a></li>
              <li><a href="">Career</a></li>
              <li><a href="">Danphe Community</a></li>
            </ul>
            <button className="mt-5 py-3 px-4 rounded-md bg-[#207EF6] text-white hover:bg-[#07092B]">
              <i className="bi bi-calendar2-minus-fill pr-2"></i>
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;