import Feedback from "@/components/Feedback";
import Help from "@/components/Help";
import Projects from "@/components/tech/Projects";
import Technology from "@/components/Technology";
import TrustedCompanies from "@/components/TrustedCompanies";
import React from "react";
import { IoIosArrowDropright } from "react-icons/io";

const EcomDevlopment = () => {
  return (
    <>
      <div className="mt-[111px] w-11/12 mx-auto">
        <div className="flex gap-3">
          <p className="border-r-2 pr-3 text-gray-300 text-xl">Home</p>
          <p className="text-xl">eCommerce Development</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-24 items-center lg:mt-14 mt-7 ">
          <div className="first ">
            <p className="text-2xl lg:text-4xl font-bold">
              Enterprise Ecommerce Consulting and Development Solutions
            </p>
            <br />

            <p className="text-xl">
              I Next ETS understands your business needs and offers tailored
              solutions for your eCommerce store with attractive visual design,
              feature-rich functionalities, and rivalry customer experience.
              Build your store in diverse technologies like Magento,
              WooCommerce, and Shopify maximizing desired outcomes.
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
        <br />

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
              src="https://d1hdtc0tbqeghx.cloudfront.net/wp-content/uploads/2023/05/22063328/E-commerce-Development-1.png"
              alt=""
            />
          </div>
        </div>
        <Projects />

        <TrustedCompanies />

        <Feedback />
      </div>
      <Help />
    </>
  );
};

export default EcomDevlopment;
