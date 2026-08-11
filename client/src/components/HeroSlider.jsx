"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
  FaLaptopCode,
  FaMobileAlt,
  FaRobot,
  FaFacebook,
  FaBullhorn,
  FaUserPlus,
  FaChartLine,
  FaShieldAlt
} from "react-icons/fa";

const heroSlides = [
  {
    id: 1,
    title: "Website Development",
    path: "/web-development",
    description: "Custom website solutions tailored to your business needs. We create responsive, fast, and SEO-friendly websites that drive results.",
    image: "/herosection/web.jpg",
    bgColor: "bg-blue-600/60",
    icon: FaLaptopCode,
    themeColor: "blue",
    gradient: "text-blue-500"
  },
  {
    id: 2,
    title: "Mobile App Development",
    path: "/mobile-app-development",
    description: "iOS & Android app development with cutting-edge technology. Transform your ideas into powerful, native, and cross-platform mobile applications.",
    image: "/herosection/app.png",
    bgColor: "bg-orange-500/60",
    icon: FaMobileAlt,
    themeColor: "orange",
    gradient: "text-orange-500"
  },

  {
    id: 3,
    title: "Social Media Marketing",
    path: "/social-media-marketing",
    description: "Grow your brand presence on social platforms. Engage your audience, run hyper-targeted campaigns, and build a loyal community around your brand.",
    image: "/herosection/marketing.webp",
    bgColor: "bg-orange-500/60",
    icon: FaFacebook,
    themeColor: "orange",
    gradient: "text-orange-500"
  },
  {
    id: 4,
    title: "Digital Marketing",
    path: "/digital-marketing",
    description: "Complete digital marketing solutions including inbound marketing, SEO, and paid advertising to skyrocket your online visibility and conversion rates.",
    image: "/herosection/marketing.webp",
    bgColor: "bg-blue-600/60",
    icon: FaBullhorn,
    themeColor: "blue",
    gradient: "text-blue-500"
  },
  {
    id: 5,
    title: "Lead Generation",
    path: "/lead-generation",
    description: "Generate quality leads for your business. Build a consistent and predictable sales pipeline, and convert prospects into high-paying loyal customers.",
    image: "/herosection/marketing.webp",
    bgColor: "bg-orange-500/60",
    icon: FaUserPlus,
    themeColor: "orange",
    gradient: "text-orange-500"
  },
  {
    id: 6,
    title: "Business Growth Package",
    path: "/business-growth-package",
    description: "Comprehensive growth packages combining content marketing, search engine optimization, and custom marketing strategies to scale your business.",
    image: "/herosection/marketing.webp",
    bgColor: "bg-blue-600/60",
    icon: FaChartLine,
    themeColor: "blue",
    gradient: "text-blue-500"
  },
  {
    id: 7,
    title: "AI (Artificial Intelligence)",
    path: "/ai-services",
    description: "AI-powered solutions for your business. Leverage machine learning, custom chatbots, and intelligence to automate and stay ahead of the competition.",
    image: "/herosection/aiml.jpg",
    bgColor: "bg-blue-600/60",
    icon: FaRobot,
    themeColor: "blue",
    gradient: "text-blue-500"
  },
  {
    id: 8,
    title: "Cyber Security",
    path: "/cyber-security",
    description: "Protect your digital assets. Enterprise-grade security solutions, threat assessments, and monitoring to secure your data, applications, and networks.",
    image: "/herosection/info.jpeg",
    bgColor: "bg-orange-500/60",
    icon: FaShieldAlt,
    themeColor: "orange",
    gradient: "text-orange-500"
  }
];

const themeStyles = {
  blue: {
    text: "text-blue-400",
    bg: "bg-blue-600",
    border: "border-blue-500/30",
    shadow: "shadow-blue-500/20",
    bgLight: "bg-blue-500/10",
    glow: "from-blue-500/20 to-indigo-500/20",
    ring: "ring-blue-400"
  },
  purple: {
    text: "text-purple-400",
    bg: "bg-purple-600",
    border: "border-purple-500/30",
    shadow: "shadow-purple-500/20",
    bgLight: "bg-purple-500/10",
    glow: "from-purple-500/20 to-pink-500/20",
    ring: "ring-purple-400"
  },
  orange: {
    text: "text-orange-400",
    bg: "bg-orange-600",
    border: "border-orange-500/30",
    shadow: "shadow-orange-500/20",
    bgLight: "bg-orange-500/10",
    glow: "from-orange-500/20 to-amber-500/20",
    ring: "ring-orange-400"
  },
  pink: {
    text: "text-pink-400",
    bg: "bg-pink-600",
    border: "border-pink-500/30",
    shadow: "shadow-pink-500/20",
    bgLight: "bg-pink-500/10",
    glow: "from-pink-500/20 to-rose-500/20",
    ring: "ring-pink-400"
  },
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-600",
    border: "border-emerald-500/30",
    shadow: "shadow-emerald-500/20",
    bgLight: "bg-emerald-500/10",
    glow: "from-emerald-500/20 to-teal-500/20",
    ring: "ring-emerald-400"
  },
  indigo: {
    text: "text-indigo-400",
    bg: "bg-indigo-600",
    border: "border-indigo-500/30",
    shadow: "shadow-indigo-500/20",
    bgLight: "bg-indigo-500/10",
    glow: "from-indigo-500/20 to-cyan-500/20",
    ring: "ring-indigo-400"
  },
  rose: {
    text: "text-rose-400",
    bg: "bg-rose-600",
    border: "border-rose-500/30",
    shadow: "shadow-rose-500/20",
    bgLight: "bg-rose-500/10",
    glow: "from-rose-500/20 to-orange-500/20",
    ring: "ring-rose-400"
  },
  red: {
    text: "text-red-400",
    bg: "bg-red-600",
    border: "border-red-500/30",
    shadow: "shadow-red-500/20",
    bgLight: "bg-red-500/10",
    glow: "from-red-500/20 to-rose-500/20",
    ring: "ring-red-400"
  }
};

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const intervalTime = 6500; // 6.5 seconds per slide
    const stepTime = 100;
    const totalSteps = intervalTime / stepTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / totalSteps) * 100);

      if (currentStep >= totalSteps) {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        currentStep = 0;
        setProgress(0);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const activeSlide = heroSlides[currentSlide];
  const activeTheme = themeStyles[activeSlide.themeColor];

  return (
    <div className="relative w-full h-[650px] lg:h-[750px] overflow-hidden mt-[70px] bg-slate-950">
      {/* Dynamic Ambient Background Backdrop */}
      <div className="absolute inset-0 bg-slate-950/35 transition-colors duration-1000">
        <Image
          src={activeSlide.image}
          alt={activeSlide.title}
          fill
          className="object-cover opacity-80 transition-all duration-1000 scale-105"
          priority
          quality={90}
        />
        {/* Soft Ambient Glows */}
        <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br ${activeTheme.glow} filter blur-3xl opacity-40 transition-all duration-1000`}></div>
        <div className={`absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br ${activeTheme.glow} filter blur-3xl opacity-40 transition-all duration-1000`}></div>
        {/* Sleek Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
      </div>

      <div className="relative z-20 max-w-[90vw] mx-auto px-4 lg:px-6 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Stage - Slide Content (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Tag/Index indicator */}
            <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
              <span className={`text-sm font-semibold tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md ${activeTheme.text}`}>
                0{activeSlide.id} / 0{heroSlides.length}
              </span>
              <div className="h-px w-8 bg-white/20"></div>
              <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                Our Services
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-6 leading-tight select-none">
              <span className={`${activeTheme.text}`}>
                {activeSlide.title}
              </span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 min-h-[56px]">
              {activeSlide.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Link
                href={activeSlide.path}
                className={`w-full sm:w-auto flex items-center justify-center px-8 py-3.5 ${activeTheme.bg} text-white rounded-xl font-bold transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-lg ${activeTheme.shadow} gap-2 group`}
              >
                <span>Learn More</span>
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#contact"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-md"
              >
                <span>Get Started</span>
              </Link>
            </div>

            {/* Mobile Horizontal Quick Nav */}
            <div className="mt-8 lg:hidden flex gap-2 overflow-x-auto py-2 px-1 scrollbar-hide justify-center max-w-full">
              {heroSlides.map((slide, index) => {
                const SlideIcon = slide.icon;
                const isSelected = index === currentSlide;
                const slideTheme = themeStyles[slide.themeColor];
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(index)}
                    className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 border ${isSelected
                      ? `${slideTheme.bg} ${slideTheme.border} text-white scale-110 shadow-lg`
                      : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                      }`}
                    title={slide.title}
                  >
                    <SlideIcon className="w-5 h-5" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Stage - Visual Card & Interactive Quick Select (5 Cols) */}
          <div className="hidden lg:col-span-5 lg:flex flex-col gap-6 pl-4">

            {/* Main Interactive Floating Image Card */}
            <div className="relative w-full h-[220px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group/card bg-slate-900/50 backdrop-blur-md">
              <Image
                src={activeSlide.image}
                alt={activeSlide.title}
                fill
                className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-slate-950/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
                <span className="text-white text-xs font-bold truncate max-w-[70%]">{activeSlide.title}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${activeTheme.text}`}>Active Slide</span>
              </div>
            </div>

            {/* Interactive 8-Service Sidebar Quick Select Grid */}
            <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-4 border border-white/5 flex flex-col gap-2.5">
              <h3 className="text-white/60 text-[10px] font-bold uppercase tracking-widest px-1 mb-1">
                Explore Services ({heroSlides.length})
              </h3>

              <div className="grid grid-cols-2 gap-2">
                {heroSlides.map((slide, index) => {
                  const SlideIcon = slide.icon;
                  const isSelected = index === currentSlide;
                  const slideTheme = themeStyles[slide.themeColor];
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlide(index)}
                      className={`group/btn flex items-center gap-2.5 p-2 rounded-xl text-left transition-all duration-300 border ${isSelected
                        ? "bg-white/10 border-white/20 shadow-md translate-x-1"
                        : "bg-white/0 border-transparent hover:bg-white/5 text-slate-400 hover:text-white"
                        }`}
                    >
                      {/* Icon */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isSelected
                        ? `${slideTheme.bg} text-white shadow-md ${slideTheme.shadow}`
                        : "bg-white/5 text-slate-300 group-hover/btn:scale-110"
                        }`}>
                        <SlideIcon className="w-4 h-4" />
                      </div>

                      {/* Title */}
                      <div className="min-w-0 flex-1">
                        <div className={`text-xs font-bold truncate transition-colors duration-300 ${isSelected ? "text-white" : "text-slate-300 group-hover/btn:text-white"
                          }`}>
                          {slide.title}
                        </div>
                      </div>

                      {/* Active Indicator Pulse */}
                      {isSelected && (
                        <span className="relative flex h-2 w-2 pr-2">
                          <span className={`animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-75 ${slideTheme.bg}`}></span>
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${slideTheme.bg}`}></span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-6 left-[5vw] lg:left-[5vw] z-30 flex items-center gap-4">
        {/* Left Arrow */}
        <button
          suppressHydrationWarning
          onClick={prevSlide}
          className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="w-4 h-4" />
        </button>

        {/* Slide Counter */}
        <span className="text-white/60 text-xs font-bold select-none min-w-[40px] text-center">
          0{currentSlide + 1} / 0{heroSlides.length}
        </span>

        {/* Right Arrow */}
        <button
          suppressHydrationWarning
          onClick={nextSlide}
          className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Next slide"
        >
          <FaChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar (Bottom Edge) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30 overflow-hidden">
        <div
          className={`h-full ${activeTheme.bg} transition-all duration-100 ease-out`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default HeroSlider;
