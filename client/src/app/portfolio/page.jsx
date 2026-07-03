"use client";
import React, { useState, useMemo } from "react";
import { HiArrowRight, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { FaMobileAlt } from "react-icons/fa";
import Image from "next/image";

// Portfolio data with categories
const portfolioProjects = [
  {
    id: 1,
    title: "W Cosmetic",
    link: "https://cosmetics-sage.vercel.app/",
    tag: "Ecommerce / Beauty",
    image: "/herosection/wcosmetic.png",
  },
  {
    id: 2,
    title: "Audisense Clinic",
    link: "https://audisenseclinic.com/",
    tag: "Ecommerce / Healthcare",
    image: "/herosection/aude.png",
  },
  {
    id: 3,
    title: "Femme Cure",
    link: "https://www.femmecurehelpingher.com/",
    tag: "Ecommerce / Healthcare",
    image: "/herosection/femme.png",
  },
  {
    id: 4,
    title: "Business Guruji",
    link: "https://www.businessgurujee.com/",
    tag: "Real Estate",
    image: "/herosection/guruji.png",
  },
  {
    id: 5,
    title: "Relentless Excavating",
    link: "https://www.relentlessexcavating.online",
    tag: "Real Estate / Landing Pages",
    image: "/herosection/relantless.png",
  },
  {
    id: 6,
    title: "Propcorn",
    link: "https://www.propcorn.co.in",
    tag: "Real Estate",
    image: "/herosection/propcorn.png",
  },
  {
    id: 7,
    title: "Trade Gyan",
    link: "https://tradegyan.co",
    tag: "Stock Markets",
    image: "/herosection/tradegyan.png",
  },
  {
    id: 8,
    title: "Paramount Today",
    link: "https://www.paramounttoday.com/",
    tag: "News",
    image: "/herosection/pera.png",
  },
  {
    id: 9,
    title: "India Ahead",
    link: "https://news-pi-red.vercel.app/",
    tag: "News",
    image: "/herosection/india.png",
  },
  {
    id: 10,
    title: "Brother Live",
    link: "https://news-project-gray.vercel.app",
    tag: "News",
    image: "/herosection/brother.png",
  },
  {
    id: 11,
    title: "Bundeli News",
    link: "https://www.khabarbundeli.in/",
    tag: "News",
    image: "/herosection/bundeli.png",
  },
  {
    id: 12,
    title: "Nakshaa",
    link: "https://nakshaa.in/",
    tag: "Real Estate",
    image: "/herosection/naksa.png",
  },
  {
    id: 13,
    title: "JNJ Health",
    link: "https://jnjhealthltd.co.uk/",
    tag: "Healthcare",
    image: "/herosection/jn.png",
  },
  {
    id: 14,
    title: "Ayuvenger Biotech",
    link: "https://www.ayuvengerbiotech.com/",
    tag: "Ecommerce",
    image: "/herosection/au.png",
  },
  {
    id: 15,
    title: "Shop at Classy5",
    link: "https://shopatclassy5.com/",
    tag: "Ecommerce",
    image: "/herosection/shofify.png",
  },
  {
    id: 16,
    title: "Aditya Event Planner",
    link: "https://www.adityaeventplanner.in",
    tag: "Events",
    image: "/herosection/adi.png",
  },
  {
    id: 17,
    title: "Beauty Alter",
    link: "https://www.beautyalter.co.in/",
    tag: "Beauty",
    image: "/herosection/beauty.png",
  },
  {
    id: 18,
    title: "Team Pahal",
    link: "https://www.teampahal.org/",
    tag: "NGO",
    image: "/herosection/team.png",
  },
  {
    id: 19,
    title: "Ram Roofing",
    link: "https://www.ramroofs.com/",
    tag: "Landing Pages",
    image: "/herosection/ram.png",
  },
  {
    id: 20,
    title: "Cell Caresa",
    link: "https://cellcaresa.com/",
    tag: "Landing Pages",
    image: "/herosection/cell.png",
  },
  {
    id: 21,
    title: "Embrace 2 Create",
    link: "https://embrace-2-create.com",
    tag: "Landing Pages",
    image: "/herosection/embrace.png",
  },
  {
    id: 22,
    title: "AI ML Project",
    link: "#",
    tag: "Landing Pages",
    image: "/herosection/aiml.jpg",
  },
  {
    id: 23,
    title: "Web Development",
    link: "#",
    tag: "Landing Pages",
    image: "/herosection/web.jpg",
  },
  {
    id: 24,
    title: "App Development",
    link: "#",
    tag: "Landing Pages",
    image: "/herosection/app.png",
  },
  {
    id: 25,
    title: "Mera Ghar Sansaar",
    link: "https://meragharsansaar.com/",
    tag: "Service Provider",
    image: "/herosection/gharsansaar.png",
  },
  {
    id: 26,
    title: "Ecogram",
    link: "https://ecogram-wheat.vercel.app/",
    tag: "Service Provider",
    image: "/herosection/ecogram.png",
  },
  {
    id: 27,
    title: "Injection Healthcare",
    link: "https://injection-seven.vercel.app/",
    tag: "Healthcare",
    image: "/herosection/injection.png",
  },
  {
    id: 28,
    title: "Rodofood",
    link: "https://rodofood.vercel.app/landing",
    tag: "Ecommerce",
    image: "/herosection/landing.png",
  },
  {
    id: 29,
    title: "Rental Meet",
    link: "https://rentalmeet.com",
    tag: "Service Provider",
    image: "/herosection/meet.png",
  },
  {
    id: 30,
    title: "Jai Shri Ram Naam",
    link: "https://jaishriramnaam.com",
    tag: "Service Provider",
    image: "/herosection/ramji.png",
  },
  {
    id: 31,
    title: "Ram Ji Ki Sena App",
    link: "https://ramjikisena.com/",
    tag: "Mobile App",
    image: "/herosection/ramji.png",
    description: "Mobile application for Ram Ji Ki Sena community platform",
  },
  {
    id: 32,
    title: "Mera Ghar Sansaar App",
    link: "https://meragharsansaar.com/",
    tag: "Mobile App",
    image: "/herosection/gharsansaar.png",
    description: "Home services mobile application",
  },
  {
    id: 33,
    title: "Rental Meet App",
    link: "https://rentalmeet.com",
    tag: "Mobile App",
    image: "/herosection/meet.png",
    description: "Rental services mobile platform",
  },
  {
    id: 34,
    title: "Ecogram App",
    link: "https://ecogram-wheat.vercel.app/",
    tag: "Mobile App",
    image: "/herosection/ecogram.png",
    description: "Eco-friendly social networking mobile app",
  },
  {
    id: 35,
    title: "Rodofood App",
    link: "https://rodofood.vercel.app/landing",
    tag: "Mobile App",
    image: "/herosection/landing.png",
    description: "Food ordering mobile application for highway travelers",
  },
  {
    id: 36,
    title: "Injection Healthcare App",
    link: "https://injection-seven.vercel.app/",
    tag: "Mobile App",
    image: "/herosection/injection.png",
    description: "Healthcare services mobile application",
  },
];

const TABS = [
  "All",
  "Ecommerce",
  "Landing Pages",
  "News",
  "Beauty",
  "Healthcare",
  "Real Estate",
  "Stock Markets",
  "NGO",
  "Events",
  "Service Provider",
  "Mobile App",
];

// Modern Link Component
const ModernLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-blue-100 transition-colors duration-200"
  >
    {children}
    <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
  </a>
);

const PortFolio = () => {
  const [expandedApp, setExpandedApp] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter out web projects (exclude Mobile App tag)
  const webProjects = useMemo(() => {
    return portfolioProjects.filter((project) => project.tag !== "Mobile App");
  }, []);

  // Get only mobile apps
  const mobileApps = useMemo(() => {
    return portfolioProjects.filter((project) => project.tag === "Mobile App");
  }, []);

  const toggleApp = (id) => {
    setExpandedApp(expandedApp === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Video */}
      <section className="relative pt-40 pb-32 overflow-hidden bg-slate-950">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-80"
          >
            <source src="https://d1hdtc0tbqeghx.cloudfront.net/wp-content/uploads/2023/06/29131238/Banner.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay for Text Contrast */}
          <div className="absolute inset-0 bg-slate-950/40"></div>
          {/* Subtle color highlight mask to retain branding colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/15 via-transparent to-orange-600/10"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
            <span className="text-white font-semibold text-sm uppercase tracking-wide">
              Our Portfolio
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl md:text-4xl  font-extrabold mb-6 text-white drop-shadow-2xl">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">Creative Work</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
            From IT and Digital Marketing to AI, Cloud, and Real Estate — we
            drive innovation and excellence across industries.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
              <div className="text-4xl font-bold text-orange-400 mb-2">350+</div>
              <div className="text-gray-200 text-sm uppercase tracking-wide">Projects Delivered</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
              <div className="text-4xl font-bold text-orange-400 mb-2">42+</div>
              <div className="text-gray-200 text-sm uppercase tracking-wide">Countries Served</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
              <div className="text-4xl font-bold text-orange-400 mb-2">14+</div>
              <div className="text-gray-200 text-sm uppercase tracking-wide">Years Experience</div>
            </div>
          </div>
        </div>

      </section>

      {/* Main Portfolio Section */}
      <div className="bg-gradient-to-b from-white to-slate-50 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[90vw] mx-auto">
          {/* Header */}
          <header className="mb-5 text-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 animate-[fadeIn_1s_ease-out]">

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">              Featured Web Projects
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our latest web developments, custom platforms, and high-converting landing pages.
            </p>
          </header>

          {/* Project Cards Grid */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {webProjects.slice(0, visibleCount).map((project) => (
              <article
                key={project.id}
                className="relative w-full h-[400px] bg-white rounded-3xl overflow-hidden group transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.12)] hover:-translate-y-2 border border-gray-100/80 hover:border-blue-500/20"
              >
                {/* Image Container - takes full height initially, shrinks to h-44 (176px) on hover */}
                <div className="absolute top-0 left-0 right-0 w-full h-full group-hover:h-44 transition-all duration-500 ease-in-out z-10 overflow-hidden bg-slate-100">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Hover Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10 flex items-end p-6">
                    <span className="text-white text-xs font-semibold flex items-center gap-1.5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      Visit Live Project <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  {/* Premium Tag Badge floating on image */}
                  <div className="absolute top-4 left-4 z-20 transition-all duration-500 group-hover:top-3 group-hover:left-3">
                    <span className="inline-flex items-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-slate-900/85 text-white backdrop-blur-md border border-white/10 shadow-md">
                      {project.tag || "Innovation"}
                    </span>
                  </div>
                </div>

                {/* Details Container - slides up from bottom (224px high) on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-56 p-6 bg-gradient-to-b from-white via-white to-slate-50/50 border-t border-gray-100 z-20 flex flex-col justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div>
                    {/* Interactive Accent Bar */}
                    <div className="w-8 h-1 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full mb-3 group-hover:w-16 transition-all duration-500 delay-[50ms]"></div>

                    {/* Title with Slide-up & Fade-in Popup */}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-all duration-500 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 delay-[100ms]">
                      {project.title}
                    </h3>

                    {/* Description with Slide-up & Fade-in Popup */}
                    <p className="text-sm text-gray-500 leading-relaxed pt-2 transition-all duration-500 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 delay-[200ms] line-clamp-2">
                      {project.description || `Explore our high-performance client project built using modern stacks and optimized for growth.`}
                    </p>
                  </div>

                  {/* Footer CTA with Slide-up & Fade-in Popup */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between transition-all duration-500 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 delay-[300ms]">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors duration-300"
                    >
                      Launch Project
                      <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                        <HiArrowRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < webProjects.length && (
            <div className="flex justify-center mt-16">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-2xl group bg-gradient-to-br from-blue-600 to-orange-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-md hover:shadow-orange-500/20 transition-all duration-300 transform hover:scale-[1.03]"
              >
                <span className="relative px-8 py-3.5 transition-all ease-in duration-75 bg-white text-gray-800 rounded-2xl group-hover:bg-opacity-0 group-hover:text-white font-bold tracking-wide">
                  Load More Projects
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Apps Accordion Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-orange-50 py-5 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-5">

            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Mobile Apps</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our innovative mobile applications designed for various industries
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-4">
            {mobileApps.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleApp(app.id)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* App Icon */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-blue-200">
                      <Image
                        src={app.image}
                        alt={app.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* App Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-200 mb-1">
                        {app.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {app.description}
                      </p>
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${expandedApp === app.id
                      ? "bg-gradient-to-r from-blue-600 to-orange-500 text-white"
                      : "bg-orange-100 text-orange-600 group-hover:bg-orange-200"
                      }`}
                  >
                    {expandedApp === app.id ? (
                      <HiChevronUp className="w-6 h-6" />
                    ) : (
                      <HiChevronDown className="w-6 h-6" />
                    )}
                  </div>
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedApp === app.id
                    ? "max-h-[600px] opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <div className="pt-4 border-t border-gray-100">
                      {/* App Screenshot */}
                      <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6 shadow-lg">
                        <Image
                          src={app.image}
                          alt={app.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* App Details */}
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                          <h4 className="font-semibold text-gray-900 mb-2">Platform</h4>
                          <p className="text-gray-700">iOS & Android</p>
                        </div>
                        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                          <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
                          <p className="text-gray-700">{app.tag}</p>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <a
                        href={app.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        View App Details
                        <HiArrowRight className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortFolio;
