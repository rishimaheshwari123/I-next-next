// import { contentMarketing } from "@/components/cardData";
// import Feedback from "@/components/Feedback";
// import Help from "@/components/Help";
import React from "react";
import { FaQuoteRight, FaCheck, FaRocket, FaChartLine, FaBullseye, FaUsers, FaTrophy, FaLightbulb, FaHandshake, FaCrown } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import { MdTrendingUp, MdBusinessCenter } from "react-icons/md";
import Link from "next/link";
import PlanCard from "@/components/PlanCard";

const BusinessGrowth = () => {
  const pricingPlans = [
    {
      id: 1,
      name: "Growth Starter",
      price: "₹35,000",
      period: "/month",
      description: "Perfect for startups ready to scale their business",
      features: [
        "Business Strategy Consultation",
        "Market Research & Analysis",
        "Competitor Analysis",
        "Growth Roadmap Development",
        "Monthly Performance Review",
        "Basic Marketing Support",
        "Email & Chat Support"
      ],
      popular: false
    },
    {
      id: 2,
      name: "Growth Accelerator",
      price: "₹65,000",
      period: "/month",
      description: "Ideal for businesses seeking rapid expansion",
      features: [
        "Comprehensive Growth Strategy",
        "Advanced Market Analysis",
        "Multi-Channel Marketing",
        "Sales Funnel Optimization",
        "Customer Acquisition Strategy",
        "Brand Positioning",
        "Bi-weekly Strategy Sessions",
        "Performance Dashboard",
        "Priority Support"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Enterprise Growth",
      price: "₹1,20,000",
      period: "/month",
      description: "Complete business growth solution for market leaders",
      features: [
        "Full-Service Growth Management",
        "Advanced Analytics & Insights",
        "Omnichannel Marketing Strategy",
        "Sales & Marketing Alignment",
        "Customer Retention Programs",
        "Partnership Development",
        "Weekly Executive Sessions",
        "Real-time Growth Dashboard",
        "Dedicated Growth Manager",
        "24/7 Priority Support"
      ],
      popular: false
    }
  ];

  const growthPillars = [
    { icon: FaRocket, name: "Rapid Scaling", color: "text-blue-600" },
    { icon: FaChartLine, name: "Revenue Growth", color: "text-green-600" },
    { icon: FaUsers, name: "Customer Acquisition", color: "text-purple-600" },
    { icon: FaTrophy, name: "Market Leadership", color: "text-orange-600" }
  ];

  const whyBusinessGrowth = [
    {
      icon: FaBullseye,
      title: "Strategic Planning",
      description: "Data-driven strategies tailored to your business goals and market position"
    },
    {
      icon: MdTrendingUp,
      title: "Sustainable Growth",
      description: "Build long-term growth foundations that scale with your business"
    },
    {
      icon: FaHandshake,
      title: "Expert Guidance",
      description: "Work with experienced growth strategists who understand your industry"
    },
    {
      icon: FaCrown,
      title: "Competitive Edge",
      description: "Stay ahead of competitors with innovative growth strategies"
    }
  ];

  const benefits = [
    {
      icon: MdBusinessCenter,
      title: "Holistic Approach",
      description: "We address all aspects of business growth - marketing, sales, operations, and customer success"
    },
    {
      icon: FaLightbulb,
      title: "Innovation Driven",
      description: "Leverage cutting-edge strategies and technologies to accelerate your growth"
    },
    {
      icon: FaChartLine,
      title: "Measurable Results",
      description: "Track your growth with clear KPIs and regular performance reporting"
    }
  ];

  const growthChallenges = [
    {
      id: 1,
      title: "Struggling to achieve consistent revenue growth quarter over quarter."
    },
    {
      id: 2,
      title: "Difficulty in scaling operations while maintaining quality."
    },
    {
      id: 3,
      title: "Lack of clear growth strategy and actionable roadmap."
    },
    {
      id: 4,
      title: "Challenges in customer acquisition and retention."
    },
    {
      id: 5,
      title: "Unable to differentiate from competitors in the market."
    },
    {
      id: 6,
      title: "Limited resources to execute growth initiatives effectively."
    },
    {
      id: 7,
      title: "Difficulty in measuring and optimizing growth metrics."
    },
    {
      id: 8,
      title: "Struggling to expand into new markets or segments."
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
          <p className="text-xl">Business Growth Package</p>
        </div>

        {/* Hero Section - Modern Layout */}
        <div className="relative bg-gradient-to-r from-indigo-50 via-white to-cyan-50 rounded-3xl p-8 lg:p-16 mb-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            <div className="first order-2 lg:order-1">
              <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🚀 Accelerate Your Success
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
                Scale Your Business With 
                <span className="text-orange-500"> Strategic Growth Solutions</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8">
                Transform your business with proven growth strategies. From market expansion to revenue optimization, we provide end-to-end solutions that drive sustainable, measurable growth.
              </p>

              {/* Growth Pillars Icons */}
              <div className="flex gap-4 mb-8">
                {growthPillars.map((pillar, index) => (
                  <div key={index} className="group" title={pillar.name}>
                    <pillar.icon className={`text-3xl ${pillar.color} hover:scale-125 transition-transform duration-300 cursor-pointer`} />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">Revenue Growth</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">Market Expansion</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
                  <FaCheck className="text-green-500" />
                  <span className="font-semibold">Scalable Systems</span>
                </div>
              </div>
              
              <Link href="/contact">
                <button className="flex items-center gap-2 font-bold text-xl bg-orange-500 px-8 py-4 rounded-full hover:bg-orange-600 hover:shadow-2xl transition-all duration-300 text-white group">
                  Start Growing Today <IoIosArrowDropright className="text-2xl group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
            </div>

            <div className="second order-1 lg:order-2 flex justify-center">
              <img
                src="/herosection/marketing.webp"
                alt="Business Growth"
                className="w-full  rounded-lg h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Why Business Growth Package */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Our Business Growth Package?
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive solutions for sustainable business expansion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyBusinessGrowth.map((item, index) => (
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
          <p className="text-center text-gray-600 text-lg mb-8 font-semibold">Trusted by Growing Businesses</p>
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
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600">
              Our unique approach to business growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <item.icon className="text-4xl text-indigo-600" />
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
              Overcome Your Business Growth Challenges
            </h2>
            <p className="text-xl text-gray-600">
              We help businesses break through growth barriers
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="first">
                <h3 className="text-2xl lg:text-3xl font-bold mb-8 text-gray-800">
                  Brands choose us to overcome growth hurdles:
                </h3>
                <div className="grid gap-6">
                  {growthChallenges.map((currElem) => (
                    <div
                      key={currElem.id}
                      className="group bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-indigo-500 hover:border-indigo-600"
                    >
                      <div className="flex gap-4 items-start">
                        <div className="bg-indigo-100 p-3 rounded-full group-hover:bg-indigo-500 transition-colors duration-300">
                          <FaQuoteRight className="text-lg text-indigo-500 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-indigo-500 mb-2 block">Challenge #{currElem.id}</span>
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
                  alt="Business Growth Solutions"
                  className="w-full max-w-md h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-xl text-gray-700 mb-6">
                <span className="font-bold text-orange-500">Ready to scale your business?</span> Let our growth experts create a custom strategy for you.
              </p>
              <Link href="/contact">
                <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  Get Free Growth Consultation
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Pricing Plans Section */}
        <div className="mb-20 bg-gradient-to-b from-gray-50 to-white py-16 -mx-[8.333333%] px-[8.333333%] rounded-3xl">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              💰 Investment in Your Growth
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Choose Your Growth Package
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible packages designed to accelerate your business growth at every stage
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} serviceName="Business Growth Package" />
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-700 text-lg mb-4">
              Need a custom growth strategy tailored to your business?
            </p>
            <Link href="/contact" className="text-orange-500 font-bold text-xl hover:underline inline-flex items-center gap-2">
              Contact Our Growth Strategists <IoIosArrowDropright className="text-2xl" />
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

export default BusinessGrowth;
