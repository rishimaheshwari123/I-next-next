import React from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { FaQuoteRight, FaCheck, FaShieldAlt, FaLock, FaUserSecret, FaServer, FaBug, FaEye, FaNetworkWired, FaKey } from "react-icons/fa";
import { MdSecurity, MdVerifiedUser } from "react-icons/md";
// import Feedback from "@/components/Feedback";
// import Help from "@/components/Help";
import Link from "next/link";

const CyberSecurity = () => {
  const pricingPlans = [
    {
      id: 1,
      name: "Basic Security",
      price: "₹40,000",
      period: "/month",
      description: "Essential security for small businesses",
      features: [
        "Security Assessment",
        "Vulnerability Scanning",
        "Basic Firewall Setup",
        "Antivirus Protection",
        "Security Awareness Training",
        "Monthly Security Reports",
        "Email Support"
      ],
      popular: false
    },
    {
      id: 2,
      name: "Advanced Security",
      price: "₹80,000",
      period: "/month",
      description: "Comprehensive protection for growing businesses",
      features: [
        "Advanced Threat Detection",
        "24/7 Security Monitoring",
        "Penetration Testing",
        "Data Encryption",
        "Incident Response Plan",
        "Security Compliance Audit",
        "Multi-factor Authentication",
        "Bi-weekly Security Updates",
        "Priority Support"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Enterprise Security",
      price: "₹2,00,000",
      period: "/month",
      description: "Complete security solution for enterprises",
      features: [
        "Full Security Infrastructure",
        "Advanced Threat Intelligence",
        "SOC (Security Operations Center)",
        "Zero Trust Architecture",
        "DDoS Protection",
        "Security Information & Event Management",
        "Compliance Management",
        "Disaster Recovery Planning",
        "Weekly Security Briefings",
        "Dedicated Security Team",
        "24/7 Priority Support"
      ],
      popular: false
    }
  ];

  const securityServices = [
    { icon: FaShieldAlt, name: "Threat Protection", color: "text-red-600" },
    { icon: FaLock, name: "Data Encryption", color: "text-blue-600" },
    { icon: FaUserSecret, name: "Privacy", color: "text-purple-600" },
    { icon: FaNetworkWired, name: "Network Security", color: "text-green-600" }
  ];

  const whyChooseUs = [
    {
      icon: MdSecurity,
      title: "Proactive Protection",
      description: "Stay ahead of threats with continuous monitoring and threat intelligence"
    },
    {
      icon: MdVerifiedUser,
      title: "Certified Experts",
      description: "Team of certified security professionals with industry expertise"
    },
    {
      icon: FaEye,
      title: "24/7 Monitoring",
      description: "Round-the-clock surveillance to detect and respond to threats instantly"
    },
    {
      icon: FaServer,
      title: "Compliance Ready",
      description: "Meet industry standards and regulatory compliance requirements"
    }
  ];

  const benefits = [
    {
      icon: FaBug,
      title: "Vulnerability Management",
      description: "Identify and fix security weaknesses before they can be exploited"
    },
    {
      icon: FaKey,
      title: "Access Control",
      description: "Implement robust authentication and authorization systems"
    },
    {
      icon: FaShieldAlt,
      title: "Incident Response",
      description: "Rapid response to security incidents to minimize damage"
    }
  ];

  const securityChallenges = [
    {
      id: 1,
      title: "Increasing cyber threats and sophisticated attack methods."
    },
    {
      id: 2,
      title: "Lack of in-house security expertise and resources."
    },
    {
      id: 3,
      title: "Difficulty in maintaining compliance with security regulations."
    },
    {
      id: 4,
      title: "Vulnerable systems and outdated security infrastructure."
    },
    {
      id: 5,
      title: "Data breaches resulting in financial and reputational damage."
    },
    {
      id: 6,
      title: "Challenges in securing remote work environments."
    },
    {
      id: 7,
      title: "Insufficient security awareness among employees."
    },
    {
      id: 8,
      title: "Complex IT infrastructure making security management difficult."
    }
  ];

  const securitySolutions = [
    {
      icon: FaShieldAlt,
      title: "Threat Detection & Response",
      description: "Advanced systems to identify and neutralize threats in real-time"
    },
    {
      icon: FaLock,
      title: "Data Protection",
      description: "Comprehensive encryption and data loss prevention solutions"
    },
    {
      icon: FaNetworkWired,
      title: "Network Security",
      description: "Secure your network infrastructure from external and internal threats"
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
          <p className="text-xl">Cyber Security</p>
        </div>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-red-50 via-white to-gray-50 rounded-3xl p-8 lg:p-16 mb-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            <div className="first order-2 lg:order-1">
              <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🔒 Enterprise-Grade Protection
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
                Protect Your Business With 
                <span className="text-orange-500"> Advanced Cyber Security</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8">
                Safeguard your digital assets with comprehensive cyber security solutions. From threat detection to incident response, we provide end-to-end protection against evolving cyber threats.
              </p>

              {/* Security Services Icons */}
              <div className="flex gap-4 mb-8">
                {securityServices.map((service, index) => (
                  <div key={index} className="group" title={service.name}>
                    <service.icon className={`text-3xl ${service.color} hover:scale-125 transition-transform duration-300 cursor-pointer`} />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">24/7 Monitoring</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">Threat Detection</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">Compliance</span>
                </div>
              </div>
              
              <Link href="/contact">
                <button className="flex items-center gap-2 font-bold text-xl bg-orange-500 px-8 py-4 rounded-full hover:bg-orange-600 hover:shadow-2xl transition-all duration-300 text-white group">
                  Secure Your Business <IoIosArrowDropright className="text-2xl group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="second order-1 lg:order-2 flex justify-center">
              <img
                src="/herosection/info.jpeg"
                alt="Cyber Security"
                className="w-full h-auto drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Our Cyber Security Services?
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive protection from certified security experts
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

        {/* Security Solutions */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Cyber Security Solutions
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive protection for your digital infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {securitySolutions.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border-2 border-gray-100 hover:border-orange-200">
                <div className="bg-gradient-to-br from-red-100 to-red-200 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <item.icon className="text-4xl text-red-600" />
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
              Key Security Benefits
            </h2>
            <p className="text-xl text-gray-600">
              Protect your business from cyber threats
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <item.icon className="text-4xl text-gray-700" />
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
              Security Challenges We Address
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive solutions for modern security threats
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="first">
                <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-gray-800">
                  Businesses approach us when facing:
                </h3>
                <div className="grid gap-6">
                  {securityChallenges.map((currElem) => (
                    <div
                      key={currElem.id}
                      className="group bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-red-500 hover:border-red-600"
                    >
                      <div className="flex gap-4 items-start">
                        <div className="bg-red-100 p-3 rounded-full group-hover:bg-red-500 transition-colors duration-300">
                          <FaQuoteRight className="text-lg text-red-500 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-red-500 mb-2 block">Challenge #{currElem.id}</span>
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
                  src="/herosection/info.jpeg"
                  alt="Security Solutions"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-xl text-gray-700 mb-6">
                <span className="font-bold text-orange-500">Don't wait for a breach!</span> Protect your business with our comprehensive security solutions.
              </p>
              <Link href="/contact">
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  Get Free Security Assessment
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
              Choose Your Security Package
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible packages designed to protect businesses of all sizes
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
                  <p className="text-sm text-gray-500">Monthly service fee</p>
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
              Need a custom security solution for your organization?
            </p>
            <Link href="/contact" className="text-orange-500 font-bold text-xl hover:underline inline-flex items-center gap-2">
              Contact Our Security Experts <IoIosArrowDropright className="text-2xl" />
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

export default CyberSecurity;
