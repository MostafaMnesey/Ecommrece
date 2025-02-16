import axios from "axios";
import { useFormik } from "formik";
import SweetAlert from "../SweetAlert/SweetAlert";

import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigete=useNavigate()
  async function setNewPassword(values) {
    setError(null);
    setLoading(true);
    setSuccess(null);
    console.log(values);
    try {
      const res = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      console.log(res);
      if (res.status == "200") {
        setSuccess("Password reset successfully");
        sessionStorage.removeItem('flag')
        navigete('/')
      }
    } catch (err) {
      
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    newPassword: Yup.string()
      .min(6, "Password is Too Short!")
      .max(50, "Password is Too Long!")
      .required("Enter your password"),
  });
  const Formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    validate: (values) => {},
    onSubmit: (values) => {
      setNewPassword(values);
    },
  });

  return (
    <div className="bg-gray-100 min-h-[80vh] flex items-center justify-center">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg text-center ">
          <h2 className="text-2xl font-semibold mb-4 my-3 text-main font-open-sans">
            <span className="text-[60px] ">R</span> eset password
          </h2>

          <div>
            <form onSubmit={Formik.handleSubmit}>
              <input
                type="text"
                name="email"
                onBlur={Formik.handleBlur}
                onChange={Formik.handleChange}
                placeholder="Enter your email"
                className="bg-gray-50 text-center text-gray-500 font-semibold border lg:w-full px-16 my-3 border-gray-300   rounded-lg focus:ring-main focus:border-main block   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main"
              />
              {Formik.errors.email && Formik.touched.email ? (
                <div
                  class="flex items-center p-4 my-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <svg
                    class="shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span class="sr-only">Info</span>
                  <div>
                    <span class="font-medium">Danger alert!</span>{" "}
                    {Formik.errors.email}
                  </div>
                </div>
              ) : null}
              <input
                type="password"
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
                name="newPassword"
                placeholder="Enter your new password"
                className="bg-gray-50 text-center text-gray-500 font-semibold border lg:w-full px-16 my-3 border-gray-300   rounded-lg focus:ring-main focus:border-main block   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main"
              />
              {Formik.errors.newPassword && Formik.touched.newPassword ? (
                <div
                  class="flex items-center p-4 my-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <svg
                    class="shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span class="sr-only">Info</span>
                  <div>
                    <span class="font-medium">Danger alert!</span>{" "}
                    {Formik.errors.newPassword}
                  </div>
                </div>
              ) : null}
              <button
                type=""
                className="text-white   my-3 border-[2px] border-transparent bg-main hover:bg-white hover:text-main hover:border-[2px] hover:border-main  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {loading ? (
                  <div className="flex justify-center items-center">
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
                  "Submit"
                )}
              </button>

              {error ? (
                <SweetAlert
                  title="Error"
                  text={error}
                  icon="error"
                  trigger={true}
                />
              ) : null}
              {success ? (
                <SweetAlert
                  title="Success"
                  text={success}
                  icon="success"
                  trigger={true}
                />
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
