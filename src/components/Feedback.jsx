"use client";
import React, { useState } from "react";
import { feedbacks } from "./cardData";

const Feedback = () => {
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);

  const handlePrevClick = () => {
    if (currentFeedbackIndex > 0) {
      setCurrentFeedbackIndex(currentFeedbackIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentFeedbackIndex < feedbacks.length - 1) {
      setCurrentFeedbackIndex(currentFeedbackIndex + 1);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg my-14">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Client Feedback
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Hear from our clients what sets us apart to deliver REAL results &
        experiences!
      </p>
      <div className="relative mb-6">
        {feedbacks.map((feedback, index) => (
          <div
            key={feedback.id}
            className={`transition-opacity duration-500 ease-in-out ${
              currentFeedbackIndex === index ? "opacity-100" : "opacity-0"
            } ${currentFeedbackIndex === index ? "relative" : "absolute"} ${
              currentFeedbackIndex === index ? "block" : "hidden"
            }`}
          >
            <p className="text-lg italic text-center mb-2">“{feedback.desc}”</p>
            <p className="text-lg font-bold text-center">{feedback.name}</p>
            <p className="text-sm text-gray-500 text-center">
              {feedback.title}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          onClick={handlePrevClick}
          className={`${
            currentFeedbackIndex === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-300 hover:bg-gray-400 text-gray-800"
          } font-bold py-2 px-4 rounded`}
          disabled={currentFeedbackIndex === 0}
        >
          Prev
        </button>
        <button
          onClick={handleNextClick}
          className={`${
            currentFeedbackIndex === feedbacks.length - 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-300 hover:bg-gray-400 text-gray-800"
          } font-bold py-2 px-4 rounded`}
          disabled={currentFeedbackIndex === feedbacks.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Feedback;
