"use client";

import { useState, useEffect, useRef } from "react";
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
  FaMapMarkerAlt
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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const megaMenuRef = useRef(null);
  const sidebarRef = useRef(null);

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
      <div className="fixed top-0 left-0 right-0 z-[60] bg-orange-500">
        <div className="max-w-[90vw] mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-12">
            {/* Left - Contact Info */}
            <div className="flex items-center gap-6">
              <a 
                href="tel:+919981122493" 
                className="flex items-center gap-2 text-white hover:text-orange-400 transition-all duration-200 text-sm"
              >
                <FaPhone className="w-3.5 h-3.5" />
                <span className="hidden md:inline font-medium">+91 9981122493</span>
              </a>
              
              <a 
                href="mailto:info.inextets@gmail.com" 
                className="flex items-center gap-2 text-white hover:text-orange-400 transition-all duration-200 text-sm"
              >
                <FaEnvelope className="w-3.5 h-3.5" />
                <span className="hidden lg:inline font-medium">info.inextets@gmail.com</span>
              </a>
            </div>

            {/* Right - Social Links */}
            <div className="flex items-center gap-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 hover:bg-orange-500 rounded-lg flex items-center justify-center text-white transition-all duration-200"
                title="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 hover:bg-orange-500 rounded-lg flex items-center justify-center text-white transition-all duration-200"
                title="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 hover:bg-orange-500 rounded-lg flex items-center justify-center text-white transition-all duration-200"
                title="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/20 hover:bg-orange-500 rounded-lg flex items-center justify-center text-white transition-all duration-200"
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
        className={`fixed top-12 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg"
            : "bg-white shadow-md"
        }`}
      >
        <div className="max-w-[90vw] mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 z-50">
              <Image
                src="https://i.ibb.co/N608STN/inext-ets-logo.jpg"
                width={55}
                height={55}
                alt="Logo"
                className="rounded-xl"
                priority
              />
              <span className="hidden sm:block text-xl font-bold text-blue-600">
                I Next ETS
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <ul className="flex items-center space-x-8">
                {navbar.map((link) => (
                  <li key={link.id}>
                    {link.title === "Services" ? (
                      <div
                        className="relative group"
                        onMouseEnter={() => setIsServicesOpen(true)}
                        onMouseLeave={() => setIsServicesOpen(false)}
                      >
                        <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 py-2">
                          <span>{link.title}</span>
                          <IoIosArrowDown
                            className={`transition-transform duration-300 ${
                              isServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Mega Menu */}
                        <div
                          ref={megaMenuRef}
                          className={`absolute left-1/2 -translate-x-1/2 top-full pt-6 transition-all duration-300 ${
                            isServicesOpen
                              ? "opacity-100 visible translate-y-0"
                              : "opacity-0 invisible -translate-y-4"
                          }`}
                          style={{ width: "95vw", maxWidth: "1400px" }}
                        >
                          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                            <div className="grid grid-cols-12 gap-0">
                              {/* Left Section - Services (75%) */}
                              <div className="col-span-9 p-10">
                                <div className="mb-6">
                                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Services</h3>
                                  <p className="text-sm text-gray-500">Comprehensive solutions to grow your business</p>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4">
                                  {services.map((service) => {
                                    const IconComponent = serviceIcons[service.id];
                                    return (
                                      <Link
                                        key={service.id}
                                        href={service.path}
                                        onClick={() => setIsServicesOpen(false)}
                                        className="group/item p-5 rounded-xl hover:bg-blue-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:shadow-lg"
                                      >
                                        <div className="flex items-start space-x-4">
                                          <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white group-hover/item:bg-orange-500 group-hover/item:scale-110 transition-all duration-300 shadow-md">
                                            <IconComponent className="w-6 h-6" />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-900 mb-1.5 text-base group-hover/item:text-blue-600 transition-colors duration-200">
                                              {service.title}
                                            </h4>
                                            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
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
                              <div className="col-span-3 bg-gradient-to-br from-gray-50 to-blue-50 p-8 border-l border-gray-100">
                                <div className="space-y-8">
                                  {/* Contact Info */}
                                  <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-5 flex items-center">
                                      <span className="w-1 h-6 bg-blue-600 rounded-full mr-3"></span>
                                      Get In Touch
                                    </h4>
                                    <div className="space-y-4">
                                      <a 
                                        href="tel:+919981122493" 
                                        className="flex items-start space-x-3 text-sm text-gray-700 hover:text-blue-600 transition-colors duration-200 group p-3 rounded-lg hover:bg-white"
                                      >
                                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white group-hover:bg-blue-600 transition-all duration-300 shadow-sm flex-shrink-0">
                                          <FaPhone className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="text-xs text-gray-500 mb-0.5">Call Us</div>
                                          <div className="font-semibold text-gray-900">+91 9981122493</div>
                                        </div>
                                      </a>

                                      <a 
                                        href="mailto:info.inextets@gmail.com" 
                                        className="flex items-start space-x-3 text-sm text-gray-700 hover:text-blue-600 transition-colors duration-200 group p-3 rounded-lg hover:bg-white"
                                      >
                                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white group-hover:bg-blue-600 transition-all duration-300 shadow-sm flex-shrink-0">
                                          <FaEnvelope className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="text-xs text-gray-500 mb-0.5">Email Us</div>
                                          <div className="font-semibold text-gray-900 text-xs break-all">info.inextets@gmail.com</div>
                                        </div>
                                      </a>

                                      <div className="flex items-start space-x-3 text-sm text-gray-700 p-3 rounded-lg bg-white/50">
                                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0">
                                          <FaMapMarkerAlt className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="text-xs text-gray-500 mb-0.5">Visit Us</div>
                                          <div className="font-semibold text-gray-900 leading-tight text-xs">Plot No - 11, 2nd floor, near MANOHAR DAIRY, Zone-I, Maharana Pratap Nagar, Bhopal, MP 462011</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Social Media */}
                                  <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-5 flex items-center">
                                      <span className="w-1 h-6 bg-orange-500 rounded-full mr-3"></span>
                                      Follow Us
                                    </h4>
                                    <div className="flex items-center justify-center gap-3">
                                      <a 
                                        href="https://facebook.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                        title="Facebook"
                                      >
                                        <FaFacebook className="w-6 h-6 text-white" />
                                      </a>

                                      <a 
                                        href="https://linkedin.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
                                        title="LinkedIn"
                                      >
                                        <FaLinkedin className="w-6 h-6 text-white" />
                                      </a>

                                      <a 
                                        href="https://instagram.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                        title="Instagram"
                                      >
                                        <FaInstagram className="w-6 h-6 text-white" />
                                      </a>

                                      <a 
                                        href="https://youtube.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                        title="YouTube"
                                      >
                                        <FaYoutube className="w-6 h-6 text-white" />
                                      </a>
                                    </div>
                                  </div>

                                  {/* CTA Button */}
                                  <button
                                    onClick={() => {
                                      setIsModalOpen(true);
                                      setIsServicesOpen(false);
                                    }}
                                    className="w-full px-5 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl text-sm transform hover:scale-105"
                                  >
                                    Request a Quote →
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={link.path}
                        className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 relative group/link pb-1"
                      >
                        {link.title}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover/link:w-full transition-all duration-300"></span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
Book Domain
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden z-50 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <IoMdClose className="w-7 h-7 text-gray-700" />
              ) : (
                <HiMenuAlt3 className="w-7 h-7 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`absolute top-0 right-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 overflow-y-auto ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col min-h-full">
            {/* Sidebar Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-6 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                    src="https://i.ibb.co/N608STN/inext-ets-logo.jpg"
                    width={45}
                    height={45}
                    alt="Logo"
                    className="rounded-lg"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-blue-600">I Next ETS</h2>
                    <p className="text-xs text-gray-500">Navigate our services</p>
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
                          className="w-full flex items-center justify-between px-4 py-3.5 text-gray-700 hover:bg-blue-50 rounded-lg font-semibold transition-colors duration-200"
                        >
                          <span>{link.title}</span>
                          <IoIosArrowDown
                            className={`transition-transform duration-300 ${
                              isMobileServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Mobile Services Dropdown */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isMobileServicesOpen
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
                                  className="flex items-start space-x-3 px-4 py-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 border border-gray-100"
                                >
                                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                    <IconComponent className="w-5 h-5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-gray-800 mb-0.5">
                                      {service.title}
                                    </div>
                                    <div className="text-xs text-gray-500 line-clamp-2">
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
                        className="block px-4 py-3.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-semibold transition-colors duration-200"
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar Footer */}
            <div className="p-6 border-t border-gray-200 bg-white sticky bottom-0">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-6 py-4 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Get In Touch
              </button>
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
