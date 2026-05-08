import React from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { FaQuoteRight, FaCheck, FaCode, FaMobile, FaShoppingCart, FaRocket, FaPalette, FaBolt, FaShieldAlt, FaSearch } from "react-icons/fa";
import { MdSpeed, MdDevices } from "react-icons/md";
// import Feedback from "@/components/Feedback";
// import Help from "@/components/Help";
import Link from "next/link";
import PlanCard from "@/components/PlanCard";

const WebDevelopment = () => {
  const pricingPlans = [
    {
      id: 1,
      name: "Basic Website",
      price: "₹30,000",
      period: "/project",
      description: "Perfect for small businesses and startups",
      features: [
        "5-7 Page Website",
        "Responsive Design",
        "Basic SEO Setup",
        "Contact Form Integration",
        "Social Media Integration",
        "1 Month Free Support",
        "Mobile Optimized"
      ],
      popular: false
    },
    {
      id: 2,
      name: "Business Website",
      price: "₹60,000",
      period: "/project",
      description: "Ideal for growing businesses seeking professional presence",
      features: [
        "10-15 Page Website",
        "Custom Design & Development",
        "Advanced SEO Optimization",
        "CMS Integration",
        "Blog Setup",
        "Payment Gateway Integration",
        "Analytics Setup",
        "3 Months Free Support",
        "Speed Optimization"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Enterprise Website",
      price: "₹1,50,000",
      period: "/project",
      description: "Complete solution for large-scale web applications",
      features: [
        "Unlimited Pages",
        "Premium Custom Design",
        "Advanced Functionality",
        "E-commerce Integration",
        "Multi-language Support",
        "Advanced Security Features",
        "API Integration",
        "Performance Optimization",
        "6 Months Free Support",
        "Dedicated Project Manager",
        "Priority Support"
      ],
      popular: false
    }
  ];

  const techStack = [
    { icon: FaCode, name: "React/Next.js", color: "text-blue-600" },
    { icon: FaMobile, name: "Responsive", color: "text-green-600" },
    { icon: FaShoppingCart, name: "E-commerce", color: "text-purple-600" },
    { icon: FaBolt, name: "Fast Loading", color: "text-yellow-600" }
  ];

  const whyChooseUs = [
    {
      icon: FaPalette,
      title: "Custom Design",
      description: "Unique, brand-focused designs tailored to your business needs"
    },
    {
      icon: MdSpeed,
      title: "Lightning Fast",
      description: "Optimized for speed and performance to enhance user experience"
    },
    {
      icon: MdDevices,
      title: "Fully Responsive",
      description: "Perfect viewing experience across all devices and screen sizes"
    },
    {
      icon: FaShieldAlt,
      title: "Secure & Reliable",
      description: "Built with security best practices and reliable infrastructure"
    }
  ];

  const benefits = [
    {
      icon: FaSearch,
      title: "SEO Optimized",
      description: "Built with SEO best practices to help you rank higher in search results"
    },
    {
      icon: FaRocket,
      title: "Scalable Solutions",
      description: "Architecture that grows with your business needs"
    },
    {
      icon: FaBolt,
      title: "Modern Technology",
      description: "Latest frameworks and technologies for cutting-edge websites"
    }
  ];

  const webDevChallenges = [
    {
      id: 1,
      title: "Outdated website design that doesn't reflect your brand identity."
    },
    {
      id: 2,
      title: "Poor mobile responsiveness affecting user experience."
    },
    {
      id: 3,
      title: "Slow loading speeds leading to high bounce rates."
    },
    {
      id: 4,
      title: "Lack of SEO optimization resulting in poor search rankings."
    },
    {
      id: 5,
      title: "Difficulty in updating and managing website content."
    },
    {
      id: 6,
      title: "Security vulnerabilities putting your business at risk."
    },
    {
      id: 7,
      title: "Website not converting visitors into customers."
    },
    {
      id: 8,
      title: "Lack of integration with essential business tools."
    }
  ];

  const serviceTypes = [
    {
      icon: FaCode,
      title: "Custom Web Development",
      description: "Tailored solutions built from scratch to meet your unique requirements"
    },
    {
      icon: FaShoppingCart,
      title: "E-commerce Development",
      description: "Powerful online stores with seamless shopping experiences"
    },
    {
      icon: FaMobile,
      title: "Progressive Web Apps",
      description: "App-like experiences that work across all platforms"
    }
  ];

  return (
    <>
      <div className="mt-[111px] w-11/12 mx-auto mb-20">
        {/* Breadcrumb */}
        <br />
        <br />
        <div className="flex gap-3 mb-3">
          <p className="border-r-2 pr-3 text-gray-300 text-xl">Home</p>
          <p className="text-xl">Website Development</p>
        </div>

        {/* Hero Section - Modern Layout */}
        <div className="relative bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-3xl p-8 lg:p-16 mb-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            <div className="first order-2 lg:order-1">
              <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                💻 Professional Web Solutions
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
                Build Stunning Websites That 
                <span className="text-orange-500"> Drive Results</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8">
                Transform your online presence with custom web development solutions. From responsive websites to powerful web applications, we deliver comprehensive solutions that enhance user experience and drive business growth.
              </p>

              {/* Tech Stack Icons */}
              <div className="flex gap-4 mb-8">
                {techStack.map((tech, index) => (
                  <div key={index} className="group" title={tech.name}>
                    <tech.icon className={`text-3xl ${tech.color} hover:scale-125 transition-transform duration-300 cursor-pointer`} />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">Custom Design</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">SEO Optimized</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">Fast & Secure</span>
                </div>
              </div>
              
              <Link href="/contact">
                <button className="flex items-center gap-2 font-bold text-xl bg-orange-500 px-8 py-4 rounded-full hover:bg-orange-600 hover:shadow-2xl transition-all duration-300 text-white group">
                  Start Your Project <IoIosArrowDropright className="text-2xl group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="second order-1 lg:order-2 flex justify-center">
              <img
                src="/herosection/web.jpg"
                alt="Website Development"
                className="w-full  h-auto drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Our Web Development Services?
            </h2>
            <p className="text-xl text-gray-600">
              Building websites that deliver exceptional user experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-orange-500">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <item.icon className="text-3xl text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Types */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Web Development Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive solutions for all your web needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {serviceTypes.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border-2 border-gray-100 hover:border-orange-200">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <item.icon className="text-4xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted Companies */}
        <div className="mb-20">
          <p className="text-center text-gray-600 text-lg mb-8 font-semibold">Trusted by Leading Brands</p>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 items-center">
            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <img src="/1.png" alt="Client Logo" className="w-full h-auto" />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <img src="/2.png" alt="Client Logo" className="w-full h-auto" />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <img src="/3.png" alt="Client Logo" className="w-full h-auto" />
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What Makes Our Websites Stand Out
            </h2>
            <p className="text-xl text-gray-600">
              Built with modern technology and best practices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <item.icon className="text-4xl text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Common Website Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600">
              Transform your website from a liability to an asset
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="first">
                <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-gray-800">
                  Businesses approach us when facing:
                </h3>
                <div className="grid gap-6">
                  {webDevChallenges.map((currElem) => (
                    <div
                      key={currElem.id}
                      className="group bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500 hover:border-blue-600"
                    >
                      <div className="flex gap-4 items-start">
                        <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-500 transition-colors duration-300">
                          <FaQuoteRight className="text-lg text-blue-500 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-blue-500 mb-2 block">Challenge #{currElem.id}</span>
                          <span className="text-lg leading-relaxed text-gray-800 font-medium">
                            {currElem.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="second flex justify-center">
                <img
                  src="/herosection/web.jpg"
                  alt="Web Development Solutions"
                  className="w-full  h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-xl text-gray-700 mb-6">
                <span className="font-bold text-orange-500">Ready to transform your online presence?</span> Let our experts build a website that drives results.
              </p>
              <Link href="/contact">
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  Get Free Website Consultation
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Pricing Plans Section */}
        <div className="mb-20 bg-gradient-to-b from-gray-50 to-white py-16 -mx-[8.333333%] px-[8.333333%] rounded-3xl">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              💰 Transparent Pricing
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Choose Your Website Package
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible packages designed for businesses of all sizes
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 ${
                  plan.popular ? 'border-4 border-orange-500 transform lg:scale-105 lg:-mt-4' : 'border-2 border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-2 rounded-full text-sm font-bold shadow-xl">
                      ⭐ MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-3 text-gray-800">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-6 min-h-[40px] leading-relaxed">{plan.description}</p>
                  <div className="flex items-end justify-center gap-2 mb-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">{plan.price}</span>
                    <span className="text-gray-600 mb-2 text-lg">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-500">One-time project cost</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-0.5">
                        <FaCheck className="text-green-600 text-sm" />
                      </div>
                      <span className="text-gray-700 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/contact">
                  <button
                    className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-2xl hover:scale-105'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-lg'
                    }`}
                  >
                    {plan.popular ? 'Get Started Now' : 'Choose Package'}
                  </button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-700 text-lg mb-4">
              Need a custom website solution tailored to your needs?
            </p>
            <Link href="/contact" className="text-orange-500 font-bold text-xl hover:underline inline-flex items-center gap-2">
              Contact Our Development Team <IoIosArrowDropright className="text-2xl" />
            </Link>
          </div>
        </div>

        {/* Feedback Section */}
        {/* <div className="mb-16">
          <Feedback />
        </div> */}
      </div>

      {/* Help Section */}
      {/* <Help /> */}
    </>
  );
};

export default WebDevelopment;
