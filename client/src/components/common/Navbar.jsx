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

// Service icon background colors mapping
const serviceIconColors = {
  1: "bg-gradient-to-br from-pink-500 to-rose-500 shadow-rose-500/20",
  2: "bg-gradient-to-br from-purple-500 to-indigo-500 shadow-purple-500/20",
  3: "bg-gradient-to-br from-teal-400 to-emerald-500 shadow-teal-500/20",
  4: "bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/20",
  5: "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20",
  6: "bg-gradient-to-br from-cyan-400 to-blue-500 shadow-cyan-500/20",
  7: "bg-gradient-to-br from-fuchsia-500 to-purple-600 shadow-fuchsia-500/20",
  8: "bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/20",
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
      {/* Topbar */}
      <div
        className={`fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 transition-all duration-300 ${isScrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
          }`}
      >
        <div className="max-w-[90vw] mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-12">
            {/* Left - Contact Info */}
            <div className="flex items-center gap-6">
              <a
                href="tel:+919981122493"
                className="group flex items-center gap-2 text-white hover:text-orange-100 transition-all duration-200 text-sm relative"
              >
                <FaPhone className="w-3.5 h-3.5" />
                <span className="hidden md:inline font-medium relative">
                  +91 9981122493
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>

              <a
                href="mailto:info.inextets@gmail.com"
                className="group flex items-center gap-2 text-white hover:text-orange-100 transition-all duration-200 text-sm relative"
              >
                <FaEnvelope className="w-3.5 h-3.5" />
                <span className="hidden lg:inline font-medium relative">
                  info.inextets@gmail.com
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </span>
              </a>
            </div>

            {/* Right - Social Links */}
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 hover:border-white/30 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                title="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 hover:border-white/30 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                title="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 hover:border-white/30 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                title="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 hover:border-white/30 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                title="YouTube"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "top-3 mx-auto w-[94vw] max-w-7xl bg-white/90 backdrop-blur-md border border-slate-200/50 shadow-[0_10px_30px_rgba(0,0,0,0.04)] rounded-2xl py-1 px-4"
          : "top-12 w-full bg-white border-b border-slate-100"
          }`}
      >
        <div className="max-w-[90vw] mx-auto px-2 lg:px-4">
          <div
            className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? "h-16" : "h-20"
              }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2.5 z-50 group/logo"
            >
              <div className="relative overflow-hidden rounded-xl transition-all duration-300 group-hover/logo:scale-105 group-hover/logo:rotate-3 shadow-md shadow-blue-500/10">
                <Image
                  src="https://i.ibb.co/N608STN/inext-ets-logo.jpg"
                  width={isScrolled ? 42 : 52}
                  height={isScrolled ? 42 : 52}
                  alt="Logo"
                  className="rounded-xl transition-all duration-300"
                  priority
                />
              </div>
              <span className="hidden sm:block text-xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 bg-clip-text text-transparent tracking-tight">
                I Next ETS
              </span>
            </Link>

            {/* Desktop Navigation Links (Center) */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-6">
              <ul className="flex items-center space-x-1">
                {navbar.map((link) => (
                  <li key={link.id}>
                    {link.title === "Services" ? (
                      <div
                        className="group"
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                      >
                        <button suppressHydrationWarning className="flex items-center space-x-1 text-slate-700 hover:text-blue-600 font-semibold transition-all duration-200 py-2 px-2 hover:bg-slate-50/80 rounded-xl">
                          <span>{link.title}</span>
                          <IoIosArrowDown
                            className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180 text-blue-600" : ""
                              }`}
                          />
                        </button>

                        {/* Mega Menu */}
                        <div
                          ref={megaMenuRef}
                          className={`absolute left-0 right-0 top-full pt-3 transition-all duration-300 z-[100] ${isServicesOpen
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-4"
                            }`}
                        >
                          <div className="w-full px-0">
                            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-100/80 overflow-hidden">
                              <div className="grid grid-cols-12 gap-0">
                                {/* Left Section - Services (75%) */}
                                <div className="col-span-9 p-8">
                                  <div className="mb-6 flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></span>
                                    <div>
                                      <h3 className="text-xl font-bold text-slate-800">
                                        Our Core Services
                                      </h3>
                                      <p className="text-xs text-slate-400 mt-0.5">
                                        Innovative solutions tailored to power
                                        your brand
                                      </p>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-3 gap-4">
                                    {services.map((service) => {
                                      const IconComponent =
                                        serviceIcons[service.id];
                                      return (
                                        <Link
                                          key={service.id}
                                          href={service.path}
                                          onClick={() =>
                                            setIsServicesOpen(false)
                                          }
                                          className="group/item p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300 border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5"
                                        >
                                          <div className="flex items-start space-x-4">
                                            <div
                                              className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white ${serviceIconColors[service.id] ||
                                                "bg-blue-600"
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
                                <div className="col-span-3 bg-gradient-to-br from-slate-50 to-blue-50/30 p-8 border-l border-slate-100">
                                  <div className="space-y-6">
                                    {/* Contact Info */}
                                    <div>
                                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center">
                                        <span className="w-1.5 h-4 bg-blue-600 rounded-full mr-2"></span>
                                        Get In Touch
                                      </h4>
                                      <div className="space-y-3">
                                        <a
                                          href="tel:+919981122493"
                                          className="flex items-center space-x-3 text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200 group p-2 rounded-xl hover:bg-white hover:shadow-sm"
                                        >
                                          <div className="w-9 h-9 bg-orange-500/10 group-hover:bg-orange-500 group-hover:text-white rounded-lg flex items-center justify-center text-orange-600 transition-all duration-300 flex-shrink-0">
                                            <FaPhone className="w-3.5 h-3.5" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="text-[10px] text-slate-400 font-medium">
                                              Call Us
                                            </div>
                                            <div className="font-bold text-slate-800 text-xs">
                                              +91 9981122493
                                            </div>
                                          </div>
                                        </a>

                                        <a
                                          href="mailto:info.inextets@gmail.com"
                                          className="flex items-center space-x-3 text-sm text-slate-600 hover:text-blue-600 transition-colors duration-200 group p-2 rounded-xl hover:bg-white hover:shadow-sm"
                                        >
                                          <div className="w-9 h-9 bg-orange-500/10 group-hover:bg-orange-500 group-hover:text-white rounded-lg flex items-center justify-center text-orange-600 transition-all duration-300 flex-shrink-0">
                                            <FaEnvelope className="w-3.5 h-3.5" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="text-[10px] text-slate-400 font-medium">
                                              Email Us
                                            </div>
                                            <div className="font-bold text-slate-800 text-xs truncate">
                                              info.inextets@gmail.com
                                            </div>
                                          </div>
                                        </a>

                                        <div className="flex items-start space-x-3 text-sm text-slate-600 p-2.5 rounded-xl bg-white/60 border border-slate-100">
                                          <div className="w-9 h-9 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
                                            <FaMapMarkerAlt className="w-3.5 h-3.5" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="text-[10px] text-slate-400 font-medium">
                                              Visit Us
                                            </div>
                                            <div className="font-semibold text-slate-700 leading-tight text-[11px]">
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
                                          className="w-9 h-9 bg-white hover:bg-[#1877F2] border border-slate-100 rounded-lg flex items-center justify-center hover:text-white text-slate-600 transition-all duration-300 shadow-sm hover:scale-105"
                                          title="Facebook"
                                        >
                                          <FaFacebook className="w-4 h-4" />
                                        </a>

                                        <a
                                          href="https://linkedin.com"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="w-9 h-9 bg-white hover:bg-[#0A66C2] border border-slate-100 rounded-lg flex items-center justify-center hover:text-white text-slate-600 transition-all duration-300 shadow-sm hover:scale-105"
                                          title="LinkedIn"
                                        >
                                          <FaLinkedin className="w-4 h-4" />
                                        </a>

                                        <a
                                          href="https://instagram.com"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="w-9 h-9 bg-white hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] border border-slate-100 rounded-lg flex items-center justify-center hover:text-white text-slate-600 transition-all duration-300 shadow-sm hover:scale-105"
                                          title="Instagram"
                                        >
                                          <FaInstagram className="w-4 h-4" />
                                        </a>

                                        <a
                                          href="https://youtube.com"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="w-9 h-9 bg-white hover:bg-[#FF0000] border border-slate-100 rounded-lg flex items-center justify-center hover:text-white text-slate-600 transition-all duration-300 shadow-sm hover:scale-105"
                                          title="YouTube"
                                        >
                                          <FaYoutube className="w-4 h-4" />
                                        </a>
                                      </div>
                                    </div>

                                    {/* CTA Button */}
                                    <button
                                      onClick={() => {
                                        setIsModalOpen(true);
                                        setIsServicesOpen(false);
                                      }}
                                      className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-bold hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 text-xs tracking-wider uppercase transform hover:-translate-y-0.5"
                                    >
                                      Request a Quote →
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={link.path}
                        className={`font-semibold transition-all duration-300 py-2 px-2 rounded-xl relative group/link ${pathname === link.path
                          ? "text-blue-600 bg-blue-50/50"
                          : "text-slate-700 hover:text-blue-600 hover:bg-slate-50/80"
                          }`}
                      >
                        {link.title}
                        <span
                          className={`absolute bottom-1 left-2 right-2 h-0.5 bg-blue-600 transition-all duration-300 scale-x-0 group-hover/link:scale-x-100 ${pathname === link.path ? "scale-x-100" : ""
                            }`}
                        ></span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop Action Buttons (Right) */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <button
                suppressHydrationWarning
                onClick={() => setIsModalOpen(true)}
                className="relative group overflow-hidden rounded-xl p-[2px] bg-orange-100/80 transition-transform duration-300 hover:scale-[1.03] active:scale-95 shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30"
              >
                {/* Sweeping RGB Border Light */}
                <span className="absolute -inset-[300%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_50%,#ff453a_70%,#ff9f0a_85%,#30d158_95%,#0a84ff_100%)]" />
                {/* <span className="relative flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-[10px] font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-200">
                  Book Domain
                </span> */}
              </button>
              <Link
                href="/login"
                className="relative group overflow-hidden rounded-xl p-[2px] bg-blue-100/80 transition-transform duration-300 hover:scale-[1.03] active:scale-95 shadow-sm hover:shadow-md hover:shadow-blue-600/10"
              >
                {/* Sweeping RGB Border Light */}
                <span className="absolute -inset-[300%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_50%,#0a84ff_70%,#30d158_85%,#bf5af2_95%,#ff453a_100%)]" />
                <span className="relative flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-[10px] font-semibold hover:from-orange-600 hover:to-amber-600 transition-all rounded-[10px] font-semibold transition-all duration-200 group-hover:bg-slate-50">
                  Login
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              suppressHydrationWarning
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden z-50 p-2 rounded-xl hover:bg-slate-50 transition-colors duration-200 text-slate-700"
            >
              {isMobileMenuOpen ? (
                <IoMdClose className="w-6 h-6" />
              ) : (
                <HiMenuAlt3 className="w-6 h-6" />
              )}
            </button>
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
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Sidebar Panel */}
        <div
          ref={sidebarRef}
          className={`absolute top-0 right-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl rounded-l-3xl transform transition-transform duration-500 ease-out overflow-y-auto ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col min-h-full">
            {/* Sidebar Header */}
            <div className="bg-white border-b border-slate-100 px-6 py-5 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                    src="https://i.ibb.co/N608STN/inext-ets-logo.jpg"
                    width={45}
                    height={45}
                    alt="Logo"
                    className="rounded-xl shadow-sm"
                  />
                  <div>
                    <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      I Next ETS
                    </h2>
                    <p className="text-[10px] text-slate-400 font-medium">
                      Navigate our services
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 px-6 py-4">
              <ul className="space-y-1">
                {navbar.map((link) => (
                  <li key={link.id}>
                    {link.title === "Services" ? (
                      <div>
                        <button
                          onClick={() =>
                            setIsMobileServicesOpen(!isMobileServicesOpen)
                          }
                          className="w-full flex items-center justify-between px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-xl font-semibold transition-colors duration-200"
                        >
                          <span>{link.title}</span>
                          <IoIosArrowDown
                            className={`transition-transform duration-300 ${isMobileServicesOpen
                              ? "rotate-180 text-blue-600"
                              : ""
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
                                  className="flex items-start space-x-3 px-4 py-3 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all duration-200 border border-slate-100/50"
                                >
                                  <div
                                    className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-white ${serviceIconColors[service.id] ||
                                      "bg-blue-600"
                                      } shadow-sm`}
                                  >
                                    <IconComponent className="w-4.5 h-4.5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-slate-800 text-xs mb-0.5">
                                      {service.title}
                                    </div>
                                    <div className="text-[10px] text-slate-400 line-clamp-1">
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
                        className={`block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-xl font-semibold transition-all duration-200 ${pathname === link.path
                          ? "text-blue-600 bg-blue-50/40"
                          : ""
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
                className="block w-full text-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md shadow-blue-500/20"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Booking Modal */}
      <DomainBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
