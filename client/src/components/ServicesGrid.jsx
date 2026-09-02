"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaBullhorn,
  FaUserPlus,
  FaChartLine,
  FaLaptopCode,
  FaMobileAlt,
  FaRobot,
  FaShieldAlt,
  FaArrowRight
} from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "Website Development",
    path: "/web-development",
    description: "Custom website solutions tailored to your business needs. Responsive, fast, and SEO-friendly.",
    icon: FaLaptopCode,
    image: "/herosection/web.jpg",
    gradient: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600 border-indigo-100"
  },
  {
    id: 2,
    title: "Mobile App Development",
    path: "/mobile-app-development",
    description: "iOS & Android app development with cutting-edge technology. Build native and cross-platform apps.",
    icon: FaMobileAlt,
    image: "/herosection/app.png",
    gradient: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600 border-pink-100"
  },
  {
    id: 3,
    title: "Social Media Marketing",
    path: "/social-media-marketing",
    description: "Grow your brand presence on social platforms. Engage your audience and run targeted campaigns.",
    icon: FaFacebook,
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop",
    gradient: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600 border-blue-100"
  },
  {
    id: 4,
    title: "Digital Marketing",
    path: "/digital-marketing",
    description: "Complete digital marketing solutions. Maximize reach, optimize ads, and boost your conversion rates.",
    icon: FaBullhorn,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    gradient: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600 border-orange-100"
  },
  {
    id: 5,
    title: "Lead Generation",
    path: "/lead-generation",
    description: "Generate quality leads for your business. Build a consistent and predictable sales pipeline.",
    icon: FaUserPlus,
    image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=600&auto=format&fit=crop",
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600 border-purple-100"
  },
  {
    id: 6,
    title: "Business Growth Package",
    path: "/business-growth-package",
    description: "Comprehensive growth packages. Content marketing, SEO, and custom marketing strategies.",
    icon: FaChartLine,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
    gradient: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600 border-emerald-100"
  },
  {
    id: 7,
    title: "AI (Artificial Intelligence)",
    path: "/ai-services",
    description: "AI-powered solutions. Custom chatbots, machine learning integrations, and process automation.",
    icon: FaRobot,
    image: "/herosection/aiml.jpg",
    gradient: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600 border-cyan-100"
  },
  {
    id: 8,
    title: "Cyber Security",
    path: "/cyber-security",
    description: "Enterprise security architecture, risk audits, penetration testing, and 24/7 cloud asset protection.",
    icon: FaShieldAlt,
    image: "/herosection/cyber.jpg",
    gradient: "from-red-500 to-orange-500",
    bgColor: "bg-red-50",
    iconColor: "text-red-600 border-red-100"
  }
];

const ServicesGrid = () => {
  const containerRef = useRef(null);
  const scrollSectionRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !scrollSectionRef.current) return;

      const container = containerRef.current;
      const scrollSection = scrollSectionRef.current;

      const rect = container.getBoundingClientRect();
      const scrollDistance = container.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(-rect.top / scrollDistance, 0), 1);

      const maxTranslate = scrollSection.scrollWidth - window.innerWidth + 80;
      setTranslateX(-progress * maxTranslate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Desktop Sticky Scroll-linked Layout */}
      <div
        ref={containerRef}
        className="relative h-[250vh] bg-gradient-to-b from-slate-50 via-white to-slate-50 hidden lg:block"
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">

          {/* Section Header */}
          <div className="max-w-[1480px] mx-auto w-full mb-6 xl:mb-10 text-center flex flex-col items-center px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-1.5 h-5 sm:h-6 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></span>
              <span className="text-orange-600 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest">
                What We Offer
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
              EXPLORE OUR SERVICES
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl font-medium mx-auto">
              Comprehensive solutions to grow your business, optimize operations, and achieve your goals.
            </p>
          </div>

          {/* Horizontal scroll track wrapper */}
          <div className="w-full overflow-hidden">
            <div
              ref={scrollSectionRef}
              className="flex gap-5 xl:gap-7 pl-[4vw] transition-transform duration-100 ease-out py-4"
              style={{ transform: `translate3d(${translateX}px, 0px, 0px)` }}
            >
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Link
                    key={service.id}
                    href={service.path}
                    className="flex-shrink-0 w-[300px] xl:w-[350px] bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 transition-all duration-300 relative group overflow-hidden"
                  >
                    {/* Card Top Image */}
                    <div className="relative w-full h-[150px] xl:h-[180px] overflow-hidden bg-slate-100">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="350px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>

                      {/* Floating Glass Index Badge */}
                      <span className="absolute top-3 right-3 xl:top-4 xl:right-4 bg-white/30 backdrop-blur-md border border-white/20 text-white font-black text-xs xl:text-sm px-2.5 py-0.5 xl:px-3 xl:py-1 rounded-full shadow-sm">
                        0{service.id}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 xl:p-6 flex flex-col gap-3 xl:gap-4">
                      {/* Icon & Title Row */}
                      <div className="flex items-center gap-3">
                        <div className={`${service.bgColor} w-10 h-10 xl:w-11 xl:h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border ${service.iconColor.split(' ')[1]}`}>
                          <IconComponent className={`w-5 h-5 ${service.iconColor.split(' ')[0]}`} />
                        </div>
                        <h3 className="font-extrabold text-slate-900 text-base xl:text-lg leading-tight group-hover:text-blue-600 transition-colors duration-250 truncate">
                          {service.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-xs xl:text-sm text-slate-500 leading-relaxed min-h-[50px] xl:min-h-[58px] line-clamp-3">
                        {service.description}
                      </p>

                      {/* CTA Link */}
                      <div className="flex items-center gap-1.5 text-slate-600 group-hover:text-orange-500 transition-colors duration-200 font-bold text-xs mt-0.5">
                        <span>Learn More</span>
                        <FaArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform duration-200 text-orange-500" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Swipeable Horizontal Layout (< 1024px) */}
      <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 sm:py-16 px-4 sm:px-6 lg:hidden">
        {/* Mobile Header */}
        <div className="max-w-xl mx-auto mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-1.5 h-5 bg-gradient-to-b from-orange-500 to-amber-500 rounded-full"></span>
            <span className="text-orange-600 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest">
              What We Offer
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            OUR SERVICES
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            Comprehensive solutions to grow your business and achieve your goals.
          </p>
        </div>

        {/* Mobile Swipe Track */}
        <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={service.id}
                href={service.path}
                className="flex-shrink-0 w-[260px] sm:w-[290px] snap-center bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden relative"
              >
                {/* Mobile Card Top Image */}
                <div className="relative w-full h-[130px] sm:h-[145px] overflow-hidden bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 260px, 290px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent"></div>

                  <span className="absolute top-2.5 right-2.5 bg-white/30 backdrop-blur-md border border-white/20 text-white font-black text-xs px-2.5 py-0.5 rounded-full">
                    0{service.id}
                  </span>
                </div>

                {/* Mobile Card Content */}
                <div className="p-4 sm:p-5 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`${service.bgColor} w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 border ${service.iconColor.split(' ')[1]}`}>
                      <IconComponent className={`w-4 h-4 ${service.iconColor.split(' ')[0]}`} />
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight truncate">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed min-h-[44px] line-clamp-3">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-slate-600 font-bold text-xs mt-0.5">
                    <span>Learn More</span>
                    <FaArrowRight className="w-3 h-3 text-orange-500" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ServicesGrid;
