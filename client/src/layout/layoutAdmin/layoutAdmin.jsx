import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../layoutUser/footer/footer'
import HeaderAdmin from './headerAdmin/headerAdmin'


const LayoutAdmin = () => {
  return (
    <div>
      <HeaderAdmin />
      <Outlet />
      <Footer />
    </div>
  )
}

export default LayoutAdmin