import { socialMediaMarketing } from "@/components/cardData";
// import Feedback from "@/components/Feedback";
import React from "react";
import { FaQuoteRight, FaCheck, FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaChartLine, FaBullhorn, FaUsers } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import { MdTrendingUp } from "react-icons/md";
// import Help from "@/components/Help";

const SocialMedia = () => {
  const pricingPlans = [
    {
      id: 1,
      name: "Basic",
      price: "₹15,000",
      period: "/month",
      description: "Perfect for small businesses starting their social media journey",
      features: [
        "2 Social Media Platforms",
        "12 Posts per Month",
        "Basic Content Creation",
        "Monthly Analytics Report",
        "Community Management",
        "Email Support"
      ],
      popular: false
    },
    {
      id: 2,
      name: "Premium",
      price: "₹30,000",
      period: "/month",
      description: "Ideal for growing businesses looking to expand their reach",
      features: [
        "4 Social Media Platforms",
        "24 Posts per Month",
        "Advanced Content Creation",
        "Bi-weekly Analytics Report",
        "Community Management",
        "Paid Ad Management (up to ₹10k budget)",
        "Influencer Outreach",
        "Priority Email & Chat Support"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Premium Plus",
      price: "₹50,000",
      period: "/month",
      description: "Complete solution for businesses seeking maximum social media impact",
      features: [
        "All Social Media Platforms",
        "40+ Posts per Month",
        "Premium Content Creation with Video",
        "Weekly Analytics & Strategy Report",
        "24/7 Community Management",
        "Paid Ad Management (up to ₹25k budget)",
        "Influencer Partnerships",
        "Social Media Strategy Consultation",
        "Competitor Analysis",
        "Dedicated Account Manager",
        "24/7 Priority Support"
      ],
      popular: false
    }
  ];

  const socialPlatforms = [
    { icon: FaInstagram, name: "Instagram", color: "text-pink-600" },
    { icon: FaFacebook, name: "Facebook", color: "text-blue-600" },
    { icon: FaTwitter, name: "Twitter", color: "text-sky-500" },
    { icon: FaLinkedin, name: "LinkedIn", color: "text-blue-700" },
    { icon: FaYoutube, name: "YouTube", color: "text-red-600" }
  ];

  const whyChooseUs = [
    {
      icon: FaChartLine,
      title: "Data-Driven Strategy",
      description: "We use analytics and insights to create campaigns that deliver measurable results"
    },
    {
      icon: FaBullhorn,
      title: "Creative Content",
      description: "Engaging posts, stories, and videos that resonate with your target audience"
    },
    {
      icon: FaUsers,
      title: "Community Building",
      description: "Foster meaningful connections and build a loyal community around your brand"
    },
    {
      icon: MdTrendingUp,
      title: "Growth Focused",
      description: "Proven strategies to increase followers, engagement, and conversions"
    }
  ];

  return (
    <>
      <div className="mt-[111px] w-11/12 mx-auto mb-20">
        {/* Breadcrumb */}
        <br />
        <br />

        <div className="flex gap-3 mb-3 ">
          
          <p className="border-r-2 pr-3 text-gray-300 text-xl">Home</p>
          <p className="text-xl">Social Media Marketing</p>
        </div>

        {/* Hero Section - New Layout */}
        <div className="relative bg-gradient-to-r from-orange-50 via-white to-blue-50 rounded-3xl p-8 lg:p-16 mb-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            <div className="first order-2 lg:order-1">
              <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🚀 Grow Your Brand Online
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-6">
                Transform Your Social Media Into A 
                <span className="text-orange-500"> Powerful Marketing Engine</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8">
                Build authentic connections, engage your audience, and drive real business results with our expert social media marketing strategies.
              </p>

              {/* Social Platform Icons */}
              <div className="flex gap-4 mb-8">
                {socialPlatforms.map((platform, index) => (
                  <div key={index} className="group">
                    <platform.icon className={`text-3xl ${platform.color} hover:scale-125 transition-transform duration-300 cursor-pointer`} />
                  </div>
                ))}
              </div>
              
              <a href="/contact">
              <button className="flex items-center gap-2 font-bold text-xl bg-orange-500 px-8 py-4 rounded-full hover:bg-orange-600 hover:shadow-2xl transition-all duration-300 text-white group">
                Start Your Journey <IoIosArrowDropright className="text-2xl group-hover:translate-x-2 transition-transform" />
              </button></a>
            </div>

            <div className="second order-1 lg:order-2 flex justify-center">
              <img
                src="https://d1hdtc0tbqeghx.cloudfront.net/wp-content/uploads/2023/06/22063301/Social-Media-Marketing-Image.png"
                alt="Social Media Marketing"
                className="w-full  h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Why Choose Us Section - New */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Our Social Media Marketing Services?
            </h2>
            <p className="text-xl text-gray-600">
              We deliver results that matter to your business
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

        {/* Challenges Section - Redesigned */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Are You Facing These Social Media Challenges?
            </h2>
            <p className="text-xl text-gray-600">
              We understand your struggles and have the solutions
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {socialMediaMarketing.map((currElem, index) => (
              <div
                key={currElem.id}
                className="group bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-l-4 border-orange-500 hover:border-orange-600"
              >
                <div className="flex gap-4 items-start">
                  <div className="bg-orange-100 p-3 rounded-full group-hover:bg-orange-500 transition-colors duration-300">
                    <FaQuoteRight className="text-xl text-orange-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-orange-500 mb-2 block">Challenge #{currElem.id}</span>
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
              <span className="font-bold text-orange-500">Don't let these challenges hold you back!</span> Let our experts handle your social media.
            </p>
            
          </div>
        </div>

        {/* Pricing Plans Section - Enhanced */}
        <div className="mb-20 bg-gradient-to-b from-gray-50 to-white py-16 -mx-[8.333333%] px-[8.333333%] rounded-3xl">
          <div className="text-center mb-16">
            <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              💰 Flexible Pricing
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Choose Your Perfect Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent pricing with no hidden costs. Scale as you grow.
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
                  <p className="text-sm text-gray-500">Billed monthly</p>
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

                <button
                  className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-2xl hover:scale-105'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-lg'
                  }`}
                >
                  {plan.popular ? 'Get Started Now' : 'Choose Plan'}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-700 text-lg mb-4">
              Need a custom solution tailored to your business?
            </p>
            <a href="/contact" className="text-orange-500 font-bold text-xl hover:underline inline-flex items-center gap-2">
              Contact Our Team <IoIosArrowDropright className="text-2xl" />
            </a>
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

export default SocialMedia;
