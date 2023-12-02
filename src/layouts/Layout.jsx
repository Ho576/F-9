import React from 'react'
import Navbar from '../componants/web/navbar/Navbar'
import Footer from '../componants/web/footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout({user,setUser}) {
  return (
    <>
    <Navbar user={user} setUser={setUser}/>
    <Outlet/>
    <Footer/>
    </>
  )
}
