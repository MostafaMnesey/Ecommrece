import React, { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function VerficationGuard({ children }) {
    console.log(children);
    



const flag=sessionStorage.getItem('flag')



  return <>
  
  
  {flag?children:<Navigate to='/login'/>}
  </>
}
