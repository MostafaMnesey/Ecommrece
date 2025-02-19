import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import Sliderr from "../Slider/Sliderr";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export default function Cart() {
  const [loadingCash, setLoadingCash] = useState(false);
  const [loadingVisa, setLoadingVisa] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState();
  const [userId, setuserId] = useState(null);
  const {
    cartCount,
    cartItem,
    getCartItems,
    removeItem,
    clearCart,
    updateCartItemsm,
    cartId,
  } = useContext(CartContext);
  useEffect(() => {
    getUserId();
    getCartItems();
  }, []);

  function getUserId() {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    setuserId(decoded.id);
  }
  const validationSchema = Yup.object().shape({
    shippingAddress: Yup.object().shape({
      details: Yup.string().required("Details is required"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(/^[0-9]+$/, "Invalid phone number")
        .min(10, "Invalid phone number")
        .max(11, "Invalid phone number"),
      city: Yup.string().required("City is required"),
    }),
  });
  const Formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    validationSchema,
    onSubmit: handelOrder,
  });

  async function cashOrder(values) {
    setLoadingCash(true);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        values,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res?.status == 201) 
        toast.success("order created successfully");
      getCartItems();
        
      
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setLoadingCash(false);
    }
  }
  async function visaOrder(values) {
    setLoadingVisa(true);
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        values,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
          params:{
            url:`${window.location.origin}`
          }
        }
      );

      console.log(res);

      if (res.status == 200) {
        window.open(res.data.session.url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingVisa(false);
    }
  }

  function handelOrder(values) {
    if (paymentMethod === "cash") {
      cashOrder(values);
    } else if (paymentMethod === "visa") {
      visaOrder(values);
    }
  }
  function openModal() {
    setIsModalOpen(true);
  }

  // إغلاق المودال
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const products = cartItem?.products;

  return (
    <>
      <div className=" py-4 bg-gray-50 ">
        <div className="container   mx-auto min-h-[50vh]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative col-span-2 overflow-x-auto  sm:rounded-lg">
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
                      count
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
                  {products?.map((item) => {
                    return (
                      <tr
                        key={item._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="p-4">
                          <img
                            src={item.product.imageCover}
                            className="w-20  h-20 rounded-full"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-center text-gray-900 dark:text-white">
                          {item.product.title}
                        </td>

                        <td className="px-6 py-4 font-semibold text-center text-gray-900 dark:text-white">
                          <span className=" text-lg		">{item.price}</span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 text-center dark:text-white">
                          <button
                            type="button"
                            onClick={() => {
                              updateCartItems(item.product.id, item.count + 1);
                            }}
                          >
                            <i className="fa-solid fa-plus text-white text-lg bg-main  p-1 rounded-full"></i>
                          </button>
                          <span className="text-lg mx-5">{item.count}</span>
                          <button
                            type="button"
                            onClick={() => {
                              updateCartItems(item.product.id, item.count - 1);
                            }}
                          >
                            <i className="fa-solid fa-minus text-white text-lg bg-main  p-1 rounded-full"></i>
                          </button>
                        </td>
                        <td className="px-6 py-4 col-span-2 flex justify-center items-center h-auto ">
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id)}
                            className="text-white  
             group-hover/hover:top-0 group-hover/hover:right-0  
             bg-red-500 hover:bg-white hover:text-red-500 
              border-2 border-transparent hover:border-red-500 
             px-3 py-2 text-nowrap md:px-5  md:py-2.5 my-3
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
            <div className="ms-24 md:ms-0 my-10 justify-self-start">
              <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
                  Total Cart
                </h5>
                <div className="flex items-baseline text-gray-900 dark:text-white">
                  <span className="text-3xl font-semibold">$</span>
                  <span className="text-5xl font-extrabold tracking-tight">
                    {cartItem.totalCartPrice}
                  </span>
                  <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400"></span>
                </div>
                <ul role="list" className="space-y-5 my-7">
                  <li className="flex items-center">
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                      Number of Cart Items{" "}
                      <span className="font-semibold text-lg text-gray-800">
                        {products?.length}
                      </span>
                    </span>
                  </li>
                </ul>
                <div className="flex justify-between">
                  {" "}
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-white mx-2 bg-red-500 hover:bg-white hover:text-red-500 border-2 border-transparent hover:border-red-500  focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 text-nowrap w-full text-center"
                  >
                    Clear Cart
                  </button>{" "}
                  <button
                    onClick={() => openModal(cartId)}
                    type="button"
                    className="text-white flex  bg-main mx-2 hover:bg-white hover:text-main border-2 border-transparent hover:border-main  focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5  w-full text-center"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* المودال */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            {/* رأس المودال */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-2xl text-center font-medium text-main">
                Checkout
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
              <form className="p-4 md:p-5" onSubmit={Formik.handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="details"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      details
                    </label>
                    <input
                      type="text"
                      name="shippingAddress.details"
                      id="details"
                      onBlur={Formik.handleBlur}
                      onChange={Formik.handleChange}
                      value={Formik.values.shippingAddress.details}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="details"
                    />
                    {Formik.touched.shippingAddress?.details &&
                      Formik.errors.shippingAddress?.details && (
                        <div className="text-red-500">
                          {Formik.errors.shippingAddress.details}
                        </div>
                      )}
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      phone
                    </label>
                    <input
                      type="text"
                      name="shippingAddress.phone"
                      id="details"
                      onBlur={Formik.handleBlur}
                      onChange={Formik.handleChange}
                      value={Formik.values.shippingAddress.phone}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="phone"
                    />
                    {Formik.touched.shippingAddress?.phone &&
                      Formik.errors.shippingAddress?.phone && (
                        <div className="text-red-500">
                          {Formik.errors.shippingAddress.phone}
                        </div>
                      )}
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="City"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="shippingAddress.city"
                      id="details"
                      onBlur={Formik.handleBlur}
                      onChange={Formik.handleChange}
                      value={Formik.values.shippingAddress.city}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="City"
                    />
                    {Formik.touched.shippingAddress?.city &&
                      Formik.errors.shippingAddress?.city && (
                        <div className="text-red-500">
                          {Formik.errors.shippingAddress.city}
                        </div>
                      )}
                  </div>
                </div>
                <div className=" flex justify-center">
                  {" "}
                  <button
                    onClick={() => setPaymentMethod("visa")}
                    className="text-white inline-flex items-center mx-4 bg-main hover:bg-white hover:text-main border-2 border-transparent hover:border-main  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {loadingVisa ? (
                      <div className="flex justify-center items-center ">
                        <Oval
                          visible={true}
                          height="40"
                          width="40"
                          color="#fff"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      </div>
                    ) : (
                      "Visa Order"
                    )}
                  </button>
                  <button
                    onClick={() => setPaymentMethod("cash")}
                    className="text-white inline-flex items-center mx-4 bg-main hover:bg-white  hover:text-main border-2 border-transparent hover:border-main focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {loadingCash ? (
                      <div className="flex justify-center items-center ">
                        <Oval
                          visible={true}
                          height="40"
                          width="40"
                          color="#fff"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      </div>
                    ) : (
                      "Cash Order"
                    )}
                  </button>
                </div>
              </form>
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
