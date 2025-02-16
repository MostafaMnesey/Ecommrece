import React from 'react'
import { use } from 'react';
import { Navigate } from 'react-router-dom';

export default function AuthGuard({ children }) {
   
    const token = localStorage.getItem('token');
    console.log(children);
   
    
  return <>
   {
!token ? children : <Navigate to="/" />
    }
  </>
}
