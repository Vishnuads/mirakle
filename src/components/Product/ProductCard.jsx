import React, { useEffect, useState } from 'react';
import {  Star } from 'lucide-react';
import Cart from '../../assets/icons/shopping-cart.svg'
import { Heart,ShoppingCart } from "phosphor-react";
import { Link } from 'react-router-dom'


const ProductCard = ({
  image,
  title,
  prices,
  rating = 4.5,
  tags = [],
  color,
  onAddToCart,
  onToggleFavorite,
  productId,
  product,
  handleWishlist,
  likedItems,
  netQuantity,
  fetchWishlist,
  isFavorite,
  productType,
  handleAddToCart
}) => {


  const fixedProduct = {
    ...product,
    _id: productId,     // <--- FIX HERE
  };

  return (
    <div className=" bg-white rounded-2xl p-3 w-64 mx-auto  hover:-translate-y-2 transition-translate duration-300 overflow-hidden">
      <Link
        to={`/products/${product.productName.replace(/\s+/g, "-").toLowerCase()}/${product.title.replace(/\s+/g, "-").toLowerCase()}/${product._id}`}
        className="text-decoration-none"
      >

        {/* Image Container */}
        <div className="relative  ">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full md:h-48 h-64 object-cover rounded-xl mb-3"
          />

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleWishlist(fixedProduct);
            }}
            className={`absolute top-2 right-2 w-8 h-8 bg-white rounded-5 flex items-center justify-center`}
          >
            {likedItems?.[productId] ? (
              <Heart className="w-5 h-5 fill-red-500" color="#fd0808" weight="fill" />
            ) : (
              <Heart className="w-5 h-5" color="#939393" />
            )}
          </button>

        </div>
      </Link>
      <Link
        to={`/products/${product.productName.replace(/\s+/g, "-").toLowerCase()}/${product.title.replace(/\s+/g, "-").toLowerCase()}/${product._id}`}
        className="text-decoration-none"
      >

        <div className="">
          {/* Title and Rating */}
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm font-semibold mb-0 text-gray-900 leading-tight">
              {title}
            </p>
            <div className="flex items-center gap-1 bg-yellow-50 border-1 border-yellow-300 px-2 py-0.5 rounded-md ml-2 shrink-0">
              <Star className="w-3 h-3 fill-yellow-300 text-yellow-300" />
              <span className="text-xs font-semibold text-gray-700">{rating}</span>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 mb-3">
            <span className="tag">
              {netQuantity?.[0]}
            </span>
            <span className="tag">
              {productType}
            </span>
          </div>
          {/* Tags */}
          {/* {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 border-[1px] border-[#a6c789] bg-[#e9f3e1] text-[#4b6043] rounded-2 text-xs font-bold "
              >
                <p className='mb-0'>{tag}</p>
              </span>
            ))}
          </div>
        )} */}

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-gray-900">
              <p>₹{prices?.toFixed(2)}</p>
            </div>
            <button
              onClick={(e) => { e.preventDefault(); handleAddToCart(product) }}
              className="bg-[#56750A] btn-buy  text-white px-2 py-1.5 rounded-3 flex items-center gap-1 text-sm font-semibold transition-colors"
            >
              <ShoppingCart size={20} color="#ffffff" />
              <p className='text-sm'>Add To Cart</p>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default ProductCard;