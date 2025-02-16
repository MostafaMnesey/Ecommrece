import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import CountdownTimer from "../CountDown/CountdownTimer";
import { Oval } from "react-loader-spinner";
import SweetAlert from "../SweetAlert/SweetAlert";
import { useNavigate } from "react-router-dom";
export default function Otp() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function resetCode(values) {
    setError(null);
    try {
      setLoading(true);
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );
     
      setSuccess(res.data.status);
      setTimeout(() => {
        navigate("/resetPassword");
      }, 500);
    } catch (err) {
      const { data } = err.response;

      if (err.name == "AxiosError") {
        setError(err.message);
      }
      setError(data.message);

    } finally {
      setLoading(false);
    }
  }

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .matches(/^[0-9]{6}$/, "OTP must be exactly 6 digits , no alphabets")
      .required("OTP is required"),
  });
  const otpRegex = /^[0-9]{1}$/;
  const Formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validate: (values) => {},

    validationSchema,
    onSubmit: (values) => {
      resetCode(values);
    },
  });
  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-[80vh]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2    md:w-2/4 lg:w-1/4">
              <h1 className="text-2xl font-bold text-center text-main">
                <span className="text-[60px] text-main">O</span>TP
              </h1>
              <form className="mt-4" onSubmit={Formik.handleSubmit}>
                <div className="mb-4 flex flex-col justify-center">
                  <label
                    htmlFor="otp"
                    className="block mx-1 text-sm font-medium text-main"
                  >
                    Enter OTP
                  </label>
                  <div className="flex w-full justify-center items-center">
                    <div className="">
                      <input
                        type="text"
                        name="resetCode"
                        id="base-input"
                        maxLength={6}
                        onBlur={Formik.handleBlur}
                        onChange={(e) => {
                          // السماح فقط بالأرقام 0-9 وإزالة أي أحرف غير مطابقة
                          const filteredValue = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );

                          Formik.setFieldValue("resetCode", filteredValue); // ✅ تحديث القيمة بدون مسح كل شيء
                        }}
                        value={Formik.values.resetCode} // ✅ القيمة تأتي من
                        className="bg-gray-50 text-center text-gray-500 font-semibold border lg:w-full px-16 my-3 border-gray-300   rounded-lg focus:ring-main focus:border-main block   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main"
                      />
                    </div>
                  </div>
                  {
                    <div className="text-red-500 text-xs mt-1 ">
                      {Formik.errors.resetCode && Formik.touched.resetCode ? (
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
                            {Formik.errors.resetCode}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  }
                  <p>
                    <CountdownTimer />
                  </p>
                  <button
                    type=""
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
