import React from "react";
import { service } from "@/components/cardData";

const Service = () => {
  return (
    <>
      <div className="mt-[87px] w-11/12 mx-auto">
        <br />
        <p className="text-center text-2xl mb-16 border-b-2 border-blue-600 pb-2">
          Our Services
        </p>
        <div className="main grid grid-cols-1 lg:grid-cols-2 gap-5">
          {service.map((currElem) => (
            <div
              className="card grid items-center lg:grid-cols-2 lg:gap-24  shadow-lg p-8 rounded-lg"
              key={currElem.id}
            >
              <div className="first">
                <p className="text-2xl font-bold">{currElem.title}</p>
                <p className="mt-4">{currElem.desc}</p>
                <button className="mt-8 px-6 py-3  bg-orange-300 rounded-md text-[13px] font-semibold cursor-pointer hover:bg-transparent hover:border-2 hover:border-red-600">
                  Lean More
                </button>
              </div>
              <div className="second">
                <img src={currElem.img} alt="Inext-ETS" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  );
};

export default Service;
