import React from "react";
import { 
  FaFileContract, 
  FaCheckDouble, 
  FaUserCog, 
  FaCopyright, 
  FaBan, 
  FaExclamationTriangle, 
  FaGavel, 
  FaEnvelope 
} from "react-icons/fa";

export const metadata = {
  title: "Terms & Conditions - I Next ETS",
  description: "Read the Terms and Conditions of I Next ETS. Learn about user terms, services, responsibilities, intellectual property, and liability policies.",
  keywords: "terms and conditions, terms of service, user agreement, legal contract, I Next ETS",
};

export default function TermsConditionsPage() {
  const sections = [
    { id: "acceptance", label: "1. Acceptance of Terms", icon: <FaFileContract /> },
    { id: "services", label: "2. Services Provided", icon: <FaCheckDouble /> },
    { id: "accounts", label: "3. User Accounts", icon: <FaUserCog /> },
    { id: "ip", label: "4. Intellectual Property", icon: <FaCopyright /> },
    { id: "prohibited", label: "5. Prohibited Conduct", icon: <FaBan /> },
    { id: "liability", label: "6. Liability Disclaimers", icon: <FaExclamationTriangle /> },
    { id: "governing-law", label: "7. Governing Law", icon: <FaGavel /> },
    { id: "contact", label: "8. Contact Us", icon: <FaEnvelope /> },
  ];

  return (
    <div className="mt-[78px] bg-slate-50/50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-16 md:py-24 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-orange-500 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-6">
            <FaFileContract className="text-3xl text-orange-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Last Updated: August 29, 2026. Please read these terms carefully before using our services.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Sticky Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hidden lg:block">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Table of Contents
              </h2>
              <nav className="space-y-1">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors group"
                  >
                    <span className="text-slate-400 group-hover:text-blue-500 transition-colors">
                      {sec.icon}
                    </span>
                    {sec.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Terms Text Content */}
          <div className="lg:col-span-3 space-y-10 md:space-y-12">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
              
              {/* Acceptance of Terms */}
              <section id="acceptance" className="scroll-mt-28 space-y-4 mb-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl text-lg">
                    <FaFileContract />
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">1. Acceptance of Terms</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  By accessing or using the website <a href="https://inextets.in" className="text-blue-600 hover:underline">https://inextets.in</a> and services provided by <strong>I Next ETS</strong> ("Company", "we", "our", or "us"), you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, please do not use our website or services.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  These Terms constitute a legally binding agreement between you (whether personally or on behalf of an entity) and I Next ETS, concerning your access to and use of the website and services.
                </p>
              </section>

              {/* Services Provided */}
              <section id="services" className="scroll-mt-28 space-y-4 mb-10 border-t border-slate-100 pt-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl text-lg">
                    <FaCheckDouble />
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">2. Services Provided</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  I Next ETS provides standard professional services, including but not limited to: Web Development, Mobile App Development, E-commerce Solutions, Social Media Marketing (SMM), Search Engine Optimization (SEO), Content & Inbound Marketing, AI & ML Solutions, Cyber Security services, and Investment & Policy Advisory.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We reserve the right to modify, suspend, or discontinue any portion of our services at any time without prior notice. Specific service contracts, proposals, or Service Level Agreements (SLAs) signed between the Company and the Client will override or supplement these general Terms.
                </p>
              </section>

              {/* User Accounts and Responsibilities */}
              <section id="accounts" className="scroll-mt-28 space-y-4 mb-10 border-t border-slate-100 pt-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl text-lg">
                    <FaUserCog />
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">3. User Accounts & Responsibilities</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  To access certain dashboards or client portals, you may be required to register for an account. You agree that:
                </p>
                <ul className="list-disc pl-5 text-slate-600 space-y-2">
                  <li>You will provide accurate, current, and complete registration information.</li>
                  <li>You will maintain the security and confidentiality of your credentials (username/password).</li>
                  <li>You will immediately notify us if you suspect any unauthorized use of your account.</li>
                  <li>You are responsible for all activities that occur under your account.</li>
                </ul>
              </section>

              {/* Intellectual Property Rights */}
              <section id="ip" className="scroll-mt-28 space-y-4 mb-10 border-t border-slate-100 pt-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl text-lg">
                    <FaCopyright />
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">4. Intellectual Property Rights</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Unless otherwise indicated, the website design, source code, database features, functionality, software, artwork, and text (collectively, the "Content") and the trademarks, logos, and brands contained therein (the "Marks") are owned or licensed by us, and are protected by copyright and trademark laws.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  For projects built for client delivery (such as bespoke website software or applications), the intellectual property ownership details and transfer timelines are governed explicitly by the terms of our project agreements.
                </p>
              </section>

              {/* Prohibited Conduct */}
              <section id="prohibited" className="scroll-mt-28 space-y-4 mb-10 border-t border-slate-100 pt-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl text-lg">
                    <FaBan />
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">5. Prohibited Activities</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  As a condition of your use of our website and services, you warrant that you will not:
                </p>
                <ul className="list-disc pl-5 text-slate-600 space-y-2">
                  <li>Retrieve data or content systematically to compile a database or directory without permission.</li>
                  <li>Circumvent, disable, or interfere with security-related features of the site.</li>
                  <li>Engage in unauthorized framing of or linking to the site.</li>
                  <li>Upload or transmit viruses, Trojan horses, malware, or excessive spam.</li>
                  <li>Use any automated system (bots, scrapers) to access or exploit our platforms.</li>
                  <li>Use the website or our services in a manner inconsistent with any applicable laws or regulations.</li>
                </ul>
              </section>

              {/* Limitation of Liability */}
              <section id="liability" className="scroll-mt-28 space-y-4 mb-10 border-t border-slate-100 pt-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl text-lg">
                    <FaExclamationTriangle />
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">6. Limitation of Liability</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  To the maximum extent permitted by law, I Next ETS and its directors, employees, or partners will not be liable for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages (including lost profits, lost revenue, or loss of data) arising from your use of the website or services, even if we have been advised of the possibility of such damages.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  All services and website features are provided on an "AS-IS" and "AS-AVAILABLE" basis without warranties of any kind, either express or implied.
                </p>
              </section>

              {/* Governing Law */}
              <section id="governing-law" className="scroll-mt-28 space-y-4 mb-10 border-t border-slate-100 pt-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl text-lg">
                    <FaGavel />
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">7. Governing Law</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  These Terms and Conditions and your use of the website and services are governed by and construed in accordance with the laws of <strong>India</strong>, without regard to conflict of law principles. Any legal actions or disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts located in <strong>Bhopal, Madhya Pradesh, India</strong>.
                </p>
              </section>

              {/* Contact Us */}
              <section id="contact" className="scroll-mt-28 space-y-4 border-t border-slate-100 pt-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl text-lg">
                    <FaEnvelope />
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">8. Contact Us</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  If you have questions, corrections, or seek clarifications regarding these Terms & Conditions, please contact us at:
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mt-4 text-slate-600 space-y-2">
                  <p className="font-bold text-slate-800">I Next ETS</p>
                  <p>Plot No - 11, 2nd floor, Near Manohar Dairy, Zone-I</p>
                  <p>Maharana Pratap Nagar, Bhopal, Madhya Pradesh 462011</p>
                  <p><strong>Email:</strong> <a href="mailto:info.inextets@gmail.com" className="text-blue-600 hover:underline">info.inextets@gmail.com</a></p>
                  <p><strong>Phone:</strong> +91 9981122493</p>
                </div>
              </section>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
