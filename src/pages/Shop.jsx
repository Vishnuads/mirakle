import Footer from '@/components/Home/Footer'
import NavBar from '@/components/Home/Navbar'
import ProductBg from '@/components/Home/ProductBg'
import ProductCard from '@/components/Product/ProductCard'
import SectionBanner from '@/components/SectionBanner'
import React, { useState, useContext } from 'react'
import { mainContext } from '@/context/HomeContext'
import { ProductListCreate } from '@/context/ClientContext'
import { CartContext } from '../context/CartContext'
import { CaretDown } from 'phosphor-react'

const Shop = () => {

  const { productData, productCategory } = useContext(mainContext);
  const { addToCart } = useContext(ProductListCreate);

  const {
    isFavorite,
    toggleFav,
    wishlistItems,
    handleWishlist,
    likedItems,
    fetchWishlist,
    setShowLogin,
    addToCartSidebar
  } = useContext(CartContext);

  const [selectedTab, setSelectedTab] = useState("All");

  const token = localStorage.getItem("userToken");

  // ------------------------------
  // CART FUNCTION — login protected
  // ------------------------------

  const handleAddToCart = (item) => {
    if (!token) {
      setShowLogin(true);
      return;
    }
    addToCartSidebar(item);
    addToCart(item);
  };

  // ------------------------------
  // FILTER PRODUCTS BASED ON CATEGORY
  // ------------------------------

  const filteredProducts =
    selectedTab === "All"
      ? productData
      : productData.filter(
        (p) =>
          p.productName?.toLowerCase() === selectedTab.toLowerCase()
      );

  return (
    <>
      <NavBar />
      <SectionBanner title="Shop" />

      <div className="bg-[#F6F6F6] w-full">
        <section className='md:max-w-6xl md:mx-auto py-4'>

          {/* HEADER — PRODUCT COUNT + DROPDOWN */}
          <div className="flex gap-3 items-center justify-between my-4 px-3 relative">
            <h1>Products</h1>

            <div className="dropdown dropdown-end  text-black">
              <div tabIndex={0} role="button" className="btn m-1 bg-white shadow-none border rounded-5"><p className='flex items-center gap-2'>{selectedTab} <CaretDown/></p></div>
              <ul tabIndex="-1" className="dropdown-content menu bg-white rounded-box z-1 w-52 p-2 shadow-md ">
                 {productCategory.map((tab, id) => (
                  <li
                    key={id}
                    onClick={() => setSelectedTab(tab.productName)}
                    className=' hover:bg-gray-100  text-sm rounded-2 cursor-pointer'
                  >
                   <p className='mb-0'>{tab.productName}</p> 
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 '>
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-600 text-lg font-medium">
                  No products found
                </p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product._id} className='px-3 mb-3'>
                  <ProductCard
                    product={product}
                    productId={product._id}
                    image={product.images?.[0]}
                    title={product?.title}
                    prices={product.prices?.[0]}
                    rating={product.rating}
                    tags={product.tags}
                    netQuantity={product.netQuantity}
                    productType={product.productType}

                    // Wishlist
                    handleWishlist={handleWishlist}
                    wishlistItems={wishlistItems}
                    likedItems={likedItems}
                    isFavorite={isFavorite}
                    toggleFav={toggleFav}
                    fetchWishlist={fetchWishlist}

                    // Cart
                    handleAddToCart={handleAddToCart}
                  />
                </div>
              ))
            )}
          </div>

        </section>

        <ProductBg />
      </div>

      <Footer />
    </>
  );
};

export default Shop;
