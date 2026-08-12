"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { HiArrowRight } from "react-icons/hi";

// Portfolio data with categories
const portfolioProjects = [
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
    title: "Jai Shree Ram",
    link: "https://jaishriramnaam.com/",
    tag: "Service Provider",
    image: "/herosection/ramji.png",
  },
  {
    id: 1,
    title: "W Cosmetic",
    link: "https://cosmetics-sage.vercel.app/",
    tag: "Ecommerce",
    image: "/herosection/wcosmetic.png",
    description: "A high-conversion cosmetic store experience featuring custom product catalogs, quick add-to-cart, smooth item animations, and a seamless checkout process optimized for mobile users.",
  },
  {
    id: 2,
    title: "Audisense Clinic",
    link: "https://audisenseclinic.com/",
    tag: "Healthcare",
    image: "/herosection/aude.png",
    description: "A specialized clinical platform offering online appointment scheduling, clinic location services, practitioner directory, and customer reviews to simplify audiology healthcare access.",
  },
  {
    id: 3,
    title: "Femme Cure",
    link: "https://www.femmecurehelpingher.com/",
    tag: "Healthcare",
    image: "/herosection/femme.png",
    description: "An ecommerce healthcare platform for women, offering personalized wellness products, product selection guides, secure cart processing, and educational resources.",
  },
  {
    id: 4,
    title: "Business Guruji",
    link: "https://www.businessgurujee.com/",
    tag: "Real Estate",
    image: "/herosection/guruji.png",
    description: "A real estate marketplace connecting buyers, sellers, and agents with interactive maps, listing catalogs, advanced filters, and direct call actions.",
  },
  {
    id: 5,
    title: "Relentless Excavating",
    link: "https://www.relentlessexcavating.online",
    tag: "Landing Pages",
    image: "/herosection/relantless.png",
    description: "A clean landing page for commercial excavation services with custom contact forms, local service area highlight maps, and high-impact project galleries.",
  },
  {
    id: 6,
    title: "Propcorn",
    link: "https://www.propcorn.co.in",
    tag: "Real Estate",
    image: "/herosection/propcorn.png",
    description: "A real estate consulting catalog offering premium property searches, pricing calculators, agent profile integrations, and schedule-a-visit calendar options.",
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
];

// Memoized Project Card Component with details below and centered hover button
const ProjectCard = React.memo(({ project, index }) => {
  const description = useMemo(() => {
    if (project.description) return project.description;
    return `A professional ${project.tag.toLowerCase()} application custom-tailored for ${project.title}. Designed with modern layouts, high-performance speeds, responsive structures, and optimized conversions.`;
  }, [project]);

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="group block w-full text-left"
    >
      {/* Image Container with Hover Effect */}
      <div className="relative w-full aspect-video rounded-[1.8rem] overflow-hidden bg-slate-100 shadow-[0_8px_25px_rgba(0,0,0,0.04)] transition-all duration-300 border border-slate-100">
        {/* Project Image - using object-top with aspect-video to prevent cropping of sides/essential elements */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover Overlay containing only the Pill Button in the center */}
        <div className="absolute inset-0 bg-[#072b38]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#f15a24] text-white font-extrabold text-[10px] md:text-xs uppercase tracking-widest rounded-full transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-lg">
            <span>Live Link</span>
            <HiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* Details below the Image */}
      <div className="mt-4 px-1 space-y-1.5">
        <span className="text-[#f15a24] font-black uppercase tracking-wider text-[10px] block">
          {project.tag}
        </span>
        <h3 className="text-base md:text-lg lg:text-xl font-extrabold text-slate-900 leading-tight group-hover:text-[#f15a24] transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </a>
  );
});
ProjectCard.displayName = "ProjectCard";

const ProjectShowcase = () => {
  const [visibleCount, setVisibleCount] = useState(9); // Loading in multiples of 9 since there are 3 columns

  // Filter out web projects
  const webProjects = useMemo(() => {
    return portfolioProjects.filter((project) => project.tag !== "Mobile App");
  }, []);

  // Paginated visible projects from all web projects
  const visibleProjects = useMemo(() => {
    return webProjects.slice(0, visibleCount);
  }, [webProjects, visibleCount]);

  return (
    <div className="relative bg-white py-16 text-slate-800">
      {/* Inject custom fade animation for grid switching */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes gridFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      <div className="w-[90vw] mx-auto px-4">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-1.5 mb-2">
            <span className="w-2.5 h-2.5 bg-[#f15a24] rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Our Showcase
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
            Our Creative Works
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed font-medium">
            Explore our curated gallery of premium web applications, bespoke ecommerce portals, and digital products.
          </p>
        </header>

        {/* 3-Column Responsive Grid */}
        <div
          style={{ animation: "gridFadeIn 0.5s ease-out forwards" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 w-full mx-auto pb-1"
        >
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < webProjects.length && (
          <div className="flex justify-center mt-12 relative z-30">
            <button
              onClick={() => setVisibleCount((prev) => prev + 9)} // Pagination step updated to 9 for 3-column grid alignment
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-2xl group bg-gradient-to-br from-[#f15a24] to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-orange-300 shadow-lg hover:shadow-orange-500/20 transition-all duration-300 transform hover:scale-[1.03]"
            >
              <span className="relative px-8 py-3.5 transition-all ease-in duration-75 bg-white text-slate-800 rounded-2xl group-hover:bg-opacity-0 group-hover:text-white font-bold tracking-wide">
                Load More Projects
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectShowcase;
