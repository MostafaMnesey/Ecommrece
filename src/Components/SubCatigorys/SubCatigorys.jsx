import { data } from "autoprefixer";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function SubCatigorys() {

  const { data, isLoading,isError,isFetching } = useQuery({
    queryKey: [],
    queryFn:  getSubCatigorys,
    cashingTime: 1000*60*5,
    fetchingOnMount: false,
    refetchOnWindowFocus: false
  })


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  async function openModal(item) {
    const res = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/subcategories/${item}`
    );


    setSelectedItem(res.data.data);

    setIsModalOpen(true);
  }

  // إغلاق المودال
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };
  async function getSubCatigorys() {

    return await axios.get(
        "https://ecommerce.routemisr.com/api/v1/subcategories"
      );
 
  }

const allSubCatigorys =  data?.data.data;
return (
  <>
    {isLoading ? (
      <Loading />
    ) : (
      <div className="py-4 bg-gray-50">
        <div className="container mx-auto min-h-[80vh]">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {allSubCatigorys.map((item) => (
              <div className="relative" key={item._id}>
                <ul>
                  <li className="flex items-center group-li/hover:scale-[1.1] bg-gray-50 hover:scale-[1.1] group/li transition-all space-x-3 py-2 my-4 rtl:space-x-reverse">
                    <button
                      onClick={() => openModal(item._id)}
                      className="block w-full md:w-auto text-gray-600 text-lg group-hover/li:text-main transition-all"
                    >
                      {item.name}
                    </button>
                  </li>
                </ul>
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
            <h3 className="text-xl font-medium text-gray-900">
              {selectedItem.name}
            </h3>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-white hover:bg-main rounded-lg text-sm w-8 h-8 flex justify-center items-center"
            >
              ✕
            </button>
          </div>

          {/* محتوى المودال */}
          <div className="p-4">
            <p className="text-base leading-relaxed text-gray-500">
              {selectedItem.name}
            </p>
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
  </>)
  
}
