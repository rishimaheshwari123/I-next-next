"use client";
import React, { useState, useMemo } from "react";
import { HiChevronDown, HiChevronUp, HiArrowRight } from "react-icons/hi";
import Image from "next/image";
import ProjectShowcase from "@/components/ProjectShowcase";

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
  {
    id: 32,
    title: "Mera Ghar Sansaar App",
    link: "https://meragharsansaar.com/",
    tag: "Mobile App",
    image: "/mobileapp/meraghar.png",
    description: "Home services mobile application",
    androidLink: "https://play.google.com/store/apps/details?id=com.gharsansar",
    iosLink: "https://apps.apple.com/in/app/mgsa/id6785565824",
  },
  {
    id: 33,
    title: "Rental Meet App",
    link: "https://rentalmeet.com",
    tag: "Mobile App",
    image: "/mobileapp/rentailmeet.png",
    description: "Rental services mobile platform",
    androidLink: "https://play.google.com/store/apps/details?id=com.rentalmeetapp",
    iosLink: "https://apps.apple.com/in/app/rentalmeet/id6785021879",
  },
  {
    id: 36,
    title: "PRLT App",
    link: "#",
    tag: "Mobile App",
    image: "/mobileapp/prlt.png",
    description: "Premium property tracking and location services mobile app",
  },
  {
    id: 31,
    title: "Jai Shree Ram App",
    link: "https://jaishriramnaam.com/",
    tag: "Mobile App",
    image: "/mobileapp/jaishreeram.png",
    description: "Mobile application for Jai Shree Ram community platform",
  },

  {
    id: 34,
    title: "Ecogram App",
    link: "https://ecogram-wheat.vercel.app/",
    tag: "Mobile App",
    image: "/mobileapp/ecogram.png",
    description: "Eco-friendly social networking mobile app",
  },
  {
    id: 35,
    title: "Rodofood App",
    link: "https://rodofood.vercel.app/landing",
    tag: "Mobile App",
    image: "/mobileapp/rodo.png",
    description: "Food ordering mobile application for highway travelers",
    androidLink: "https://play.google.com/store/apps/details?id=com.rodofood",
  },


];

const PortFolio = () => {
  // Get only mobile apps
  const mobileApps = useMemo(() => {
    return portfolioProjects.filter((project) => project.tag === "Mobile App");
  }, []);

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 pt-20 pb-12">

      <ProjectShowcase />

      {/* Mobile Apps Section - Redesigned to 90% Widescreen Grid with Phone Mockups */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-orange-50 pt-16 pb-24 border-t border-gray-100 text-slate-800 overflow-hidden">
        <div className="w-[90vw] mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-1.5 mb-2">
              <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                App Store & Google Play
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Mobile Apps</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base leading-relaxed font-semibold">
              Explore our innovative native mobile applications engineered for startups, communities, and enterprises across iOS and Android.
            </p>
          </div>

          {/* Grid of Phone Mockups */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 justify-items-center w-full mx-auto">
            {mobileApps.map((app) => (
              <div
                key={app.id}
                className="w-full max-w-[380px] aspect-[9/16] relative rounded-[2.5rem] border-8 border-slate-900 bg-slate-950 shadow-[0_20px_45px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,0,0,0.22)] group"
              >
                {/* Notch Decorator */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-3.5 bg-slate-900 rounded-b-xl z-20 flex items-center justify-center">
                  <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
                </div>

                {/* Operating System Badge Floating on Top */}
                <div className="absolute top-2.5 left-2.5 z-10 flex gap-1">
                  <span className="px-2 py-0.5 bg-[#f15a24] text-white text-[8px] font-black uppercase rounded-md tracking-wider">Android</span>
                  <span className="px-2 py-0.5 bg-[#007aff] text-white text-[8px] font-black uppercase rounded-md tracking-wider">iOS</span>
                </div>

                {/* App Screen Capture Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <Image
                    src={app.image}
                    alt={app.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Premium Hover Overlay */}
                <div className="absolute inset-0 bg-[#072b38]/95 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-in-out flex flex-col justify-between p-5 text-center z-10">
                  {/* Header text */}
                  <div className="pt-4 space-y-1">
                    <span className="text-[#f15a24] font-black uppercase tracking-wider text-[9px] block">
                      Mobile Application
                    </span>
                    <h3 className="text-base font-extrabold text-white leading-tight">
                      {app.title}
                    </h3>
                  </div>

                  {/* Middle Description details */}
                  <p className="text-slate-300 text-[11px] font-medium leading-relaxed px-1">
                    {app.description}
                  </p>

                  {/* Dual Store Download or Website buttons */}
                  <div className="space-y-2 w-full">
                    {app.androidLink || app.iosLink ? (
                      <>
                        <a
                          href={app.androidLink || app.link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white/10 hover:bg-[#f15a24] text-white rounded-xl text-[9px] font-bold uppercase tracking-wider transition-colors duration-200 border border-white/15 w-full"
                        >
                          <span>{app.androidLink ? "Android App" : "Visit Website"}</span>
                        </a>
                        <a
                          href={app.iosLink || app.link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white/10 hover:bg-[#007aff] text-white rounded-xl text-[9px] font-bold uppercase tracking-wider transition-colors duration-200 border border-white/15 w-full"
                        >
                          <span>{app.iosLink ? "iOS App" : "Visit Website"}</span>
                        </a>
                      </>
                    ) : (
                      <a
                        href={app.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white/10 hover:bg-[#f15a24] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 border border-white/15 w-full"
                      >
                        <span>Visit Website</span>
                      </a>
                    )}
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
