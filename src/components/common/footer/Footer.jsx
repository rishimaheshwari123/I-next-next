"use client";

import React from "react";
import { 
  FaFacebook, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Logo & About */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center space-x-3">
                <Image
                  src="https://i.ibb.co/N608STN/inext-ets-logo.jpg"
                  width={60}
                  height={60}
                  alt="I Next ETS Logo"
                  className="rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                />
                <div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    I Next ETS
                  </h2>
                  <p className="text-xs text-gray-400">Innovation & Excellence</p>
                </div>
              </div>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Transforming ideas into digital reality. We deliver cutting-edge solutions in web development, mobile apps, and digital marketing.
            </p>

            {/* Social Media Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <span className="w-1 h-5 bg-orange-500 rounded-full mr-2"></span>
                Follow Us
              </h3>
              <div className="flex items-center gap-3">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
                
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-700/50"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
                
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-sky-500/50"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-600/50"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-600/50"
                  aria-label="YouTube"
                >
                  <FaYoutube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
              <span className="w-1 h-5 bg-blue-500 rounded-full mr-2"></span>
              Our Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/webdesign" 
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group text-sm"
                >
                  <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Web Design
                </Link>
              </li>
              <li>
                <Link 
                  href="/webDevelopment" 
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group text-sm"
                >
                  <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Web Development
                </Link>
              </li>
              <li>
                <Link 
                  href="/mobile" 
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group text-sm"
                >
                  <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link 
                  href="/uiuxdesign" 
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group text-sm"
                >
                  <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link 
                  href="/seomarket" 
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group text-sm"
                >
                  <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  SEO Marketing
                </Link>
              </li>
              <li>
                <Link 
                  href="/socialmarket" 
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group text-sm"
                >
                  <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Social Media Marketing
                </Link>
              </li>
              <li>
                <Link 
                  href="/brandidentity" 
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group text-sm"
                >
                  <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Brand Identity
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
              <span className="w-1 h-5 bg-orange-500 rounded-full mr-2"></span>
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group text-sm"
                >
                  <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/portfolio" 
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group text-sm"
                >
                  <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Portfolio
                </Link>
              </li>
              <li>
                <Link 
                  href="/workinfo" 
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group text-sm"
                >
                  <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  How We Work
                </Link>
              </li>
              <li>
                <Link 
                  href="/career" 
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group text-sm"
                >
                  <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group text-sm"
                >
                  <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/investment-policy-advisory" 
                  className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group text-sm"
                >
                  <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Investment & Policy Advisory
                </Link>
              </li>
              <li>
                <Link 
                  href="/login" 
                  className="text-gray-400 hover:text-orange-400 hover:pl-2 transition-all duration-300 flex items-center group text-sm"
                >
                  <FaArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 flex items-center">
              <span className="w-1 h-5 bg-green-500 rounded-full mr-2"></span>
              Get In Touch
            </h3>
            <div className="space-y-5">
              {/* Phone */}
              <a 
                href="tel:+919981122493" 
                className="flex items-start space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group"
              >
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 transition-colors duration-300 shadow-lg">
                  <FaPhone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Call Us</p>
                  <p className="text-sm font-semibold">+91 9981122493</p>
                </div>
              </a>

              {/* Email */}
              <a 
                href="mailto:info.inextets@gmail.com" 
                className="flex items-start space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors duration-300 shadow-lg">
                  <FaEnvelope className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email Us</p>
                  <p className="text-sm font-semibold break-all">info.inextets@gmail.com</p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start space-x-3 text-gray-400">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                  <FaMapMarkerAlt className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Visit Us</p>
                  <p className="text-sm leading-relaxed">
                    Plot No - 11, 2nd floor, near MANOHAR DAIRY, Zone-I, Maharana Pratap Nagar, Bhopal, Madhya Pradesh 462011
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} <span className="text-white font-semibold">I Next ETS</span>. All rights reserved. Designed with ❤️ by I Next ETS Team.
          </p>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/privacy-policy" 
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms-conditions" 
              className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
