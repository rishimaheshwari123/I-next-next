"use client";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { HiArrowRight } from "react-icons/hi";

// Portfolio data with categories
const portfolioProjects = [
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
];

// Memoized Project Card Component to prevent re-renders on scroll progress state updates
const ProjectCard = React.memo(({ project, index, getProjectDescription }) => {
  return (
    <div
      className="sticky transition-all duration-300 mb-12 lg:mb-16"
      style={{
        top: `calc(100px + ${index * 4}px)`,
        zIndex: index + 10,
      }}
    >
      <div className="bg-gradient-to-br from-[#120a2e] via-[#0b061e] to-[#070414] border border-violet-950/40 rounded-3xl p-6 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-blue-500/20 transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
              <span className="px-3.5 py-1 text-[9px] font-black tracking-widest uppercase rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {project.tag}
              </span>
            </div>

            <h3 className="text-2xl lg:text-4xl font-extrabold text-white uppercase tracking-tight leading-tight">
              {project.title}
            </h3>

            <p className="text-slate-300 text-sm lg:text-base leading-relaxed font-medium">
              {getProjectDescription(project)}
            </p>

            <div className="pt-2">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] text-xs uppercase tracking-wider"
              >
                <span>Visit Live Website</span>
                <HiArrowRight className="text-sm" />
              </a>
            </div>
          </div>

          {/* Right Mockup Screen (Browser Mockup in Dark Theme with Hover screenshot scroll) */}
          <div className="lg:col-span-5 flex flex-col h-[260px] lg:h-[300px] bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex-shrink-0 group/img">
            {/* Mock Browser Header */}
            <div className="bg-slate-855/95 border-b border-slate-800/50 px-4 py-2 flex items-center gap-1.5 flex-shrink-0">
              <div className="flex gap-1.2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              </div>
              <div className="flex-1 max-w-[120px] mx-auto bg-slate-950/50 rounded py-0.5 px-1.5 text-[8px] text-slate-500 font-mono text-center truncate border border-slate-800/40">
                {project.title.toLowerCase().replace(/\s+/g, '')}.com
              </div>
            </div>

            {/* Mock Browser Viewport (Screenshot container with hover scroll) */}
            <div className="relative flex-1 overflow-hidden bg-slate-950">
              <img
                src={project.image}
                alt={project.title}
                className="absolute top-0 left-0 w-full h-auto transition-transform duration-[6000ms] ease-in-out group-hover/img:-translate-y-[calc(100%-220px)]"
              />
              <div className="absolute bottom-3 left-3 z-10 px-2 py-1 text-[8px] font-black rounded bg-black/70 text-white backdrop-blur-sm border border-white/10 uppercase tracking-widest">
                ✓ Live Site
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});
ProjectCard.displayName = "ProjectCard";

const ProjectShowcase = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);
  const stackContainerRef = useRef(null);

  // Filter out web projects
  const webProjects = useMemo(() => {
    return portfolioProjects.filter((project) => project.tag !== "Mobile App");
  }, []);

  // Filter projects currently visible in the stack based on visibleCount
  const visibleProjects = useMemo(() => {
    return webProjects.slice(0, visibleCount);
  }, [webProjects, visibleCount]);

  // Helper to generate dynamic descriptions
  const getProjectDescription = (project) => {
    if (project.description) return project.description;
    return `A professional ${project.tag.toLowerCase()} application custom-tailored for ${project.title}. Designed with modern layouts, high-performance speeds, responsive structures, and optimized conversions to elevate the brand's digital presence.`;
  };

  // Scroll event handler to track section progress
  useEffect(() => {
    const handleScroll = () => {
      if (!stackContainerRef.current) return;
      const rect = stackContainerRef.current.getBoundingClientRect();

      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      setShowIndicator(isInViewport);

      const scrollTop = -rect.top;
      const totalHeight = rect.height - window.innerHeight;

      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        const progress = Math.min(Math.max(Math.round((scrollTop / totalHeight) * 100), 0), 100);
        setScrollProgress(progress);
      } else if (rect.top > 0) {
        setScrollProgress(0);
      } else if (rect.bottom < window.innerHeight) {
        setScrollProgress(100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Sticky Scroll Progress Indicator (Right margin) */}
      {showIndicator && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[99] hidden md:flex flex-col items-center">
          {/* Progress track line */}
          <div className="w-[3px] h-48 bg-slate-850 relative rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-rose-500 rounded-full transition-all duration-100"
              style={{ height: `${scrollProgress}%` }}
            ></div>
          </div>
          {/* Percentage badge */}
          <div className="mt-4 flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.35)] text-white">
            <span className="text-[10px] font-black font-mono">
              {scrollProgress}%
            </span>
          </div>
        </div>
      )}

      {/* Stacking Case Verticals Section - Set to overflow-visible to enable sticky collection */}
      <section className="relative pt-16 pb-6 bg-[#070b13] overflow-visible text-slate-100">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-[85vw] mx-auto px-4">
          <header className="mb-20 text-center">
            <div className="inline-flex items-center gap-1.5 mb-2">
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                Our Showcase
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
              Our  Creative Works
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed font-medium">
              Scroll down to explore how we engineer high-performance web products, custom ecommerce portals, and digital scaling systems.
            </p>
          </header>

          {/* Stacking Sticky Cards List */}
          <div ref={stackContainerRef} className="max-w-6xl mx-auto pb-1">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                getProjectDescription={getProjectDescription}
              />
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < webProjects.length && (
            <div className="flex justify-center mt-2 relative z-30 pb-16">
              <button
                onClick={() => setVisibleCount((prev) => prev + 8)}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-2xl group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-800 shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-[1.03]"
              >
                <span className="relative px-8 py-3.5 transition-all ease-in duration-75 bg-slate-900 text-slate-100 rounded-2xl group-hover:bg-opacity-0 group-hover:text-white font-bold tracking-wide font-semibold">
                  Load More Projects
                </span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectShowcase;
