import React from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { FaQuoteRight, FaCheck, FaBrain, FaRobot, FaChartLine, FaLightbulb, FaCog, FaDatabase, FaEye, FaLanguage } from "react-icons/fa";
import { MdAutoAwesome, MdPsychology } from "react-icons/md";
// import Feedback from "@/components/Feedback";
// import Help from "@/components/Help";
import Link from "next/link";

const AIServices = () => {
  const pricingPlans = [
    {
      id: 1,
      name: "AI Starter",
      price: "₹50,000",
      period: "/month",
      description: "Perfect for businesses exploring AI capabilities",
      features: [
        "AI Consultation & Strategy",
        "Basic ML Model Development",
        "Data Analysis & Insights",
        "Chatbot Integration",
        "Predictive Analytics Setup",
        "Monthly Performance Report",
        "Email Support"
      ],
      popular: false
    },
    {
      id: 2,
      name: "AI Professional",
      price: "₹1,00,000",
      period: "/month",
      description: "Ideal for businesses implementing advanced AI solutions",
      features: [
        "Custom AI/ML Solutions",
        "Advanced Model Training",
        "Natural Language Processing",
        "Computer Vision Integration",
        "AI-Powered Automation",
        "Real-time Analytics Dashboard",
        "API Integration",
        "Bi-weekly Strategy Sessions",
        "Priority Support"
      ],
      popular: true
    },
    {
      id: 3,
      name: "AI Enterprise",
      price: "₹2,50,000",
      period: "/month",
      description: "Complete AI transformation for large-scale operations",
      features: [
        "Full AI Infrastructure Setup",
        "Deep Learning Solutions",
        "Custom AI Model Development",
        "AI-Powered Business Intelligence",
        "Automated Decision Systems",
        "Advanced Computer Vision",
        "Voice & Speech Recognition",
        "24/7 Model Monitoring",
        "Weekly Executive Sessions",
        "Dedicated AI Team",
        "24/7 Priority Support"
      ],
      popular: false
    }
  ];

  const aiCapabilities = [
    { icon: FaBrain, name: "Machine Learning", color: "text-purple-600" },
    { icon: FaRobot, name: "AI Automation", color: "text-blue-600" },
    { icon: FaEye, name: "Computer Vision", color: "text-green-600" },
    { icon: FaLanguage, name: "NLP", color: "text-orange-600" }
  ];

  const whyChooseUs = [
    {
      icon: MdPsychology,
      title: "Expert AI Team",
      description: "Experienced data scientists and AI engineers with proven track records"
    },
    {
      icon: FaChartLine,
      title: "Data-Driven Results",
      description: "AI solutions that deliver measurable business outcomes and ROI"
    },
    {
      icon: FaCog,
      title: "Custom Solutions",
      description: "Tailored AI models designed specifically for your business needs"
    },
    {
      icon: MdAutoAwesome,
      title: "Cutting-Edge Tech",
      description: "Latest AI frameworks and technologies for optimal performance"
    }
  ];

  const benefits = [
    {
      icon: FaLightbulb,
      title: "Intelligent Automation",
      description: "Automate complex tasks and processes with AI-powered solutions"
    },
    {
      icon: FaDatabase,
      title: "Smart Data Analysis",
      description: "Extract valuable insights from your data with advanced analytics"
    },
    {
      icon: FaRobot,
      title: "24/7 AI Assistance",
      description: "Deploy AI chatbots and virtual assistants for round-the-clock support"
    }
  ];

  const aiChallenges = [
    {
      id: 1,
      title: "Struggling to extract meaningful insights from large datasets."
    },
    {
      id: 2,
      title: "Manual processes consuming too much time and resources."
    },
    {
      id: 3,
      title: "Difficulty in predicting customer behavior and market trends."
    },
    {
      id: 4,
      title: "Lack of expertise in implementing AI and machine learning."
    },
    {
      id: 5,
      title: "Need to improve customer service with intelligent automation."
    },
    {
      id: 6,
      title: "Challenges in processing and analyzing unstructured data."
    },
    {
      id: 7,
      title: "Unable to scale operations efficiently with current systems."
    },
    {
      id: 8,
      title: "Missing opportunities due to lack of predictive capabilities."
    }
  ];

  const aiServices = [
    {
      icon: FaBrain,
      title: "Machine Learning",
      description: "Custom ML models for prediction, classification, and pattern recognition"
    },
    {
      icon: FaLanguage,
      title: "Natural Language Processing",
      description: "Text analysis, sentiment analysis, and language understanding solutions"
    },
    {
      icon: FaEye,
      title: "Computer Vision",
      description: "Image recognition, object detection, and visual analysis systems"
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
          <p className="text-xl">AI Services</p>
        </div>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-purple-50 via-white to-blue-50 rounded-3xl p-8 lg:p-16 mb-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            <div className="first order-2 lg:order-1">
              <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🤖 Intelligent Solutions
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
                Transform Your Business With 
                <span className="text-orange-500"> Artificial Intelligence</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8">
                Harness the power of AI and machine learning to automate processes, gain insights, and make smarter decisions. From predictive analytics to intelligent automation, we deliver AI solutions that drive real business value.
              </p>

              {/* AI Capabilities Icons */}
              <div className="flex gap-4 mb-8">
                {aiCapabilities.map((capability, index) => (
                  <div key={index} className="group" title={capability.name}>
                    <capability.icon className={`text-3xl ${capability.color} hover:scale-125 transition-transform duration-300 cursor-pointer`} />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">Smart Automation</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">Predictive Analytics</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">Data Insights</span>
                </div>
              </div>
              
              <Link href="/contact">
                <button className="flex items-center gap-2 font-bold text-xl bg-orange-500 px-8 py-4 rounded-full hover:bg-orange-600 hover:shadow-2xl transition-all duration-300 text-white group">
                  Explore AI Solutions <IoIosArrowDropright className="text-2xl group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="second order-1 lg:order-2 flex justify-center">
              <img
                src="/herosection/aiml.jpg"
                alt="AI Services"
                className="w-full h-auto drop-shadow-2xl rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Our AI Services?
            </h2>
            <p className="text-xl text-gray-600">
              Delivering intelligent solutions that transform businesses
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

        {/* AI Services */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our AI & Machine Learning Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive AI solutions for every business need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {aiServices.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border-2 border-gray-100 hover:border-orange-200">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <item.icon className="text-4xl text-purple-600" />
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
              Benefits of AI Implementation
            </h2>
            <p className="text-xl text-gray-600">
              Transform operations with intelligent automation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <item.icon className="text-4xl text-blue-600" />
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
              AI Challenges We Solve
            </h2>
            <p className="text-xl text-gray-600">
              Expert solutions for your AI implementation needs
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="first">
                <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-gray-800">
                  Businesses approach us when facing:
                </h3>
                <div className="grid gap-6">
                  {aiChallenges.map((currElem) => (
                    <div
                      key={currElem.id}
                      className="group bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500 hover:border-purple-600"
                    >
                      <div className="flex gap-4 items-start">
                        <div className="bg-purple-100 p-3 rounded-full group-hover:bg-purple-500 transition-colors duration-300">
                          <FaQuoteRight className="text-lg text-purple-500 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-purple-500 mb-2 block">Challenge #{currElem.id}</span>
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
                  src="/herosection/aiml.jpg"
                  alt="AI Solutions"
                  className="w-full  h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-xl text-gray-700 mb-6">
                <span className="font-bold text-orange-500">Ready to leverage AI for your business?</span> Let our experts build intelligent solutions for you.
              </p>
              <Link href="/contact">
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  Get Free AI Consultation
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
              Choose Your AI Service Package
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible packages designed for AI transformation at every scale
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
              Need a custom AI solution tailored to your business?
            </p>
            <Link href="/contact" className="text-orange-500 font-bold text-xl hover:underline inline-flex items-center gap-2">
              Contact Our AI Experts <IoIosArrowDropright className="text-2xl" />
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

export default AIServices;
