import React, { useEffect, useState } from "react";

import Slider from "react-slick";
import slid1 from "../../assets/images/slider-2.jpeg";
import slid2 from "../../assets/images/slider-image-1.jpeg";
import slid3 from "../../assets/images/slider-image-2.jpeg";
import slid4 from "../../assets/images/slider-image-3.jpeg";
import axios from "axios";
import Loading from "../Loading/Loading";

import uesCatigories from "../../Hooks/uesCatigories";
export default function CatigoriesSlider() {
  const {allCatigories,isLoading} =  uesCatigories();
  const NextArrow = ({ onClick }) => {
    return (
      <button
        className="absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-gray-50 opacity-90 text-main mx-50 rounded-full shadow-lg  transition"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <button
        className="absolute top-1/2 left-4 z-10 -translate-y-1/2 bg-gray-50 opacity-90 text-main mx-50 rounded-full shadow-lg transition"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
    );
  };
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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
    <div className="bg-gray-100 py-3">
      <h1 className="text-center text-3xl font-bold py-4 text-main"><span className="text-[60px]" >C</span>atigories <span className="">S</span>lider
      </h1>
      <div className="mx-auto container bg-gray-100">
        <Slider {...settings}>
          
           {isLoading?<Loading />: allCatigories.map((item) => (
              <div key={item._id}>  <img src={item.image} className="w-[500px] h-[300px] " alt="" />
          </div>
            ))}
        
          
        
        </Slider>
      </div>
    </div>
  );
}
