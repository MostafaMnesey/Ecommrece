import React, { useContext, useEffect, useState } from "react";
import Logo from "../../assets/images/freshcart-logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { motion } from "framer-motion";
import { WishlistContext } from "../../Context/WishlistContext";
import { use } from "react";
import { CartContext } from "../../Context/CartContext";

export default function Nav() {
  const { wishlistItem, getWishlist } = useContext(WishlistContext);
  const { cartCount } = useContext(CartContext);
  const [isNavOpen, setIsNavOpen] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }
  useEffect(() => {
    getWishlist();
  }, []);
  const { token, setToken } = useContext(AuthContext);
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-r flex-wrap items-center justify-center md:justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="h-8" alt="Flowbite Logo" />
          </Link>
          <div className="flex md:order-2 items-center space-x-3 md:space-x-0 rtl:space-x-reverse">
            {token ? (
              <Link
                onClick={logout}
                to="/login"
                className="my-5 mx-3 text-white bg-main hover:bg-red-600 transition-all hover:text-white hover:border-[1px] border-[1px]  border-1 border-transparent hover:border-transparent  lg:mx-3 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Logout
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="my-5 mx-3 text-white bg-main hover:bg-white hover:text-main hover:border-[1px] border-[1px]  border-1 border-transparent hover:border-main  lg:mx-3 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="my-5 mx-3 text-white bg-main hover:bg-white hover:text-main hover:border-[1px] border-[1px]  border-1 border-transparent hover:border-main  lg:mx-3 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </Link>
              </>
            )}

{token?(
    <button
    type="button"
    onClick={() => setIsNavOpen(prev => !prev)}
    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
  >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
):null}
          </div>
         <div
  className={`${
    isNavOpen ? "block" : "hidden"
  } md:flex items-center justify-between w-full md:w-auto md:order-1`}
>

            {token ? (
              <ul className="flex flex-col  font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li className="transition-all  group/li	  py-2 px-2 rounded-lg hover:text-black hover:bg-main hover:border-main">
                  <Link
                    to="/"
                    className="block py-2 px-3 md:p-0 text-main  group-hover/li:text-white   md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    home
                  </Link>
                </li>
                <li className="transition-all group/li	  py-2 px-2 rounded-lg hover:text-black hover:bg-main hover:border-black">
                  <Link
                    to="/Catigories"
                    className="block py-2 px-3 md:p-0 text-main  group-hover/li:text-white   md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Catigories
                  </Link>
                </li>
                <li className="transition-all group/li	  py-2 px-2 rounded-lg hover:text-black hover:bg-main hover:border-black">
                  <Link
                    to="/subcategories"
                    className="block py-2 px-3 md:p-0 text-main  group-hover/li:text-white   md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Sub Categories
                  </Link>
                </li>
                <li className="transition-all	 group/li  py-2 px-2 rounded-lg hover:text-black  hover:bg-main hover:border-main">
                  <Link
                    to="/brands"
                    className="block py-2 px-3 md:p-0 text-main  group-hover/li:text-white   md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Brands
                  </Link>
                </li>
                <li className="transition-all	 group/li  py-2 px-2 rounded-lg hover:bg-main hover:border-main">
                  <Link
                    to="products"
                    className="block py-2 px-3 md:p-0 text-main  group-hover/li:text-white   md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Products
                  </Link>
                </li>
                <li className="transition-all	 group/li  py-2 px-2 rounded-lg hover:text-black ">
                  <Link to="/wishlist" className="relative  items-center ">
                    <i className="fa-solid fa-shield-heart text-2xl text-green-400 hover:text-main md:ms-20">
                      <span className="ms-2 text-[10px]">WishList</span>{" "}
                    </i>

                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-[80%] -end-2 dark:border-gray-900">
                      {wishlistItem
                        ? wishlistItem
                        : localStorage.getItem("wishlist")}
                    </div>
                  </Link>
                </li>
                <li className="transition-all	 group/li  py-2 px-2 rounded-lg hover:text-black ">
                  <Link to="/cart" className="relative  items-center ">
                    <i className="fa-solid fa-cart-shopping text-2xl text-green-400 hover:text-main ">
                      <span className="text-[10px]">Cart</span>
                    </i>

                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-4 -end-2 dark:border-gray-900">
                      {cartCount
                        ? cartCount
                        : localStorage.getItem("cartCount")}
                    </div>
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}
