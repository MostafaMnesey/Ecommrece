import { data } from "autoprefixer";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';

export default function Catigory() {

  const id = useParams();
const {data:catigory,isLoading}= useQuery({
  queryKey: ["catigory",id],
  queryFn: () => getCatigory(id),
  cashingTime: 1000*10,
  fetchingOnMount: true,
  refetchOnWindowFocus: false
})
  async function getCatigory(id) {

      return await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id.id}`
      );
      
  }
  const data = catigory?.data.data
  
  

  return <>
      {isLoading ? (
        <Loading />
      ) : 
        <div className=" py-4 bg-gray-100 ">
          <div className="container   mx-auto min-h-[50vh]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="w-full relative py-52 border-8 bg-[rgba(0,0,0,0.5)]  border-main ">
              <div className=" ">
                  <img src={data.image} className="w-full border-2 border-main h-[350px]  hover:scale-[0.9] lg:hover:scale-[1.3] transition-all top-5 left-5   absolute lg:top-8 lg:left-8" alt="" />
              </div>
            </div>
            
            <div className="col-span-2 w-full sm:my-8
             flex text-3xl items-center justify-center">

                <h1 className="font-bold text-main font-mono text-[60px] hover:text-black hover:scale-[1.1] md:hover:scale-[1.1] lg:hover:scale-[1.5] transition-all ">{data.name}</h1>
            </div>
        </div>
      </div>
    </div>}
    </> 
  
}
