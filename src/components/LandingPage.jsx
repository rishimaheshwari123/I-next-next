import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import one from "../images/1.png";
import two from "../images/2.png";
import three from "../images/3.png";
import four from "../images/4.png";

const SliderComponent = () => {
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
      img: three,
      link: "https://newkolkataflats.com",
    },
    {
      img: four,
      link: "https://www.theroyalganges.com/property-item/apartments",
    },
  ];

  return (
    <>
      <div className="w-11/12 mx-auto mt-1">
        <Slider {...settings} className="mt-24">
          {cards.map((card, index) => (
            <div key={index} className="px-2">
              <Link
                to={card.link}
                target="_blank"
                className="w-[50vw] h-[70vh]"
              >
                <img
                  src={card.img}
                  alt="not found"
                  className="rounded-lg shadow-lg w-full h-full object-cover "
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

export default SliderComponent;
