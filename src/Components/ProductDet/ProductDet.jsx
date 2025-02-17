import { data } from "autoprefixer";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import { Link, useParams } from "react-router-dom";
import Sliderr from "../Slider/Sliderr";

export default function ProductDet() {
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);
  const [data, setData] = useState([]);
  const[catName,setCatName]=useState(null);
  const[subCatName,setSubCatName]=useState(null);
  const id = useParams();
  const det=true;
  useEffect(() => {
    getProductDet(id);
  }, []);
  async function getProductDet(id) {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id.id}`
      );
      const data = res.data.data;
      setData(data);
      console.log(data.category.name);
      setCatName(data.category.name);
      setSubCatName(data.subcategory[0].name);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className=" py-4 bg-gray-100 ">
          <div className="container   mx-auto min-h-[50vh]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className=" col-span-2 h-[500px] shadow-lg mb-4  ">
                <Sliderr values={{data,det}}/>
                </div>
              

              <div class="w-full max-w-sm   ms-4 p-4 bg-gray-100 border-[2px] border-main rounded-lg shadow-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                  {data.title}
                </h5>
                <div class="flex items-baseline text-gray-900 dark:text-white">
                  <span class="text-3xl font-semibold">$</span>
                  <span class="text-5xl font-extrabold tracking-tight">{data.price}</span>
                  <span class="ms-3 text-xl font-normal text-gray-500 dark:text-gray-400">
                   Price
                  </span>
                </div>
                <ul role="list" class="space-y-5 my-7">
                  <li class="flex items-center">
                    
                    <span class="text-lg font-normal leading-tight text-gray-700 dark:text-gray-400 ms-3">
                     {data.description}
                    </span>
                  </li>
                  <li class="flex">
                    
                    <span class="text-[18px] font-normal leading-tight text-gray-700 dark:text-gray-400 ms-3">
                       {catName}/{subCatName}
                    </span>
                  </li>
                  <li class="flex">
                  <div className="flex items-center mt-2.5 mb-5">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <svg
                          className="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <svg
                          className="w-4 h-4 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                       {data.ratingsAverage}
                      </span>
                    </div>
                  </li>
                  
                </ul>
                <button
                  type="button"
                  class="text-white bg-main border-2 border-transparent hover:text-main transition-all hover:border-main hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
                >
                  Add to cart                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
