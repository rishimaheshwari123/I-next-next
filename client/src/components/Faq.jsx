"use client";

import React, { useState } from "react";
import { HiPlus, HiMinus } from "react-icons/hi";
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
    <section className="pb-14 sm:pb-18 lg:pb-22 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-1.5 h-5 sm:h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></span>
            <span className="text-blue-600 text-[11px] sm:text-xs font-extrabold uppercase tracking-widest">
              FAQ Helpdesk
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 sm:mb-3 tracking-tight">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-500 max-w-xl mx-auto font-medium leading-relaxed">
            We hope these questions and answers help you find the best digital
            transformation partner for your business.
          </p>
        </div>

        {/* FAQ Items Stacking Card Track */}
        <div className="relative space-y-3 sm:space-y-4">
          {faq.map((currElem, index) => (
            <div
              key={currElem.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition-all duration-300 overflow-hidden"
            >
              {/* Question Header */}
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => handleClick(index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left hover:bg-slate-50/60 transition-colors duration-200 group gap-3"
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  {/* Icon Button */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${faqState[index]
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
                      }`}
                  >
                    {faqState[index] ? (
                      <HiMinus className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 rotate-180" />
                    ) : (
                      <HiPlus className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" />
                    )}
                  </div>

                  {/* Question Text */}
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200 pr-2">
                    {currElem.title}
                  </h3>
                </div>

                {/* Indicator Circle Badge */}
                <div
                  className={`flex-shrink-0 w-2 h-2 rounded-full transition-all duration-300 ${faqState[index] ? "bg-blue-600 scale-125" : "bg-slate-200"
                    }`}
                ></div>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${faqState[index] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6">
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm md:text-base font-normal">
                      {currElem.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Faq;
