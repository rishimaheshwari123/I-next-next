import React from "react";
import { aboutCard } from "./cardData";
const AboutCard = () => {
  return (
    <div className="sm:grid-cols-1 grid lg:grid-cols-3 gap-7 ">
      {aboutCard.map((currElem) => (
        <div
          key={currElem.id}
          className="border flex flex-col justify-center  items-center p-16 gap-4 rounded-lg "
        >
          <img src={currElem.img} alt="" />
          <span className="mt-7 font-bold text-xl text-gray-400">
            {currElem.p}
          </span>
          <span className="text-4xl font-bold">{currElem.title}</span>
          <span className="text-xl text-gray-400">{currElem.desc}</span>
        </div>
      ))}
    </div>
  );
};

export default AboutCard;
