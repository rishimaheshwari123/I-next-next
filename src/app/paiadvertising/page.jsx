import { paiadvertising } from "@/components/cardData";
import Feedback from "@/components/Feedback";
import Help from "@/components/Help";
import React from "react";
import { FaQuoteRight } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";

const PaidAdvertising = () => {
  return (
    <>
      <div className="mt-[111px] w-11/12 mx-auto">
        <div className="flex gap-3">
          <p className="border-r-2 pr-3 text-gray-300 text-xl">Home</p>
          <p className="text-xl">Paid Advertising</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2  items-center lg:mt-14 mt-7 ">
          <div className="first ">
            <p className="text-2xl lg:text-4xl font-bold">
              Performance driven Paid Advertising services.
            </p>
            <br />

            <p className="text-xl mt-5">
              Ensuring your ad campaigns deliver maximum return on investment is
              crucial in achieving business success.
            </p>
            <br />
            <br />
            <br />
            <button className="flex items-center gap-2 font-bold text-2xl bg-orange-500 px-5 py-3 rounded-lg hover:bg-gray-300 hover:text-orange-600 mt-10">
              Let's Talk <IoIosArrowDropright className="mt-1" />
            </button>
            <br />
          </div>

          <div className="second">
            <img
              src="/developer_male-removebg-preview.png"
              alt="not found"
              className="animate-float"
            />
          </div>
        </div>

        <br />

        <br />
        <br />
        <div className="grid lg:grid-cols-3 md:grid-cols-2">
          <img src="/1.png" alt="not found" />
          <img src="/2.png" alt="" />
          <img src="/3.png" alt="" />
        </div>

        <p className="text-2xl lg:text-4xl font-bold ">
          Overcome your challenges enabling improved ROI through Paid
          Advertising
        </p>
        <div className="main grid lg:grid-cols-2 items-center gap-5 my-10 bg-gray-50 p-6 rounded-md">
          <div className="first">
            <p className="text-2xl lg:text-3xl font-bold ">
              Brands reach out for filling up the below gaps:
            </p>
            <br />
            <div className="grid gap-9">
              {paiadvertising.map((currElem) => (
                <p
                  key={currElem.id}
                  className="flex gap-3  text-xl leading-tight"
                >
                  <FaQuoteRight className="mt-1" />
                  <span>{currElem.title}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="second">
            <img
              src="https://d1hdtc0tbqeghx.cloudfront.net/wp-content/uploads/2023/06/22063302/Paid-Advertising-Page.png"
              alt="not found"
            />
          </div>
        </div>

        <Feedback />
      </div>
      <Help />
    </>
  );
};

export default PaidAdvertising;
