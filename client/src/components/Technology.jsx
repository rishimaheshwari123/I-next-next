"use client";
import React, { useState } from "react";
import Frontend from "./tech/Frontend";
import Backend from "./tech/Backend";
import Cms from "./tech/Cms";
import Ecom from "./tech/Ecom";
import Database from "./tech/Database";
import Cloud from "./tech/Cloude";
import Plateform from "./tech/Plateform";

const Technology = () => {
  const [tabActive, setTabActive] = useState("frontend");

  const handleTabChange = (tab) => {
    setTabActive(tab);
  };
  return (
    <>
      <div className="flex flex-col gap-8">
        <h2 className="text-3xl font-bold">Technologies We Serve</h2>
        <p className="text-xl">
          Empowering your business with the latest technologies we use!{" "}
        </p>
        <div className="">
          <div className="flex items-center justify-center mt-10 gap-4 lg:gap-28 sm:flex flex-wrap">
            <button
              onClick={() => handleTabChange("frontend")}
              className={` font-bold text-xl ${
                tabActive === "frontend"
                  ? "bg-gray-300 rounded-md p-1 text-orange-500 transition ease-in duration-500 pb-1"
                  : ""
              }`}
            >
              Front End
            </button>
            <button
              onClick={() => handleTabChange("backend")}
              className={` font-bold text-xl ${
                tabActive === "backend"
                  ? "bg-pink-300 rounded-md p-1 text-blue-500 transition ease-in duration-500 pb-1"
                  : ""
              }`}
            >
              Back End
            </button>
            <button
              onClick={() => handleTabChange("cms")}
              className={`font-bold text-xl ${
                tabActive === "cms"
                  ? "bg-green-500 rounded-md p-1 text-white  transition ease-in duration-500 pb-1"
                  : ""
              }`}
            >
              CMS
            </button>
            <button
              onClick={() => handleTabChange("ecom")}
              className={`font-bold text-xl ${
                tabActive === "ecom"
                  ? "bg-yellow-400 rounded-md p-1 text-white transition ease-in duration-500 pb-1"
                  : ""
              }`}
            >
              eCommerce
            </button>
            <button
              onClick={() => handleTabChange("database")}
              className={`font-bold text-xl ${
                tabActive === "database"
                  ? "bg-emerald-400 text-red-400 rounded-md p-1 transition ease-in duration-500 pb-1"
                  : ""
              }`}
            >
              DataBase
            </button>
            <button
              onClick={() => handleTabChange("cloud")}
              className={`font-bold  text-xl ${
                tabActive === "cloud"
                  ? "bg-cyan-500 text-black rounded-md p-1 transition ease-in duration-500 pb-1"
                  : ""
              }`}
            >
              Cloud
            </button>
            <button
              onClick={() => handleTabChange("platform")}
              className={`font-bold text-xl ${
                tabActive === "platform"
                  ? "bg-purple-800 text-white rounded-md p-1 transition ease-in duration-500 pb-1"
                  : ""
              }`}
            >
              Platforms
            </button>
          </div>
          <div
            className="border-b-4 mt-1"
            style={{
              backgroundImage: "linear-gradient(to right, #8A2BE2, #FF1493)",
              borderImage: "linear-gradient(to right, #8A2BE2, #FF1493)",
              borderImageSlice: 1,
            }}
          ></div>

          {tabActive === "frontend" && <Frontend />}
          {tabActive === "backend" && <Backend />}
          {tabActive === "cms" && <Cms />}
          {tabActive === "ecom" && <Ecom />}
          {tabActive === "database" && <Database />}
          {tabActive === "cloud" && <Cloud />}
          {tabActive === "platform" && <Plateform />}
        </div>
      </div>
    </>
  );
};

export default Technology;
