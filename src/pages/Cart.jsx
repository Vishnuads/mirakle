import CartHome from '@/components/Cart/CartHome'
import Footer from '@/components/Home/Footer'
import NavBar from '@/components/Home/Navbar'
import ProductBg from '@/components/Home/ProductBg'
import SectionBanner from '@/components/SectionBanner'
import { CartContext } from '@/context/CartContext'
import React, { useContext } from 'react'

const Cart = () => {

  return (
    <>
      <NavBar/>
      <SectionBanner title="My Cart"/>
      <CartHome />
      <Footer/>
    </>
  )
}

export default Cart
