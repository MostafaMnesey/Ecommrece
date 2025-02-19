import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import Loading from "../Loading/Loading";
import Sliderr from "../Slider/Sliderr";
import { Link } from "react-router-dom";

import useGetApi from "../../Hooks/useGetApi";
import { WishlistContext } from "../../Context/WishlistContext";
import CartContextProvider, { CartContext } from "../../Context/CartContext";

export default function AllProudcts() {
  const { addWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext) 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const det = false;

  
  async function openModal(item) {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${item}`
    );
    console.log(data.data);

    setSelectedItem(data.data);

    setIsModalOpen(true);
  }

  // إغلاق المودال
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };
  const { data, isLoading } = useGetApi(
    "https://ecommerce.routemisr.com/api/v1/products"
  );
  const AllProducts = data?.data.data;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" py-4 bg-gray-100 ">
          <div className="container   mx-auto min-h-[50vh]">
            <h1 className="text-3xl flex justify-center font-bold text-center py-4 text-main ">
              <span className="text-main text-[60px]">A</span>ll Products
            </h1>
            <div className="grid gap-2 me-14  md:ms-0  grid-cols-1 ms-16 sm:ms-32   md:grid-cols-2 lg:grid-cols-4 md:gap-3">
              {AllProducts.map((item) => (
                <div
                  key={item.id}
                  className="w-full relative max-w-sm bg-zinc-50 border group/hover overflow-hidden border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col justify-between"
                >
                      <div className=" absolute top-3 right-[-10%] z-20 group-hover/hover:right-5 delay-200 transition-all">
                        <button type="button" onClick={() => addWishlist(item.id)}>
                          <i className="fa-solid fa-heart text-2xl text-gray-500 hover:text-main transition-all hover:scale-110 "></i>
                        </button>
                      </div>
                  <button
                    onClick={() => openModal(item.id)}
                    className="block w-full md:w-auto text-gray-600 text-lg group-hover/li:text-main transition-all"
                  >
                    

                      <img
                        className="p-8 w-full rounded-full group-hover/hover:rotate-[360deg] transition duration-[0.5s]"
                        src={item.imageCover}
                        alt="product image"
                      />
                 
                  </button>

                  <div className="px-5 pb-5">
                    <Link to={`/product/${item.id}`}>
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white min-h-[60px]">
                        {item.title}
                      </h5>
                    </Link>
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
                        {item.ratingsAverage}
                      </span>
                    </div>
                    <div className="mt-auto flex items-center relative  justify-between">
                      <span className="text-3xl font-bold me-3 text-gray-700 dark:text-white">
                        {item.price}$
                      </span>
                      <button 
                       type="button"
                        onClick={()=>{
                          addToCart(item._id);
                        }} 
                        className="text-white absolute overflow-hidden right-0 top-[200%] 
             group-hover/hover:top-0 group-hover/hover:right-0  
             bg-main hover:bg-white hover:text-main 
              border-2 border-transparent hover:border-main  
             focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center 
             dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
             transition-[all] delay-75  ease-in-out duration-"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* المودال */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            {/* رأس المودال */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-medium text-main">
                {selectedItem.title}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white hover:bg-main rounded-lg text-sm w-8 h-8 flex justify-center items-center"
              >
                ✕
              </button>
            </div>

            {/* محتوى المودال */}
            <div className=" ">
              <Sliderr values={{ selectedItem, det }} />
            </div>

            {/* أزرار المودال */}
            <div className="flex items-center justify-end p-4 border-t">
              <button
                onClick={closeModal}
                className="py-2 px-5 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-main hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
