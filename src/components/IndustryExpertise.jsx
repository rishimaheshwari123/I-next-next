"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { card } from "./cardData";
const IndustryExpertise = () => {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    infinite: true,
    speed: 700,
    arrows: true,
    dots: true,
    swipe: true,
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="w-11/12 mx-auto mt-1">
        <Slider {...settings} className="mt-24 ">
          {card.map((currElem, index) => (
            <div key={index} className="p-5 hoverImg h-96 border rounded-lg ">
              <p className="text-3xl font-semibold">{currElem.title}</p>
              <p className="text-xl mt-5">{currElem.desc}</p>
              <button className="mt-10 font-bold text-xl text-cyan-500">
                View More
              </button>
            </div>
          ))}
        </Slider>
      </div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default IndustryExpertise;
