import { map, select, tr } from "framer-motion/client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function Sliderr({ values }) {
  const [images, setImages] = useState([]);



  useEffect(() => {
    if(values.det==false){
      setImages(values?.selectedItem.images);
      console.log(images);  
    }
    else if(values.det==true){
    console.log(values.data);
    setImages(values.data.images);
    console.log(images);
    }
  }, [values]);

 
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
    arrows: true,
    infinite: false,
    speed: 500 ,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide:0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
          {images.map((image, index) => (
         <div key={index}>
           <img src={image} className='w-full h-[400px]'  alt={`Image ${index}`} />
         </div>
       ))}
        </Slider>
      </div>
    </>
  );
}
