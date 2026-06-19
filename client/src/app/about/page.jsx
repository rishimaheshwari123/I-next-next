import AboutHero from "@/components/tech/AboutHero";
import INEXTETS from "@/components/InfoDetails";

const About = () => {
  return (
    <div className="mt-[108px]">
      <AboutHero />
      <div className="w-11/12 mx-auto">
        <br />
        <INEXTETS />
        
        {/* Vision and Mission Section */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-blue-600">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To be the leading digital transformation partner in India, empowering businesses of all sizes to achieve their full potential through innovative technology solutions. We envision a future where every business, from startups to enterprises, has access to world-class digital services that drive growth and success.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-orange-500">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To deliver exceptional digital marketing, web development, mobile app development, and e-commerce solutions that exceed client expectations. We are committed to providing innovative, cost-effective, and timely services while building long-term partnerships based on trust, transparency, and measurable results.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mt-12 bg-white p-8 rounded-2xl border-2 border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Excellence</h3>
                <p className="text-sm text-gray-600">Delivering quality in everything we do</p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Collaboration</h3>
                <p className="text-sm text-gray-600">Working together for success</p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Innovation</h3>
                <p className="text-sm text-gray-600">Embracing new ideas and technologies</p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Integrity</h3>
                <p className="text-sm text-gray-600">Honest and transparent in all dealings</p>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
