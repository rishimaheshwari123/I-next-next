import React from "react";
import { 
  FaShieldAlt, 
  FaEye, 
  FaUserLock, 
  FaCookieBite, 
  FaShareAlt, 
  FaUserShield, 
  FaSync, 
  FaEnvelope 
} from "react-icons/fa";

export const metadata = {
  title: "Privacy Policy - I Next ETS",
  description: "Read the Privacy Policy of I Next ETS. Learn how we collect, use, protect, and handle your personal data and information.",
  keywords: "privacy policy, data protection, privacy terms, I Next ETS, data security",
};

export default function PrivacyPolicyPage() {
  const sections = [
    { id: "introduction", label: "1. Introduction", icon: <FaShieldAlt /> },
    { id: "info-collection", label: "2. Info We Collect", icon: <FaEye /> },
    { id: "info-use", label: "3. How We Use Info", icon: <FaUserLock /> },
    { id: "cookies", label: "4. Cookies Policy", icon: <FaCookieBite /> },
    { id: "sharing", label: "5. Information Sharing", icon: <FaShareAlt /> },
    { id: "security", label: "6. Data Security", icon: <FaUserShield /> },
    { id: "rights", label: "7. Your Rights", icon: <FaSync /> },
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
            <FaShieldAlt className="text-3xl text-orange-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Last Updated: August 29, 2026. Learn about how we handle, process, and protect your personal information at I Next ETS.
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

          {/* Policy Text Content */}
          <div className="lg:col-span-3 space-y-10 md:space-y-12">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
              
              {/* Introduction */}
              <section id="introduction" className="scroll-mt-28 space-y-4 mb-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl text-lg">
                    <FaShieldAlt />
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">1. Introduction</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Welcome to <strong>I Next ETS</strong> ("Company", "we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy or our practices with regards to your personal information, please contact us at <a href="mailto:info.inextets@gmail.com" className="text-blue-600 hover:underline">info.inextets@gmail.com</a>.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  When you visit our website <a href="https://inextets.in" className="text-blue-600 hover:underline">https://inextets.in</a> and use our services (which include web development, mobile app development, SEO, digital marketing, and advisory services), you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we describe our privacy policy.
                </p>
              </section>

              {/* Information We Collect */}
              <section id="info-collection" className="scroll-mt-28 space-y-4 mb-10 border-t border-slate-100 pt-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl text-lg">
                    <FaEye />
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">2. Information We Collect</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  We collect personal information that you voluntarily provide to us when registering, expressing an interest in obtaining information about us or our products and services, or otherwise contacting us.
                </p>
                <div className="bg-slate-50 rounded-2xl p-6 space-y-3 border border-slate-100">
                  <h3 className="font-semibold text-slate-800">Types of Information Collected:</h3>
                  <ul className="list-disc pl-5 text-slate-600 space-y-2">
                    <li><strong>Personal Details:</strong> Name, email address, phone number, and physical billing/shipping address.</li>
                    <li><strong>Professional Data:</strong> Company name, job title, and project details you provide in contact forms or inquiry briefs.</li>
                    <li><strong>Payment Credentials:</strong> Billing details and payment methods (processed securely via authorized payment gateways).</li>
                    <li><strong>Automated Data:</strong> IP address, browser type, device information, and activity details collected via cookies.</li>
                  </ul>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section id="info-use" className="scroll-mt-28 space-y-4 mb-10 border-t border-slate-100 pt-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl text-lg">
                    <FaUserLock />
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">3. How We Use Information</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Specifically, we use the information we collect or receive:
                </p>
                <ul className="list-disc pl-5 text-slate-600 space-y-2">
                  <li>To facilitate account creation and logon processes.</li>
                  <li>To deliver services, process transactions, and manage your projects effectively.</li>
                  <li>To send administrative details, service updates, policy revisions, and marketing communications.</li>
                  <li>To request feedback and contact you about your use of our site.</li>
                  <li>To protect our services, monitor potential security threats, and prevent fraud.</li>
                  <li>To enforce our terms, conditions, and legal policies.</li>
                </ul>
              </section>

              {/* Cookies Policy */}
              <section id="cookies" className="scroll-mt-28 space-y-4 mb-10 border-t border-slate-100 pt-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl text-lg">
                    <FaCookieBite />
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">4. Cookies Policy</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  We use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. These cookies help us analyze site traffic, personalize content, save your configurations, and optimize your overall experience.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our website.
                </p>
              </section>

              {/* Information Sharing */}
              <section id="sharing" className="scroll-mt-28 space-y-4 mb-10 border-t border-slate-100 pt-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl text-lg">
                    <FaShareAlt />
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">5. Information Sharing</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We may process or share data we hold based on the following legal bases:
                </p>
                <ul className="list-disc pl-5 text-slate-600 space-y-2">
                  <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information.</li>
                  <li><strong>Contract Performance:</strong> Where we have entered into a contract with you, we may process your personal information to fulfill our terms.</li>
                  <li><strong>Legal Obligations:</strong> We may disclose information where legally required to do so to comply with applicable law, governmental requests, or judicial proceedings.</li>
                  <li><strong>Third-Party Vendors:</strong> We may share data with service providers, payment processors, and analytics partners who assist us in operating our business.</li>
                </ul>
              </section>

              {/* Data Security */}
              <section id="security" className="scroll-mt-28 space-y-4 mb-10 border-t border-slate-100 pt-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl text-lg">
                    <FaUserShield />
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">6. Data Security</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our website is at your own risk. You should only access the services within a secure environment.
                </p>
              </section>

              {/* Your Rights */}
              <section id="rights" className="scroll-mt-28 space-y-4 mb-10 border-t border-slate-100 pt-10">
                <div className="flex items-center gap-3 mb-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-xl text-lg">
                    <FaSync />
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900">7. Your Rights & Choices</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Depending on your jurisdiction, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-5 text-slate-600 space-y-2">
                  <li>The right to request access to and obtain a copy of your personal information.</li>
                  <li>The right to request correction of inaccurate data or deletion of your information.</li>
                  <li>The right to object to or restrict processing of your data.</li>
                  <li>The right to withdraw consent at any time where we rely on consent to process data.</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.
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
                  If you have questions or comments about this policy, or wish to exercise your rights, you may email us or write to us at:
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
