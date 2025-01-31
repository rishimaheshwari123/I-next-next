import React from "react";
import Home from "../components/Home";
import Technology from "@/components/Technology";
import IndustryExpertise from "@/components/IndustryExpertise";
import Faq from "@/components/Faq";
import TrustedCompanies from "@/components/TrustedCompanies";
import Help from "@/components/Help";

const HomePage = () => {
  return (
    <div>
      <Home />
      <div className="mt-[87px] w-11/12 mx-auto">
        <Technology />
        <IndustryExpertise />
        <Faq />

        <TrustedCompanies />
      </div>
      <Help />
    </div>
  );
};

export default HomePage;
