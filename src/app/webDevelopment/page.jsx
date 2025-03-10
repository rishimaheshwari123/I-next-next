import React from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { FaQuoteRight } from "react-icons/fa";
import Projects from "@/components/tech/Projects";
import TrustedCompanies from "@/components/TrustedCompanies";
import { hiringUx, uiUx } from "@/components/cardData";
import Feedback from "@/components/Feedback";
import ProductServices from "@/components/Design/ProductServices";
import Help from "@/components/Help";

const WebDevelopment = () => {
  return (
    <>
      <div className="mt-[111px] w-11/12 mx-auto">
        <div className="flex gap-3">
          <p className="border-r-2 pr-3 text-gray-300 text-xl">Home</p>
          <p className="text-xl">Web Development</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2  items-center lg:-mt-20 mt-7 ">
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
        <Projects />

        <TrustedCompanies />

        <div className="grid lg:grid-cols-3 md:grid-cols-2">
          <img src="/1.png" alt="not found" />
          <img src="/2.png" alt="Inext-ETS" />
          <img src="/3.png" alt="Inext-ETS" />
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

        <br />
        <br />
        <br />
        <div className="text-2xl lg:text-4xl font-bold">
          You deserve a systematic and unique{" "}
          <p className="mt-1">approach for your UI/UX design needs.</p>
        </div>
        <div className="main grid lg:grid-cols-2 items-center gap-5 my-10 bg-gray-50 p-6 rounded-md">
          <div className="first">
            <p className="text-xl lg:text-3xl ">
              Brands approach us when they are struggling with
            </p>
            <br />
            <div className="grid gap-9">
              {uiUx.map((currElem) => (
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
              src="https://d1hdtc0tbqeghx.cloudfront.net/wp-content/uploads/2023/05/22063437/Brand-Identity.png"
              alt="not found"
            />
          </div>
        </div>
        <br />
        <Feedback />

        <ProductServices />

        <p className="text-3xl lg:text-4xl mt-28 mb-14 font-bold">
          Unlock your business’s full potential with I Next Ets
        </p>

        <div className="bg-gray-50 p-12 grid gap-6">
          {hiringUx.map((currElem) => (
            <p key={currElem.id} className="flex gap-3  text-xl leading-tight">
              <FaQuoteRight className="mt-1" />
              <span className="font-bold text-xl" id="border">
                {currElem.title}
              </span>
            </p>
          ))}
        </div>
      </div>
      <Help />
    </>
  );
};

export default WebDevelopment;
