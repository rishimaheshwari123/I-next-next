// components/TrustedCompanies.js
"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";
import { FaCheckCircle, FaStar } from "react-icons/fa";

const TrustedCompanies = () => {
  const companies = [
    { src: "/t1.png", alt: "Company 1", width: 260, height: 170 },
    { src: "/t2.png", alt: "Company 2", width: 200, height: 200 },
    { src: "/t3.png", alt: "Company 3", width: 210, height: 200 },
    { src: "/t4.png", alt: "Company 4", width: 380, height: 70 },
    { src: "/t5.png", alt: "Company 5", width: 300, height: 200 },
    { src: "/t6.png", alt: "Company 6", width: 280, height: 200 },
    { src: "/t7.png", alt: "Company 7", width: 350, height: 200 },
    { src: "/t8.png", alt: "Company 8", width: 240, height: 200 },
    { src: "/t9.png", alt: "Company 9", width: 200, height: 200 },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50 to-orange-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 rounded-full mb-6">
            <FaCheckCircle className="w-5 h-5 text-blue-600" />
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
              Trusted Worldwide
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by <span className="text-blue-600">Leading Companies</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join hundreds of companies worldwide who trust us to deliver exceptional digital solutions
          </p>

          {/* Stats Section */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaStar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">350+</div>
                <div className="text-sm text-gray-600">Projects Delivered</div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-md">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">42+</div>
                <div className="text-sm text-gray-600">Countries Served</div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">14+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>

        {/* Companies Marquee */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-blue-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-orange-50 via-blue-50 to-transparent z-10 pointer-events-none"></div>

          {/* Marquee Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <Marquee pauseOnHover={true} gradient={false} speed={40}>
              {companies.map((company, index) => (
                <div
                  key={index}
                  className="mx-8 flex items-center justify-center group"
                >
                  <div className="relative p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200">
                    <Image
                      src={company.src}
                      alt={company.alt}
                      width={company.width}
                      height={company.height}
                      priority={true}
                      className="grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                    />
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            And many more amazing companies trust us with their digital transformation
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
