import Feedback from "@/components/Feedback";
import Help from "@/components/Help";
import Projects from "@/components/tech/Projects";
import Technology from "@/components/Technology";
import TrustedCompanies from "@/components/TrustedCompanies";
import React from "react";
import { IoIosArrowDropright } from "react-icons/io";

const SoftwareDevelopment = () => {
  return (
    <>
      <div className="mt-[111px] w-11/12 mx-auto">
        <div className="flex gap-3">
          <p className="border-r-2 pr-3 text-gray-300 text-xl">Home</p>
          <p className="text-xl">Software Development</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center lg:mt-14 mt-7 ">
          <div className="first ">
            <p className="text-2xl lg:text-4xl font-bold">
              Custom Software Development Services
            </p>
            <br />

            <p className="text-xl">
              You need a reliable, cost-effective partner that can provide you
              with the custom software development services that meet your
              business objectives. Get started with your one-stop software
              company for custom solutions!
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

        <div className="main grid lg:grid-cols-2 gap-10 my-20 ">
          <div className="first grid border p-10 items-center justify-center gap-4 bg-gray-100 rounded-t-lg">
            <img
              src="https://www.krishaweb.com/wp-content/uploads/2023/05/Startups.svg"
              alt="Inext-ETS"
            />
            <p className="text-2xl font-bold text-center">Startups</p>
            <p className="text-xl">
              What you need to get there is what we’re all about. Ensuring your
              business is a success through efficient business development.
            </p>
          </div>
          <div className="second border grid items-center justify-center  gap-4 p-10 bg-gray-100 rounded-t-lg">
            <img
              src="https://www.krishaweb.com/wp-content/uploads/2023/05/Small-Business-1.svg"
              alt="Inext-ETS"
            />
            <p className="text-2xl font-bold text-center">Small businesses</p>
            <p className="text-xl">
              Our team delivers successful websites with multiple features
              improving your productivity, vehicle for business expansion.
            </p>
          </div>
        </div>
        <TrustedCompanies />
        <Technology />
        <br />
        <br />
        <br />

        <Projects />

        <Feedback />
      </div>
      <Help />
    </>
  );
};

export default SoftwareDevelopment;
