"use client";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import PlanPurchaseModal from "./PlanPurchaseModal";

const PlanCard = ({ plan, serviceName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChoosePlan = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className={`relative bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-105 ${
          plan.popular ? "border-4 border-orange-500" : "border border-gray-200"
        }`}
      >
        {plan.popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              MOST POPULAR
            </span>
          </div>
        )}

        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
            {plan.period && (
              <span className="text-gray-600 ml-2">/{plan.period}</span>
            )}
          </div>
          <p className="text-gray-600">{plan.description}</p>
        </div>

        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <FaCheck className="text-green-500 mt-1 mr-3 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleChoosePlan}
          className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
            plan.popular
              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
              : "bg-gray-900 text-white hover:bg-gray-800"
          } shadow-lg hover:shadow-xl`}
        >
          Choose Plan
        </button>
      </div>

      {/* Purchase Modal */}
      <PlanPurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={plan}
        serviceName={serviceName}
      />
    </>
  );
};

export default PlanCard;
