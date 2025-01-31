"use client";
import React, { useState } from "react";
import Tab from "@/components/tech/Teb";
import {
  ecom,
  landingPage,
  wordpress,
  fullstack,
  ngo,
  popular,
  news,
  latest,
} from "@/components/cardData";

const PortFolio = () => {
  const [tabActive, setTabActive] = useState("landingpage");

  const handleTabChange = (tab) => {
    setTabActive(tab);
  };

  return (
    <>
      <div className=" max-w-7xl mx-auto mt-[107px]  ">
        <div className=" bg-gray-500  m-auto py-1 lg:flex lg:justify-center rounded-md px-3 overflow-x-scroll md:overflow-x-hidden">
          <div className="flex gap-5 pl-2">
            <button
              onClick={() => handleTabChange("landingpage")}
              className={` font-bold text-sm ${
                tabActive === "landingpage"
                  ? "bg-pink-600 rounded-md px-4 py-2 text-white transition ease-in duration-500 "
                  : " bg-gray-500 text-black px-4 py-2 rounded-md  transition ease-in duration-500"
              }`}
            >
              Landing Page
            </button>

            <button
              onClick={() => handleTabChange("wordpress")}
              className={` font-bold text-sm ${
                tabActive === "wordpress"
                  ? "bg-pink-600 rounded-md px-4 py-2 text-white transition ease-in duration-500 "
                  : " bg-gray-500 text-black px-4 py-2 rounded-md  transition ease-in duration-500"
              }`}
            >
              Word Press
            </button>

            <button
              onClick={() => handleTabChange("ecom")}
              className={` font-bold text-sm ${
                tabActive === "ecom"
                  ? "bg-pink-600 rounded-md px-4 py-2 text-white transition ease-in duration-500 "
                  : " bg-gray-500 text-black px-4 py-2 rounded-md  transition ease-in duration-500"
              }`}
            >
              Ecommerce
            </button>
            <button
              onClick={() => handleTabChange("fullstack")}
              className={` font-bold text-sm ${
                tabActive === "fullstack"
                  ? "bg-pink-600 rounded-md px-4 py-2 text-white transition ease-in duration-500 "
                  : " bg-gray-500 text-black px-4 py-2 rounded-md  transition ease-in duration-500"
              }`}
            >
              Full Stack Development
            </button>

            <button
              onClick={() => handleTabChange("ngo")}
              className={` font-bold text-sm ${
                tabActive === "ngo"
                  ? "bg-pink-600 rounded-md px-4 py-2 text-white transition ease-in duration-500 "
                  : " bg-gray-500 text-black px-4 py-2 rounded-md  transition ease-in duration-500"
              }`}
            >
              Ngo
            </button>
            <button
              onClick={() => handleTabChange("news")}
              className={` font-bold text-sm ${
                tabActive === "news"
                  ? "bg-pink-600 rounded-md px-4 py-2 text-white transition ease-in duration-500 "
                  : " bg-gray-500 text-black px-4 py-2 rounded-md  transition ease-in duration-500"
              }`}
            >
              News
            </button>
            <button
              onClick={() => handleTabChange("popular")}
              className={` font-bold text-sm ${
                tabActive === "popular"
                  ? "bg-pink-600 rounded-md px-4 py-2 text-white transition ease-in duration-500 "
                  : " bg-gray-500 text-black px-4 py-2 rounded-md  transition ease-in duration-500"
              }`}
            >
              Our Popural Projects
            </button>
            <button
              onClick={() => handleTabChange("latest")}
              className={` font-bold text-sm ${
                tabActive === "latest"
                  ? "bg-pink-600 rounded-md px-4 py-2 text-white transition ease-in duration-500 "
                  : " bg-gray-500 text-black px-4 py-2 rounded-md  transition ease-in duration-500"
              }`}
            >
              Latest Projects
            </button>
          </div>
        </div>

        <br />
        <br />

        {tabActive === "landingpage" && <Tab data={landingPage} />}
        {tabActive === "wordpress" && <Tab data={wordpress} />}
        {tabActive === "ecom" && <Tab data={ecom} />}
        {tabActive === "fullstack" && <Tab data={fullstack} />}
        {tabActive === "ngo" && <Tab data={ngo} />}
        {tabActive === "news" && <Tab data={news} />}
        {tabActive === "popular" && <Tab data={popular} />}
        {tabActive === "latest" && <Tab data={latest} />}

        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default PortFolio;
