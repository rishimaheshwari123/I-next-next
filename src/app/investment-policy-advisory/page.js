'use client';

import React from 'react';
import { 
  FaChartLine, 
  FaShieldAlt, 
  FaUserTie, 
  FaHandshake,
  FaPiggyBank,
  FaUmbrella,
  FaGraduationCap,
  FaHome,
  FaHeart,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaWhatsapp,
  FaAward,
  FaStar,
  FaUsers,
  FaLightbulb,
  FaRocket,
  FaChartBar
} from 'react-icons/fa';
import Link from 'next/link';

const InvestmentPolicyAdvisory = () => {
  const services = [
    {
      icon: FaChartLine,
      title: "Mutual Fund Investments",
      description: "Access to top-performing mutual funds with expert guidance",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: FaPiggyBank,
      title: "SIP Planning",
      description: "Systematic Investment Plans for disciplined wealth creation",
      color: "from-green-500 to-green-600"
    },
    {
      icon: FaShieldAlt,
      title: "Life & Health Insurance",
      description: "Comprehensive coverage for you and your family",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: FaGraduationCap,
      title: "Child Education Planning",
      description: "Secure your child's educational future",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: FaHome,
      title: "Retirement Planning",
      description: "Build a comfortable retirement corpus",
      color: "from-red-500 to-red-600"
    },
    {
      icon: FaChartBar,
      title: "Tax-Saving Investments",
      description: "ELSS and other tax-efficient investment options",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const expertise = [
    {
      category: "Investment Advisory",
      icon: FaChartLine,
      items: [
        "Mutual Funds & SIPs",
        "Portfolio Management",
        "Retirement Planning",
        "Wealth Management"
      ],
      color: "blue"
    },
    {
      category: "Policy Advisory",
      icon: FaUmbrella,
      items: [
        "Life & Health Insurance",
        "Term Plans",
        "Child Education Plans",
        "ULIPs & Endowment"
      ],
      color: "green"
    },
    {
      category: "Financial Planning",
      icon: FaLightbulb,
      items: [
        "Tax Saving Strategies",
        "Emergency Fund Planning",
        "Estate Planning",
        "Wealth Creation"
      ],
      color: "purple"
    }
  ];

  const whyChooseUs = [
    {
      icon: FaAward,
      title: "Certified Advisors",
      description: "Experienced & certified financial experts"
    },
    {
      icon: FaUserTie,
      title: "Personalized Plans",
      description: "Customized solutions for your goals"
    },
    {
      icon: FaHandshake,
      title: "Transparent Process",
      description: "Zero hidden charges, complete clarity"
    },
    {
      icon: FaUsers,
      title: "PAN India Services",
      description: "Serving clients across the country"
    },
    {
      icon: FaStar,
      title: "100% Satisfaction",
      description: "Proven track record of happy clients"
    },
    {
      icon: FaHeart,
      title: "Dedicated Support",
      description: "Continuous guidance & assistance"
    }
  ];

  const mutualFundPartners = [
    "SBI Mutual Fund", "HDFC Mutual Fund", "ICICI Prudential MF", "Axis Mutual Fund",
    "Kotak Mahindra MF", "Nippon India MF", "Aditya Birla Sun Life MF", "UTI Mutual Fund",
    "Franklin Templeton MF", "DSP Mutual Fund", "L&T Mutual Fund", "Mirae Asset MF",
    "Canara Robeco MF", "Tata Mutual Fund", "Edelweiss MF", "Motilal Oswal MF",
    "Invesco MF", "PGIM India MF", "Baroda BNP MF", "HSBC MF"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-6 shadow-xl">
              <FaChartLine className="text-5xl" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Investment & Policy Advisory
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              Your Trusted Partner in Financial Growth
            </p>
            
            <p className="text-lg max-w-3xl mx-auto mb-8 text-blue-50 leading-relaxed">
              Empowering your financial future with smart, secure, and well-informed investment solutions. 
              Whether it's retirement, your child's education, or tax-saving strategies — we guide you every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919111964605"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <FaPhone className="text-xl" />
                Call Now
              </a>
              <a
                href="https://wa.me/919111964605"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <FaWhatsapp className="text-xl" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive financial solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Expertise</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Specialized knowledge across multiple financial domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertise.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-blue-200 transition-all duration-300"
                >
                  <div className={`w-14 h-14 bg-${area.color}-100 rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className={`text-3xl text-${area.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{area.category}</h3>
                  <ul className="space-y-3">
                    {area.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <FaCheckCircle className={`text-${area.color}-600 mt-1 flex-shrink-0`} />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mutual Fund Partners */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mutual Fund Partners</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access to top-performing mutual funds from leading AMCs
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {mutualFundPartners.map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <span className="text-sm font-semibold text-gray-700">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose I Next ETS?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your success is our priority
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                    <Icon className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{reason.title}</h3>
                    <p className="text-gray-600 text-sm">{reason.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-full mb-6">
            <FaRocket className="text-3xl" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Talk About Your Financial Goals!
          </h2>
          
          <p className="text-xl mb-8 text-blue-100">
            Get personalized investment advice from our certified experts
          </p>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="tel:+919111964605"
                className="flex flex-col items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
              >
                <FaPhone className="text-3xl" />
                <div>
                  <p className="text-sm text-blue-200">Call Us</p>
                  <p className="font-bold">+91 91119 64605</p>
                </div>
              </a>

              <a
                href="mailto:info.inextets@gmail.com"
                className="flex flex-col items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
              >
                <FaEnvelope className="text-3xl" />
                <div>
                  <p className="text-sm text-blue-200">Email Us</p>
                  <p className="font-bold text-sm">info.inextets@gmail.com</p>
                </div>
              </a>

              <a
                href="https://www.inextets.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
              >
                <FaGlobe className="text-3xl" />
                <div>
                  <p className="text-sm text-blue-200">Visit Website</p>
                  <p className="font-bold">www.inextets.in</p>
                </div>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl"
            >
              Get Started Today
            </Link>
            <a
              href="https://wa.me/919111964605"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-500 text-white rounded-xl font-bold text-lg hover:bg-green-600 transition-all shadow-xl hover:shadow-2xl"
            >
              <FaWhatsapp className="text-xl" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Advisor Info */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-2 border-blue-100">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FaUserTie className="text-4xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Anubhav Dixit</h3>
            <p className="text-lg text-blue-600 font-semibold mb-4">Certified Financial Advisor</p>
            <p className="text-gray-600 mb-6">
              Your dedicated partner in achieving financial freedom and security
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919111964605"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                <FaPhone />
                +91 91119 64605
              </a>
              <a
                href="https://wa.me/919111964605"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all"
              >
                <FaWhatsapp />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestmentPolicyAdvisory;
