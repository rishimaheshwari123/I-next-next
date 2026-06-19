import React from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { FaQuoteRight } from "react-icons/fa";
import TrustedCompanies from "@/components/TrustedCompanies";
import Services from "@/components/Design/Services";
import { brandsApproach, hiring } from "@/components/cardData";
import Projects from "@/components/tech/Projects";
import IndustryExpertise from "@/components/IndustryExpertise";
import Help from "@/components/Help";

const WebDesign = () => {
  return (
    <>
      <div className="mt-[111px] w-11/12 mx-auto">
        <div className="flex gap-3">
          <p className="border-r-2 pr-3 text-gray-300 text-xl">Home</p>
          <p className="text-xl">Web Design</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2  items-center lg:-mt-20 mt-7 ">
          <div className="first ">
            <p className="text-2xl lg:text-3xl font-bold">
              Professional <span className="text-orange-500">Web Design</span>{" "}
              Services
            </p>
            <br />

            <p className="text-xl">
              Modernizing digital experiences for the web is essential for
              standing out in the global marketplace for businesses. We
              collaborate with brands that are leaders in the industry, using
              pragmatic strategies, and assist startups to enterprises in
              creating websites that convert!
            </p>
            <br />
            <br />
            <br />
            <button className="flex items-center gap-2 font-bold text-2xl bg-orange-500 px-5 py-3 rounded-lg hover:bg-gray-300 hover:text-orange-600">
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

        <TrustedCompanies />

        <div className="grid lg:grid-cols-3 md:grid-cols-2">
          <img src="/1.png" alt="not found" />
          <img src="/2.png" alt="Inext-ETS" />
          <img src="/3.png" alt="Inext-ETS" />
        </div>

        <div className="main grid lg:grid-cols-2 items-center gap-5 my-20 bg-gray-50 p-6 rounded-md">
          <div className="first">
            <p className="text-xl lg:text-3xl ">
              Brands approach us when they are struggling with
            </p>
            <br />
            <div className="grid gap-9">
              {brandsApproach.map((currElem) => (
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
              src="https://d1hdtc0tbqeghx.cloudfront.net/wp-content/uploads/2023/05/22063439/Website-to-Drive-ROI.png"
              alt="not found"
            />
          </div>
        </div>

        <Services />

        <p className="text-3xl lg:text-4xl mt-28 mb-14 font-bold">
          Perks of hiring I Next Ets for Web Design services
        </p>

        <div className="bg-gray-50 p-12 grid gap-6">
          {hiring.map((currElem) => (
            <p key={currElem.id} className="flex gap-3  text-xl leading-tight">
              <FaQuoteRight className="mt-1" />
              <span className="font-bold text-xl" id="border">
                {currElem.title}
              </span>
            </p>
          ))}
        </div>

        <Projects />
        <IndustryExpertise />
      </div>
      <Help />
    </>
  );
};

export default WebDesign;
