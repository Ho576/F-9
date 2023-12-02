import React from 'react'
import Navbar from '../componants/dashbord/navbar/Navbar'
import Footer from '../componants/dashbord/footer/Footer'
import { Outlet } from 'react-router-dom'

export default function DashbordLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
