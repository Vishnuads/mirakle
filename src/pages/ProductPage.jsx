import Footer from '@/components/Home/Footer'
import NavBar from '@/components/Home/Navbar'
import ProductBg from '@/components/Home/ProductBg'
import ProductHome from '@/components/Product/ProductHome'
import Dummy from '@/components/Product/Dummy'
import React from 'react'
import Tabs from '@/components/Product/Tabs'
import Like from '@/components/Product/Like'

const ProductPage = () => {
    return (
        <div>
            <NavBar />
            {/* <ProductHome /> */}
            <section className='bg-[#F6F6F6]'>
            <Dummy/>
            {/* <Tabs/> */}
            {/* <Like/> */}
            <ProductBg />
            </section>
            <Footer />
        </div>
    )
}

export default ProductPage
