import CareerForm from "@/components/CareerForm";
import React from "react";
import { FaRocket, FaUsers, FaLightbulb, FaTrophy, FaClock, FaMoneyBillWave, FaBuilding, FaLaptop } from "react-icons/fa";

const Career = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-orange-500">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md rounded-full mb-6 border border-white/30">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
            <span className="text-white font-semibold text-sm uppercase tracking-wide">
              Join Our Team
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Build Your Career at <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-white">
              I Next ETS
            </span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join a team of innovators, creators, and problem-solvers who are shaping the future of digital marketing and technology
          </p>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why <span className="text-blue-600">I Next ETS</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're not just a company, we're a family of passionate professionals committed to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaRocket className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation First</h3>
              <p className="text-gray-600 leading-relaxed">
                Work on cutting-edge projects using the latest technologies and methodologies
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaUsers className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collaborative Culture</h3>
              <p className="text-gray-600 leading-relaxed">
                Join a supportive team that values collaboration, creativity, and mutual growth
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Learning & Growth</h3>
              <p className="text-gray-600 leading-relaxed">
                Continuous learning opportunities with training programs and skill development
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaTrophy className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Recognition & Rewards</h3>
              <p className="text-gray-600 leading-relaxed">
                Your hard work is recognized and rewarded with competitive compensation and benefits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perks & <span className="text-orange-600">Benefits</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe in taking care of our team members with comprehensive benefits
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Benefit 1 */}
            <div className="flex items-start gap-6 p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
                <FaClock className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Working Hours</h3>
                <p className="text-gray-600">
                  Work-life balance matters. Choose your hours and work at your peak productivity times
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-start gap-6 p-6 bg-gradient-to-br from-orange-50 to-white rounded-2xl border border-orange-100 hover:shadow-lg transition-all duration-300">
              <div className="flex-shrink-0 w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center">
                <FaMoneyBillWave className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Competitive Salary</h3>
                <p className="text-gray-600">
                  Industry-leading compensation packages with performance bonuses and incentives
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-start gap-6 p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
              <div className="flex-shrink-0 w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
                <FaBuilding className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Modern Office Space</h3>
                <p className="text-gray-600">
                  Work in a vibrant, comfortable environment designed to inspire creativity and collaboration
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="flex items-start gap-6 p-6 bg-gradient-to-br from-orange-50 to-white rounded-2xl border border-orange-100 hover:shadow-lg transition-all duration-300">
              <div className="flex-shrink-0 w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center">
                <FaLaptop className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Latest Equipment</h3>
                <p className="text-gray-600">
                  Work with the best tools and technology to maximize your productivity and efficiency
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Join Us</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fill out the application form below and take the first step towards an exciting career
            </p>
          </div>
          
          <CareerForm />
        </div>
      </section>
    </div>
  );
};

export default Career;
