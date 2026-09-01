"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  FaHome,
  FaInfoCircle,
  FaCogs,
  FaBriefcase,
  FaNewspaper,
  FaUserTie,
  FaPhoneAlt,
  FaHeadset,
  FaSearch,
  FaLaptopCode,
  FaMobileAlt,
  FaShareAlt,
  FaBullhorn,
  FaChartLine,
  FaRobot,
  FaShieldAlt,
  FaPaintBrush,
  FaLayerGroup,
  FaDraftingCompass,
  FaFileContract,
  FaSitemap,
  FaExternalLinkAlt,
  FaArrowRight,
  FaCheckCircle,
  FaLock,
  FaGlobe,
  FaSlidersH,
  FaFileAlt,
  FaCopy,
  FaCheck
} from "react-icons/fa";

// Dual Domain Config
const DOMAINS = {
  IN: {
    key: "IN",
    name: "inextets.in",
    url: "https://inextets.in",
    flag: "🇮🇳",
    label: "India / Regional (.in)",
    desc: "Primary regional domain targeting Indian enterprise clients, startups, and local SEO.",
  },
  COM: {
    key: "COM",
    name: "inextets.com",
    url: "https://inextets.com",
    flag: "🌐",
    label: "Global / International (.com)",
    desc: "International domain serving global clients, worldwide partnerships, and export services.",
  },
};

// Sitemap Categories & Routes Configuration
const siteMapData = [
  {
    category: "Main Pages",
    icon: FaHome,
    badgeColor: "from-blue-600 to-indigo-600",
    description: "Primary landing and navigation hubs of I Next ETS",
    links: [
      {
        title: "Home",
        path: "/",
        description: "Official homepage featuring top-tier digital marketing, engineering solutions, client portfolio, and testimonials.",
        priority: "1.0 (Highest)",
        changeFreq: "Daily",
        type: "Public",
      },
      {
        title: "About Us",
        path: "/about",
        description: "Learn about our company mission, vision, expert leadership, agency culture, and global standards.",
        priority: "0.9",
        changeFreq: "Monthly",
        type: "Public",
      },
      {
        title: "Our Services Hub",
        path: "/service",
        description: "Comprehensive catalog of all our cutting-edge technology and digital transformation services.",
        priority: "0.9",
        changeFreq: "Weekly",
        type: "Public",
      },
      {
        title: "Portfolio & Case Studies",
        path: "/portfolio",
        description: "Showcase of our live client projects, digital success stories, and custom software delivery.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Public",
      },
      {
        title: "News & Industry Blogs",
        path: "/news",
        description: "Latest insights, tech innovations, digital marketing strategies, and company announcements.",
        priority: "0.85",
        changeFreq: "Daily",
        type: "Public",
      },
      {
        title: "Careers",
        path: "/career",
        description: "Explore open vacancies, internship opportunities, perks, and join our world-class engineering team.",
        priority: "0.80",
        changeFreq: "Weekly",
        type: "Public",
      },
      {
        title: "Contact Us",
        path: "/contact",
        description: "Get in touch with our team for consultations, project inquiries, and headquarters location info.",
        priority: "0.90",
        changeFreq: "Monthly",
        type: "Public",
      },
    ],
  },
  {
    category: "Digital Marketing & Growth",
    icon: FaBullhorn,
    badgeColor: "from-orange-500 to-amber-500",
    description: "ROI-driven marketing strategies to scale brand presence and acquire customers",
    links: [
      {
        title: "Social Media Marketing (SMM)",
        path: "/social-media-marketing",
        description: "Strategic social brand management, paid ad campaigns, viral content creation, and influencer marketing.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Service",
      },
      {
        title: "Digital Marketing & Inbound",
        path: "/digital-marketing",
        description: "360-degree digital marketing funnels, PPC management, email automation, and conversion optimization.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Service",
      },
      {
        title: "SEO Marketing",
        path: "/seomarket",
        description: "Organic search ranking, on-page optimization, technical SEO audits, backlink strategy, and keyword domination.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Service",
      },
      {
        title: "Lead Generation & Paid Ads",
        path: "/lead-generation",
        description: "High-converting B2B/B2C lead generation funnels, Google Ads, Meta Ads, and performance tracking.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Service",
      },
      {
        title: "Business Growth Package",
        path: "/business-growth-package",
        description: "All-in-one scalable growth packages combining brand storytelling, content marketing, and multi-channel acquisition.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Service",
      },
    ],
  },
  {
    category: "Web & Software Engineering",
    icon: FaLaptopCode,
    badgeColor: "from-blue-500 to-cyan-500",
    description: "Robust, scalable, high-performance web applications and enterprise software",
    links: [
      {
        title: "Website Development",
        path: "/web-development",
        description: "Custom responsive websites built with modern frameworks, high performance, and SEO optimization.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Service",
      },
      {
        title: "Mobile App Development",
        path: "/mobile-app-development",
        description: "Native iOS & Android mobile application development and cross-platform Flutter/React Native solutions.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Service",
      },
      {
        title: "Web App Development",
        path: "/webAppDevelopment",
        description: "Complex SaaS applications, cloud-native web systems, real-time dashboards, and secure backend APIs.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Service",
      },
      {
        title: "Custom Software Development",
        path: "/softwaredev",
        description: "Tailored enterprise ERP, CRM, workflow automation tools, and legacy software modernizations.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Service",
      },
      {
        title: "CMS Development",
        path: "/cmsdev",
        description: "Headless CMS, WordPress, Strapi, and custom Content Management Systems engineered for flexibility.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Service",
      },
      {
        title: "E-Commerce Development",
        path: "/ecomdev",
        description: "High-conversion online stores, Shopify development, WooCommerce platforms, and custom payment integrations.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Service",
      },
    ],
  },
  {
    category: "UI/UX & Creative Design",
    icon: FaPaintBrush,
    badgeColor: "from-purple-500 to-pink-500",
    description: "User-centric design experiences that captivate audiences and elevate brand identity",
    links: [
      {
        title: "Web Design",
        path: "/webdesign",
        description: "Modern, high-aesthetic web interfaces tailored to maximize user engagement and aesthetic brand appeal.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Design",
      },
      {
        title: "UI/UX Design",
        path: "/uiuxdesign",
        description: "Deep user research, wireframing, interactive prototyping, design systems, and seamless user journeys in Figma.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Design",
      },
      {
        title: "Product Design",
        path: "/productdesign",
        description: "End-to-end digital product architecture, MVP scoping, user feedback loops, and usability testing.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Design",
      },
      {
        title: "Brand Identity",
        path: "/brandidentity",
        description: "Logo creation, brand guidelines, typography systems, color theory, and complete corporate identity assets.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Design",
      },
    ],
  },
  {
    category: "Emerging Tech & Security",
    icon: FaShieldAlt,
    badgeColor: "from-emerald-500 to-teal-500",
    description: "Advanced intelligence systems, automated workflows, and enterprise cybersecurity",
    links: [
      {
        title: "AI & ML Services",
        path: "/ai-services",
        description: "Custom AI integrations, machine learning models, smart automated chatbots, NLP, and predictive analytics.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Service",
      },
      {
        title: "Cyber Security",
        path: "/cyber-security",
        description: "Vulnerability assessments, penetration testing, data encryption, compliance audits, and security infrastructure.",
        priority: "0.85",
        changeFreq: "Weekly",
        type: "Service",
      },
    ],
  },
  {
    category: "Process, Advisory & Support",
    icon: FaInfoCircle,
    badgeColor: "from-sky-500 to-indigo-500",
    description: "Client onboarding, strategic consulting, transparent development phases, and help desk",
    links: [
      {
        title: "How We Work",
        path: "/workinfo",
        description: "Step-by-step breakdown of our agile engineering lifecycle, milestones, and project execution methodology.",
        priority: "0.75",
        changeFreq: "Monthly",
        type: "Process",
      },
      {
        title: "Pre-Work Consultation",
        path: "/prework",
        description: "Preliminary discovery questionnaire and requirements intake form for prospective clients.",
        priority: "0.70",
        changeFreq: "Monthly",
        type: "Intake",
      },
      {
        title: "Investment & Policy Advisory",
        path: "/investment-policy-advisory",
        description: "Strategic tech investment guidance, compliance consultation, and business expansion planning.",
        priority: "0.80",
        changeFreq: "Monthly",
        type: "Advisory",
      },
      {
        title: "Job Application",
        path: "/apply",
        description: "Direct application portal for candidates applying for engineering, design, or marketing positions.",
        priority: "0.70",
        changeFreq: "Monthly",
        type: "Career",
      },
      {
        title: "Customer Support Helpdesk",
        path: "/support",
        description: "Dedicated client assistance, ticket submission, inquiry resolution, and technical support desk.",
        priority: "0.70",
        changeFreq: "Monthly",
        type: "Support",
      },
    ],
  },
  {
    category: "Legal & Compliance",
    icon: FaFileContract,
    badgeColor: "from-slate-600 to-gray-700",
    description: "Terms of service, data privacy rules, and governance policies",
    links: [
      {
        title: "Privacy Policy",
        path: "/privacy-policy",
        description: "Transparency on how I Next ETS collects, stores, protects, and handles personal data and user confidentiality.",
        priority: "0.40",
        changeFreq: "Yearly",
        type: "Legal",
      },
      {
        title: "Terms & Conditions",
        path: "/terms-conditions",
        description: "Legal agreement detailing service scope, payment terms, user rights, and contractual obligations.",
        priority: "0.40",
        changeFreq: "Yearly",
        type: "Legal",
      },
    ],
  },
  {
    category: "Portals & System Access",
    icon: FaLock,
    badgeColor: "from-red-500 to-rose-600",
    description: "Secure role-based enterprise portals (Restricted authentication required)",
    links: [
      {
        title: "Login Portal",
        path: "/login",
        description: "Unified authentication gateway for clients, employees, and administrators.",
        priority: "N/A (noindex)",
        changeFreq: "Weekly",
        type: "Auth",
      },
      {
        title: "Client Dashboard",
        path: "/client/dashboard",
        description: "Client workspace to view project milestones, purchased hosting, support tickets, and service plans.",
        priority: "N/A (Private)",
        changeFreq: "Dynamic",
        type: "Client Portal",
      },
      {
        title: "Employee Workspace",
        path: "/employee/dashboard",
        description: "Internal staff portal for attendance punching, leave management, task execution, and salary reports.",
        priority: "N/A (Internal)",
        changeFreq: "Dynamic",
        type: "Employee Portal",
      },
      {
        title: "Admin Control Center",
        path: "/admin/dashboard",
        description: "Master administrative console for managing revenue, staff, blog posts, clients, services, and inquiries.",
        priority: "N/A (Superadmin)",
        changeFreq: "Dynamic",
        type: "Admin Portal",
      },
    ],
  },
];

export default function SiteMapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeDomain, setActiveDomain] = useState("BOTH"); // "IN", "COM", "BOTH"
  const [copiedUrl, setCopiedUrl] = useState(null);

  const categories = ["All", ...siteMapData.map((group) => group.category)];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // Total link statistics
  const totalPublicLinks = useMemo(() => {
    return siteMapData
      .filter((group) => group.category !== "Portals & System Access")
      .reduce((acc, group) => acc + group.links.length, 0);
  }, []);

  const totalAllLinks = useMemo(() => {
    return siteMapData.reduce((acc, group) => acc + group.links.length, 0);
  }, []);

  // Filtered links calculation
  const filteredData = useMemo(() => {
    return siteMapData
      .map((group) => {
        // Filter by category
        if (selectedCategory !== "All" && group.category !== selectedCategory) {
          return null;
        }

        // Filter by search query
        const matchingLinks = group.links.filter((link) => {
          const q = searchQuery.toLowerCase().trim();
          if (!q) return true;
          return (
            link.title.toLowerCase().includes(q) ||
            link.path.toLowerCase().includes(q) ||
            link.description.toLowerCase().includes(q) ||
            link.type.toLowerCase().includes(q) ||
            group.category.toLowerCase().includes(q)
          );
        });

        if (matchingLinks.length === 0) return null;

        return {
          ...group,
          links: matchingLinks,
        };
      })
      .filter(Boolean);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 font-sans">
      {/* Background Decorative Blur Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <FaSitemap className="w-3.5 h-3.5" />
            Dual-Domain Architecture & Site Map
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
            I Next ETS <span className="text-orange-500">Site Map</span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-6">
            Unified navigation and indexing directory across both primary domains: <span className="font-semibold text-blue-600">inextets.in</span> (India) and <span className="font-semibold text-orange-600">inextets.com</span> (Global).
          </p>

          {/* Domain Selector Switcher */}
          <div className="inline-flex items-center p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm mb-8 gap-1.5">
            <button
              onClick={() => setActiveDomain("BOTH")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeDomain === "BOTH"
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <FaGlobe className="w-3.5 h-3.5" />
              <span>Both Domains (.in + .com)</span>
            </button>

            <button
              onClick={() => setActiveDomain("IN")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeDomain === "IN"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <span>🇮🇳</span>
              <span>inextets.in</span>
            </button>

            <button
              onClick={() => setActiveDomain("COM")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeDomain === "COM"
                  ? "bg-orange-500 text-white shadow-md"
                  : "text-slate-600 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              <span>🌐</span>
              <span>inextets.com</span>
            </button>
          </div>

          {/* Quick Metrics & Actions Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold">
            <div className="flex items-center gap-2 bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 shadow-sm">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-slate-500">Public Indexable:</span>
              <span className="text-slate-900 font-bold">{totalPublicLinks} Pages</span>
            </div>

            <div className="flex items-center gap-2 bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 shadow-sm">
              <FaGlobe className="text-blue-500 w-3.5 h-3.5" />
              <span className="text-slate-500">Total Routes:</span>
              <span className="text-slate-900 font-bold">{totalAllLinks * (activeDomain === "BOTH" ? 2 : 1)} URLs</span>
            </div>

            {/* XML Sitemap Direct Links */}
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl px-4 py-2.5 shadow-md shadow-orange-500/20 hover:scale-105 transition-all duration-200"
            >
              <FaFileAlt className="w-3.5 h-3.5" />
              <span>View XML Sitemap</span>
              <FaExternalLinkAlt className="w-2.5 h-2.5 opacity-80" />
            </a>

            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl px-4 py-2.5 shadow-md hover:scale-105 transition-all duration-200"
            >
              <FaShieldAlt className="w-3.5 h-3.5 text-teal-400" />
              <span>Robots.txt</span>
            </a>
          </div>
        </div>

        {/* Dual Domain Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className={`p-5 rounded-2xl border transition-all ${activeDomain === "IN" || activeDomain === "BOTH" ? "bg-white border-blue-200 shadow-sm" : "bg-slate-100/60 border-slate-200 opacity-60"}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🇮🇳</span>
                <h3 className="font-bold text-slate-900">inextets.in</h3>
                <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md">India Edition</span>
              </div>
              <a href="https://inextets.in/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold">
                sitemap.xml <FaExternalLinkAlt className="w-2.5 h-2.5" />
              </a>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Targeting regional Indian audience, Indian enterprises, and local search queries (hreflang: <code className="text-blue-600 bg-blue-50 px-1 rounded">en-IN</code>).
            </p>
          </div>

          <div className={`p-5 rounded-2xl border transition-all ${activeDomain === "COM" || activeDomain === "BOTH" ? "bg-white border-orange-200 shadow-sm" : "bg-slate-100/60 border-slate-200 opacity-60"}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌐</span>
                <h3 className="font-bold text-slate-900">inextets.com</h3>
                <span className="text-[10px] font-bold uppercase bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md">Global Edition</span>
              </div>
              <a href="https://inextets.com/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-xs text-orange-600 hover:underline flex items-center gap-1 font-semibold">
                sitemap.xml <FaExternalLinkAlt className="w-2.5 h-2.5" />
              </a>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Targeting international clients, cross-border technology consulting, and global search engines (hreflang: <code className="text-orange-600 bg-orange-50 px-1 rounded">en-US</code>).
            </p>
          </div>
        </div>

        {/* Search & Category Filter Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Live Search Input */}
            <div className="relative w-full md:w-96">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search pages, routes, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-0.5 rounded-md font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Stats on filter */}
            <div className="text-xs font-semibold text-slate-500 self-end md:self-center">
              Showing{" "}
              <span className="text-slate-900 font-bold">
                {filteredData.reduce((acc, g) => acc + g.links.length, 0)}
              </span>{" "}
              matching sections
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-4 border-t border-slate-100 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Listing Sections */}
        {filteredData.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              🔍
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No matching pages found</h3>
            <p className="text-sm text-slate-500 mb-6">
              We could not find any pages matching &ldquo;{searchQuery}&rdquo;. Try another keyword or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {filteredData.map((section, idx) => {
              const SectionIcon = section.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                >
                  {/* Category Section Header */}
                  <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-b border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${section.badgeColor} flex items-center justify-center text-white text-xl shadow-lg flex-shrink-0`}
                      >
                        <SectionIcon />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-black tracking-tight">{section.category}</h2>
                          <span className="bg-white/15 text-white/90 text-xs font-bold px-2.5 py-0.5 rounded-full">
                            {section.links.length}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{section.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Links Grid */}
                  <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.links.map((linkItem, lIdx) => {
                      const inFullUrl = `https://inextets.in${linkItem.path}`;
                      const comFullUrl = `https://inextets.com${linkItem.path}`;

                      return (
                        <div
                          key={lIdx}
                          className="group flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-100 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5 transition-all duration-300 relative"
                        >
                          <div>
                            {/* Card Header: Title & Badges */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <Link
                                href={linkItem.path}
                                className="text-base font-bold text-slate-900 group-hover:text-orange-500 transition-colors flex items-center gap-1.5"
                              >
                                <span>{linkItem.title}</span>
                                <FaArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-orange-500" />
                              </Link>
                              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 flex-shrink-0">
                                {linkItem.type}
                              </span>
                            </div>

                            {/* Dual Domain URL Badges */}
                            <div className="space-y-1 mb-3">
                              {(activeDomain === "IN" || activeDomain === "BOTH") && (
                                <div className="flex items-center justify-between gap-1 bg-blue-50/80 hover:bg-blue-100/70 border border-blue-100/80 px-2.5 py-1 rounded-md transition-colors text-[11px] font-mono">
                                  <span className="text-blue-700 truncate font-semibold">
                                    🇮🇳 inextets.in{linkItem.path}
                                  </span>
                                  <button
                                    onClick={() => handleCopy(inFullUrl)}
                                    title="Copy .in URL"
                                    className="text-blue-500 hover:text-blue-800 p-0.5"
                                  >
                                    {copiedUrl === inFullUrl ? <FaCheck className="text-green-600 w-2.5 h-2.5" /> : <FaCopy className="w-2.5 h-2.5" />}
                                  </button>
                                </div>
                              )}

                              {(activeDomain === "COM" || activeDomain === "BOTH") && (
                                <div className="flex items-center justify-between gap-1 bg-orange-50/80 hover:bg-orange-100/70 border border-orange-100/80 px-2.5 py-1 rounded-md transition-colors text-[11px] font-mono">
                                  <span className="text-orange-700 truncate font-semibold">
                                    🌐 inextets.com{linkItem.path}
                                  </span>
                                  <button
                                    onClick={() => handleCopy(comFullUrl)}
                                    title="Copy .com URL"
                                    className="text-orange-500 hover:text-orange-800 p-0.5"
                                  >
                                    {copiedUrl === comFullUrl ? <FaCheck className="text-green-600 w-2.5 h-2.5" /> : <FaCopy className="w-2.5 h-2.5" />}
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Description */}
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                              {linkItem.description}
                            </p>
                          </div>

                          {/* Card Metadata Footer */}
                          <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                            <span>Priority: <strong className="text-slate-600">{linkItem.priority}</strong></span>
                            <span>Freq: <strong className="text-slate-600">{linkItem.changeFreq}</strong></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Help / SEO Notice Banner */}
        <div className="mt-16 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10">
            <FaSitemap className="w-80 h-80 text-white" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block bg-blue-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                🇮🇳 inextets.in
              </span>
              <span className="inline-block bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
                🌐 inextets.com
              </span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black mb-3">
              Dual-Domain Search Engine XML Feeds
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Our Next.js sitemap engine generates cross-domain canonical and alternate hreflang entries for both <strong>inextets.in</strong> and <strong>inextets.com</strong>, allowing instant validation in Google Search Console for both regional and international properties.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider hover:scale-105"
              >
                <span>Open XML Sitemap</span>
                <FaExternalLinkAlt className="w-3 h-3" />
              </a>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 font-bold px-6 py-3 rounded-xl transition-all text-xs uppercase tracking-wider hover:scale-105"
              >
                <span>Open Robots.txt</span>
                <FaExternalLinkAlt className="w-3 h-3" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3 rounded-xl transition-all text-xs uppercase tracking-wider hover:scale-105"
              >
                <span>Contact Engineering Team</span>
                <FaArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
