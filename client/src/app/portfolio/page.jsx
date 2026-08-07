"use client";
import React, { useState, useMemo } from "react";
import { HiChevronDown, HiChevronUp, HiArrowRight } from "react-icons/hi";
import Image from "next/image";
import ProjectShowcase from "@/components/ProjectShowcase";

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

const PortFolio = () => {
  const [expandedApp, setExpandedApp] = useState(null);

  // Get only mobile apps
  const mobileApps = useMemo(() => {
    return portfolioProjects.filter((project) => project.tag === "Mobile App");
  }, []);

  const toggleApp = (id) => {
    setExpandedApp(expandedApp === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 pt-20 pb-12">

      {/* White Theme Hero Banner Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-white border-b border-slate-200/80">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text & Stats */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 border border-blue-100 rounded-full shadow-sm">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                <span className="text-blue-700 font-bold text-xs uppercase tracking-wider">
                  Our Showcase
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl  font-black text-slate-900 leading-tight tracking-tight uppercase">
                Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Digital Masterpieces</span>
              </h1>

              <p className="text-base md:text-lg text-slate-600 max-w-xl leading-relaxed font-semibold">
                A curated selection of high-performance web products, ecommerce portals, and digital scaling systems built by our elite developers.
              </p>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-4 pt-4 max-w-xl">
                <div className="bg-slate-50/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-4 shadow-[0_8px_25px_rgba(0,0,0,0.02)] hover:-translate-y-1 transition-all duration-300 group/stat">
                  <div className="text-2xl md:text-3xl font-black text-blue-600 mb-1 group-hover/stat:text-blue-700 transition-colors">1000+</div>
                  <div className="text-slate-500 text-[9px] font-black uppercase tracking-wider">Projects</div>
                </div>
                <div className="bg-slate-50/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-4 shadow-[0_8px_25px_rgba(0,0,0,0.02)] hover:-translate-y-1 transition-all duration-300 group/stat">
                  <div className="text-2xl md:text-3xl font-black text-indigo-600 mb-1 group-hover/stat:text-indigo-700 transition-colors">25+</div>
                  <div className="text-slate-500 text-[9px] font-black uppercase tracking-wider">Countries</div>
                </div>
                <div className="bg-slate-50/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-4 shadow-[0_8px_25px_rgba(0,0,0,0.02)] hover:-translate-y-1 transition-all duration-300 group/stat">
                  <div className="text-2xl md:text-3xl font-black text-purple-600 mb-1 group-hover/stat:text-purple-700 transition-colors">99.8%</div>
                  <div className="text-slate-500 text-[9px] font-black uppercase tracking-wider">Uptime</div>
                </div>
              </div>
            </div>

            {/* Right Column: Beautiful Developer Image */}
            <div className="lg:col-span-5 relative px-4 lg:px-0">
              {/* Back decoration element */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 rounded-[2rem] transform rotate-3 scale-[1.02] opacity-15 blur-md pointer-events-none"></div>
              
              {/* Floating Badge 1 - Top Right */}
              <div className="absolute -top-4 -right-2 md:-right-4 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex items-center gap-2.5 z-20 hover:scale-105 transition-transform duration-300">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest">Active Development</span>
              </div>

              {/* Floating Badge 2 - Bottom Left */}
              <div className="absolute -bottom-4 -left-2 md:-left-4 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex items-center gap-2.5 z-20 hover:scale-105 transition-transform duration-300">
                <span className="text-base">⚡</span>
                <div className="text-left">
                  <div className="text-[9px] font-black text-slate-900 uppercase tracking-widest leading-none">Speed Optimized</div>
                  <div className="text-[7px] font-bold text-slate-500 leading-none mt-1">100% PageSpeed Core</div>
                </div>
              </div>
              
              {/* Main image container */}
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-white aspect-video lg:aspect-square flex items-center justify-center group/hero-img">
                <img
                  src="/developer_hero.png"
                  alt="Developer working on project"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/hero-img:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <ProjectShowcase />

      {/* Mobile Apps Accordion Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100 text-slate-800 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Mobile Apps</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Explore our innovative native mobile applications engineered for startups, communities, and enterprises.
            </p>
          </div>

          <div className="space-y-4">
            {mobileApps.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <button
                  onClick={() => toggleApp(app.id)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-blue-200">
                      <Image
                        src={app.image}
                        alt={app.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-200 mb-1">
                        {app.title}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">
                        {app.description}
                      </p>
                    </div>
                  </div>

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

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedApp === app.id ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <div className="pt-4 border-t border-gray-100">
                      <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6 shadow-lg">
                        <Image
                          src={app.image}
                          alt={app.title}
                          fill
                          className="object-cover"
                        />
                      </div>

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
      </section>

    </div>
  );
};

export default PortFolio;
