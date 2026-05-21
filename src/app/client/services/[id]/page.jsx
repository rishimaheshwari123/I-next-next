'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { EMPLOYEE_API } from '@/config/api';
import {
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaFileAlt,
  FaTimes,
  FaGlobe,
  FaMobile,
  FaBullhorn,
  FaUsers,
  FaChartLine,
  FaPalette,
  FaShoppingCart,
  FaPencilRuler,
  FaServer,
  FaShieldAlt,
  FaTachometerAlt,
  FaHeadset,
  FaTools,
  FaCalendarAlt,
  FaRedo,
  FaDatabase,
  FaCode,
  FaStore,
  FaSearch,
  FaChartBar,
  FaAd,
  FaShareAlt,
  FaEdit,
  FaUserCheck,
  FaComments,
  FaFileContract,
  FaMagic,
  FaEye,
  FaUniversalAccess,
  FaBoxes,
  FaCreditCard,
  FaTruck,
  FaTag,
  FaBook,
  FaPaintBrush,
  FaImage,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function ServiceDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = params.id;

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    message: '',
    requirements: '',
  });

  useEffect(() => {
    fetchService();
  }, [serviceId]);

  const fetchService = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch(EMPLOYEE_API.GET_SERVICE(serviceId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setService(data.data);
      } else {
        toast.error('Failed to load service');
      }
    } catch (error) {
      console.error('Error fetching service:', error);
      toast.error('Failed to load service details');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenInquiryModal = (variant) => {
    setSelectedVariant(variant);
    setFormData({ message: '', requirements: '' });
    setShowInquiryModal(true);
  };

  const handleCloseInquiryModal = () => {
    setShowInquiryModal(false);
    setSelectedVariant(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();

    if (!formData.message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(EMPLOYEE_API.CREATE_INQUIRY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceId,
          variantName: selectedVariant.name,
          variantAmount: selectedVariant.amount,
          message: formData.message,
          requirements: formData.requirements,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Inquiry submitted successfully! We will contact you soon.');
        handleCloseInquiryModal();
      } else {
        toast.error(data.message || 'Failed to submit inquiry');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Failed to submit inquiry');
    } finally {
      setSubmitting(false);
    }
  };

  // Helper function to render variant details based on category
  const renderVariantDetails = (variant, category) => {
    const details = [];

    // Web Development Fields
    if (category === 'Web Development') {
      if (variant.pages) {
        details.push({ icon: FaFileAlt, label: 'Pages', value: variant.pages });
      }
      if (variant.seo !== undefined) {
        details.push({ icon: FaSearch, label: 'SEO Optimization', value: variant.seo ? 'Yes' : 'No', highlight: variant.seo });
      }
      if (variant.ssl !== undefined) {
        details.push({ icon: FaShieldAlt, label: 'SSL Certificate', value: variant.ssl ? 'Yes' : 'No', highlight: variant.ssl });
      }
      if (variant.speed) {
        details.push({ icon: FaTachometerAlt, label: 'Speed Optimization', value: variant.speed });
      }
      if (variant.responsive !== undefined) {
        details.push({ icon: FaMobile, label: 'Responsive Design', value: variant.responsive ? 'Yes' : 'No', highlight: variant.responsive });
      }
      if (variant.hosting) {
        details.push({ icon: FaServer, label: 'Hosting', value: `${variant.hosting} months` });
      }
      if (variant.support) {
        details.push({ icon: FaHeadset, label: 'Support', value: `${variant.support} months` });
      }
      if (variant.maintenance) {
        details.push({ icon: FaTools, label: 'Maintenance', value: `${variant.maintenance} months` });
      }
      if (variant.timeline) {
        details.push({ icon: FaClock, label: 'Timeline', value: variant.timeline });
      }
      if (variant.revisions) {
        details.push({ icon: FaRedo, label: 'Revisions', value: variant.revisions });
      }
    }

    // Mobile App Development Fields
    if (category === 'Mobile App Development') {
      if (variant.platform && variant.platform.length > 0) {
        details.push({ icon: FaMobile, label: 'Platform', value: variant.platform.join(', ') });
      }
      if (variant.screens) {
        details.push({ icon: FaMobile, label: 'Screens', value: variant.screens });
      }
      if (variant.uiux !== undefined) {
        details.push({ icon: FaPalette, label: 'UI/UX Design', value: variant.uiux ? 'Included' : 'Not Included', highlight: variant.uiux });
      }
      if (variant.appStore !== undefined) {
        details.push({ icon: FaStore, label: 'App Store Deployment', value: variant.appStore ? 'Yes' : 'No', highlight: variant.appStore });
      }
      if (variant.api !== undefined) {
        details.push({ icon: FaCode, label: 'API Integration', value: variant.api ? 'Yes' : 'No', highlight: variant.api });
      }
      if (variant.database !== undefined) {
        details.push({ icon: FaDatabase, label: 'Database', value: variant.database ? 'Included' : 'Not Included', highlight: variant.database });
      }
      if (variant.timeline) {
        details.push({ icon: FaClock, label: 'Timeline', value: variant.timeline });
      }
      if (variant.support) {
        details.push({ icon: FaHeadset, label: 'Support', value: `${variant.support} months` });
      }
      if (variant.revisions) {
        details.push({ icon: FaRedo, label: 'Revisions', value: variant.revisions });
      }
    }

    // Digital Marketing Fields
    if (category === 'Digital Marketing') {
      if (variant.type && variant.type.length > 0) {
        details.push({ icon: FaBullhorn, label: 'Campaign Type', value: variant.type.join(', ') });
      }
      if (variant.budget) {
        details.push({ icon: FaChartLine, label: 'Budget', value: `₹${variant.budget.toLocaleString('en-IN')}` });
      }
      if (variant.keywords) {
        details.push({ icon: FaSearch, label: 'Keywords', value: variant.keywords });
      }
      if (variant.reporting !== undefined) {
        details.push({ icon: FaChartBar, label: 'Reporting', value: variant.reporting ? 'Yes' : 'No', highlight: variant.reporting });
      }
      if (variant.metrics !== undefined) {
        details.push({ icon: FaChartBar, label: 'Metrics Tracking', value: variant.metrics ? 'Yes' : 'No', highlight: variant.metrics });
      }
      if (variant.analytics !== undefined) {
        details.push({ icon: FaChartLine, label: 'Analytics', value: variant.analytics ? 'Yes' : 'No', highlight: variant.analytics });
      }
      if (variant.optimization !== undefined) {
        details.push({ icon: FaTachometerAlt, label: 'Optimization', value: variant.optimization ? 'Yes' : 'No', highlight: variant.optimization });
      }
      if (variant.ctr) {
        details.push({ icon: FaChartLine, label: 'Target CTR', value: `${variant.ctr}%` });
      }
      if (variant.roi) {
        details.push({ icon: FaChartLine, label: 'Expected ROI', value: `${variant.roi}%` });
      }
      if (variant.timeline) {
        details.push({ icon: FaClock, label: 'Timeline', value: variant.timeline });
      }
    }

    // Social Media Marketing Fields
    if (category === 'Social Media Marketing') {
      if (variant.platforms && variant.platforms.length > 0) {
        details.push({ icon: FaShareAlt, label: 'Platforms', value: variant.platforms.join(', ') });
      }
      if (variant.postsPerWeek) {
        details.push({ icon: FaEdit, label: 'Posts Per Week', value: variant.postsPerWeek });
      }
      if (variant.contentCalendar !== undefined) {
        details.push({ icon: FaCalendarAlt, label: 'Content Calendar', value: variant.contentCalendar ? 'Yes' : 'No', highlight: variant.contentCalendar });
      }
      if (variant.contentCreation !== undefined) {
        details.push({ icon: FaEdit, label: 'Content Creation', value: variant.contentCreation ? 'Yes' : 'No', highlight: variant.contentCreation });
      }
      if (variant.engagement !== undefined) {
        details.push({ icon: FaUsers, label: 'Engagement', value: variant.engagement ? 'Yes' : 'No', highlight: variant.engagement });
      }
      if (variant.communityMgmt !== undefined) {
        details.push({ icon: FaComments, label: 'Community Management', value: variant.communityMgmt ? 'Yes' : 'No', highlight: variant.communityMgmt });
      }
      if (variant.reports !== undefined) {
        details.push({ icon: FaChartBar, label: 'Reports', value: variant.reports ? 'Yes' : 'No', highlight: variant.reports });
      }
      if (variant.adSpend) {
        details.push({ icon: FaAd, label: 'Ad Spend', value: `₹${variant.adSpend.toLocaleString('en-IN')}` });
      }
      if (variant.timeline) {
        details.push({ icon: FaClock, label: 'Timeline', value: variant.timeline });
      }
    }

    // Lead Generation Fields
    if (category === 'Lead Generation') {
      if (variant.campaignType && variant.campaignType.length > 0) {
        details.push({ icon: FaBullhorn, label: 'Campaign Type', value: variant.campaignType.join(', ') });
      }
      if (variant.targetLeads) {
        details.push({ icon: FaUsers, label: 'Target Leads', value: variant.targetLeads });
      }
      if (variant.cpl) {
        details.push({ icon: FaChartLine, label: 'Cost Per Lead', value: `₹${variant.cpl}` });
      }
      if (variant.leadQuality) {
        details.push({ icon: FaUserCheck, label: 'Lead Quality Score', value: `${variant.leadQuality}/10` });
      }
      if (variant.leadTracking !== undefined) {
        details.push({ icon: FaChartBar, label: 'Lead Tracking', value: variant.leadTracking ? 'Yes' : 'No', highlight: variant.leadTracking });
      }
      if (variant.crmIntegration !== undefined) {
        details.push({ icon: FaDatabase, label: 'CRM Integration', value: variant.crmIntegration ? 'Yes' : 'No', highlight: variant.crmIntegration });
      }
      if (variant.automation !== undefined) {
        details.push({ icon: FaMagic, label: 'Automation', value: variant.automation ? 'Yes' : 'No', highlight: variant.automation });
      }
      if (variant.timeline) {
        details.push({ icon: FaClock, label: 'Timeline', value: variant.timeline });
      }
    }

    // UI/UX Design Fields
    if (category === 'UI/UX Design') {
      if (variant.designType) {
        details.push({ icon: FaPalette, label: 'Design Type', value: variant.designType });
      }
      if (variant.screens) {
        details.push({ icon: FaMobile, label: 'Screens', value: variant.screens });
      }
      if (variant.wireframes !== undefined) {
        details.push({ icon: FaPencilRuler, label: 'Wireframes', value: variant.wireframes ? 'Yes' : 'No', highlight: variant.wireframes });
      }
      if (variant.prototype !== undefined) {
        details.push({ icon: FaMobile, label: 'Prototype', value: variant.prototype ? 'Yes' : 'No', highlight: variant.prototype });
      }
      if (variant.designSystem !== undefined) {
        details.push({ icon: FaBoxes, label: 'Design System', value: variant.designSystem ? 'Yes' : 'No', highlight: variant.designSystem });
      }
      if (variant.userResearch !== undefined) {
        details.push({ icon: FaUsers, label: 'User Research', value: variant.userResearch ? 'Yes' : 'No', highlight: variant.userResearch });
      }
      if (variant.usability !== undefined) {
        details.push({ icon: FaEye, label: 'Usability Testing', value: variant.usability ? 'Yes' : 'No', highlight: variant.usability });
      }
      if (variant.accessibility !== undefined) {
        details.push({ icon: FaUniversalAccess, label: 'Accessibility', value: variant.accessibility ? 'Yes' : 'No', highlight: variant.accessibility });
      }
      if (variant.timeline) {
        details.push({ icon: FaClock, label: 'Timeline', value: variant.timeline });
      }
      if (variant.revisions) {
        details.push({ icon: FaRedo, label: 'Revisions', value: variant.revisions });
      }
    }

    // E-commerce Solutions Fields
    if (category === 'E-commerce Solutions') {
      if (variant.pages) {
        details.push({ icon: FaFileAlt, label: 'Pages', value: variant.pages });
      }
      if (variant.products) {
        details.push({ icon: FaShoppingCart, label: 'Products', value: variant.products });
      }
      if (variant.categories) {
        details.push({ icon: FaTag, label: 'Categories', value: variant.categories });
      }
      if (variant.paymentGateways) {
        details.push({ icon: FaCreditCard, label: 'Payment Gateways', value: variant.paymentGateways });
      }
      if (variant.inventory !== undefined) {
        details.push({ icon: FaBoxes, label: 'Inventory Management', value: variant.inventory ? 'Yes' : 'No', highlight: variant.inventory });
      }
      if (variant.shipping !== undefined) {
        details.push({ icon: FaTruck, label: 'Shipping Integration', value: variant.shipping ? 'Yes' : 'No', highlight: variant.shipping });
      }
      if (variant.ssl !== undefined) {
        details.push({ icon: FaShieldAlt, label: 'SSL Certificate', value: variant.ssl ? 'Yes' : 'No', highlight: variant.ssl });
      }
      if (variant.responsive !== undefined) {
        details.push({ icon: FaMobile, label: 'Responsive Design', value: variant.responsive ? 'Yes' : 'No', highlight: variant.responsive });
      }
      if (variant.hosting) {
        details.push({ icon: FaServer, label: 'Hosting', value: `${variant.hosting} months` });
      }
      if (variant.support) {
        details.push({ icon: FaHeadset, label: 'Support', value: `${variant.support} months` });
      }
      if (variant.timeline) {
        details.push({ icon: FaClock, label: 'Timeline', value: variant.timeline });
      }
    }

    // Branding & Logo Design Fields
    if (category === 'Branding & Logo Design') {
      if (variant.packageType) {
        details.push({ icon: FaTag, label: 'Package Type', value: variant.packageType });
      }
      if (variant.logoVariations) {
        details.push({ icon: FaPaintBrush, label: 'Logo Variations', value: variant.logoVariations });
      }
      if (variant.logoFormats && variant.logoFormats.length > 0) {
        details.push({ icon: FaImage, label: 'Logo Formats', value: variant.logoFormats.join(', ') });
      }
      if (variant.brandGuide !== undefined) {
        details.push({ icon: FaBook, label: 'Brand Guide', value: variant.brandGuide ? 'Yes' : 'No', highlight: variant.brandGuide });
      }
      if (variant.colorPalette !== undefined) {
        details.push({ icon: FaPalette, label: 'Color Palette', value: variant.colorPalette ? 'Yes' : 'No', highlight: variant.colorPalette });
      }
      if (variant.brandStory !== undefined) {
        details.push({ icon: FaFileContract, label: 'Brand Story', value: variant.brandStory ? 'Yes' : 'No', highlight: variant.brandStory });
      }
      if (variant.collateral !== undefined) {
        details.push({ icon: FaFileAlt, label: 'Marketing Collateral', value: variant.collateral ? 'Yes' : 'No', highlight: variant.collateral });
      }
      if (variant.socialTemplates !== undefined) {
        details.push({ icon: FaShareAlt, label: 'Social Templates', value: variant.socialTemplates ? 'Yes' : 'No', highlight: variant.socialTemplates });
      }
      if (variant.timeline) {
        details.push({ icon: FaClock, label: 'Timeline', value: variant.timeline });
      }
      if (variant.revisions) {
        details.push({ icon: FaRedo, label: 'Revisions', value: variant.revisions });
      }
    }

    return details;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Service not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all"
        >
          <FaArrowLeft className="text-2xl text-gray-600" />
        </button>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{service.serviceName}</h1>
          <p className="text-gray-600 mt-1">{service.category}</p>
        </div>
      </div>

      {/* Service Description */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Service</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{service.description}</p>
      </div>

      {/* Variants */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Packages</h2>
        {!service.variants || service.variants.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-md">
            <p className="text-gray-500 text-lg">No packages available for this service</p>
          </div>
        ) : (
          <div className="space-y-8">
            {service.variants.map((variant, idx) => {
              const variantDetails = renderVariantDetails(variant, service.category);
              
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden hover:shadow-3xl hover:border-blue-300 transition-all duration-300"
                >
                  {/* Header Section */}
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-grow">
                        <h3 className="text-3xl font-extrabold text-white mb-2">{variant.name}</h3>
                        {variant.description && (
                          <p className="text-blue-100 text-base leading-relaxed max-w-3xl">
                            {variant.description}
                          </p>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 border-2 border-white/30">
                          <p className="text-white/90 text-sm font-semibold mb-1">Package Price</p>
                          <p className="text-5xl font-extrabold text-white">
                            ₹{variant.amount.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8">
                    {/* Package Details Section */}
                    {variantDetails.length > 0 && (
                      <div className="mb-8">
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                          <h4 className="text-xl font-bold text-gray-900">Package Details</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {variantDetails.map((detail, detailIdx) => {
                            const Icon = detail.icon;
                            return (
                              <div
                                key={detailIdx}
                                className={`group relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${
                                  detail.highlight
                                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 hover:shadow-lg hover:scale-105'
                                    : 'bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-200 hover:shadow-md hover:border-blue-300'
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                                    detail.highlight 
                                      ? 'bg-green-500 text-white' 
                                      : 'bg-blue-500 text-white'
                                  }`}>
                                    <Icon className="text-lg" />
                                  </div>
                                  <div className="flex-grow min-w-0">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                      {detail.label}
                                    </p>
                                    <p className={`text-base font-bold truncate ${
                                      detail.highlight ? 'text-green-700' : 'text-gray-900'
                                    }`}>
                                      {detail.value}
                                    </p>
                                  </div>
                                </div>
                                {detail.highlight && (
                                  <div className="absolute top-2 right-2">
                                    <FaCheckCircle className="text-green-500 text-sm" />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Features Section */}
                    {variant.features && variant.features.length > 0 && (
                      <div className="mb-8">
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-1 h-6 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></div>
                          <h4 className="text-xl font-bold text-gray-900">Features Included</h4>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {variant.features.map((feature, featureIdx) => (
                              <div
                                key={featureIdx}
                                className="flex items-start gap-3 group bg-white rounded-lg p-3 hover:shadow-md transition-all"
                              >
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                                  <FaCheckCircle className="text-white text-sm" />
                                </div>
                                <span className="text-gray-800 leading-relaxed font-medium text-sm">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-6 border-t-2 border-gray-100">
                      <button
                        onClick={() => handleOpenInquiryModal(variant)}
                        className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
                      >
                        <FaBullhorn className="text-xl group-hover:rotate-12 transition-transform" />
                        Send Inquiry for this Package
                        <FaArrowLeft className="text-lg rotate-180 group-hover:translate-x-2 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && selectedVariant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex justify-between items-center sticky top-0">
              <h2 className="text-2xl font-bold">Send Inquiry</h2>
              <button
                onClick={handleCloseInquiryModal}
                className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitInquiry} className="p-6 space-y-4">
              {/* Service Info */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600">Service</p>
                <p className="font-bold text-gray-900">{service.serviceName}</p>
                <p className="text-sm text-gray-600 mt-2">Variant</p>
                <p className="font-bold text-gray-900">{selectedVariant.name}</p>
                <p className="text-sm text-gray-600 mt-2">Amount</p>
                <p className="font-bold text-blue-600 text-lg">
                  ₹{selectedVariant.amount.toLocaleString('en-IN')}
                </p>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project or inquiry..."
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Requirements
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  placeholder="Any specific requirements or details..."
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseInquiryModal}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
