import React, { useContext } from 'react'
import ProductCard from './ProductCard'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from '@/context/CartContext';
import { useParams } from 'react-router-dom';
import { mainContext } from '@/context/HomeContext';
import { ProductListCreate } from '@/context/ClientContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"



const Like = () => {

  const { productData } = useContext(mainContext);
  const { isFavorite, toggleFav, wishlistItems, handleWishlist, likedItems, fetchWishlist, handleWishlistt,
    setShowLogin,
    addToCartSidebar
  } = useContext(CartContext)
  const { addToCart } = useContext(ProductListCreate)

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

  return (
    <>
      <section className='text-center max-w-6xl mx-auto mt-5 '>

        <h1 className='mb-3'>You might also like</h1>

        <Carousel >
          <CarouselContent className="px-5">
            {relatedProducts.map((product, index) => (
              <CarouselItem className="md:basis-1/3 lg:basis-1/4 sm:basis-1" key={index}>
                <ProductCard
                  product={product}
                  productId={product._id}
                  image={product.images?.[0]}
                  title={product.title}
                  prices={product.prices?.[0]}
                  rating={product.rating}
                  tags={[product.tags?.[0]]}
                  netQuantity={product.netQuantity}
                  handleWishlist={handleWishlist}
                  productType={product.productType}
                  wishlistItems={wishlistItems}
                  likedItems={likedItems}
                  fetchWishlist={fetchWishlist}
                  isFavorite={isFavorite}
                  toggleFav={toggleFav}
                  handleAddToCart={handleAddToCart}
                />

              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

      </section>

    </>
  )
}

export default Like
