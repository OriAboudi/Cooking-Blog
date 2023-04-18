import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './footer/footer'
import HeaderUser from './header/headerUser'


const Layout = () => {
  return (
    <div>
      <HeaderUser />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default Layout