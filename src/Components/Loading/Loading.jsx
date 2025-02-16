import React from "react";
import { motion } from "framer-motion";
import { Hourglass } from "react-loader-spinner";
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] bg-gray-100">
      <Hourglass
  visible={true}
  height="80"
  width="80"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['rgb(10, 173, 10, 0.8)', '#000']}
  />
    </div>
  );
}
