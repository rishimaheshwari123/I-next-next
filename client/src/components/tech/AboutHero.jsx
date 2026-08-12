import React from "react";
import Image from "next/image";

const AboutHero = () => {
  return (
    <div className="relative w-full min-h-[580px] md:h-[600px] overflow-hidden flex flex-col justify-center py-16 md:py-0">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/herosection/about.avif"
          alt="About I Next Ets"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        {/* Light Overlay for better text visibility */}
        <div className="absolute inset-0 bg-blue-900/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex items-center my-auto pt-10 md:pt-0">
        <div className="max-w-[90vw] mx-auto px-4 lg:px-6 w-full">
          <div className="max-w-4xl text-center mx-auto">
            {/* Badge */}
            <div className="inline-block mb-6">
              <span className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-bold border border-white/30">
                About Us
              </span>
            </div>

            {/* Title */}
            <h1 className="text-xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Transforming Ideas Into Digital Reality
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/95 mb-8 leading-relaxed max-w-3xl mx-auto">
              We are a passionate team of digital experts dedicated to helping businesses grow through innovative technology solutions. With years of experience and a customer-first approach, we deliver excellence in every project.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">1000+</div>
                <div className="text-sm text-white/90">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">95%</div>
                <div className="text-sm text-white/90">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">21+</div>
                <div className="text-sm text-white/90">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">14+</div>
                <div className="text-sm text-white/90">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
