// import { paiadvertising } from "@/components/cardData";
// import Feedback from "@/components/Feedback";
// import Help from "@/components/Help";
import React from "react";
import { FaQuoteRight, FaCheck, FaUserPlus, FaChartLine, FaBullseye, FaRocket, FaHandshake, FaFilter, FaEnvelope, FaPhone } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import { MdTrendingUp } from "react-icons/md";
import Link from "next/link";

const LeadGeneration = () => {
  const pricingPlans = [
    {
      id: 1,
      name: "Starter",
      price: "₹25,000",
      period: "/month",
      description: "Perfect for businesses starting their lead generation journey",
      features: [
        "50-100 Qualified Leads/Month",
        "Single Channel Lead Generation",
        "Basic Lead Qualification",
        "CRM Integration",
        "Lead Nurturing Setup",
        "Monthly Performance Report",
        "Email Support"
      ],
      popular: false
    },
    {
      id: 2,
      name: "Growth",
      price: "₹50,000",
      period: "/month",
      description: "Ideal for businesses seeking consistent quality leads",
      features: [
        "150-250 Qualified Leads/Month",
        "Multi-Channel Lead Generation",
        "Advanced Lead Scoring",
        "CRM & Marketing Automation",
        "Lead Nurturing Campaigns",
        "Landing Page Optimization",
        "A/B Testing",
        "Bi-weekly Performance Reports",
        "Priority Support"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Enterprise",
      price: "₹90,000",
      period: "/month",
      description: "Complete lead generation solution for maximum conversions",
      features: [
        "300+ Qualified Leads/Month",
        "Full Multi-Channel Strategy",
        "AI-Powered Lead Scoring",
        "Advanced CRM Integration",
        "Personalized Lead Nurturing",
        "Custom Landing Pages",
        "Conversion Rate Optimization",
        "Weekly Strategy Sessions",
        "Real-time Lead Dashboard",
        "Dedicated Account Manager",
        "24/7 Priority Support"
      ],
      popular: false
    }
  ];

  const leadGenChannels = [
    { icon: FaEnvelope, name: "Email Marketing", color: "text-blue-600" },
    { icon: FaPhone, name: "Cold Calling", color: "text-green-600" },
    { icon: FaUserPlus, name: "Social Media", color: "text-purple-600" },
    { icon: FaChartLine, name: "Content Marketing", color: "text-orange-600" }
  ];

  const whyLeadGen = [
    {
      icon: FaBullseye,
      title: "Targeted Prospects",
      description: "Reach decision-makers who are actively looking for your solutions"
    },
    {
      icon: FaRocket,
      title: "Faster Sales Cycle",
      description: "Convert qualified leads into customers with shorter sales cycles"
    },
    {
      icon: FaChartLine,
      title: "Predictable Growth",
      description: "Build a consistent pipeline of qualified leads for sustainable growth"
    },
    {
      icon: FaHandshake,
      title: "Higher Conversion",
      description: "Focus on quality leads that are more likely to convert"
    }
  ];

  const benefits = [
    {
      icon: FaFilter,
      title: "Quality Over Quantity",
      description: "We focus on generating high-quality leads that match your ideal customer profile"
    },
    {
      icon: MdTrendingUp,
      title: "Scalable Process",
      description: "Our proven lead generation system scales with your business growth"
    },
    {
      icon: FaUserPlus,
      title: "Multi-Channel Approach",
      description: "Leverage multiple channels to maximize your lead generation potential"
    }
  ];

  const leadGenChallenges = [
    {
      id: 1,
      title: "Struggling to generate consistent quality leads for your business."
    },
    {
      id: 2,
      title: "High cost per lead with low conversion rates."
    },
    {
      id: 3,
      title: "Difficulty in identifying and targeting the right audience."
    },
    {
      id: 4,
      title: "Lack of effective lead nurturing strategies."
    },
    {
      id: 5,
      title: "Unable to track and measure lead generation ROI."
    },
    {
      id: 6,
      title: "Poor lead quality resulting in wasted sales efforts."
    },
    {
      id: 7,
      title: "Inconsistent lead flow affecting sales pipeline."
    },
    {
      id: 8,
      title: "Challenges in converting leads into paying customers."
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
          <p className="text-xl">Lead Generation</p>
        </div>

        {/* Hero Section - Modern Layout */}
        <div className="relative bg-gradient-to-r from-purple-50 via-white to-pink-50 rounded-3xl p-8 lg:p-16 mb-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            <div className="first order-2 lg:order-1">
              <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🎯 Quality Lead Generation
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
                Generate High-Quality 
                <span className="text-orange-500"> Leads That Convert</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8">
                Build a consistent pipeline of qualified leads with our proven lead generation strategies. Connect with decision-makers who are ready to buy and accelerate your business growth.
              </p>

              {/* Lead Gen Channel Icons */}
              <div className="flex gap-4 mb-8">
                {leadGenChannels.map((channel, index) => (
                  <div key={index} className="group" title={channel.name}>
                    <channel.icon className={`text-3xl ${channel.color} hover:scale-125 transition-transform duration-300 cursor-pointer`} />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">Qualified Leads</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">Higher Conversion</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">Predictable Growth</span>
                </div>
              </div>
              
              <Link href="/contact">
                <button className="flex items-center gap-2 font-bold text-xl bg-orange-500 px-8 py-4 rounded-full hover:bg-orange-600 hover:shadow-2xl transition-all duration-300 text-white group">
                  Start Generating Leads <IoIosArrowDropright className="text-2xl group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="second order-1 lg:order-2 flex justify-center">
              <img
                src="/herosection/marketing.webp"
                alt="Lead Generation"
                className="w-full rounded-lg h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Why Lead Generation */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Invest in Lead Generation?
            </h2>
            <p className="text-xl text-gray-600">
              Build a sustainable pipeline of qualified prospects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyLeadGen.map((item, index) => (
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
              Our Lead Generation Advantage
            </h2>
            <p className="text-xl text-gray-600">
              What makes our lead generation services stand out
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
              Overcome Your Lead Generation Challenges
            </h2>
            <p className="text-xl text-gray-600">
              We solve the most common lead generation problems
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="first">
                <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-gray-800">
                  Businesses approach us when facing:
                </h3>
                <div className="grid gap-6">
                  {leadGenChallenges.map((currElem) => (
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
                  src="/herosection/marketing.webp"
                  alt="Lead Generation Solutions"
                  className="w-full max-w-md h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-xl text-gray-700 mb-6">
                <span className="font-bold text-orange-500">Stop struggling with lead generation!</span> Let our experts build a consistent pipeline for your business.
              </p>
              <Link href="/contact">
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  Get Free Lead Generation Audit
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
              Choose Your Lead Generation Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible packages designed to deliver qualified leads consistently
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
                  <p className="text-sm text-gray-500">Service fee (Lead quality guaranteed)</p>
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
                    {plan.popular ? 'Get Started Now' : 'Choose Plan'}
                  </button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-700 text-lg mb-4">
              Need a custom lead generation strategy for your business?
            </p>
            <Link href="/contact" className="text-orange-500 font-bold text-xl hover:underline inline-flex items-center gap-2">
              Contact Our Lead Generation Experts <IoIosArrowDropright className="text-2xl" />
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

export default LeadGeneration;
