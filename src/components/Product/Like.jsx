import React, { useContext } from 'react'
import ProductCard from './ProductCard'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import off1 from "../../assets/images/product2.png"
import off2 from "../../assets/images/product1.png"
import off3 from "../../assets/images/product2.png"
import off4 from "../../assets/images/product1.png"
import { CartContext } from '@/context/CartContext';
import { useNavigate, useParams } from 'react-router-dom';
import { mainContext } from '@/context/HomeContext';
import { ProductListCreate } from '@/context/ClientContext';

const Like = () => {

  const { productData } = useContext(mainContext);
  const{isFavorite, toggleFav, wishlistItems,handleWishlist,likedItems, fetchWishlist,handleWishlistt,
  setShowLogin,
  addToCartSidebar
  } = useContext(CartContext)
   const {addToCart} = useContext(ProductListCreate)

    const { name, id } = useParams();

const decodedName = decodeURIComponent(name)
  .replace(/-/g, " ")
  .trim()
  .toLowerCase();

const relatedProducts = productData.filter((p) => {
  if (String(p._id) === id) return false;

  return (
    Array.isArray(p.tags) &&
    p.tags.some((tag) =>
      tag.toLowerCase().includes(decodedName)
    )
  );
});

// console.log(relatedProducts);

  

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


    const settings = {
        dots: false, // remove dots
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        pauseOnHover: false,
        cssEase: "ease-in-out",
        responsive: [
            {
                breakpoint: 1024, // Tablet
                settings: { slidesToShow: 3, slidesToScroll: 1, }
            },
            {
                breakpoint: 768, // Mobile
                settings: { slidesToShow: 2, slidesToScroll: 1, }
            },
            {
                breakpoint: 480, // Small mobile
                settings: { slidesToShow: 1, slidesToScroll: 1, }
            }
        ]

    };

    const products = [
        { id: 1, image: off1, name: "Sauce Package", price: 2249, rating: 4.5, tags: ['500ml', 'Sauce'] },
        { id: 2, image: off2, name: "Pasta seasoning", price: 224, rating: 5, tags: ['700ml', 'Sauce'] },
        { id: 3, image: off3, name: "Garlic powder", price: 179, rating: 3.1, tags: ['100ml', 'Sauce'] },
        { id: 4, image: off4, name: "Sauce Package", price: 345, rating: 4.5, tags: ['250ml', 'Sauce'] },
        { id: 5, image: off2, name: "Pasta seasoning", price: 224, rating: 5, tags: ['700ml', 'Sauce'] },
    ]

    // const {isFavorite, addToCart, toggleFav } = useContext(CartContext);
    return (
        <>
            <section className='text-center max-w-6xl mx-auto mt-5'>
                <h1 className='mb-3'>You might also like</h1>
                <Slider {...settings} >
                    {relatedProducts.map((product, index) => (
                        <div key={index} className='px-2'>
                            <ProductCard
                            product={product}
                               productId={product._id}
                               image={product.images?.[0]}
                                title={product.title}
                                 prices={product.prices?.[0]}
                                rating={product.rating}
                                tags={[product.tags?.[0]]}
                                netQuantity={product.netQuantity?.[0]}
                                handleWishlist={handleWishlist}
                                productType={product.productType}
                                wishlistItems={wishlistItems}
                                likedItems={likedItems}
                              fetchWishlist={fetchWishlist}
                              isFavorite={isFavorite}
                              toggleFav={toggleFav}
                              handleAddToCart={handleAddToCart}
                            />
                        </div>
                    ))}
                </Slider>

            </section>

        </>
    )
}

export default Like
