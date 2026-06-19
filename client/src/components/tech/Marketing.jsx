import React from "react";
import { marketing } from "../cardData";
const Marketing = () => {
  return (
    <div className="sm:grid lg:grid lg:grid-cols-3 my-10 gap-10 ">
      {marketing.map((currElem) => (
        <div
          className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-100 workCard"
          key={currElem.id}
        >
          <img className="w-full" src={currElem.img} alt="Example Image" />
          <div className="px-6 py-4">
            <div className="font-bold text-2xl mb-4 text-center">
              {currElem.title}
            </div>
            <p className="text-gray-700 text-base text-center">
              {currElem.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Marketing;
