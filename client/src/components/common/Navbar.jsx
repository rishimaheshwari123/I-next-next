"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { HiMenuAlt3 } from "react-icons/hi";
import {
  FaFacebook,
  FaBullhorn,
  FaUserPlus,
  FaChartLine,
  FaLaptopCode,
  FaMobileAlt,
  FaRobot,
  FaShieldAlt,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight
} from "react-icons/fa";
import { navbar } from "../../constantData/navbarLink";
import { services } from "../../constantData/servicesData";
import Link from "next/link";
import Image from "next/image";
import DomainBookingModal from "../DomainBookingModal";

// Service icons mapping
const serviceIcons = {
  1: FaFacebook,
  2: FaBullhorn,
  3: FaUserPlus,
  4: FaChartLine,
  5: FaLaptopCode,
  6: FaMobileAlt,
  7: FaRobot,
  8: FaShieldAlt,
};

// Service icon background colors mapping (No gradients, uses solid theme colors)
const serviceIconColors = {
  1: "bg-blue-600 shadow-blue-600/20",
  2: "bg-orange-500 shadow-orange-500/20",
  3: "bg-blue-600 shadow-blue-600/20",
  4: "bg-orange-500 shadow-orange-500/20",
  5: "bg-blue-600 shadow-blue-600/20",
  6: "bg-orange-500 shadow-orange-500/20",
  7: "bg-blue-600 shadow-blue-600/20",
  8: "bg-orange-500 shadow-orange-500/20",
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const megaMenuRef = useRef(null);
  const sidebarRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 20);
    };

    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Premium Topbar */}

      {/* Main Navbar */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "top-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.08)] py-1.5 px-6"
          : "top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 py-3.5 px-6"
          }`}
      >
        <div className="max-w-[95vw] mx-auto relative">
          <div
            className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? "h-14" : "h-16"
              }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center z-50 group/logo flex-shrink-0"
            >
              <div className="relative overflow-hidden rounded-xl transition-all duration-300 group-hover/logo:scale-105 group-hover/logo:rotate-3 shadow-md shadow-blue-500/10">
                <img
                  src="/logo.jpeg"
                  alt="Logo"
                  className={`${isScrolled ? "h-9" : "h-11"} w-auto object-contain rounded-xl transition-all duration-300`}
                />
              </div>
            </Link>

            {/* Desktop Navigation Links (Center Capsule - Enhanced Visibility) */}
            <div className="hidden lg:flex items-center justify-center flex-grow mx-6">
              <div className="bg-slate-50 border border-orange-500/50 rounded-full px-5 py-1.5 flex items-center shadow-[0_4px_15px_rgba(249,115,22,0.06)] backdrop-blur-sm">
                <ul className="flex items-center space-x-1.5">
                  {navbar.map((link) => (
                    <li key={link.id}>
                      {link.title === "Services" ? (
                        <div
                          className="group"
                          onMouseEnter={() => setIsServicesOpen(true)}
                          onMouseLeave={() => setIsServicesOpen(false)}
                        >
                          <button
                            suppressHydrationWarning
                            className="flex items-center space-x-1 text-slate-700 hover:text-orange-500 font-semibold transition-all duration-200 py-1.5 px-3 hover:bg-orange-500/10 rounded-full text-sm"
                          >
                            <span>{link.title}</span>
                            <IoIosArrowDown
                              className={`w-3.5 h-3.5 transition-transform duration-300 ${isServicesOpen ? "rotate-180 text-orange-500" : "text-slate-500"
                                }`}
                            />
                          </button>
                        </div>
                      ) : (
                        <Link
                          href={link.path}
                          className={`font-semibold text-sm transition-all duration-300 py-1.5 px-3.5 rounded-full relative group/link ${pathname === link.path
                            ? "text-white bg-blue-600 border border-blue-500 shadow-sm shadow-blue-500/20"
                            : "text-slate-700 hover:text-orange-500 hover:bg-orange-500/10"
                            }`}
                        >
                          {link.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Desktop Action Buttons (Right - Enhanced Visibility) */}
            <div className="hidden lg:flex items-center gap-3.5 flex-shrink-0">
              {/* Call pill - Light background, blue border & text */}
              <a
                href="tel:+919981122493"
                className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white hover:scale-[1.03] transition-all duration-300 font-bold text-xs shadow-sm hover:shadow-md"
              >
                <FaPhone className="text-orange-500 w-3 h-3 animate-pulse" />
                <span>+91 9981122493</span>
              </a>

              {/* LOGIN button - Solid orange theme, white hover transition */}
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-orange-500 text-white border-2 border-orange-500 rounded-full hover:bg-white hover:text-orange-500 hover:border-orange-500 hover:scale-[1.03] transition-all duration-300 font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/15"
              >
                <span>Login</span>
                <FaArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              suppressHydrationWarning
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden z-50 p-2 rounded-xl hover:bg-slate-100 transition-colors duration-200 text-slate-700"
            >
              {isMobileMenuOpen ? (
                <IoMdClose className="w-6 h-6" />
              ) : (
                <HiMenuAlt3 className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mega Menu Dropdown (Full Width of max-w-[95vw] relative container) */}
          <div
            ref={megaMenuRef}
            className={`absolute left-0 right-0 top-full pt-3 transition-all duration-300 z-[100] ${isServicesOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4"
              }`}
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <div className="w-full px-0">
              <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-200 overflow-hidden">
                <div className="grid grid-cols-12 gap-0">
                  {/* Left Section - Services (75%) */}
                  <div className="col-span-9 p-8">
                    <div className="mb-6 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></span>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          Our Core Services
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Innovative solutions tailored to power your brand
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {services.map((service) => {
                        const IconComponent = serviceIcons[service.id];
                        return (
                           <Link
                             key={service.id}
                             href={service.path}
                             onClick={() => setIsServicesOpen(false)}
                             className="group/item p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-all duration-300 border border-slate-100 hover:border-slate-200 hover:shadow-md"
                           >
                             <div className="flex items-start space-x-4">
                               <div
                                 className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white ${serviceIconColors[service.id] || "bg-blue-600"
                                   } group-hover/item:scale-110 transition-all duration-300 shadow-md`}
                               >
                                 <IconComponent className="w-5 h-5" />
                               </div>
                               <div className="flex-1 min-w-0">
                                 <h4 className="font-bold text-slate-800 mb-1 text-sm group-hover/item:text-blue-600 transition-colors duration-200">
                                   {service.title}
                                 </h4>
                                 <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                                   {service.description}
                                 </p>
                               </div>
                             </div>
                           </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Section - Contact & Social (25%) */}
                  <div className="col-span-3 bg-slate-50 p-8 border-l border-slate-100">
                    <div className="space-y-6">
                      {/* Contact Info */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center">
                          <span className="w-1.5 h-4 bg-blue-500 rounded-full mr-2"></span>
                          Get In Touch
                        </h4>
                        <div className="space-y-3">
                          <a
                            href="tel:+919981122493"
                            className="flex items-center space-x-3 text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200 group p-2 rounded-xl hover:bg-slate-100"
                          >
                            <div className="w-9 h-9 bg-orange-500/10 group-hover:bg-orange-500 group-hover:text-white rounded-lg flex items-center justify-center text-orange-400 transition-all duration-300 flex-shrink-0">
                              <FaPhone className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] text-slate-500 font-medium">
                                Call Us
                              </div>
                              <div className="font-bold text-slate-800 text-xs">
                                +91 9981122493
                              </div>
                            </div>
                          </a>

                          <a
                            href="mailto:info.inextets@gmail.com"
                            className="flex items-center space-x-3 text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200 group p-2 rounded-xl hover:bg-slate-100"
                          >
                            <div className="w-9 h-9 bg-orange-500/10 group-hover:bg-orange-500 group-hover:text-white rounded-lg flex items-center justify-center text-orange-400 transition-all duration-300 flex-shrink-0">
                              <FaEnvelope className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] text-slate-500 font-medium">
                                Email Us
                              </div>
                              <div className="font-bold text-slate-800 text-xs truncate">
                                info.inextets@gmail.com
                              </div>
                            </div>
                          </a>

                          <div className="flex items-start space-x-3 text-sm text-slate-600 p-2.5 rounded-xl bg-white border border-slate-200">
                            <div className="w-9 h-9 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-400 shadow-sm flex-shrink-0">
                              <FaMapMarkerAlt className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] text-slate-500 font-medium">
                                Visit Us
                              </div>
                              <div className="font-semibold text-slate-600 leading-tight text-[11px]">
                                Zone-I, MP Nagar, Bhopal, MP
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Social Media */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center">
                          <span className="w-1.5 h-4 bg-orange-500 rounded-full mr-2"></span>
                          Follow Us
                        </h4>
                        <div className="flex items-center gap-2">
                          <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 bg-slate-100 hover:bg-[#1877F2] border border-slate-200 rounded-lg flex items-center justify-center hover:text-white text-slate-600 transition-all duration-300 shadow-sm hover:scale-105"
                            title="Facebook"
                          >
                            <FaFacebook className="w-4 h-4" />
                          </a>

                          <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 bg-slate-100 hover:bg-[#0A66C2] border border-slate-200 rounded-lg flex items-center justify-center hover:text-white text-slate-600 transition-all duration-300 shadow-sm hover:scale-105"
                            title="LinkedIn"
                          >
                            <FaLinkedin className="w-4 h-4" />
                          </a>

                          <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 bg-slate-100 hover:bg-[#E1306C] border border-slate-200 rounded-lg flex items-center justify-center hover:text-white text-slate-600 transition-all duration-300 shadow-sm hover:scale-105"
                            title="Instagram"
                          >
                            <FaInstagram className="w-4 h-4" />
                          </a>

                          <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 bg-slate-100 hover:bg-[#FF0000] border border-slate-200 rounded-lg flex items-center justify-center hover:text-white text-slate-600 transition-all duration-300 shadow-sm hover:scale-105"
                            title="YouTube"
                          >
                            <FaYoutube className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href="/#contact"
                        onClick={() => setIsServicesOpen(false)}
                        className="block w-full text-center px-4 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all duration-200 shadow-md shadow-orange-500/20 hover:shadow-lg text-xs tracking-wider uppercase transform hover:-translate-y-0.5"
                      >
                        Request a Quote →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-500"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Sidebar Panel */}
        <div
          ref={sidebarRef}
          className={`absolute top-0 right-0 h-full w-[85vw] max-w-sm bg-white border-l border-slate-200 shadow-2xl rounded-l-3xl transform transition-transform duration-500 ease-out overflow-y-auto ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col min-h-full">
            {/* Sidebar Header */}
            <div className="bg-white border-b border-slate-100 px-6 py-5 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src="/logo.jpeg"
                    alt="Logo"
                    className="h-10 w-auto object-contain rounded-xl shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 px-6 py-4">
              <ul className="space-y-1.5">
                {navbar.map((link) => (
                  <li key={link.id}>
                    {link.title === "Services" ? (
                      <div>
                        <button
                          onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                          className="w-full flex items-center justify-between px-4 py-3 text-slate-700 hover:text-orange-500 hover:bg-orange-500/10 rounded-xl font-semibold transition-colors duration-200"
                        >
                          <span>{link.title}</span>
                          <IoIosArrowDown
                            className={`transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180 text-orange-500" : "text-slate-500"
                              }`}
                          />
                        </button>

                        {/* Mobile Services Dropdown */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ${isMobileServicesOpen
                            ? "max-h-[2000px] opacity-100 mt-2"
                            : "max-h-0 opacity-0"
                            }`}
                        >
                          <div className="space-y-2 pl-2">
                            {services.map((service) => {
                              const IconComponent = serviceIcons[service.id];
                              return (
                                <Link
                                  key={service.id}
                                  href={service.path}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsMobileServicesOpen(false);
                                  }}
                                  className="flex items-start space-x-3 px-4 py-3 text-sm text-slate-500 hover:text-orange-500 hover:bg-orange-500/10 rounded-xl transition-all duration-200 border border-slate-100"
                                >
                                  <div
                                    className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-white ${serviceIconColors[service.id] || "bg-blue-600"
                                      } shadow-sm`}
                                  >
                                    <IconComponent className="w-4.5 h-4.5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-white text-xs mb-0.5">
                                      {service.title}
                                    </div>
                                    <div className="text-[10px] text-slate-500 line-clamp-1">
                                      {service.description}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-4 py-3 font-semibold transition-all duration-200 rounded-xl ${pathname === link.path
                          ? "text-white bg-blue-600"
                          : "text-slate-700 hover:text-orange-500 hover:bg-orange-500/10"
                          }`}
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar Footer */}
            <div className="p-6 border-t border-slate-100 bg-white sticky bottom-0">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all duration-300 text-sm shadow-md shadow-orange-500/20 hover:scale-[1.02]"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Booking Modal */}
      <DomainBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
