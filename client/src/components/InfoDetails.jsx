import React from "react";
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
    { icon: FaUsers, title: "Experienced Team", desc: "Skilled professionals with years of expertise" },
    { icon: FaLightbulb, title: "Innovative Solutions", desc: "Creative approaches to solve problems" },
    { icon: FaHeart, title: "Customer-Centric", desc: "Your success is our priority" },
    { icon: FaDollarSign, title: "Affordable Pricing", desc: "Quality services at competitive rates" },
    { icon: FaClock, title: "Timely Delivery", desc: "We respect deadlines" }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="w-11/12 mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="px-5 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
              About Our Company
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            I Next Ets: Best Digital Marketing Agency in Bhopal
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            With the digital world changing quickly, businesses of all sizes need a strong online presence. Whether you're a startup, a small or medium enterprise, or a large company, going digital is crucial to succeed in the market. If you're looking for the best digital marketing, web development, or app development services in Bhopal, you've come to the right place with I Next Ets.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
            Why Choose I Next Ets?
          </h2>
          <p className="text-base text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            I Next Ets is a well-known digital marketing agency in Bhopal. We provide great digital solutions to businesses of all kinds.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 text-center group hover:scale-105"
                >
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors duration-300">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Main Services
          </h2>
          
          <div className="space-y-8">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              const bgColor = service.color === "blue" ? "bg-blue-600" : "bg-orange-500";
              const borderColor = service.color === "blue" ? "border-blue-200" : "border-orange-200";
              const textColor = service.color === "blue" ? "text-blue-600" : "text-orange-500";
              
              return (
                <div 
                  key={service.id}
                  className={`bg-white rounded-2xl border-2 ${borderColor} p-6 md:p-8 hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <ServiceIcon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className={`text-xl md:text-2xl font-bold ${textColor}`}>
                      {index + 1}. {service.title}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {service.items.map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div 
                          key={idx}
                          className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                        >
                          {ItemIcon ? (
                            <div className={`w-8 h-8 ${bgColor} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <ItemIcon className="w-4 h-4 text-white" />
                            </div>
                          ) : (
                            <FaCheckCircle className={`w-5 h-5 ${textColor} flex-shrink-0 mt-1`} />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 text-sm mb-1">{item.name}</h4>
                            <p className="text-xs text-gray-600">{item.desc}</p>
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

        {/* Final CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-base md:text-lg mb-6 max-w-3xl mx-auto opacity-90">
            When you are looking for a digital marketing agency, web development company, app development company, or e-commerce development company in Bhopal, I Next Ets is your one-stop solution.
          </p>
          <button className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default INEXTETS;
