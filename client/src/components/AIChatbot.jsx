'use client';

import { useState } from 'react';
import { BASE_URL } from '@/config/api';
import { 
  FaRobot, 
  FaTimes, 
  FaPaperPlane, 
  FaCheckCircle, 
  FaUser, 
  FaEnvelope, 
  FaPhone 
} from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: '',
    budget: '',
    timeline: '',
    projectDetails: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const chatFlow = [
    {
      question: "Hi! 👋 I'm your AI assistant. What service are you interested in?",
      options: [
        "Web Development",
        "Mobile App Development",
        "Digital Marketing",
        "UI/UX Design",
        "SEO Services",
        "Social Media Marketing",
        "AI & ML Services",
        "Cyber Security"
      ],
      field: 'serviceInterest'
    },
    {
      question: "Great choice! What's your budget range?",
      options: [
        "Under ₹50,000",
        "₹50,000 - ₹1,00,000",
        "₹1,00,000 - ₹3,00,000",
        "₹3,00,000 - ₹5,00,000",
        "Above ₹5,00,000",
        "Not sure yet"
      ],
      field: 'budget'
    },
    {
      question: "When do you want to start the project?",
      options: [
        "Immediately",
        "Within 1 month",
        "1-3 months",
        "3-6 months",
        "Just exploring"
      ],
      field: 'timeline'
    },
    {
      question: "Tell us briefly about your project requirements:",
      type: 'textarea',
      field: 'projectDetails'
    },
    {
      question: "Almost done! Please share your contact details:",
      type: 'form',
      fields: ['name', 'email', 'phone']
    }
  ];

  const handleOptionClick = (option, field) => {
    setFormData(prev => ({ ...prev, [field]: option }));
    
    // Add user answer to history
    setConversationHistory(prev => [
      ...prev,
      { type: 'bot', text: chatFlow[step].question },
      { type: 'user', text: option }
    ]);

    if (step < chatFlow.length - 1) {
      setStep(step + 1);
    }
  };

  const handleTextSubmit = (text, field) => {
    if (!text.trim()) return;

    setFormData(prev => ({ ...prev, [field]: text }));
    
    setConversationHistory(prev => [
      ...prev,
      { type: 'bot', text: chatFlow[step].question },
      { type: 'user', text: text }
    ]);

    if (step < chatFlow.length - 1) {
      setStep(step + 1);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill all contact fields');
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading('Submitting your inquiry...');

    try {
      const response = await fetch(`${BASE_URL}/chatbot/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast.update(toastId, {
          render: 'Inquiry submitted successfully! Our team will contact you.',
          type: 'success',
          isLoading: false,
          autoClose: 3000
        });
        setStep(step + 1); // Show success message
      } else {
        toast.update(toastId, {
          render: data.message || 'Failed to submit',
          type: 'error',
          isLoading: false,
          autoClose: 3000
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.update(toastId, {
        render: 'Failed to submit inquiry',
        type: 'error',
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resetChat = () => {
    setStep(0);
    setConversationHistory([]);
    setFormData({
      name: '',
      email: '',
      phone: '',
      serviceInterest: '',
      budget: '',
      timeline: '',
      projectDetails: ''
    });
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          suppressHydrationWarning
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group"
          aria-label="Open AI Assistant"
        >
          <FaRobot className="text-2xl sm:text-3xl text-white group-hover:scale-105 transition-transform" />
          
          {/* Tooltip */}
          <div className="hidden sm:block absolute right-16 bg-gray-900 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg">
            Chat with AI Assistant
            <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[380px] max-w-[420px] h-[min(580px,calc(100vh-80px))] bg-white rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3.5 sm:p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <FaRobot className="text-lg sm:text-xl text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-xs sm:text-sm">AI Assistant</h3>
                <p className="text-[10px] sm:text-xs text-blue-100">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-lg transition-all"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 bg-slate-50 space-y-3">
            {/* Conversation History */}
            {conversationHistory.map((item, index) => (
              <div key={index} className="space-y-1.5">
                {item.type === 'bot' ? (
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaRobot className="text-white text-xs" />
                    </div>
                    <div className="bg-white p-2.5 sm:p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[85%]">
                      <p className="text-xs sm:text-sm text-slate-800">{item.text}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="bg-blue-600 text-white p-2.5 sm:p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%]">
                      <p className="text-xs sm:text-sm">{item.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Current Step Question */}
            {step < chatFlow.length && (
              <div className="space-y-2.5">
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaRobot className="text-white text-xs" />
                  </div>
                  <div className="bg-white p-2.5 sm:p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 max-w-[85%]">
                    <p className="text-xs sm:text-sm text-slate-800">{chatFlow[step].question}</p>
                  </div>
                </div>

                {/* Options */}
                {chatFlow[step].options && (
                  <div className="pl-9 space-y-1.5">
                    {chatFlow[step].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(option, chatFlow[step].field)}
                        className="w-full text-left px-3 py-2 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 rounded-xl transition-all text-xs sm:text-sm font-medium text-slate-700 hover:text-blue-600 shadow-sm"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {/* Textarea */}
                {chatFlow[step].type === 'textarea' && (
                  <div className="pl-9 space-y-2">
                    <textarea
                      rows="3"
                      placeholder="Type your requirements here..."
                      className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm outline-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleTextSubmit(e.target.value, chatFlow[step].field);
                        }
                      }}
                    />
                    <button
                      onClick={(e) => {
                        const textarea = e.target.closest('div').querySelector('textarea');
                        if (textarea) handleTextSubmit(textarea.value, chatFlow[step].field);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md hover:bg-blue-700 transition-all"
                    >
                      <FaPaperPlane className="text-xs" />
                      <span>Send</span>
                    </button>
                  </div>
                )}

                {/* Contact Form */}
                {chatFlow[step].type === 'form' && (
                  <form onSubmit={handleFinalSubmit} className="pl-9 space-y-2">
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs" />
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm outline-none"
                      />
                    </div>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs" />
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm outline-none"
                      />
                    </div>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-xs" />
                      <input
                        type="tel"
                        placeholder="Your Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                      <FaPaperPlane className="text-xs" />
                      <span>{submitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Success Message */}
            {step >= chatFlow.length && (
              <div className="text-center py-6 px-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaCheckCircle className="text-2xl text-green-600" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Thank You!</h3>
                <p className="text-xs text-slate-600 mb-4">
                  We've received your inquiry. Our team will contact you within 24 hours.
                </p>
                <button
                  onClick={resetChat}
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-all shadow-sm"
                >
                  Start New Chat
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 bg-white border-t border-slate-100 flex-shrink-0">
            <p className="text-[10px] text-center text-slate-400 font-medium">
              Powered by I Next ETS AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}
