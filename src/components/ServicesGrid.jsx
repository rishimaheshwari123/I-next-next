"use client";

import Link from "next/link";
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
    title: "Social Media Marketing",
    path: "/socialmarket",
    description: "Grow your brand presence on social platforms",
    icon: FaFacebook,
    gradient: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    id: 2,
    title: "Digital Marketing",
    path: "/inboudmarket",
    description: "Complete digital marketing solutions",
    icon: FaBullhorn,
    gradient: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600"
  },
  {
    id: 3,
    title: "Lead Generation",
    path: "/paiadvertising",
    description: "Generate quality leads for your business",
    icon: FaUserPlus,
    gradient: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    id: 4,
    title: "Business Growth Package",
    path: "/contentmarketing",
    description: "Comprehensive growth strategies",
    icon: FaChartLine,
    gradient: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    iconColor: "text-green-600"
  },
  {
    id: 5,
    title: "Website Development",
    path: "/webDevelopment",
    description: "Custom website solutions",
    icon: FaLaptopCode,
    gradient: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600"
  },
  {
    id: 6,
    title: "Mobile App Development",
    path: "/mobile",
    description: "iOS & Android app development",
    icon: FaMobileAlt,
    gradient: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600"
  },
  {
    id: 7,
    title: "AI (Artificial Intelligence)",
    path: "/ai-services",
    description: "AI-powered solutions for your business",
    icon: FaRobot,
    gradient: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600"
  },
  {
    id: 8,
    title: "Cyber Security",
    path: "/cyber-security",
    description: "Protect your digital assets",
    icon: FaShieldAlt,
    gradient: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    iconColor: "text-red-600"
  }
];

const ServicesGrid = () => {
  return (
    <div className="py-10 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
              What We Offer
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions to grow your business and achieve your goals
          </p>
        </div>

        {/* Services Grid - 4 per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={service.id}
                href={service.path}
                className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative flex flex-col items-start gap-4">
                  {/* Icon with Background */}
                  <div className={`${service.bgColor} w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <IconComponent className={`w-8 h-8 ${service.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-gray-900 text-xl leading-tight min-h-[56px]">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="flex items-center gap-2 text-blue-600 group-hover:text-orange-500 transition-colors duration-200 font-semibold text-sm mt-2">
                    <span>Learn More</span>
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>

                {/* Decorative Element */}
                <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity duration-300`}></div>
              </Link>
            );
          })}
        </div>

        
      </div>
    </div>
  );
};

export default ServicesGrid;
