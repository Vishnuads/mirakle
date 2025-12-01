import React from 'react'
import Navbar from '../components/Home/Navbar'
import HomeBanner from '../components/Home/HomeBanner'
import SpecialOffers from '../components/Home/SpecialOffers1'
import OfferBanners from '../components/Home/OfferBanners'
import ProductsTab from '../components/Home/ProductsTab'
import Promise from '../components/Home/Promise'
import ProductBg from '../components/Home/ProductBg'
import Footer from '../components/Home/Footer'
import { CartProvider } from '../context/CartContext';
import AddToCart from '@/components/Cart/AddToCart'

export default function Home() {
  return (
    <>
    <CartProvider>
      <Navbar />
      <section className='bg-[#F6F6F6]'>
      <HomeBanner />
      <SpecialOffers />
      <OfferBanners />
      <ProductsTab />
      <Promise />
      <ProductBg />
      </section>
      <Footer />
     
      <AddToCart/>
     
      </CartProvider>
    </>
  )
}
