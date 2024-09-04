"use client";
import React, { useState, useRef, useEffect } from "react";
import "../../app/Components/Uni.css";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const [activeLink, setActiveLink] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      isMenuOpen
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    if (isMenuOpen) {
      setIsMenuOpen(false); 
    }
  };

  return (
    <>
      <section className="fixed top-0 left-0 w-full bg-[#07092B] z-40">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-2 text-xs px-4 md:px-8">
          {/* Left Section: Contact Info */}
          <div className="text-white mb-3 md:mb-0 hidden md:block">
            <ul className="flex flex-col md:flex-row gap-2 md:gap-6">
              <li>
                <a href="#" className="flex items-center">
                  <i className="bi bi-envelope px-2"></i>
                  info@danphehealth.com
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center">
                  <i className="bi bi-telephone px-2"></i>
                  +977 9869100966
                </a>
              </li>
            </ul>
          </div>

          <div className="text-white md:py-0 py-2">
            <ul className="flex flex-row gap-3">
              <li className="border-2 border-solid border-white w-10 h-10 flex items-center justify-center rounded-full">
                <a href="#">
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
              <li className="border-2 border-solid border-white w-10 h-10 flex items-center justify-center rounded-full">
                <a href="#">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>

              <button className="border border-transparent p-2 rounded-md bg-white text-black hover:bg-[#207EF7] hover:text-white flex items-center justify-center text-center gap-2"> <i className="bi bi-people-fill"></i>
                  Partners
              </button>
            
              <button className="border border-transparent p-2 rounded-md bg-white text-black hover:bg-[#207EF7] hover:text-white flex items-center justify-center text-center gap-2"> <i className="bi bi-telephone-inbound-fill"></i>
                  Contact Us
              </button>
            </ul>
          </div>
        </div>
      </section>

      <section className="fixed md:top-[56px] top-[70px] left-0 w-full bg-white shadow-md z-30">
      <div className="container mx-auto md:py-1 py-3 md:px-8 px-4 flex justify-between items-center text-sm">
        <a href="/" className="flex-shrink-0">
          <Image src="/images/front.png" alt="Logo" width={190} height={0} />
        </a>
        <div className="hidden md:flex flex-grow justify-end items-center gap-7">
          <ul className="flex gap-7 nav-item">
            {['/company', '/our-solution', '/our-clients', '/news-events', '/career', '/smart-community'].map((link) => (
              <li key={link}>
                <Link
                  href={link}
                  className={`hover:text-[#61a3f8] ${activeLink === link ? 'text-[#207EF7] font-semibold' : ''}`}
                  onClick={() => handleLinkClick(link)}
                >
                  {link.replace('/', '').replace('-', ' ').toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
          <button className="py-2 px-4 rounded-md bg-[#07092B] text-white hover:bg-[#207EF7]">
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
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-300 py-[100px] ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col p-5 text-[#07092B]">
          <div className="flex justify-between items-center border-b border-[#cccccc] pb-4">
            <h2 className="text-lg font-semibold">Danphe Health Menu</h2>
            <button
              onClick={toggleMenu}
              className="text-[#07092B] focus:outline-none text-2xl"
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
          <ul className="flex flex-col gap-3 mt-5">
            {['/company', '/our-solution', '/our-clients', '/news-events', '/career', '/smart-community'].map((link) => (
              <li key={link} className={`hover:text-[#207EF7] ${activeLink === link ? 'text-[#207EF7] font-semibold' : ''}`}>
                <Link href={link} onClick={() => handleLinkClick(link)}>
                  {link.replace('/', '').replace('-', ' ').toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
          <button className="mt-5 py-3 px-4 rounded-md bg-[#07092B] text-white hover:bg-[#207EF7] text-start">
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
