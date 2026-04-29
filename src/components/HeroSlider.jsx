"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";

const heroSlides = [
  {
    id: 5,
    title: "Website Development",
    path: "/webDevelopment",
    description: "Custom website solutions tailored to your business needs. We create responsive, fast, and SEO-friendly websites that drive results.",
    image: "/herosection/web.jpg",
    bgColor: "from-blue-600/60 to-blue-900/80"
  },
  {
    id: 6,
    title: "Mobile App Development",
    path: "/mobile",
    description: "iOS & Android app development with cutting-edge technology. Transform your ideas into powerful mobile applications.",
    image: "/herosection/app.png",
    bgColor: "from-purple-600/60 to-purple-900/80"
  },
  {
    id: 7,
    title: "AI (Artificial Intelligence)",
    path: "/ai-services",
    description: "AI-powered solutions for your business. Leverage machine learning and artificial intelligence to stay ahead of the competition.",
    image: "/herosection/aiml.jpg",
    bgColor: "from-orange-600/60 to-orange-900/80"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full h-[600px] lg:h-[700px] overflow-hidden mt-[108px]">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-gray-900">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover opacity-50"
              priority={index === 0}
              quality={100}
            />
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} mix-blend-overlay`}></div>
          </div>

          {/* Content */}
          <div className="relative z-20 h-full flex items-center">
            <div className="max-w-[90vw] mx-auto px-4 lg:px-6 w-full">
              <div className="max-w-3xl text-center md:text-left mx-auto md:mx-0">
                {/* Slide Number */}
                <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                  <span className="text-white/80 text-sm font-semibold">
                    0{index + 1}
                  </span>
                  <div className="h-px w-12 bg-white/50"></div>
                  <span className="text-white/80 text-sm font-semibold">
                    Featured Service
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fadeInUp">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl animate-fadeInUp animation-delay-200 mx-auto md:mx-0">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-4 animate-fadeInUp animation-delay-400">
                  <Link
                    href={slide.path}
                    className="w-full md:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                  >
                    Learn More
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full md:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold transition-all duration-200 border-2 border-white/30 hover:border-white/50 text-center"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Bottom Right */}
      <div className="absolute bottom-4 right-4 z-30 flex gap-2">
        <button
          onClick={prevSlide}
          className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 border border-white/30 hover:border-white/50"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-200 border border-white/30 hover:border-white/50"
          aria-label="Next slide"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-12 h-3 bg-orange-500"
                : "w-3 h-3 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
        <div
          className="h-full bg-orange-500 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / heroSlides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default HeroSlider;
