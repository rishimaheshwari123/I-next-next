"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const serviceLines = [
  {
    id: 1,
    title: "Website Development",
    subtitle: "Custom Web Solutions",
    tag: "Web Design & Dev",
    description: "Custom website solutions tailored to your business needs. Responsive, fast, and SEO-friendly.",
    image: "/herosection/web.jpg",
    path: "/web-development",
    borderColor: "bg-blue-600",
    btnColor: "bg-blue-600 hover:bg-blue-700"
  },
  {
    id: 2,
    title: "Mobile App Development",
    subtitle: "iOS & Android Solutions",
    tag: "App Innovation",
    description: "iOS & Android app development with cutting-edge technology. Build native and cross-platform apps.",
    image: "/herosection/app.png",
    path: "/mobile-app-development",
    borderColor: "bg-orange-500",
    btnColor: "bg-orange-500 hover:bg-orange-600"
  },
  {
    id: 3,
    title: "Social Media Marketing",
    subtitle: "Organic & Paid Growth",
    tag: "Social Strategy",
    description: "Grow your brand presence on social platforms. Engage your audience and run targeted campaigns.",
    image: "/herosection/marketing.webp",
    path: "/social-media-marketing",
    borderColor: "bg-blue-600",
    btnColor: "bg-blue-600 hover:bg-blue-700"
  },
  {
    id: 4,
    title: "Digital Marketing",
    subtitle: "Complete Digital Solutions",
    tag: "Online Reach",
    description: "Complete digital marketing solutions. Maximize reach, optimize ads, and boost your conversion rates.",
    image: "/herosection/marketing.webp",
    path: "/digital-marketing",
    borderColor: "bg-orange-500",
    btnColor: "bg-orange-500 hover:bg-orange-600"
  },
  {
    id: 5,
    title: "Lead Generation",
    subtitle: "Sales Pipeline Optimization",
    tag: "Customer Acquisition",
    description: "Generate quality leads for your business. Build a consistent and predictable sales pipeline.",
    image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=600&auto=format&fit=crop",
    path: "/lead-generation",
    borderColor: "bg-blue-600",
    btnColor: "bg-blue-600 hover:bg-blue-700"
  }
];

const ServiceLines = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState(0);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#070b13] text-white overflow-hidden relative">
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-purple-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-1.5 h-5 sm:h-6 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></span>
            <span className="text-orange-500 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest">
              Capabilities
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 sm:mb-3 tracking-tight uppercase">
            Production Service Lines
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Dedicated desks for strategy, development, marketing, and intelligence systems.
          </p>
        </div>

        {/* Desktop Accordion Grid (Hidden on Mobile/Tablet) */}
        <div className="hidden lg:flex gap-3 xl:gap-4 w-full h-[460px] xl:h-[520px] items-stretch">
          {serviceLines.map((item, index) => {
            const isExpanded = hoveredIndex === index;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredIndex(index)}
                style={{ flex: isExpanded ? 5.5 : 1 }}
                className="relative h-full rounded-2xl xl:rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group"
              >
                {/* Colored Top Border Indicator */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${item.borderColor} z-20`}></div>

                {/* Cover Image Background */}
                <div className="absolute inset-0 z-0 bg-slate-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-45 group-hover:scale-105 transition-transform duration-[1.5s]"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                  {/* Linear Shadow Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20"></div>
                </div>

                {/* Collapsed State Layout */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-end pb-8 xl:pb-12 z-10 transition-opacity duration-500 ${
                    isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                >
                  <span className="text-white/20 font-black text-xl xl:text-2xl mb-4 xl:mb-6 select-none">
                    0{item.id}
                  </span>
                  <div className="vertical-text flex items-center justify-center">
                    <h3 className="text-slate-300 font-extrabold uppercase text-[11px] xl:text-xs tracking-[0.25em] whitespace-nowrap">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Expanded State Layout */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 xl:p-10 z-10 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent transition-all duration-500 ${
                    isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
                  }`}
                >
                  {/* Top floating Tag badge */}
                  <div className="mb-2 xl:mb-3">
                    <span className={`px-2.5 py-0.5 xl:px-3 xl:py-1 ${item.borderColor} text-white font-extrabold text-[9px] xl:text-[10px] uppercase tracking-widest rounded-md shadow-md`}>
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-white text-2xl xl:text-3xl font-black tracking-tight mb-1 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 font-bold text-xs xl:text-sm tracking-wide mb-2 xl:mb-3">
                    {item.subtitle}
                  </p>

                  {/* Description text */}
                  <p className="text-slate-300 text-xs xl:text-sm max-w-lg mb-4 xl:mb-6 leading-relaxed font-medium line-clamp-3 xl:line-clamp-none">
                    {item.description}
                  </p>

                  {/* CTA button link */}
                  <Link
                    href={item.path}
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2 xl:px-5 xl:py-2.5 ${item.btnColor} text-white font-bold text-[11px] xl:text-xs uppercase tracking-wider rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md w-fit`}
                  >
                    <span>Explore Service</span>
                    <FaArrowRight className="w-3 h-3 xl:w-3.5 xl:h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet Accordion Stack (< 1024px) */}
        <div className="lg:hidden flex flex-col gap-3 sm:gap-4">
          {serviceLines.map((item, index) => {
            const isExpanded = mobileExpandedIndex === index;
            return (
              <div
                key={item.id}
                onClick={() => setMobileExpandedIndex(index)}
                className={`relative w-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border border-white/5 ${
                  isExpanded ? "h-[250px] sm:h-[270px]" : "h-[68px] sm:h-[74px]"
                }`}
              >
                {/* Color Top Border Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${item.borderColor} z-20`}></div>

                {/* Cover Image Background */}
                <div className="absolute inset-0 z-0 bg-slate-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-35"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-slate-950/70"></div>
                </div>

                {/* Collapsed Header Layout */}
                <div className="absolute top-0 left-0 right-0 h-[68px] sm:h-[74px] flex items-center justify-between px-4 sm:px-6 z-10">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="text-white/25 font-black text-base sm:text-lg">0{item.id}</span>
                    <h3 className="text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider truncate">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-400 font-extrabold flex-shrink-0">
                    {isExpanded ? "Collapse" : "Expand"}
                  </span>
                </div>

                {/* Expanded Details Layout */}
                <div
                  className={`absolute top-[68px] sm:top-[74px] left-0 right-0 bottom-0 px-4 sm:px-6 pb-4 sm:pb-6 z-10 flex flex-col items-start justify-end gap-2.5 sm:gap-3 transition-opacity duration-300 ${
                    isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="text-slate-300 text-xs leading-relaxed font-medium line-clamp-3">
                    {item.description}
                  </p>
                  <Link
                    href={item.path}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 ${item.btnColor} text-white font-bold text-[10px] uppercase tracking-wider rounded-lg shadow-sm`}
                  >
                    <span>View More</span>
                    <FaArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-lr;
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  );
};

export default ServiceLines;
