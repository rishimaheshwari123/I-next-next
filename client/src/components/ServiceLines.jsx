"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const serviceLines = [
  {
    id: 1,
    title: "Brand Strategy & Design",
    subtitle: "Identity & Visual Systems",
    tag: "Creative Direction",
    description: "Crafting beautiful, memorable, and high-impact brand identities that connect deeply with your target audience.",
    image: "/herosection/marketing.webp",
    path: "/business-growth-package",
    borderGradient: "from-red-500 to-rose-500"
  },
  {
    id: 2,
    title: "Website Engineering",
    subtitle: "Premium Web Experiences",
    tag: "Full-Stack Development",
    description: "Building responsive, blazing-fast, and search-optimized websites using state-of-the-art web frameworks.",
    image: "/herosection/web.jpg",
    path: "/web-development",
    borderGradient: "from-blue-500 to-indigo-500"
  },
  {
    id: 3,
    title: "Mobile App Innovation",
    subtitle: "iOS & Android Solutions",
    tag: "Cross-Platform Apps",
    description: "Developing native-grade mobile applications with smooth micro-animations, offline capability, and high performance.",
    image: "/herosection/app.png",
    path: "/mobile-app-development",
    borderGradient: "from-orange-500 to-amber-500"
  },
  {
    id: 4,
    title: "AI & Intelligent Systems",
    subtitle: "Chatbots & Automation",
    tag: "Machine Learning",
    description: "Integrating custom large language models, smart automation assistants, and predictive analytics into workflows.",
    image: "/herosection/aiml.jpg",
    path: "/ai-services",
    borderGradient: "from-cyan-500 to-teal-500"
  },
  {
    id: 5,
    title: "Cyber Security & Cloud",
    subtitle: "Enterprise Data Safety",
    tag: "Infrastructure",
    description: "Securing your cloud hosting, running threat assessments, and setting up bulletproof firewalls to protect your business assets.",
    image: "/herosection/info.jpeg",
    path: "/cyber-security",
    borderGradient: "from-purple-500 to-pink-500"
  }
];

const ServiceLines = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState(0);

  return (
    <section className="py-24 bg-[#070b13] text-white overflow-hidden relative">
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>

      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-6 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></span>
            <span className="text-orange-500 text-xs font-extrabold uppercase tracking-widest">
              Capabilities
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight uppercase">
            Production Service Lines
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Dedicated desks for strategy, development, marketing, and intelligence systems.
          </p>
        </div>

        {/* Desktop Accordion Grid (Hidden on Mobile) */}
        <div className="hidden lg:flex gap-4 w-full h-[520px] items-stretch">
          {serviceLines.map((item, index) => {
            const isExpanded = hoveredIndex === index;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredIndex(index)}
                style={{ flex: isExpanded ? 5.5 : 1 }}
                className="relative h-full rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group"
              >
                {/* Colored Top Border Indicator */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${item.borderGradient} z-20`}></div>

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
                  className={`absolute inset-0 flex flex-col items-center justify-end pb-12 z-10 transition-opacity duration-500 ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
                    }`}
                >
                  <span className="text-white/20 font-black text-2xl mb-6 select-none">
                    0{item.id}
                  </span>
                  <div className="vertical-text flex items-center justify-center">
                    <h3 className="text-slate-300 font-extrabold uppercase text-xs tracking-[0.25em] whitespace-nowrap">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Expanded State Layout */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-10 z-10 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent transition-all duration-500 ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
                    }`}
                >
                  {/* Top floating Tag badge */}
                  <div className="mb-4">
                    <span className={`px-3 py-1 bg-gradient-to-r ${item.borderGradient} text-white font-extrabold text-[9px] uppercase tracking-widest rounded-md shadow-md`}>
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-white text-3xl font-black tracking-tight mb-1 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 font-bold text-sm tracking-wide mb-4">
                    {item.subtitle}
                  </p>

                  {/* Description text */}
                  <p className="text-slate-300 text-sm max-w-lg mb-6 leading-relaxed font-medium">
                    {item.description}
                  </p>

                  {/* CTA button link */}
                  <Link
                    href={item.path}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md shadow-blue-500/10 hover:shadow-lg"
                  >
                    <span>Explore Service</span>
                    <FaArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Accordion Stack (Hidden on Desktop) */}
        <div className="lg:hidden flex flex-col gap-4">
          {serviceLines.map((item, index) => {
            const isExpanded = mobileExpandedIndex === index;
            return (
              <div
                key={item.id}
                onClick={() => setMobileExpandedIndex(index)}
                className={`relative w-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border border-white/5 ${isExpanded ? "h-[280px]" : "h-[76px]"
                  }`}
              >
                {/* Color Top Border Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.borderGradient} z-20`}></div>

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
                <div className="absolute top-0 left-0 right-0 h-[76px] flex items-center justify-between px-6 z-10">
                  <div className="flex items-center gap-3">
                    <span className="text-white/20 font-black text-lg">0{item.id}</span>
                    <h3 className="text-white font-extrabold text-sm uppercase tracking-wider">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-extrabold">
                    {isExpanded ? "Collapse" : "Expand"}
                  </span>
                </div>

                {/* Expanded Details Layout */}
                <div
                  className={`absolute top-[76px] left-0 right-0 bottom-0 px-6 pb-6 z-10 flex flex-col items-start justify-end gap-3 transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                >
                  <p className="text-slate-300 text-xs leading-relaxed font-medium">
                    {item.description}
                  </p>
                  <Link
                    href={item.path}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg"
                  >
                    <span>View More</span>
                    <FaArrowRight className="w-3 h-3" />
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
