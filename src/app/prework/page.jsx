"use client";
import Feedback from "@/components/Feedback";
import Help from "@/components/Help";
import All from "@/components/tech/All";
import Design from "@/components/tech/Design";
import Development from "@/components/tech/Development";
import Marketing from "@/components/tech/Marketing";
import React, { useState } from "react";

const WorkDone = () => {
  const [tabActive, setTabActive] = useState("all"); // Initialize with "all" instead of "All"

  const handleTabChange = (tab) => {
    setTabActive(tab);
  };

  return (
    <div>
      <div className="mt-[87px] w-11/12 mx-auto">
        <br />
        <br />
        <span className=" font-bold text-4xl">
          Take a tour of our transformative outcomes!
        </span>
        <br />
        <br />
        <video
          src="https://d1hdtc0tbqeghx.cloudfront.net/wp-content/uploads/2023/06/29131238/Banner.mp4"
          autoPlay // Changed to autoPlay (camelCase)
          controls
          loop
          muted
          className="w-screen h-auto rounded-[4rem] my-5"
        ></video>
        <div className="flex flex-col gap-8">
          <div className="">
            <div className="flex items-center justify-center mt-10 gap-4 lg:gap-28 sm:flex flex-wrap">
              <button
                onClick={() => handleTabChange("all")} // Fixed value
                className={`font-bold text-xl ${
                  tabActive === "all"
                    ? "bg-gray-300 rounded-md p-1 text-orange-500 transition ease-in duration-500 pb-1"
                    : ""
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleTabChange("design")} // Fixed value
                className={`font-bold text-xl ${
                  tabActive === "design"
                    ? "bg-pink-300 rounded-md p-1 text-blue-500 transition ease-in duration-500 pb-1"
                    : ""
                }`}
              >
                Design
              </button>
              <button
                onClick={() => handleTabChange("development")} // Fixed value
                className={`font-bold text-xl ${
                  tabActive === "development"
                    ? "bg-green-500 rounded-md p-1 text-white  transition ease-in duration-500 pb-1"
                    : ""
                }`}
              >
                Development
              </button>
              <button
                onClick={() => handleTabChange("marketing")} // Fixed value
                className={`font-bold text-xl ${
                  tabActive === "marketing"
                    ? "bg-red-500 rounded-md p-1 text-white transition ease-in duration-500 pb-1"
                    : ""
                }`}
              >
                Marketing
              </button>
            </div>

            {tabActive === "all" && <All />}
            {tabActive === "design" && <Design />}
            {tabActive === "development" && <Development />}
            {tabActive === "marketing" && <Marketing />}
          </div>
        </div>
        <Feedback />
      </div>
      <Help />
    </div>
  );
};

export default WorkDone;
