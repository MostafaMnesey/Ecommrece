import React from 'react'
import Nav from '../../Components/Navbar/Nav'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'

export default function Layout() {
  return <>
    <Nav/>
     <Outlet/>
<Footer></Footer>
  </>
}
