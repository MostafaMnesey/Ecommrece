import React, { useContext } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
export default function WishList() {
  const { addToCart } = useContext(CartContext);
  const { wishlist, removeItem } = useContext(WishlistContext);


  return (
    <>
      <div className=" py-4 bg-gray-50 ">
        <div className="container   mx-auto min-h-[50vh]">

          <h1 className="text-3xl text-main   font-open-sans font-semibold text-center  my-10">WishList</h1>
          <div className="relative overflow-x-auto  sm:rounded-lg">
            
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 text-center  py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6  text-center py-3">
                    Product
                  </th>

                  <th scope="col" className="px-6  text-center py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6  text-center  py-3">
                    Price After Discount
                  </th>
                  <th
                    scope="col"
                    className="px-6  text-center py-3 col-span-2 "
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {wishlist.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <img
                          src={item.imageCover}
                          className="w-20  h-20 rounded-full"
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-center text-gray-900 dark:text-white">
                        {item.title}
                      </td>

                      <td className="px-6 py-4 font-semibold text-center text-gray-900 dark:text-white">
                        <span className=" text-lg		">{item.price}</span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 text-center dark:text-white">
                        <span className="text-lg">
                          {item.priceAfterDiscount}
                        </span>
                      </td>
                      <td className="px-6 py-4 col-span-2 flex justify-center ">
                        <button
                          type="button"
                          onClick={() => addToCart(item._id)}
                          className="text-white  
            group-hover/hover:top-0 group-hover/hover:right-0  
            bg-main hover:bg-white hover:text-main 
             border-2 border-transparent hover:border-main 
             px-3 py-2 text-nowrap
            focus:outline-none font-medium rounded-lg text-sm ms-10  text-center 
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
            transition-[all] delay-75  ease-in-out duration-"
                        >
                          Add to cart
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-white  
            group-hover/hover:top-0 group-hover/hover:right-0  
            bg-red-500 hover:bg-white hover:text-red-500 
             border-2 border-transparent hover:border-red-500 
            px-3 py-2 text-nowrap md:px-5  md:py-2.5 
            focus:outline-none font-medium rounded-lg text-sm ms-10  text-center 
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
            transition-[all] delay-75  ease-in-out duration-"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
