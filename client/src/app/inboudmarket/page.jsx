// import Help from "@/components/Help";
// import Feedback from "@/components/Feedback";
import React from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { FaQuoteRight, FaCheck, FaMagnet, FaUsers, FaChartLine, FaRocket, FaBullseye, FaLightbulb } from "react-icons/fa";
import { MdTrendingUp } from "react-icons/md";
import Link from "next/link";
import PlanCard from "@/components/PlanCard";

const Inbound = () => {
  const inboundChallenges = [
    {
      id: 1,
      title: "Struggling to attract qualified leads to your website."
    },
    {
      id: 2,
      title: "High customer acquisition costs with traditional marketing."
    },
    {
      id: 3,
      title: "Difficulty in creating valuable content that resonates with your audience."
    },
    {
      id: 4,
      title: "Unable to nurture leads effectively through the sales funnel."
    },
    {
      id: 5,
      title: "Lack of measurable ROI from your marketing efforts."
    },
    {
      id: 6,
      title: "Inconsistent brand messaging across different channels."
    },
    {
      id: 7,
      title: "Poor conversion rates from website visitors to customers."
    },
    {
      id: 8,
      title: "Struggling to build long-term customer relationships."
    }
  ];

  const pricingPlans = [
    {
      id: 1,
      name: "Basic",
      price: "₹25,000",
      period: "/month",
      description: "Perfect for startups beginning their inbound journey",
      features: [
        "Content Strategy Development",
        "4 Blog Posts per Month",
        "Basic SEO Optimization",
        "Email Marketing Setup",
        "Monthly Performance Report",
        "Social Media Integration",
        "Email Support"
      ],
      popular: false
    },
    {
      id: 2,
      name: "Premium",
      price: "₹50,000",
      period: "/month",
      description: "Ideal for growing businesses seeking comprehensive inbound marketing",
      features: [
        "Advanced Content Strategy",
        "8 Blog Posts per Month",
        "Advanced SEO & Keyword Research",
        "Lead Nurturing Campaigns",
        "Marketing Automation Setup",
        "Landing Page Optimization",
        "Bi-weekly Analytics Report",
        "A/B Testing",
        "Priority Support"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Premium Plus",
      price: "₹85,000",
      period: "/month",
      description: "Complete inbound marketing solution for maximum growth",
      features: [
        "Full Inbound Marketing Strategy",
        "12+ Blog Posts per Month",
        "Premium SEO & Content Marketing",
        "Advanced Marketing Automation",
        "CRM Integration & Management",
        "Video Content Creation",
        "Weekly Strategy Sessions",
        "Conversion Rate Optimization",
        "Competitor Analysis",
        "Dedicated Account Manager",
        "24/7 Priority Support"
      ],
      popular: false
    }
  ];

  const whyInbound = [
    {
      icon: FaMagnet,
      title: "Attract",
      description: "Draw in the right audience with valuable content and SEO strategies"
    },
    {
      icon: FaUsers,
      title: "Engage",
      description: "Build relationships through personalized content and nurturing campaigns"
    },
    {
      icon: FaChartLine,
      title: "Convert",
      description: "Turn visitors into customers with optimized landing pages and CTAs"
    },
    {
      icon: FaRocket,
      title: "Delight",
      description: "Create loyal advocates through exceptional customer experiences"
    }
  ];

  const benefits = [
    {
      icon: FaBullseye,
      title: "Targeted Approach",
      description: "Reach the right audience at the right time with personalized content"
    },
    {
      icon: MdTrendingUp,
      title: "Cost-Effective",
      description: "Lower customer acquisition costs compared to traditional marketing"
    },
    {
      icon: FaLightbulb,
      title: "Build Authority",
      description: "Establish your brand as an industry thought leader"
    }
  ];

  return (
    <>
      <div className="mt-[111px] w-11/12 mx-auto mb-20">
        {/* Breadcrumb */}
        <br />
        <br />
        <div className="flex gap-3 mb-4">
          <p className="border-r-2 pr-3 text-gray-300 text-xl">Home</p>
          <p className="text-xl">Digital Marketing</p>
        </div>

        {/* Hero Section - Modern Layout */}
        <div className="relative bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-3xl p-8 lg:p-16 mb-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            <div className="first order-2 lg:order-1">
              <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🎯 Smart Marketing Strategy
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
                Drive Qualified Leads With 
                <span className="text-orange-500"> Inbound Marketing</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8">
                Attract, engage, and delight your customers with strategic content marketing. Cut through the noise and build lasting relationships that drive real business growth.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">Higher ROI</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">Quality Leads</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">Brand Authority</span>
                </div>
              </div>
              
              <Link href="/contact">
                <button className="flex items-center gap-2 font-bold text-xl bg-orange-500 px-8 py-4 rounded-full hover:bg-orange-600 hover:shadow-2xl transition-all duration-300 text-white group">
                  Let's Get Started <IoIosArrowDropright className="text-2xl group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="second order-1 lg:order-2 flex justify-center">
              <img
                src="/herosection/marketing.webp"
                alt="Inbound Marketing"
                className="w-full rounded-lg h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Inbound Marketing Methodology */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              The Inbound Marketing Flywheel
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that attracts visitors, converts leads, and delights customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {whyInbound.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-orange-500">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <item.icon className="text-3xl text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Flywheel Diagram */}
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="flex justify-center">
                <img
                  src="/herosection/marketing.webp"
                  alt="Inbound Marketing Flywheel"
                  className="max-w-md w-full h-auto rounded-2xl shadow-lg"
                />
              </div>

              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-6">
                  Inbound Marketing in Action
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  The inbound marketing flywheel represents the continuous cycle of attracting, engaging, and delighting customers. Unlike traditional marketing funnels, the flywheel emphasizes the momentum gained from satisfied customers who become promoters of your brand.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Our inbound experts work on enhancing visitor focus, creating valuable content, and building outbound communication strategies that turn prospects into loyal customers.
                </p>
                <Link href="/contact">
                  <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all duration-300">
                    Learn More About Our Process
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Inbound Marketing?
            </h2>
            <p className="text-xl text-gray-600">
              Transform your marketing strategy with proven results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <item.icon className="text-4xl text-orange-600" />
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
              Are You Facing These Marketing Challenges?
            </h2>
            <p className="text-xl text-gray-600">
              We have the solutions to overcome these obstacles
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {inboundChallenges.map((currElem, index) => (
              <div
                key={currElem.id}
                className="group bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-500 hover:border-blue-600"
              >
                <div className="flex gap-4 items-start">
                  <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-500 transition-colors duration-300">
                    <FaQuoteRight className="text-xl text-blue-500 group-hover:text-white transition-colors duration-300" />
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

          <div className="text-center mt-12">
            <p className="text-xl text-gray-700 mb-6">
              <span className="font-bold text-orange-500">Stop struggling with ineffective marketing!</span> Let our inbound experts drive real results.
            </p>
            <Link href="/contact">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Get Free Strategy Consultation
              </button>
            </Link>
          </div>
        </div>

        {/* Who We Serve */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Who We Serve
            </h2>
            <p className="text-xl text-gray-600">
              Tailored inbound marketing solutions for every business stage
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-32 h-32 rounded-full flex items-center justify-center shadow-xl">
                  <FaRocket className="text-6xl text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Startups</h3>
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                What you need to get there is what we're all about. Ensuring your business is a success through efficient inbound marketing strategies that attract your ideal customers from day one.
              </p>
              <div className="mt-6 flex justify-center">
                <Link href="/contact">
                  <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-32 h-32 rounded-full flex items-center justify-center shadow-xl">
                  <FaUsers className="text-6xl text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 text-gray-800">Small Businesses</h3>
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                Our team delivers successful inbound campaigns with multiple touchpoints, improving your lead generation, nurturing prospects, and driving sustainable business expansion.
              </p>
              <div className="mt-6 flex justify-center">
                <Link href="/contact">
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-all duration-300">
                    Get Started
                  </button>
                </Link>
              </div>
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
              Choose Your Inbound Marketing Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible packages designed to grow with your business
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} serviceName="Inbound Marketing" />
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-700 text-lg mb-4">
              Need a custom solution tailored to your business goals?
            </p>
            <Link href="/contact" className="text-orange-500 font-bold text-xl hover:underline inline-flex items-center gap-2">
              Contact Our Inbound Experts <IoIosArrowDropright className="text-2xl" />
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

export default Inbound;
