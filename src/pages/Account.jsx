import AccountHome from '@/components/Account/AccountHome'
import Footer from '@/components/Home/Footer'
import NavBar from '@/components/Home/Navbar'
import ProductBg from '@/components/Home/ProductBg'
import SectionBanner from '@/components/SectionBanner'
import React from 'react'

const Account = () => {
  return (
    <>
    <NavBar/>
    <SectionBanner title="My Account" />
    <AccountHome/>
    {/* <ProductBg/> */}
    <Footer/>
      
    </>
  )
}

export default Account
