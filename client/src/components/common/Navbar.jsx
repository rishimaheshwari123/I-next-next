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

// Service icon background colors mapping
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

  // Close mega menu on route change
  useEffect(() => {
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white  border-b border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.06)] py-1.5 px-3 sm:px-6 lg:px-8"
          : "bg-white border-b border-slate-100/90 py-2.5 sm:py-3.5 px-3 sm:px-6 lg:px-8"
          }`}
      >
        <div className="max-w-[1480px] mx-auto relative">
          <div
            className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? "h-13 sm:h-14" : "h-14 sm:h-16"
              }`}
          >
            {/* Logo Section */}
            <Link
              href="/"
              className="flex items-center z-50 group/logo flex-shrink-0"
            >
              <div className="relative overflow-hidden rounded-xl transition-all duration-300 group-hover/logo:scale-105 shadow-sm shadow-blue-500/10">
                <img
                  src="/logo.jpeg"
                  alt="I Next ETS Logo"
                  className={`${isScrolled ? "h-8 sm:h-9 lg:h-10" : "h-9 sm:h-10 lg:h-11"
                    } w-auto object-contain rounded-xl transition-all duration-300`}
                />
              </div>
            </Link>

            {/* Desktop Navigation Links (Center Capsule - Ultra-Responsive) */}
            <div className="hidden lg:flex items-center justify-center flex-1 min-w-0 mx-2 xl:mx-6">
              <div className="bg-slate-50/90 border border-orange-500/40 rounded-full px-2.5 xl:px-4 py-1 xl:py-1.5 flex items-center shadow-[0_2px_12px_rgba(249,115,22,0.06)] backdrop-blur-sm max-w-full">
                <ul className="flex items-center space-x-0.5 xl:space-x-1.5 flex-nowrap">
                  {navbar.map((link) => (
                    <li key={link.id} className="flex-shrink-0">
                      {link.title === "Services" ? (
                        <div
                          className="relative group"
                          onMouseEnter={() => setIsServicesOpen(true)}
                          onMouseLeave={() => setIsServicesOpen(false)}
                        >
                          <button
                            suppressHydrationWarning
                            type="button"
                            onClick={() => setIsServicesOpen(!isServicesOpen)}
                            className={`flex items-center space-x-1 font-semibold transition-all duration-200 py-1.5 px-2.5 xl:px-3.5 hover:bg-orange-500/10 rounded-full text-xs xl:text-sm whitespace-nowrap ${pathname?.startsWith("/service") || isServicesOpen
                              ? "text-orange-600 bg-orange-500/10"
                              : "text-slate-700 hover:text-orange-500"
                              }`}
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
                          className={`font-semibold text-xs xl:text-sm transition-all duration-300 py-1.5 px-2.5 xl:px-3.5 rounded-full whitespace-nowrap relative group/link inline-block ${pathname === link.path
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

            {/* Desktop Action Buttons (Right - Flexible across laptop screens) */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3.5 flex-shrink-0">
              {/* Call pill - Compact on small laptops (1024px-1279px), full number on large screens */}
              <a
                href="tel:+919981122493"
                className="flex items-center gap-1.5 xl:gap-2 px-3 py-1.5 xl:px-4 xl:py-2 bg-white border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white hover:scale-[1.02] transition-all duration-300 font-bold text-xs shadow-sm hover:shadow-md whitespace-nowrap"
              >
                <FaPhone className="text-orange-500 w-3 h-3 animate-pulse flex-shrink-0" />
                <span className="hidden xl:inline">+91 9981122493</span>
                <span className="inline xl:hidden">Call Now</span>
              </a>

              {/* LOGIN button */}
              <Link
                href="/login"
                className="flex items-center gap-1 xl:gap-1.5 px-3.5 py-1.5 xl:px-5 xl:py-2 bg-orange-500 text-white border-2 border-orange-500 rounded-full hover:bg-white hover:text-orange-500 hover:border-orange-500 hover:scale-[1.02] transition-all duration-300 font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/15 whitespace-nowrap"
              >
                <span>Login</span>
                <FaArrowRight className="w-3 h-3 flex-shrink-0" />
              </Link>
            </div>

            {/* Mobile / Tablet Header Controls (< 1024px) */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Quick Call Icon for mobile */}
              <a
                href="tel:+919981122493"
                aria-label="Call I Next ETS"
                className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors shadow-sm"
              >
                <FaPhone className="w-3.5 h-3.5 text-orange-500" />
              </a>

              {/* Mobile Hamburger Button */}
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors duration-200 text-slate-700"
              >
                {isMobileMenuOpen ? (
                  <IoMdClose className="w-6 h-6" />
                ) : (
                  <HiMenuAlt3 className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mega Menu Dropdown */}
          <div
            ref={megaMenuRef}
            className={`absolute left-0 right-0 top-12 pt-3 transition-all duration-300 z-[100] ${isServicesOpen
              ? "opacity-100 visible translate-y-0 pointer-events-auto"
              : "opacity-0 invisible -translate-y-3 pointer-events-none"
              }`}
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <div className="w-full">
              <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-200 overflow-hidden">
                <div className="grid grid-cols-12 gap-0">
                  {/* Left Section - Services (75%) */}
                  <div className="col-span-12 lg:col-span-8 xl:col-span-9 p-6 xl:p-8">
                    <div className="mb-5 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></span>
                      <div>
                        <h3 className="text-base xl:text-lg font-bold text-slate-900">
                          Our Core Services
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Innovative solutions tailored to power your brand
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3.5">
                      {services.map((service) => {
                        const IconComponent = serviceIcons[service.id] || FaLaptopCode;
                        return (
                          <Link
                            key={service.id}
                            href={service.path}
                            onClick={() => setIsServicesOpen(false)}
                            className="group/item p-3.5 rounded-2xl bg-slate-50/70 hover:bg-slate-50 transition-all duration-300 border border-slate-100 hover:border-slate-200 hover:shadow-md"
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white ${serviceIconColors[service.id] || "bg-blue-600 shadow-blue-600/20"
                                  } group-hover/item:scale-110 transition-all duration-300 shadow-sm`}
                              >
                                <IconComponent className="w-4.5 h-4.5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-800 mb-0.5 text-xs xl:text-sm group-hover/item:text-blue-600 transition-colors duration-200 truncate">
                                  {service.title}
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-tight line-clamp-2">
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
                  <div className="col-span-12 lg:col-span-4 xl:col-span-3 bg-slate-50/80 p-6 xl:p-8 border-t lg:border-t-0 lg:border-l border-slate-100">
                    <div className="space-y-5">
                      {/* Contact Info */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3.5 flex items-center">
                          <span className="w-1.5 h-3.5 bg-blue-500 rounded-full mr-2"></span>
                          Get In Touch
                        </h4>
                        <div className="space-y-2.5">
                          <a
                            href="tel:+919981122493"
                            className="flex items-center space-x-3 text-xs text-slate-600 hover:text-slate-900 transition-colors duration-200 group p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-200"
                          >
                            <div className="w-8 h-8 bg-orange-500/10 group-hover:bg-orange-500 group-hover:text-white rounded-lg flex items-center justify-center text-orange-500 transition-all duration-300 flex-shrink-0">
                              <FaPhone className="w-3 h-3" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] text-slate-400 font-medium">Call Us</div>
                              <div className="font-bold text-slate-800 text-xs truncate">+91 9981122493</div>
                            </div>
                          </a>

                          <a
                            href="mailto:info.inextets@gmail.com"
                            className="flex items-center space-x-3 text-xs text-slate-600 hover:text-slate-900 transition-colors duration-200 group p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-200"
                          >
                            <div className="w-8 h-8 bg-orange-500/10 group-hover:bg-orange-500 group-hover:text-white rounded-lg flex items-center justify-center text-orange-500 transition-all duration-300 flex-shrink-0">
                              <FaEnvelope className="w-3 h-3" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] text-slate-400 font-medium">Email Us</div>
                              <div className="font-bold text-slate-800 text-xs truncate">info.inextets@gmail.com</div>
                            </div>
                          </a>

                          <div className="flex items-start space-x-3 text-xs text-slate-600 p-2 rounded-xl bg-white border border-slate-200/80">
                            <div className="w-8 h-8 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
                              <FaMapMarkerAlt className="w-3 h-3" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] text-slate-400 font-medium">Visit Us</div>
                              <div className="font-medium text-slate-700 text-[11px] leading-tight">Zone-I, MP Nagar, Bhopal, MP</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Social Media */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center">
                          <span className="w-1.5 h-3.5 bg-orange-500 rounded-full mr-2"></span>
                          Follow Us
                        </h4>
                        <div className="flex items-center gap-2">
                          <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-white hover:bg-[#1877F2] border border-slate-200 rounded-lg flex items-center justify-center hover:text-white text-slate-600 transition-all duration-300 shadow-sm hover:scale-105"
                            title="Facebook"
                          >
                            <FaFacebook className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-white hover:bg-[#0A66C2] border border-slate-200 rounded-lg flex items-center justify-center hover:text-white text-slate-600 transition-all duration-300 shadow-sm hover:scale-105"
                            title="LinkedIn"
                          >
                            <FaLinkedin className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-white hover:bg-[#E1306C] border border-slate-200 rounded-lg flex items-center justify-center hover:text-white text-slate-600 transition-all duration-300 shadow-sm hover:scale-105"
                            title="Instagram"
                          >
                            <FaInstagram className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-white hover:bg-[#FF0000] border border-slate-200 rounded-lg flex items-center justify-center hover:text-white text-slate-600 transition-all duration-300 shadow-sm hover:scale-105"
                            title="YouTube"
                          >
                            <FaYoutube className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href="/#contact"
                        onClick={() => setIsServicesOpen(false)}
                        className="block w-full text-center px-4 py-2.5 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all duration-200 shadow-md shadow-orange-500/20 hover:shadow-lg text-xs tracking-wider uppercase transform hover:-translate-y-0.5"
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

      {/* Mobile / Tablet Drawer Menu */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Drawer Panel */}
        <div
          ref={sidebarRef}
          className={`absolute top-0 right-0 h-full w-[85vw] max-w-sm bg-white border-l border-slate-200 shadow-2xl rounded-l-3xl transform transition-transform duration-300 ease-out flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Drawer Header */}
          <div className="bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between sticky top-0 z-10">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="h-9 w-auto object-contain rounded-xl shadow-sm"
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            >
              <IoMdClose className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <ul className="space-y-1">
              {navbar.map((link) => (
                <li key={link.id}>
                  {link.title === "Services" ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-semibold transition-colors duration-200 text-sm ${pathname?.startsWith("/service") || isMobileServicesOpen
                          ? "bg-orange-500/10 text-orange-600"
                          : "text-slate-700 hover:bg-slate-100"
                          }`}
                      >
                        <span>{link.title}</span>
                        <IoIosArrowDown
                          className={`transition-transform duration-300 ${isMobileServicesOpen ? "rotate-180 text-orange-500" : "text-slate-500"
                            }`}
                        />
                      </button>

                      {/* Mobile Services Accordion */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${isMobileServicesOpen ? "max-h-[1000px] opacity-100 mt-2" : "max-h-0 opacity-0"
                          }`}
                      >
                        <div className="space-y-1.5 pl-2">
                          {services.map((service) => {
                            const IconComponent = serviceIcons[service.id] || FaLaptopCode;
                            return (
                              <Link
                                key={service.id}
                                href={service.path}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setIsMobileServicesOpen(false);
                                }}
                                className="flex items-center space-x-3 px-3 py-2 text-xs text-slate-700 hover:text-orange-500 hover:bg-orange-500/10 rounded-xl transition-all duration-200 border border-slate-100/80 bg-slate-50/50"
                              >
                                <div
                                  className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-white ${serviceIconColors[service.id] || "bg-blue-600 shadow-blue-600/20"
                                    } shadow-sm`}
                                >
                                  <IconComponent className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-slate-800 truncate">
                                    {service.title}
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
                      className={`block px-4 py-2.5 font-semibold transition-all duration-200 rounded-xl text-sm ${pathname === link.path
                        ? "text-white bg-blue-600 shadow-sm shadow-blue-500/20"
                        : "text-slate-700 hover:text-orange-500 hover:bg-orange-500/10"
                        }`}
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Mobile Contact Box */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Quick Contact</div>
              <a
                href="tel:+919981122493"
                className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold hover:text-blue-600"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <FaPhone className="w-3 h-3 text-orange-500" />
                </div>
                <span>+91 9981122493</span>
              </a>
              <a
                href="mailto:info.inextets@gmail.com"
                className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold hover:text-blue-600 truncate"
              >
                <div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                  <FaEnvelope className="w-3 h-3" />
                </div>
                <span className="truncate">info.inextets@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-5 border-t border-slate-100 bg-white sticky bottom-0 space-y-2">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-center px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all duration-300 text-sm shadow-md shadow-orange-500/20"
            >
              <span>Login to Account</span>
              <FaArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Domain Booking Modal */}
      <DomainBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
