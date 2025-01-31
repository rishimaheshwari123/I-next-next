import Feedback from "@/components/Feedback";
import Help from "@/components/Help";
import Projects from "@/components/tech/Projects";
import Technology from "@/components/Technology";
import TrustedCompanies from "@/components/TrustedCompanies";
import React from "react";
import { IoIosArrowDropright } from "react-icons/io";

const CMSDevelopment = () => {
  return (
    <>
      <div className="mt-[111px] w-11/12 mx-auto">
        <div className="flex gap-3">
          <p className="border-r-2 pr-3 text-gray-300 text-xl">Home</p>
          <p className="text-xl">CMS Development</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center lg:mt-14 mt-7 ">
          <div className="first ">
            <p className="text-2xl lg:text-4xl font-bold">
              One-stop solutions for all your Web Development needs!
            </p>
            <br />

            <p className="text-xl">
              Delivering comprehensive, fully customized web development
              solutions for crafting your web apps, websites, and e-commerce
              stores. Ensure enhanced user experience for your users with I Next
              Ets!
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
        <Technology />
        <br />
        <br />
        <Projects />

        <TrustedCompanies />

        <Feedback />
      </div>
      <Help />
    </>
  );
};

export default CMSDevelopment;
