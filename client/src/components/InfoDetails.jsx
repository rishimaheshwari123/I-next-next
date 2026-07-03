import React from "react";
import Link from "next/link";
import {
  FaSearch,
  FaShareAlt,
  FaBullhorn,
  FaEnvelope,
  FaShieldAlt,
  FaLaptopCode,
  FaMobileAlt,
  FaShoppingCart,
  FaCheckCircle,
  FaUsers,
  FaLightbulb,
  FaHeart,
  FaDollarSign,
  FaClock
} from "react-icons/fa";

const INEXTETS = () => {
  const services = [
    {
      id: 1,
      title: "Digital Marketing Services",
      icon: FaBullhorn,
      color: "blue",
      items: [
        { name: "SEO", desc: "Helps your website rank higher in search results", icon: FaSearch },
        { name: "SMM", desc: "Social media marketing to engage your audience", icon: FaShareAlt },
        { name: "PPC", desc: "Pay-per-click ads to generate leads and traffic", icon: FaBullhorn },
        { name: "Content Marketing", desc: "Creating quality content to attract customers", icon: FaLightbulb },
        { name: "Email Marketing", desc: "Targeted email campaigns to boost sales", icon: FaEnvelope },
        { name: "ORM", desc: "Online reputation management", icon: FaShieldAlt }
      ]
    },
    {
      id: 2,
      title: "Web Development Company",
      icon: FaLaptopCode,
      color: "orange",
      items: [
        { name: "Custom Website Development", desc: "Tailored solutions for your business" },
        { name: "Responsive Web Design", desc: "Mobile-friendly designs" },
        { name: "CMS Development", desc: "WordPress, Joomla, Drupal" }
      ]
    },
    {
      id: 3,
      title: "App Development Company",
      icon: FaMobileAlt,
      color: "blue",
      items: [
        { name: "Native App Development", desc: "iOS & Android apps" },
        { name: "Hybrid App Development", desc: "Cross-platform solutions" },
        { name: "UI/UX Design", desc: "Beautiful user experiences" },
        { name: "App Testing & Deployment", desc: "Quality assurance" }
      ]
    },
    {
      id: 4,
      title: "E-Commerce Development",
      icon: FaShoppingCart,
      color: "orange",
      items: [
        { name: "Custom E-Commerce Development", desc: "Build your online store" },
        { name: "Platform Development", desc: "Magento, Shopify & WooCommerce" },
        { name: "Payment Gateway Integration", desc: "Secure transactions" }
      ]
    }
  ];

  const whyChooseUs = [
    { icon: FaUsers, title: "Experienced Team", desc: "Skilled professionals with years of expertise", gradient: "from-blue-500 to-indigo-600" },
    { icon: FaLightbulb, title: "Innovative Solutions", desc: "Creative approaches to solve problems", gradient: "from-orange-500 to-amber-500" },
    { icon: FaHeart, title: "Customer-Centric", desc: "Your success is our priority", gradient: "from-rose-500 to-pink-500" },
    { icon: FaDollarSign, title: "Affordable Pricing", desc: "Quality services at competitive rates", gradient: "from-emerald-400 to-teal-500" },
    { icon: FaClock, title: "Timely Delivery", desc: "We respect deadlines", gradient: "from-cyan-500 to-blue-600" }
  ];

  return (
    <div className=" bg-transparent">
      <div className="w-full">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-5 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-bold uppercase tracking-wide">
              About Our Company
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            I Next Ets: Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500">Digital Marketing Agency</span> in Bhopal
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed border-l-4 border-blue-600/30 pl-4 md:pl-6 text-left md:text-center italic">
            With the digital world changing quickly, businesses of all sizes need a strong online presence. Whether you're a startup, a small or medium enterprise, or a large company, going digital is crucial to succeed in the market. If you're looking for the best digital marketing, web development, or app development services in Bhopal, you've come to the right place with I Next Ets.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Why Choose I Next Ets?
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            I Next Ets is a well-known digital marketing agency in Bhopal. We provide great digital solutions to businesses of all kinds.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-gray-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_25px_50px_rgba(59,130,246,0.06)] hover:-translate-y-1.5 transition-all duration-300 text-center group"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 shadow-md`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm group-hover:text-blue-600 transition-colors duration-300">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Our Main Services
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Leverage our cross-functional capabilities to scale your digital presence and operational efficiency.
          </p>

          <div className="space-y-10">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              const accentColor = service.color === "blue" ? "from-blue-500 to-indigo-600 shadow-blue-500/20" : "from-orange-500 to-amber-500 shadow-orange-500/20";
              const borderColor = service.color === "blue" ? "hover:border-blue-500/20" : "hover:border-orange-500/20";
              const textColor = service.color === "blue" ? "text-blue-600" : "text-orange-500";

              return (
                <div
                  key={service.id}
                  className={`bg-white rounded-3xl border border-gray-100 ${borderColor} p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${accentColor} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <ServiceIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      <span className={`${textColor} mr-2`}>{index + 1}.</span>
                      {service.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {service.items.map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-5 bg-slate-50/50 rounded-2xl hover:bg-slate-50 hover:shadow-sm border border-transparent hover:border-gray-100/50 transition-all duration-300"
                        >
                          {ItemIcon ? (
                            <div className={`w-9 h-9 bg-gradient-to-br ${accentColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                              <ItemIcon className="w-4.5 h-4.5 text-white" />
                            </div>
                          ) : (
                            <FaCheckCircle className={`w-6 h-6 ${textColor} flex-shrink-0 mt-0.5`} />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 text-sm mb-1">{item.name}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">{item.desc || `High-performance client solutions customized to match project milestones.`}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>


      </div>
    </div>
  );
};

export default INEXTETS;
