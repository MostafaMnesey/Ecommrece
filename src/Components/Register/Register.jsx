import React, { useState } from "react";
import img from "../../assets/images/freshcart-logo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { InfinitySpin, Oval } from "react-loader-spinner";
import { useNavigate,Link } from "react-router-dom";
import SweetAlert from "../SweetAlert/SweetAlert";
export default function Register() {
  let [loaing, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [success, setSuccess] = useState(null);
  const phoneRegex=/^01[0-2,5]{1}[0-9]{8}$/
const navigate=useNavigate()
  
  const schema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name is Too Short!")
      .max(50, " Name is Too Long!")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password is Too Short!")
      .max(50, "Password is Too Long!")
      .required("Enter your password"),
    rePassword: Yup.string()
      .min(6)
      .max(50)
      .required("Re-enter your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone: Yup.string()
      .min(10).matches(phoneRegex, "Invalid phone number,Egyptian phone number only")
      .max(11, "Invalid phone number")
      .required("Phone number is required"),
  });

  const Formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: schema,
    onSubmit: register,
  });
 

  async function register(values) {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
     
      setSuccess(data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
  
      
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="re bg-gray-200 min-h-[89vh]">
        <div className="container  flex justify-center items-center mx-auto">
          <div className="card bg-white w-2/4 rounded-lg my-20">
            <div className="img flex justify-center items-center p-8">
              <img src={img} alt="" />
            </div>
            <div className="form shadow-2xl rounded-lg p-8">
              <form
                onSubmit={Formik.handleSubmit}
                className="max-w-lg mx-auto flex flex-col "
                action="#"
                method="POST"
              >
                <div className="grid md:grid-cols-1 md:gap-6 my-2">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      onChange={Formik.handleChange}
                      onBlur={Formik.handleBlur}
                      type="text"
                      name="name"
                      id="floating_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Name
                    </label>
                  </div>
                  {Formik.errors.name && Formik.touched.name ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <svg
                        className="shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium"></span>{" "}
                        {Formik.errors.name}
                      </div>
                    </div>
                  ) : null}
                  <div className="relative z-0 w-full mb-5 group my-2">
                    <input
                      onChange={Formik.handleChange}
                      type="email"
                      name="email"
                      onBlur={Formik.handleBlur}
                      id="floating_email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email address
                    </label>
                  </div>
                  {Formik.errors.email && Formik.touched.email ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <svg
                        className="shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium"></span>
                        {Formik.errors.email}
                      </div>
                    </div>
                  ) : null}
                  <div className="relative z-0 w-full mb-5 group my-2">
                    <input
                      onChange={Formik.handleChange}
                      type="password"
                      name="password"
                      onBlur={Formik.handleBlur}
                      id="floating_password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Password
                    </label>
                  </div>
                  {Formik.errors.password && Formik.touched.password ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <svg
                        className="shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium"></span>{" "}
                        {Formik.errors.password}
                      </div>
                    </div>
                  ) : null}
                  <div className="relative z-0 w-full mb-5 group my-2">
                    <input
                      onChange={Formik.handleChange}
                      type="password"
                      name="rePassword"
                      onBlur={Formik.handleBlur}
                      id="floating_repeat_password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_repeat_password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Confirm password
                    </label>
                  </div>
                  {Formik.errors.rePassword && Formik.touched.rePassword ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <svg
                        className="shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium"></span>{" "}
                        {Formik.errors.rePassword}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="grid md:grid-cols-1 md:gap-6 my-2">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      onChange={Formik.handleChange}
                      type="tel"
                      name="phone"
                      onBlur={Formik.handleBlur}
                      id="floating_phone"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-main peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_phone"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main py-1 peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Phone number <span className=" text-md">( 01XXXXXXXXX )</span>
                    </label>
                  </div>
                  {Formik.errors.phone && Formik.touched.phone ? (
                    <div
                      className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <svg
                        className="shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <span className="sr-only">Info</span>
                      <div>
                        <span className="font-medium"></span>{" "}
                        {Formik.errors.phone}
                      </div>
                    </div>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="text-white   mb-8 border-[2px] border-transparent bg-main hover:bg-white hover:text-main hover:border-[2px] hover:border-main  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {loaing ? 
                    <div className="flex justify-center items-center me-4">
                     
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
                   : 
                    "Submit"
                  }
                </button>
               {error ? <SweetAlert title="Error" text={error} icon="error" trigger={true} />:null}
               {success ? <SweetAlert title="Success" text={'Account Created Successfuly'} icon="success" trigger={true} />:null}
              </form>
              <p className="text-center text-gray-400">Do you have an account ? <span className='underline  text-main ' ><Link to='/login' >Login</Link></span></p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
