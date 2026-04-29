import React from "react";
import HeroSlider from "../components/HeroSlider";
import ServicesGrid from "@/components/ServicesGrid";
import StatsSection from "@/components/StatsSection";
import TechnologyNew from "@/components/TechnologyNew";
import Testimonials from "@/components/Testimonials";
import VideoTestimonials from "@/components/VideoTestimonials";
import Faq from "@/components/Faq";
import TrustedCompanies from "@/components/TrustedCompanies";
// import Help from "@/components/Help";

const HomePage = () => {
  return (
    <div>
      <HeroSlider />
      <ServicesGrid />
      <StatsSection />
      <TechnologyNew />
      <Testimonials />
      <VideoTestimonials />
      <div className=" ">
        <Faq />
        {/* <TrustedCompanies /> */}
      </div>
      {/* <Help /> */}
    </div>
  );
};

export default HomePage;
