import React from "react";
import py1 from "../../assets/images/paypal.png";
import py2 from "../../assets/images/mastercard.webp";
import py3 from "../../assets/Images/amazon-payments-logo1.png";
import py4 from "../../assets/Images/American-Express-Color.png";
import py5 from "../../assets/Images/get-apple-store.png";
import py6 from "../../assets/Images/get-google-play.png";

export default function Footer() {
  return (
    <>
      <div
        className=" bg-gray-50
  "
      >
        <div className="container mx-auto">
          <div className=" pt-3">
            <h2 className="text-3xl text-main   font-open-sans  mt-10">
              Get The FreashCart App
            </h2>
            <p className="text-gray-700 mt-3 font-open-sans">
              We will send you link to get the app
            </p>
          </div>

          <div
            className="
          "
          >
            <div
              className=" flex p-x  items-center
            "
            >
           
             
                <input
                  type="text"
                  id="small-input"
                  className="block w-3/4 pb-4 h-12 mt-1 py-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-main focus:border-main dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                  type="button"
                  className="font-open-sans flex items-center justify-center text-white pb-4 bg-main h-110 w-1/4 ms-4 mt-3 py-3 hover:text-main hover:bg-white border text-nowrap border-main hover:bg-main  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                >
                 Share App Link
                </button>
              </div>
              <hr className="h-px my-8 bg-gray-300 border-0 dark:bg-gray-700" />

              <div className="payment grid grid-cols-1 md:grid-cols-2 gap-5 pb-5">
               <div className="flex items-center">
               <p className="pe-5 font-open-sans text-lg">Payment Partners</p>
                <div className="flex">
<img src={py1}className="w-[60px] px-2 h-[60px] rounded-full" alt="" />
<img src={py2}className="w-[60px] px-2 h-[60px] rounded-full" alt="" />
<img src={py3}className="w-[60px] px-2 h-[60px] rounded-full" alt="" />
<img src={py4}className="w-[60px] px-2 h-[60px] rounded-full" alt="" />
                </div>
               </div>
               <div className=" flex items-center justify-between">
                  <p className="text-gray-800  lg:ms-10  font-open-sans">Get delivery with FreshCart</p>
                  <div className="grid  sm:grid-cols-1 md:grid-cols-2 gap-5">

                    <img src={py5} className="w-[110px]" alt="" />
                    <img src={py6} className="w-[110px]"  alt="" />
                    
                  </div>
                  <hr className="h-px my-8 bg-gray-400 border-0 dark:bg-gray-700" />

               </div>
              </div>
            </div>
          </div>
        </div>
     
    </>
  );
}
