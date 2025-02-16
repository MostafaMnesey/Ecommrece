import axios from "axios";
import { useFormik } from "formik";
import { tr } from "framer-motion/client";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import * as Yup from "yup";
import SweetAlert from "../SweetAlert/SweetAlert";
import { useNavigate } from "react-router-dom";
export default function VerifyPassword() {
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  async function verifyEmail(values) {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );

      console.log(response);
      setSuccess(response.data.message);
      setTimeout(() => {
        navigate("/resetcode");
      }, 1500);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  const Formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: verifyEmail,
  });
  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-[80vh]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
              <h1 className="text-2xl font-bold text-center text-main">
                Verify Email
              </h1>
              <form className="mt-4" onSubmit={Formik.handleSubmit}>
                <div className="mb-4 flex flex-col justify-center">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-main"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="password"
                    name="email"
                    onBlur={Formik.handleBlur}
                    onChange={Formik.handleChange}
                    autoComplete="password"
                    placeholder="Enter your Email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-main focus:ring-0 focus:ring-main  sm:text-sm
                "
                  />
                  {
                    <div className="text-red-500 text-xs mt-1">
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
                    </div>
                  }
                  <button
                    type="submit"
                    className="text-white   my-3 border-[2px] border-transparent bg-main hover:bg-white hover:text-main hover:border-[2px] hover:border-main  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {loading ? (
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
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
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
    </>
  );
}
