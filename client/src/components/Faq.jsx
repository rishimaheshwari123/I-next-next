"use client";
import React, { useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { FaQuestionCircle } from "react-icons/fa";
import { faq } from "./cardData";

const Faq = () => {
  const [faqState, setFaqState] = useState(faq.map(() => false));

  const handleClick = (index) => {
    setFaqState((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <section className="py-10 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <FaQuestionCircle className="w-8 h-8 text-blue-600" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We hope these questions and answers help you find the best digital
            transformation partner for your business.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faq.map((currElem, index) => (
            <div
              key={currElem.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Question Header */}
              <button
                onClick={() => handleClick(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-gray-50 transition-colors duration-200 group"
              >
                <div className="flex items-start gap-4 flex-1">
                  {/* Icon Button */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      faqState[index]
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                        : "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
                    }`}
                  >
                    {faqState[index] ? (
                      <HiMinus className="w-6 h-6" />
                    ) : (
                      <HiPlus className="w-6 h-6" />
                    )}
                  </div>

                  {/* Question Text */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 pr-4">
                    {currElem.title}
                  </h3>
                </div>

                {/* Indicator Badge */}
                <div
                  className={`flex-shrink-0 w-2 h-2 rounded-full transition-all duration-300 ${
                    faqState[index] ? "bg-blue-600 scale-150" : "bg-gray-300"
                  }`}
                ></div>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  faqState[index]
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <div className="pl-16 pr-4">
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        {currElem.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl p-8 md:p-10 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-blue-50 mb-6 text-lg">
              Our team is here to help you with any queries you may have.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Contact Us Now
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
