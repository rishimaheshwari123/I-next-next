"use client";

import { useState, useEffect } from "react";
import { 
  FaLaptopCode, 
  FaMobileAlt, 
  FaRobot,
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaAngular,
  FaVuejs,
  FaSwift,
  FaAndroid,
  FaApple,
  FaBrain,
  FaChartLine,
  FaDatabase,
  FaShieldAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaGoogle,
  FaSearch,
  FaEnvelope,
  FaFileAlt,
  FaBullhorn,
  FaClipboardList,
  FaChartBar,
  FaFlask,
  FaCalculator,
  FaUsers,
  FaCog,
  FaLock,
  FaBug,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaNetworkWired,
  FaCertificate
} from "react-icons/fa";
import { 
  SiTensorflow, 
  SiPytorch, 
  SiFlutter, 
  SiReact,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiFirebase
} from "react-icons/si";

const servicesTech = {
  1: {
    title: "Social Media Marketing",
    subtitle: "Platforms & Tools We Use",
    description: "Grow your brand presence across all major social media platforms",
    technologies: [
      { name: "Facebook Ads", icon: FaFacebook, color: "text-blue-600" },
      { name: "Instagram", icon: FaInstagram, color: "text-pink-600" },
      { name: "LinkedIn", icon: FaLinkedin, color: "text-blue-700" },
      { name: "Twitter/X", icon: FaTwitter, color: "text-blue-400" },
      { name: "YouTube", icon: FaYoutube, color: "text-red-600" },
      { name: "TikTok", icon: FaMobileAlt, color: "text-gray-900" },
      { name: "Pinterest", icon: FaChartLine, color: "text-red-500" },
      { name: "Analytics", icon: FaChartLine, color: "text-green-600" }
    ]
  },
  2: {
    title: "Digital Marketing",
    subtitle: "Tools & Technologies",
    description: "Complete digital marketing solutions with industry-leading tools",
    technologies: [
      { name: "Google Ads", icon: FaGoogle, color: "text-blue-600" },
      { name: "SEO Tools", icon: FaSearch, color: "text-orange-600" },
      { name: "Analytics", icon: FaChartLine, color: "text-green-600" },
      { name: "Email Marketing", icon: FaEnvelope, color: "text-blue-500" },
      { name: "Content Marketing", icon: FaFileAlt, color: "text-purple-600" },
      { name: "Social Media", icon: FaFacebook, color: "text-blue-600" },
      { name: "PPC Campaigns", icon: FaBullhorn, color: "text-orange-500" },
      { name: "Marketing Automation", icon: FaRobot, color: "text-indigo-600" }
    ]
  },
  3: {
    title: "Lead Generation",
    subtitle: "Lead Generation Tools",
    description: "Generate quality leads with proven strategies and tools",
    technologies: [
      { name: "Landing Pages", icon: FaLaptopCode, color: "text-blue-600" },
      { name: "Forms & Surveys", icon: FaClipboardList, color: "text-green-600" },
      { name: "Email Campaigns", icon: FaEnvelope, color: "text-blue-500" },
      { name: "CRM Integration", icon: FaDatabase, color: "text-purple-600" },
      { name: "Lead Scoring", icon: FaChartLine, color: "text-orange-600" },
      { name: "A/B Testing", icon: FaFlask, color: "text-pink-600" },
      { name: "Analytics", icon: FaChartBar, color: "text-green-500" },
      { name: "Automation", icon: FaRobot, color: "text-indigo-600" }
    ]
  },
  4: {
    title: "Business Growth Package",
    subtitle: "Growth Tools & Strategies",
    description: "Comprehensive growth strategies to scale your business",
    technologies: [
      { name: "Business Analytics", icon: FaChartLine, color: "text-blue-600" },
      { name: "Market Research", icon: FaSearch, color: "text-purple-600" },
      { name: "Strategy Planning", icon: FaClipboardList, color: "text-green-600" },
      { name: "Performance Tracking", icon: FaChartBar, color: "text-orange-600" },
      { name: "ROI Analysis", icon: FaCalculator, color: "text-blue-500" },
      { name: "Consulting", icon: FaUsers, color: "text-indigo-600" },
      { name: "Optimization", icon: FaCog, color: "text-gray-700" },
      { name: "Reporting", icon: FaFileAlt, color: "text-red-600" }
    ]
  },
  5: {
    title: "Website Development",
    subtitle: "Technologies We Use",
    description: "Building modern, responsive websites with cutting-edge technologies",
    technologies: [
      { name: "React.js", icon: FaReact, color: "text-blue-500" },
      { name: "Next.js", icon: SiNextdotjs, color: "text-gray-900" },
      { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
      { name: "Angular", icon: FaAngular, color: "text-red-600" },
      { name: "Vue.js", icon: FaVuejs, color: "text-green-500" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" },
      { name: "Firebase", icon: SiFirebase, color: "text-orange-500" }
    ]
  },
  6: {
    title: "Mobile App Development",
    subtitle: "Technologies We Use",
    description: "Creating powerful mobile applications for iOS and Android platforms",
    technologies: [
      { name: "React Native", icon: SiReact, color: "text-blue-500" },
      { name: "Flutter", icon: SiFlutter, color: "text-blue-400" },
      { name: "Swift", icon: FaSwift, color: "text-orange-600" },
      { name: "Android", icon: FaAndroid, color: "text-green-600" },
      { name: "iOS", icon: FaApple, color: "text-gray-800" },
      { name: "Firebase", icon: SiFirebase, color: "text-orange-500" },
      { name: "Node.js", icon: FaNodeJs, color: "text-green-600" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-600" }
    ]
  },
  7: {
    title: "AI (Artificial Intelligence)",
    subtitle: "Technologies We Use",
    description: "Leveraging AI and machine learning to build intelligent solutions",
    technologies: [
      { name: "Python", icon: FaPython, color: "text-blue-600" },
      { name: "TensorFlow", icon: SiTensorflow, color: "text-orange-600" },
      { name: "PyTorch", icon: SiPytorch, color: "text-red-600" },
      { name: "Machine Learning", icon: FaBrain, color: "text-purple-600" },
      { name: "Data Science", icon: FaChartLine, color: "text-blue-500" },
      { name: "Neural Networks", icon: FaRobot, color: "text-indigo-600" },
      { name: "Big Data", icon: FaDatabase, color: "text-yellow-600" },
      { name: "Java", icon: FaJava, color: "text-red-700" }
    ]
  },
  8: {
    title: "Cyber Security",
    subtitle: "Security Tools & Technologies",
    description: "Protect your digital assets with enterprise-grade security solutions",
    technologies: [
      { name: "Firewall Protection", icon: FaShieldAlt, color: "text-red-600" },
      { name: "Encryption", icon: FaLock, color: "text-blue-600" },
      { name: "Penetration Testing", icon: FaBug, color: "text-orange-600" },
      { name: "Security Audits", icon: FaClipboardCheck, color: "text-green-600" },
      { name: "Threat Detection", icon: FaExclamationTriangle, color: "text-yellow-600" },
      { name: "Data Protection", icon: FaDatabase, color: "text-purple-600" },
      { name: "Network Security", icon: FaNetworkWired, color: "text-indigo-600" },
      { name: "Compliance", icon: FaCertificate, color: "text-blue-500" }
    ]
  }
};

const TechnologyNew = ({ currentServiceId = 5 }) => {
  const [activeService, setActiveService] = useState(currentServiceId);
  const currentTech = servicesTech[activeService];

  useEffect(() => {
    setActiveService(currentServiceId);
  }, [currentServiceId]);

  if (!currentTech) return null;

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">
              {currentTech.subtitle}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {currentTech.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {currentTech.description}
          </p>
        </div>

        {/* Service Selector */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          <button
            onClick={() => setActiveService(1)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 text-sm ${
              activeService === 1
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <FaFacebook className="w-4 h-4" />
            <span className="hidden md:inline">Social Media</span>
          </button>

          <button
            onClick={() => setActiveService(2)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 text-sm ${
              activeService === 2
                ? "bg-orange-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <FaBullhorn className="w-4 h-4" />
            <span className="hidden md:inline">Digital Marketing</span>
          </button>

          <button
            onClick={() => setActiveService(3)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 text-sm ${
              activeService === 3
                ? "bg-purple-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <FaUsers className="w-4 h-4" />
            <span className="hidden md:inline">Lead Generation</span>
          </button>

          <button
            onClick={() => setActiveService(4)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 text-sm ${
              activeService === 4
                ? "bg-green-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <FaChartLine className="w-4 h-4" />
            <span className="hidden md:inline">Business Growth</span>
          </button>

          <button
            onClick={() => setActiveService(5)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 text-sm ${
              activeService === 5
                ? "bg-indigo-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <FaLaptopCode className="w-4 h-4" />
            <span className="hidden md:inline">Website Dev</span>
          </button>

          <button
            onClick={() => setActiveService(6)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 text-sm ${
              activeService === 6
                ? "bg-pink-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <FaMobileAlt className="w-4 h-4" />
            <span className="hidden md:inline">Mobile App</span>
          </button>

          <button
            onClick={() => setActiveService(7)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 text-sm ${
              activeService === 7
                ? "bg-cyan-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <FaRobot className="w-4 h-4" />
            <span className="hidden md:inline">AI Solutions</span>
          </button>

          <button
            onClick={() => setActiveService(8)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 text-sm ${
              activeService === 8
                ? "bg-red-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <FaShieldAlt className="w-4 h-4" />
            <span className="hidden md:inline">Cyber Security</span>
          </button>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {currentTech.technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className={`${tech.color} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-16 h-16" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {tech.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
       
      </div>
    </div>
  );
};

export default TechnologyNew;
