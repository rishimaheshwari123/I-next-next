import Feedback from "@/components/Feedback";
import Help from "@/components/Help";
import Projects from "@/components/tech/Projects";
import TrustedCompanies from "@/components/TrustedCompanies";
import React from "react";
import { IoIosArrowDropright } from "react-icons/io";

const WebAppDevelopment = () => {
  return (
    <>
      <div className="mt-[111px] w-11/12 mx-auto">
        <div className="flex gap-3">
          <p className="border-r-2 pr-3 text-gray-300 text-xl">Home</p>
          <p className="text-xl">Enterprise Application Development</p>
        </div>
        <br />
        <br />

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20  items-center lg:-mt-20 mt-7 ">
          <div className="first ">
            <p className="text-2xl lg:text-4xl font-bold">
              Enterprise Web Application Development Solutions
            </p>
            <br />

            <p className="text-xl">
              Is your business struggling with application development barriers?
              Our robust enterprise application development ensures developing
              an application that meets your current and future goals.
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
        <Projects />
        <br />
        <TrustedCompanies />

        <div className="main grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="first">
            <p className="text-3xl font-semibold lg:text-4xl lg:font-semibold">
              Bespoke Enterprise application development solutions
            </p>
            <p className="text-xl mt-8">
              Build and revamp your customer experience in this evolving digital
              landscape with Enterprise Application Development. With 14+ years
              of expertise, we help you achieve your long term business goals,
              effectively manage your operations, boost the efficiency and
              collaboration of your business, and improvise your customer
              engagement.
            </p>
            <button className="flex items-center gap-2 font-bold text-2xl bg-orange-500 px-5 py-3 rounded-lg hover:bg-gray-300 hover:text-orange-600 mt-16">
              Let's Talk <IoIosArrowDropright className="mt-1" />
            </button>
          </div>
          <div className="second">
            <img
              src="https://d1hdtc0tbqeghx.cloudfront.net/wp-content/uploads/2023/06/22063315/Enterprise-Application-Development.png"
              alt=""
            />
          </div>
        </div>
        <Feedback />
      </div>
      <Help />
    </>
  );
};

export default WebAppDevelopment;
