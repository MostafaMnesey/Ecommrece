import { data } from "autoprefixer";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import uesCatigories from "../../Hooks/uesCatigories";

export default function Catigories() {
const {allCatigories,isLoading} =  uesCatigories();
   return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" py-4 bg-gray-100 ">
          <div className="container   mx-auto min-h-[80vh]">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
              {allCatigories.map((item) => {
                return (
                  <div className="relative shadow-md " key={item._id}>
                   <Link to={`/Catigory/${item._id}`}>
                   <div className="absolute inset-0 bg-black opacity-0 hover:opacity-75 transition-all duration-300 flex items-center pb-9 justify-center text-3xl text-white">
                     
                    <span className="font-saira-condensed text-[40px]text-nowrap text-main font-semibold">
                    {item.name}
                    </span>
                 
                 </div>
                   </Link>
                    <img
                      className="h-[400px] w-full max-w-full rounded-lg"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
     
    </>
  ); 
}
