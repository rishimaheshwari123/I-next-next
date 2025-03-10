"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

const Teb = ({ data }) => {
  return (
    <div className=" mt-8 relative z-0">
      <div className="text-center">
        <p className="text-xl lg:text-3xl font-bold pb-3 border-b-4 border-yellow-400 inline-block">
          Featured Items
        </p>
      </div>
      <br />
      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {data.map((currElem, index) => (
            <SwiperSlide
              key={index}
              className="p-5 shadow-lg rounded-lg hover:scale-95 transition-transform duration-300"
            >
              <Link href={currElem.link} target="_blank" className="block">
                <div className="relative w-full h-[500px] -z-50">
                  <Image
                    src={currElem.img}
                    alt="not found"
                    className="absolute inset-0 -z-50 w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-orange-500 p-3 rounded-b-lg">
                    <p className="text-center text-lg font-bold">
                      {currElem.title}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Teb;
