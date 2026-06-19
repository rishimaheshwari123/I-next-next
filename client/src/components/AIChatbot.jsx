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
    setFormData({ ...formData, [field]: option });
    setConversationHistory([
      ...conversationHistory,
      { question: chatFlow[step].question, answer: option }
    ]);
    setStep(step + 1);
  };

  const handleTextSubmit = (value, field) => {
    if (!value.trim()) {
      toast.error('Please provide an answer');
      return;
    }
    setFormData({ ...formData, [field]: value });
    setConversationHistory([
      ...conversationHistory,
      { question: chatFlow[step].question, answer: value }
    ]);
    setStep(step + 1);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill all contact details');
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading('Submitting your inquiry...');

    try {
      const response = await fetch(`${BASE_URL}/chatbot/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          conversationHistory: [
            ...conversationHistory,
            { 
              question: "Contact Details", 
              answer: `Name: ${formData.name}, Email: ${formData.email}, Phone: ${formData.phone}` 
            }
          ]
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.update(toastId, {
          render: 'Thank you! We will contact you soon.',
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
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-16 right-4 z-50 w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 animate-bounce"
        >
          <FaRobot className="text-5xl text-white" />
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <FaRobot className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold">AI Assistant</h3>
                <p className="text-xs text-blue-100">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {/* Conversation History */}
            {conversationHistory.map((item, index) => (
              <div key={index} className="mb-4">
                {/* Bot Question */}
                <div className="flex items-start gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaRobot className="text-white text-sm" />
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                    <p className="text-sm text-gray-800">{item.question}</p>
                  </div>
                </div>
                {/* User Answer */}
                <div className="flex justify-end mb-2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg shadow-sm max-w-[80%]">
                    <p className="text-sm text-white">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Current Question */}
            {step < chatFlow.length && (
              <div className="mb-4">
                <div className="flex items-start gap-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaRobot className="text-white text-sm" />
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                    <p className="text-sm text-gray-800">{chatFlow[step].question}</p>
                  </div>
                </div>

                {/* Options */}
                {chatFlow[step].options && (
                  <div className="space-y-2 ml-10">
                    {chatFlow[step].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(option, chatFlow[step].field)}
                        className="w-full text-left px-4 py-2 bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400 rounded-lg transition-all text-sm font-medium text-gray-700 hover:text-blue-600"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {/* Textarea */}
                {chatFlow[step].type === 'textarea' && (
                  <div className="ml-10">
                    <textarea
                      rows="4"
                      placeholder="Type your answer here..."
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleTextSubmit(e.target.value, chatFlow[step].field);
                        }
                      }}
                    />
                    <button
                      onClick={(e) => {
                        const textarea = e.target.previousSibling;
                        handleTextSubmit(textarea.value, chatFlow[step].field);
                      }}
                      className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all text-sm flex items-center gap-2"
                    >
                      <FaPaperPlane />
                      Send
                    </button>
                  </div>
                )}

                {/* Contact Form */}
                {chatFlow[step].type === 'form' && (
                  <form onSubmit={handleFinalSubmit} className="ml-10 space-y-3">
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="Your Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <FaPaperPlane />
                      {submitting ? 'Submitting...' : 'Submit'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Success Message */}
            {step >= chatFlow.length && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-4xl text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-sm text-gray-600 mb-4">
                  We've received your inquiry. Our team will contact you within 24 hours.
                </p>
                <button
                  onClick={resetChat}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all text-sm"
                >
                  Start New Chat
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-100 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              Powered by I Next ETS AI
            </p>
          </div>
        </div>
      )}
    </>
  );
}
