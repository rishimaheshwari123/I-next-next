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
    description: "Comprehensive cybersecurity solutions to protect your critical digital assets, safeguard customer data, and ensure robust business continuity.",
    image: "/herosection/cyber.jpg",
    bgColor: "bg-orange-500/60",
    icon: FaShieldAlt,
    themeColor: "orange",
    gradient: "text-orange-500"
  }
];

const themeStyles = {
  blue: {
    bg: "bg-blue-600",
    text: "text-blue-400",
    border: "border-blue-500/50",
    glow: "from-blue-600/30 to-indigo-600/30",
    shadow: "shadow-blue-500/25",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20"
  },
  orange: {
    bg: "bg-orange-500",
    text: "text-orange-400",
    border: "border-orange-500/50",
    glow: "from-orange-600/30 to-amber-600/30",
    shadow: "shadow-orange-500/25",
    badgeBg: "bg-orange-500/10 text-orange-400 border-orange-500/20"
  }
};

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 6000;
    const stepTime = 50;
    const totalSteps = totalDuration / stepTime;
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
    <div className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] xl:h-[720px] 2xl:h-[760px] overflow-hidden mt-[58px] sm:mt-[64px] lg:mt-[70px] bg-slate-950 flex flex-col justify-center">
      {/* Dynamic Ambient Background Backdrop */}
      <div className="absolute inset-0 bg-slate-950/40 transition-colors duration-1000 pointer-events-none">
        <Image
          src={activeSlide.image}
          alt={activeSlide.title}
          fill
          className="object-cover opacity-75 transition-all duration-1000 scale-105"
          priority
          quality={85}
        />
        {/* Soft Ambient Glows */}
        <div className={`absolute -top-40 -left-40 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-br ${activeTheme.glow} filter blur-3xl opacity-40 transition-all duration-1000`}></div>
        <div className={`absolute -bottom-40 -right-40 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-br ${activeTheme.glow} filter blur-3xl opacity-40 transition-all duration-1000`}></div>
        {/* Sleek Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
      </div>

      <div className="relative z-20 max-w-[1480px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* Left Stage - Slide Content (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Tag/Index indicator */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4 justify-center lg:justify-start">
              <span className={`text-xs sm:text-sm font-semibold tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md ${activeTheme.text}`}>
                0{activeSlide.id} / 0{heroSlides.length}
              </span>
              <div className="h-px w-6 sm:w-8 bg-white/20"></div>
              <span className="text-white/60 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
                Our Services
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold text-white mb-3 sm:mb-5 leading-tight select-none tracking-tight">
              <span className={`${activeTheme.text}`}>
                {activeSlide.title}
              </span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-300 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {activeSlide.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center">
              <Link
                href={activeSlide.path}
                className={`w-full sm:w-auto flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 ${activeTheme.bg} text-white rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-lg ${activeTheme.shadow} gap-2 group`}
              >
                <span>Learn More</span>
                <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/#contact"
                className="w-full sm:w-auto flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 bg-slate-900/80 backdrop-blur-sm border border-slate-700 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-md"
              >
                <span>Get Started</span>
              </Link>
            </div>

            {/* Mobile Horizontal Quick Nav */}
            <div className="mt-6 sm:mt-8 lg:hidden flex gap-2 overflow-x-auto py-2 px-1 scrollbar-hide justify-start sm:justify-center max-w-full">
              {heroSlides.map((slide, index) => {
                const SlideIcon = slide.icon;
                const isSelected = index === currentSlide;
                const slideTheme = themeStyles[slide.themeColor];
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(index)}
                    className={`flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-all duration-300 border ${isSelected
                      ? `${slideTheme.bg} ${slideTheme.border} text-white scale-105 shadow-md`
                      : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                      }`}
                    title={slide.title}
                  >
                    <SlideIcon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Stage - Visual Card & Interactive Quick Select (5 Cols) */}
          <div className="hidden lg:col-span-5 lg:flex flex-col gap-4 xl:gap-5 pl-2 xl:pl-4">

            {/* Main Interactive Floating Image Card */}
            <div className="relative w-full h-[180px] xl:h-[210px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group/card bg-slate-900/50 backdrop-blur-md">
              <Image
                src={activeSlide.image}
                alt={activeSlide.title}
                fill
                className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                sizes="(max-width: 1280px) 40vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              {/* Floating Badge */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center bg-slate-950/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
                <span className="text-white text-xs font-bold truncate max-w-[70%]">{activeSlide.title}</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${activeTheme.text}`}>Active Slide</span>
              </div>
            </div>

            {/* Interactive 8-Service Sidebar Quick Select Grid */}
            <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-3 xl:p-4 border border-white/5 flex flex-col gap-2">
              <h3 className="text-white/60 text-[10px] font-bold uppercase tracking-widest px-1">
                Explore Services ({heroSlides.length})
              </h3>

              <div className="grid grid-cols-2 gap-1.5 xl:gap-2">
                {heroSlides.map((slide, index) => {
                  const SlideIcon = slide.icon;
                  const isSelected = index === currentSlide;
                  const slideTheme = themeStyles[slide.themeColor];
                  return (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlide(index)}
                      className={`group/btn flex items-center gap-2 p-1.5 xl:p-2 rounded-xl text-left transition-all duration-300 border ${isSelected
                        ? "bg-white/10 border-white/20 shadow-md translate-x-0.5"
                        : "bg-white/0 border-transparent hover:bg-white/5 text-slate-400 hover:text-white"
                        }`}
                    >
                      {/* Icon */}
                      <div className={`w-7 h-7 xl:w-8 xl:h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isSelected
                        ? `${slideTheme.bg} text-white shadow-md ${slideTheme.shadow}`
                        : "bg-white/5 text-slate-300 group-hover/btn:scale-105"
                        }`}>
                        <SlideIcon className="w-3.5 h-3.5" />
                      </div>

                      {/* Title */}
                      <div className="min-w-0 flex-1">
                        <div className={`text-[11px] xl:text-xs font-bold truncate transition-colors duration-300 ${isSelected ? "text-white" : "text-slate-300 group-hover/btn:text-white"
                          }`}>
                          {slide.title}
                        </div>
                      </div>

                      {/* Active Indicator Pulse */}
                      {isSelected && (
                        <span className="relative flex h-1.5 w-1.5 pr-1.5 flex-shrink-0">
                          <span className={`animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full opacity-75 ${slideTheme.bg}`}></span>
                          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${slideTheme.bg}`}></span>
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
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 lg:left-8 z-30 flex items-center gap-3 sm:gap-4">
        {/* Left Arrow */}
        <button
          suppressHydrationWarning
          onClick={prevSlide}
          className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Slide Counter */}
        <span className="text-white/60 text-xs font-bold select-none min-w-[36px] text-center">
          0{currentSlide + 1} / 0{heroSlides.length}
        </span>

        {/* Right Arrow */}
        <button
          suppressHydrationWarning
          onClick={nextSlide}
          className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
          aria-label="Next slide"
        >
          <FaChevronRight className="w-3.5 h-3.5" />
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
