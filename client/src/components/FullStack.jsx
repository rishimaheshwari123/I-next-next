import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import one from "../images/wrodpress/1.png";
import two from "../images/wrodpress/2.png";
import four from "../images/wrodpress/4.png";
import six from "../images/wrodpress/6.png";
import seven from "../images/wrodpress/7.png";

const WrodPress = () => {
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

  const cards = [
    {
      img: one,
      link: "https://www.drtitoriaclinics.com",
    },
    {
      img: two,
      link: "https://www.neoaesthetica.com",
    },
    {
      img: four,
      link: "https://newkolkataflats.com",
    },
    {
      img: six,
      link: "https://www.theroyalganges.com/property-item/apartments",
    },
    {
      img: seven,
      link: "https://www.theroyalganges.com/property-item/apartments",
    },
  ];

  return (
    <>
      <div className="w-full mx-auto mt-1 max-w-screen-lg">
        <Slider {...settings} className="mt-24">
          {cards.map((card, index) => (
            <div key={index} className="px-2">
              <Link
                to={card.link}
                target="_blank"
                className="w-[50vw] h-[50vh]"
              >
                <img
                  src={card.img}
                  alt="not found"
                  className="rounded-lg shadow-lg w-full h-full object-cover"
                />
              </Link>
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

export default WrodPress;
