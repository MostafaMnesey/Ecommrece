import { data } from "autoprefixer";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function Brands() {

  const id = useParams();
 
  const { data, isLoading,isError,isFetching } = useQuery({
    queryKey: ["brand",id],
    queryFn: () => getBrand(id),
    cashingTime: 1000*60,
    fetchingOnMount: false,
    refetchOnWindowFocus: false
  });

   
  
    async function getBrand(id) {
      return await axios.get(
        `https://ecommerce.routemisr.com/api/v1/brands/${id.id}`
      );
    }
    const brand = data?.data.data;
    
 
  console.log(brand);
  console.log(isFetching);
  

   return <>
      {isLoading ? (
        <Loading />
      ) : 
        <div className=" py-4 bg-gray-50 ">
          <div className="container   mx-auto min-h-[50vh]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="w-full relative py-52 border-8 bg-[rgba(0,0,0,0.5)]  border-main ">
              <div className=" ">
                  <img src={brand.image} className="w-full border-2 border-main  hover:scale-[1.1] transition-all hover:translate-y-5 hover:translate-x-5  absolute top-8 left-8" alt="" />
              </div>
            </div>
            
            <div className="col-span-2 w-full sm:my-8
             flex text-3xl items-center justify-center">

                <h1 className="font-bold text-main font-mono text-[60px] hover:text-black hover:scale-[1.5] transition-all ">{brand.name}</h1>
            </div>
        </div>
      </div>
    </div>}
    </> 
  
}
