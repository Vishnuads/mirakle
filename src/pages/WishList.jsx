import Footer from '@/components/Home/Footer';
import NavBar from '@/components/Home/Navbar';
import ProductBg from '@/components/Home/ProductBg';
import ProductCard from '@/components/Product/ProductCard';
import SectionBanner from '@/components/SectionBanner';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { LucideSquareArrowOutUpRight } from 'lucide-react'
import { ProductListCreate } from '@/context/ClientContext';
import { mainContext } from '@/context/HomeContext';


const Wishlist = () => {

  const { favItems, isFavorite, toggleFav, wishlistItems, handleWishlist, likedItems, fetchWishlist, handleWishlistt, setShowLogin, addToCartSidebar } = useContext(CartContext);
  const { addToCart } = useContext(ProductListCreate)
  const { productData } = useContext(mainContext);


  useEffect(() => {
    fetchWishlist()
  }, [])

  wishlistItems.forEach((item) => {
    const product = productData.find(
      (p) => String(p._id) === String(item.productId)
    );
  });

  const token = localStorage.getItem("userToken");
  const handleAddToCart = (item) => {
    if (!token) {
      // user not logged in
      setShowLogin(true);
      return;
    }

    // user logged in → add to cart
    addToCartSidebar(item)
    addToCart(item);
  };


  return (
    <>
      <NavBar />
      <SectionBanner title="Wishlist" />
      <section className=' bg-[#F6F6F6] min-h-screen relative '>

        {wishlistItems.length > 0 ?
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 max-w-6xl mx-auto py-5' >
            {wishlistItems.map((item, index) => {
              const fullProduct = productData.find(
                (p) => String(p._id) === String(item.productId)
              );

              return (
                <div key={index} className='px-2 mb-3'>
                  <ProductCard
                    product={fullProduct}   // fallback to item
                    productId={fullProduct?._id}
                    image={fullProduct?.images?.[0]}
                    title={fullProduct?.title}
                    prices={fullProduct?.prices?.[0]}
                    tags={fullProduct?.tags|| []}
                    rating={fullProduct?.rating}
                    handleWishlist={handleWishlist}
                    likedItems={likedItems}
                    productType={fullProduct?.productType}
                    netQuantity={fullProduct?.netQuantity}
                    fetchWishlist={fetchWishlist}
                    isFavorite={isFavorite}
                    toggleFav={toggleFav}
                    handleAddToCart={handleAddToCart}
                  />
                </div>
              );
            })}

          </div >
          :
          <div className='min-h-[60vh] flex  justify-center items-center  '>
            <div className='text-center md:flex  items-center gap-5'>
              <p className='text-xl text-gray-500  py-6 '>Your Wishlist is Empty</p>
              <div className='h-10 w-[1px] bg-black/50 hidden md:block'></div>
              <Link to="/shop">
                <p className='flex items-center gap-3 underline text-xl font-bold text-black rounded-3'>Countinue Shoping <LucideSquareArrowOutUpRight /> </p>
              </Link>
            </div>
          </div>
        }
        <ProductBg />
      </section>

      <Footer />

    </>
  )
}

export default Wishlist
