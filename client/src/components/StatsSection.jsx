"use client";

import Image from "next/image";
import { FaProjectDiagram, FaSmile, FaGlobeAmericas, FaFlag } from "react-icons/fa";

const stats = [
  {
    id: 1,
    number: "1200+",
    label: "Client Projects",
    description: "Successfully Delivered",
    icon: FaProjectDiagram,
    color: "bg-blue-600"
  },
  {
    id: 2,
    number: "95%",
    label: "Client Satisfaction",
    description: "Happy Customers",
    icon: FaSmile,
    color: "bg-green-600"
  },
  {
    id: 3,
    number: "50+",
    label: "Countries Served",
    description: "Worldwide Presence",
    icon: FaFlag,
    color: "bg-orange-600"
  },
  {
    id: 4,
    number: "Global",
    label: "Worldwide Clients",
    description: "International Reach",
    icon: FaGlobeAmericas,
    color: "bg-purple-600"
  }
];

const StatsSection = () => {
  return (
    <div className="relative w-full py-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/herosection/web.jpg"
          alt="Our Achievements"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        {/* Lighter Overlay - reduced opacity for better image visibility */}
        {/* <div className="absolute inset-0 bg-white/60"></div> */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header - Compact */}
        <div className="text-center mb-12">
          <div className="inline-block mb-3">
            <span className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-bold shadow-md">
              Our Achievements
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-base text-white max-w-2xl mx-auto font-medium">
            Delivering excellence across the globe with proven results
          </p>
        </div>

        {/* Stats Grid - Compact */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                className="group relative bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  {/* Icon - Smaller */}
                  <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Number - Smaller */}
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.number}
                  </div>

                  {/* Label - Smaller */}
                  <div className="text-base font-bold text-gray-900">
                    {stat.label}
                  </div>

                  {/* Description - Smaller */}
                  <div className="text-xs text-gray-600 font-medium">
                    {stat.description}
                  </div>
                </div>

                {/* Bottom Border Animation */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Text - Compact */}
        <div className="mt-10 text-center">
          <div className="inline-block bg-white/95 backdrop-blur-sm rounded-xl shadow-md px-6 py-4 border border-gray-200">
            <p className="text-gray-800 text-base font-bold">
              Join <span className="text-blue-600">thousands of satisfied clients</span> who trust us
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
