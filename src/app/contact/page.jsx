'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL } from '@/config/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    // Basic Information
    contactPersonName: '',
    companyName: '',
    email: '',
    phone: '',
    
    // Services
    servicesInterested: [],
    otherServicesSpecify: '',
    
    // Website Development Specific
    websiteType: '',
    websiteVision: '',
    websitePages: '',
    brandGuidelinesReady: '',
    specificIntegrations: '',
    preferredCMS: '',
    primaryCTA: '',
    websitePurpose: '',
    existingWebsite: '',
    ongoingMaintenance: [],
    
    // Social Media Marketing Specific
    socialMediaPlatforms: [],
    socialMediaGoals: '',
    postingFrequency: '',
    targetDemographic: '',
    contentType: [],
    
    // Digital Marketing/SEO Specific
    currentChallenges: '',
    kpisImportant: [],
    competitorsAdmire: '',
    uniqueSellingProposition: '',
    geographicTarget: '',
    
    // Project Details
    budgetRange: '',
    preferredStartDate: '',
    expectedTimeframe: '',
    projectDeadline: '',
    urgencyRating: 3,
    
    // Importance & Preferences
    proposalImportance: 5,
    involvementLevel: 3,
    clarityRating: 3,
    
    // Additional Information
    targetAudience: '',
    visualStyle: '',
    designInspiration: '',
    preferredCommunication: [],
    existingMarketingMaterials: '',
    expectedResults: '',
    digitalMarketingFamiliarity: '',
    
    // Partnership Factors
    partnershipFactors: {
      transparentReporting: '',
      proactiveCommunication: '',
      dataDrivenStrategies: '',
      longTermPartnership: '',
    },
    
    // Source & Additional
    hearAboutUs: '',
    additionalComments: '',
  });

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const arrayField = formData[name];
      if (checked) {
        setFormData({ ...formData, [name]: [...arrayField, value] });
      } else {
        setFormData({ ...formData, [name]: arrayField.filter(item => item !== value) });
      }
    } else if (name.startsWith('partnershipFactors.')) {
      const factor = name.split('.')[1];
      setFormData({
        ...formData,
        partnershipFactors: {
          ...formData.partnershipFactors,
          [factor]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.contactPersonName || !formData.email || !formData.phone || formData.servicesInterested.length === 0) {
      toast.error('Please fill in all required fields (Name, Email, Phone, Services)');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/contact/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || 'Form submitted successfully!');
        // Reset form
        setFormData({
          contactPersonName: '',
          companyName: '',
          email: '',
          phone: '',
          servicesInterested: [],
          otherServicesSpecify: '',
          websiteType: '',
          websiteVision: '',
          websitePages: '',
          brandGuidelinesReady: '',
          specificIntegrations: '',
          preferredCMS: '',
          primaryCTA: '',
          websitePurpose: '',
          existingWebsite: '',
          ongoingMaintenance: [],
          socialMediaPlatforms: [],
          socialMediaGoals: '',
          postingFrequency: '',
          targetDemographic: '',
          contentType: [],
          currentChallenges: '',
          kpisImportant: [],
          competitorsAdmire: '',
          uniqueSellingProposition: '',
          geographicTarget: '',
          budgetRange: '',
          preferredStartDate: '',
          expectedTimeframe: '',
          projectDeadline: '',
          urgencyRating: 3,
          proposalImportance: 5,
          involvementLevel: 3,
          clarityRating: 3,
          targetAudience: '',
          visualStyle: '',
          designInspiration: '',
          preferredCommunication: [],
          existingMarketingMaterials: '',
          expectedResults: '',
          digitalMarketingFamiliarity: '',
          partnershipFactors: {
            transparentReporting: '',
            proactiveCommunication: '',
            dataDrivenStrategies: '',
            longTermPartnership: '',
          },
          hearAboutUs: '',
          additionalComments: '',
        });
        setCurrentStep(1);
      } else {
        toast.error(data.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const showWebsiteFields = formData.servicesInterested.includes('Website Development');
  const showSocialMediaFields = formData.servicesInterested.includes('Social Media Marketing');
  const showDigitalMarketingFields = formData.servicesInterested.includes('Digital Marketing') || 
                                      formData.servicesInterested.includes('Lead Generation');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600">
            Tell us about your project and we'll get back to you within 24-48 hours
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                } font-semibold`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Basic Info</span>
            <span>Services</span>
            <span>Project Details</span>
            <span>Additional Info</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Company"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Services */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Services Interested</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Services <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    'Social Media Marketing',
                    'Digital Marketing',
                    'Lead Generation',
                    'Business Growth Package',
                    'Website Development',
                    'Mobile App Development',
                    'AI (Artificial Intelligence)',
                    'Cyber Security',
                    'Other'
                  ].map((service) => (
                    <label key={service} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        name="servicesInterested"
                        value={service}
                        checked={formData.servicesInterested.includes(service)}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.servicesInterested.includes('Other') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Please Specify Other Services
                  </label>
                  <input
                    type="text"
                    name="otherServicesSpecify"
                    value={formData.otherServicesSpecify}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe the service you need"
                  />
                </div>
              )}

              {/* Website Development Fields */}
              {showWebsiteFields && (
                <div className="space-y-6 border-t pt-6">
                  <h3 className="text-xl font-semibold text-gray-800">Website Development Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website Type
                    </label>
                    <input
                      type="text"
                      name="websiteType"
                      value={formData.websiteType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., E-commerce, Portfolio, Corporate"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website Vision
                    </label>
                    <textarea
                      name="websiteVision"
                      value={formData.websiteVision}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your vision for the website"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Website Pages
                    </label>
                    <input
                      type="text"
                      name="websitePages"
                      value={formData.websitePages}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 5-10 pages, 10-20 pages"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand Guidelines Ready?
                    </label>
                    <select
                      name="brandGuidelinesReady"
                      value={formData.brandGuidelinesReady}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select option</option>
                      <option value="Yes, all ready">Yes, all ready</option>
                      <option value="Some elements are ready">Some elements are ready</option>
                      <option value="No, need assistance with this">No, need assistance with this</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specific Integrations Needed
                    </label>
                    <input
                      type="text"
                      name="specificIntegrations"
                      value={formData.specificIntegrations}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Payment gateway, CRM, Email marketing"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred CMS
                    </label>
                    <input
                      type="text"
                      name="preferredCMS"
                      value={formData.preferredCMS}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., WordPress, Shopify, Custom"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Call-to-Action (CTA)
                    </label>
                    <input
                      type="text"
                      name="primaryCTA"
                      value={formData.primaryCTA}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Buy Now, Contact Us, Sign Up"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website Purpose
                    </label>
                    <textarea
                      name="websitePurpose"
                      value={formData.websitePurpose}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What is the main purpose of your website?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Existing Website Status
                    </label>
                    <select
                      name="existingWebsite"
                      value={formData.existingWebsite}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select status</option>
                      <option value="No website">No website</option>
                      <option value="Outdated website">Outdated website</option>
                      <option value="Basic website needing improvement">Basic website needing improvement</option>
                      <option value="Modern website needing specific updates">Modern website needing specific updates</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Ongoing Maintenance Needed
                    </label>
                    <div className="space-y-2">
                      {[
                        'Content updates',
                        'Security monitoring and updates',
                        'Technical support and troubleshooting',
                        'Performance optimization',
                        'Backup and recovery',
                        'None/Not sure'
                      ].map((maintenance) => (
                        <label key={maintenance} className="flex items-center space-x-3 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            name="ongoingMaintenance"
                            value={maintenance}
                            checked={formData.ongoingMaintenance.includes(maintenance)}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{maintenance}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Social Media Marketing Fields */}
              {showSocialMediaFields && (
                <div className="space-y-6 border-t pt-6">
                  <h3 className="text-xl font-semibold text-gray-800">Social Media Marketing Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Social Media Platforms
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Facebook', 'Instagram', 'LinkedIn', 'Twitter (X)', 'YouTube', 'TikTok', 'Pinterest', 'Other'].map((platform) => (
                        <label key={platform} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            name="socialMediaPlatforms"
                            value={platform}
                            checked={formData.socialMediaPlatforms.includes(platform)}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{platform}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Social Media Goals
                    </label>
                    <textarea
                      name="socialMediaGoals"
                      value={formData.socialMediaGoals}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What do you want to achieve with social media?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Posting Frequency
                    </label>
                    <select
                      name="postingFrequency"
                      value={formData.postingFrequency}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select frequency</option>
                      <option value="Daily">Daily</option>
                      <option value="Multiple times a week">Multiple times a week</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Bi-weekly">Bi-weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Demographic
                    </label>
                    <textarea
                      name="targetDemographic"
                      value={formData.targetDemographic}
                      onChange={handleChange}
                      rows="2"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe your target audience demographics"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Content Type Preferences
                    </label>
                    <div className="space-y-2">
                      {[
                        'Promotional offers/product launches',
                        'Behind-the-scenes glimpses',
                        'Educational content/tips',
                        'Customer testimonials/case studies',
                        'Interactive polls/questions',
                        'User-generated content',
                        'News and industry updates'
                      ].map((content) => (
                        <label key={content} className="flex items-center space-x-3 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            name="contentType"
                            value={content}
                            checked={formData.contentType.includes(content)}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{content}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Digital Marketing/SEO Fields */}
              {showDigitalMarketingFields && (
                <div className="space-y-6 border-t pt-6">
                  <h3 className="text-xl font-semibold text-gray-800">Digital Marketing Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Marketing Challenges
                    </label>
                    <textarea
                      name="currentChallenges"
                      value={formData.currentChallenges}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What challenges are you facing with your current marketing?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Important KPIs
                    </label>
                    <div className="space-y-2">
                      {[
                        'Website traffic',
                        'Lead conversions',
                        'Sales revenue',
                        'Brand mentions/awareness',
                        'Return on ad spend (ROAS)',
                        'Search engine rankings',
                        'Social media engagement'
                      ].map((kpi) => (
                        <label key={kpi} className="flex items-center space-x-3 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            name="kpisImportant"
                            value={kpi}
                            checked={formData.kpisImportant.includes(kpi)}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{kpi}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Competitors You Admire
                    </label>
                    <input
                      type="text"
                      name="competitorsAdmire"
                      value={formData.competitorsAdmire}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="List competitors whose marketing you admire"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unique Selling Proposition (USP)
                    </label>
                    <textarea
                      name="uniqueSellingProposition"
                      value={formData.uniqueSellingProposition}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="What makes your business unique?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Geographic Target
                    </label>
                    <select
                      name="geographicTarget"
                      value={formData.geographicTarget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select target area</option>
                      <option value="Local (e.g., city, region)">Local (e.g., city, region)</option>
                      <option value="National">National</option>
                      <option value="International">International</option>
                      <option value="Not applicable">Not applicable</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Project Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Details</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <input
                  type="text"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., $5,000 - $10,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Start Date
                </label>
                <input
                  type="date"
                  name="preferredStartDate"
                  value={formData.preferredStartDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Timeframe
                </label>
                <input
                  type="text"
                  name="expectedTimeframe"
                  value={formData.expectedTimeframe}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 2-3 months"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Deadline
                </label>
                <select
                  name="projectDeadline"
                  value={formData.projectDeadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select deadline type</option>
                  <option value="Specific deadline">Specific deadline</option>
                  <option value="Flexible timeframe">Flexible timeframe</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Urgency (1-5)
                </label>
                <input
                  type="range"
                  name="urgencyRating"
                  min="1"
                  max="5"
                  value={formData.urgencyRating}
                  onChange={handleChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Not Urgent</span>
                  <span className="font-semibold text-blue-600">{formData.urgencyRating}</span>
                  <span>Very Urgent</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proposal Importance (1-10)
                </label>
                <input
                  type="range"
                  name="proposalImportance"
                  min="1"
                  max="10"
                  value={formData.proposalImportance}
                  onChange={handleChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Less Important</span>
                  <span className="font-semibold text-blue-600">{formData.proposalImportance}</span>
                  <span>Very Important</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Involvement Level (1-5)
                </label>
                <input
                  type="range"
                  name="involvementLevel"
                  min="1"
                  max="5"
                  value={formData.involvementLevel}
                  onChange={handleChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Hands-off</span>
                  <span className="font-semibold text-blue-600">{formData.involvementLevel}</span>
                  <span>Very Involved</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Clarity Rating (1-5)
                </label>
                <input
                  type="range"
                  name="clarityRating"
                  min="1"
                  max="5"
                  value={formData.clarityRating}
                  onChange={handleChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>Still Exploring</span>
                  <span className="font-semibold text-blue-600">{formData.clarityRating}</span>
                  <span>Very Clear</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <textarea
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your target audience"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Visual Style Preference
                </label>
                <input
                  type="text"
                  name="visualStyle"
                  value={formData.visualStyle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Modern, Minimalist, Bold, Professional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Design Inspiration
                </label>
                <textarea
                  name="designInspiration"
                  value={formData.designInspiration}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share links or describe designs you like"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Additional Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Additional Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preferred Communication Methods
                </label>
                <div className="space-y-2">
                  {['Email', 'Phone Call', 'Video Conference (e.g., Google Meet, Zoom)', 'Project Management Tool (e.g., Asana, Trello)', 'Chat Application (e.g., Slack, Microsoft Teams)'].map((method) => (
                    <label key={method} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        name="preferredCommunication"
                        value={method}
                        checked={formData.preferredCommunication.includes(method)}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Existing Marketing Materials
                </label>
                <select
                  name="existingMarketingMaterials"
                  value={formData.existingMarketingMaterials}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select option</option>
                  <option value="Yes, all ready">Yes, all ready</option>
                  <option value="Some elements are ready">Some elements are ready</option>
                  <option value="No, need assistance with this">No, need assistance with this</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Results
                </label>
                <textarea
                  name="expectedResults"
                  value={formData.expectedResults}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What results do you expect from this project?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Digital Marketing Familiarity
                </label>
                <select
                  name="digitalMarketingFamiliarity"
                  value={formData.digitalMarketingFamiliarity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your familiarity level</option>
                  <option value="Not at all familiar">Not at all familiar</option>
                  <option value="Slightly familiar">Slightly familiar</option>
                  <option value="Moderately familiar">Moderately familiar</option>
                  <option value="Very familiar">Very familiar</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Partnership Factors</h3>
                <p className="text-sm text-gray-600 mb-4">Rate the importance of these factors in choosing a partner:</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transparent Reporting
                    </label>
                    <select
                      name="partnershipFactors.transparentReporting"
                      value={formData.partnershipFactors.transparentReporting}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select importance</option>
                      <option value="Very Important">Very Important</option>
                      <option value="Important">Important</option>
                      <option value="Less Important">Less Important</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proactive Communication
                    </label>
                    <select
                      name="partnershipFactors.proactiveCommunication"
                      value={formData.partnershipFactors.proactiveCommunication}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select importance</option>
                      <option value="Very Important">Very Important</option>
                      <option value="Important">Important</option>
                      <option value="Less Important">Less Important</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data-Driven Strategies
                    </label>
                    <select
                      name="partnershipFactors.dataDrivenStrategies"
                      value={formData.partnershipFactors.dataDrivenStrategies}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select importance</option>
                      <option value="Very Important">Very Important</option>
                      <option value="Important">Important</option>
                      <option value="Less Important">Less Important</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Long-Term Partnership Potential
                    </label>
                    <select
                      name="partnershipFactors.longTermPartnership"
                      value={formData.partnershipFactors.longTermPartnership}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select importance</option>
                      <option value="Very Important">Very Important</option>
                      <option value="Important">Important</option>
                      <option value="Less Important">Less Important</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How Did You Hear About Us?
                </label>
                <select
                  name="hearAboutUs"
                  value={formData.hearAboutUs}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select an option</option>
                  <option value="Search Engine (Google, Bing, etc.)">Search Engine (Google, Bing, etc.)</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Referral">Referral</option>
                  <option value="Online Advertisement">Online Advertisement</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments
                </label>
                <textarea
                  name="additionalComments"
                  value={formData.additionalComments}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any additional information you'd like to share..."
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  ← Previous
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {loading ? 'Submitting...' : 'Submit Form'}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Contact Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
            <p className="text-gray-600 text-sm">info.inextets@gmail.com</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
            <p className="text-gray-600 text-sm">+91 9981122493</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Response Time</h3>
            <p className="text-gray-600 text-sm">24-48 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}
