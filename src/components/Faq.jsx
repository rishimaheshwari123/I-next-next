"use client";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
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
    <>
      <br />
      <br />
      <br />
      <span className="text-3xl font-bold">FAQs</span>
      <p className="text-xl my-5">
        We hope these questions and answers help you find the best digital
        transformation partner for your business.
      </p>
      <div className="flex flex-col mt-12">
        {faq.map((currElem, index) => (
          <div key={currElem.id}>
            <div className="flex items-center mb-4 lg:gap-5">
              <button
                onClick={() => handleClick(index)}
                className="mr-2 px-4 py-2 border border-gray-400 text-black rounded-full flex items-center justify-center w-12 h-12 transition-all duration-1000 text-2xl"
              >
                <span className="text-2xl">
                  {faqState[index] ? <RxCross2 /> : <IoAddOutline />}
                </span>
              </button>
              <h3 className="text-xl font-bold">{currElem.title}</h3>
            </div>
            <div
              className={`px-[60px] lg:px-[75px] my-5 text-lg ${
                faqState[index] ? "" : "hidden "
              }`}
            >
              <p>{currElem.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Faq;
