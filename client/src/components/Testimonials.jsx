"use client";

import { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = {
  indian: [
    {
      id: 1,
      name: "Rajesh Kumar",
      position: "CEO, TechStart India",
      location: "Mumbai, India",
      rating: 5,
      text: "I Next Ets transformed our digital presence completely. Their team's expertise in web development and digital marketing helped us achieve 300% growth in just 6 months. Highly recommended!",
      company: "TechStart India"
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Founder, StyleHub",
      location: "Delhi, India",
      rating: 5,
      text: "Working with I Next Ets was a game-changer for our e-commerce business. Their mobile app development and SEO services brought us 500+ daily orders. Exceptional service!",
      company: "StyleHub"
    },
    {
      id: 3,
      name: "Amit Patel",
      position: "Director, EduTech Solutions",
      location: "Bangalore, India",
      rating: 5,
      text: "The AI solutions provided by I Next Ets revolutionized our learning platform. Their technical expertise and dedication to quality is unmatched. Best decision we made!",
      company: "EduTech Solutions"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      position: "Marketing Head, FashionVista",
      location: "Hyderabad, India",
      rating: 5,
      text: "Their social media marketing strategies increased our brand visibility by 400%. The team is professional, creative, and delivers results. Absolutely fantastic!",
      company: "FashionVista"
    }
  ],
  worldwide: [
    {
      id: 5,
      name: "John Smith",
      position: "CEO, Digital Ventures",
      location: "New York, USA",
      rating: 5,
      text: "I Next Ets delivered a world-class website and mobile app for our business. Their attention to detail and commitment to excellence is outstanding. Highly professional team!",
      company: "Digital Ventures"
    },
    {
      id: 6,
      name: "Sarah Johnson",
      position: "Founder, GreenTech",
      location: "London, UK",
      rating: 5,
      text: "The cyber security solutions provided by I Next Ets gave us peace of mind. Their expertise in protecting digital assets is top-notch. Couldn't be happier!",
      company: "GreenTech"
    },
    {
      id: 7,
      name: "Michael Chen",
      position: "CTO, InnovateLab",
      location: "Singapore",
      rating: 5,
      text: "Their AI and machine learning solutions helped us automate 70% of our processes. The ROI has been incredible. Best tech partner we've ever had!",
      company: "InnovateLab"
    },
    {
      id: 8,
      name: "Emma Williams",
      position: "Director, BrandBoost",
      location: "Sydney, Australia",
      rating: 5,
      text: "I Next Ets's digital marketing expertise helped us expand to 15 new markets. Their strategic approach and execution is simply brilliant. Exceptional results!",
      company: "BrandBoost"
    }
  ]
};

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState("indian");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentTestimonials = testimonials[activeTab];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentTestimonials.length]);

  // Reset index when tab changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % currentTestimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + currentTestimonials.length) % currentTestimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = currentTestimonials[currentIndex];

  return (
    <div className="py-10 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[90vw] mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-3">
            <span className="px-5 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
              Client Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            What Our Clients Say
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Real stories from real clients who achieved success with us
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveTab("indian")}
            className={`px-6 py-3 rounded-lg font-bold text-base transition-all duration-300 ${
              activeTab === "indian"
                ? "bg-orange-500 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200"
            }`}
          >
            🇮🇳 Indian Clients
          </button>
          <button
            onClick={() => setActiveTab("worldwide")}
            className={`px-6 py-3 rounded-lg font-bold text-base transition-all duration-300 ${
              activeTab === "worldwide"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200"
            }`}
          >
            🌍 Worldwide Clients
          </button>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-200 min-h-[320px] flex flex-col justify-between">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-blue-100">
              <FaQuoteLeft className="w-12 h-12" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex gap-1 mb-4 justify-center md:justify-start">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6 text-center md:text-left">
                "{currentTestimonial.text}"
              </p>
            </div>

            {/* Client Info */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
              {/* Avatar */}
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md flex-shrink-0">
                {currentTestimonial.name.charAt(0)}
              </div>

              {/* Details */}
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-xl mb-0.5">
                  {currentTestimonial.name}
                </h4>
                <p className="text-sm text-gray-600 font-medium mb-0.5">
                  {currentTestimonial.position}
                </p>
                <p className="text-xs text-blue-600 font-semibold">
                  📍 {currentTestimonial.location}
                </p>
              </div>

              {/* Company Badge */}
              <div className="hidden md:block">
                <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-bold text-blue-600">
                    {currentTestimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 w-12 h-12 bg-white hover:bg-blue-600 text-gray-700 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-600"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 w-12 h-12 bg-white hover:bg-blue-600 text-gray-700 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-600"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {currentTestimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-10 h-2.5 bg-blue-600"
                  : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default Testimonials;
