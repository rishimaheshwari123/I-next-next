"use client";

import { useState, useEffect } from "react";
import { FaStar, FaQuoteRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonialsList = [
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
  },
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
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsList.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsList.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="py-16 bg-gradient-to-b from-white via-[#f8fafc] to-white overflow-hidden">
      <div className="max-w-[90vw] mx-auto px-4 lg:px-6">
        
        {/* Header - Centered Layout */}
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-6 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></span>
            <span className="text-orange-600 text-xs font-extrabold uppercase tracking-widest">
              Client Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-slate-500 text-sm mt-2 font-medium max-w-xl mx-auto">
            Real stories from clients who achieved success with our custom solutions.
          </p>

          {/* Navigation Controls centered below description */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={prevSlide}
              className="w-11 h-11 bg-white hover:bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-950 transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="w-11 h-11 bg-white hover:bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-700 hover:text-slate-950 transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Testimonial Slider Wrapper */}
        <div className="w-full overflow-hidden py-4">
          <div
            className="flex gap-5 lg:gap-8 transition-transform duration-500 ease-out [--card-width:85%] [--card-gap:1.25rem] lg:[--card-width:70%] lg:[--card-gap:2rem]"
            style={{
              transform: `translate3d(calc(-${currentIndex} * (var(--card-width) + var(--card-gap))), 0px, 0px)`
            }}
          >
            {testimonialsList.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-[var(--card-width)] bg-white rounded-3xl p-8 border border-slate-100/80 shadow-[0_4px_25px_rgba(0,0,0,0.015)] relative overflow-hidden flex flex-col justify-between min-h-[300px] hover:shadow-[0_15px_30px_rgba(15,23,42,0.04)] transition-all duration-300"
              >
                {/* Quote Icon Background */}
                <div className="absolute top-6 right-6 text-slate-100">
                  <FaQuoteRight className="w-16 h-16 opacity-60" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-4xl">
                  {/* Rating */}
                  <div className="flex gap-1 mb-5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-4.5 h-4.5 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-slate-700 text-base md:text-lg leading-relaxed font-medium italic">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Client Info Row */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6 gap-4">
                  <div className="flex items-center gap-3.5">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-extrabold text-lg shadow-sm flex-shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>

                    {/* Details */}
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base mb-0.5">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-none">
                        {testimonial.position}
                      </p>
                      <p className="text-[10px] text-blue-600 font-bold mt-1.5 leading-none">
                        📍 {testimonial.location}
                      </p>
                    </div>
                  </div>

                  {/* Company Badge */}
                  <div className="hidden sm:block">
                    <div className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-100 shadow-sm">
                      <p className="text-xs font-black text-slate-700 tracking-wide">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonialsList.map((_, index) => (
            <button
              suppressHydrationWarning
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-2 bg-blue-600"
                  : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
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
