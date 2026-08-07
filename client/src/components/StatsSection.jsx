"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaProjectDiagram, FaSmile, FaGlobeAmericas, FaFlag } from "react-icons/fa";

const stats = [
  {
    id: 1,
    number: "1000+",
    label: "Client Projects",
    description: "Successfully Delivered",
    icon: FaProjectDiagram,
    color: "bg-blue-600",
    themeColor: "from-blue-500 to-indigo-500"
  },
  {
    id: 2,
    number: "95%",
    label: "Client Satisfaction",
    description: "Happy Customers",
    icon: FaSmile,
    color: "bg-green-600",
    themeColor: "from-emerald-500 to-teal-500"
  },
  {
    id: 3,
    number: "25+",
    label: "Countries Served",
    description: "Worldwide Presence",
    icon: FaFlag,
    color: "bg-orange-600",
    themeColor: "from-orange-500 to-amber-500"
  },
  {
    id: 4,
    number: "Global",
    label: "Worldwide Clients",
    description: "International Reach",
    icon: FaGlobeAmericas,
    color: "bg-purple-600",
    themeColor: "from-purple-500 to-pink-500"
  }
];

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full py-20 overflow-hidden bg-slate-950">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/herosection/web.jpg"
          alt="Our Achievements"
          fill
          className="object-cover opacity-20 filter blur-[1px]"
          quality={80}
          priority
        />
        {/* Soft Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header Section with Scroll Animation */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
          }`}
        >
          <div className="inline-block mb-3">
            <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-xs font-extrabold uppercase tracking-widest shadow-md">
              Our Achievements
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto font-medium">
            Delivering excellence across the globe with proven results
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                style={{ transitionDelay: `${index * 150}ms` }}
                className={`group relative bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-xl hover:shadow-2xl hover:bg-white/15 hover:-translate-y-1.5 transition-all duration-500 transform ${
                  isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
                }`}
              >
                <div className="flex flex-col items-center text-center gap-3.5">
                  {/* Icon Container */}
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300 border border-white/10`}>
                    <IconComponent className="w-5.5 h-5.5" />
                  </div>

                  {/* Stat Number */}
                  <div className={`text-3xl md:text-4xl font-black bg-gradient-to-br ${stat.themeColor} bg-clip-text text-transparent tracking-tight`}>
                    {stat.number}
                  </div>

                  {/* Title Label */}
                  <div className="text-sm font-extrabold text-white tracking-wide">
                    {stat.label}
                  </div>

                  {/* Description Subtext */}
                  <div className="text-[11px] text-slate-400 font-medium tracking-wide">
                    {stat.description}
                  </div>
                </div>

                {/* Bottom Border Accent Highlight */}
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stat.themeColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`}></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div 
          className={`mt-14 text-center transition-all duration-1000 delay-[600ms] transform ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
          }`}
        >
          <div className="inline-block bg-white/5 backdrop-blur-md rounded-full shadow-lg px-6 py-3.5 border border-white/10">
            <p className="text-slate-200 text-sm font-bold">
              Join <span className="text-orange-400">thousands of satisfied clients</span> who trust us
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StatsSection;
