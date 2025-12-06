import React, { useState, useContext, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css"; // custom styling
import offertag from "../../assets/images/offer-tag.png"
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Star } from "phosphor-react";
import { CartContext } from '../../context/CartContext'
import { mainContext } from "@/context/HomeContext";
import { ProductListCreate } from "@/context/ClientContext";

const ProductsTab = () => {

  const { showLogin, setShowLogin, toggleLike, handleWishlist, likedItems, addToCartSidebar, isFavorite, toggleFav, favItems, } = useContext(CartContext)
  const { addToCart } = useContext(ProductListCreate)
  // const { addToCart } = useContext(CartContext);
  const { productData, productCategory } = useContext(mainContext);


  const [activeTab, setActiveTab] = useState("");

  // ✅ Automatically set first category as active
  useEffect(() => {
    if (productCategory && productCategory.length > 0 && !activeTab) {
      setActiveTab(productCategory[0].productName);
    }
  }, [productCategory, activeTab]);

  // ✅ Group products by productName (not tags)
  const groupedProducts = useMemo(() => {
    const grouped = {};

    // Initialize each category with an empty array
    productCategory?.forEach((cat) => {
      grouped[cat.productName] = [];
    });

    // Assign products based on their productName
    productData?.forEach((product) => {
      const name = product.productName?.trim();
      if (name && grouped[name]) {
        grouped[name].push(product);
      }
    });

    return grouped;
  }, [productData, productCategory]);





  // ✅ Filter only products with offer === "true"
  const offerProducts = productData?.filter(
    (product) => product.offer === "true"
  ) || [];




  const user = JSON.parse(localStorage.getItem("userEmail"));
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
    <div className="products-section container py-5 mt-3">
      <div className="d-flex align-items-end mb-4">
        <h1 className="section-title mb-0">OUR PRODUCTS</h1>
        <span className="section-index ms-2">
          {productData.length.toString().padStart(2, "0")}
        </span>
      </div>
      {/* Tabs */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        {productCategory?.map((cat) => (
          <button
            key={cat._id}
            className={`tab-btn  ${activeTab === cat.productName ? "active-tab" : "inactive-tab"
              }`}
            onClick={() => setActiveTab(cat.productName)}
          >
            {cat.productName}
          </button>

        ))}
      </div>

      {/* Products Grid */}
      <div className="row g-4 my-4">
        {groupedProducts[activeTab] && groupedProducts[activeTab].length > 0 ? (
          groupedProducts[activeTab].map((product) => (
            <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 col-12 ">
              <div className="offer-card position-relative  bg-white rounded-4  p-3 ">
                <Link
                  // to={`/products/${product.title.replace(/\s+/g, "-").toLowerCase()}`}
                  to={`/products/${product.productName.replace(/\s+/g, "-").toLowerCase()}/${product.title.replace(/\s+/g, "-").toLowerCase()}/${product._id}`}
                  className="text-decoration-none"
                >
                  {product.status && (
                    <div className="discount-badge">
                      <img src={offertag}
                        alt="Offer Tag" className="offer-tag-img" />
                      <span className="offer-text">{product.status}</span>
                    </div>
                  )}

                  <div className="position-relative ">
                    <img
                      src={
                        product.images && product.images.length > 0 ? product.images[0] : ''}
                      alt={product.title || product.productName}
                      className=" product-img h-42 w-42"
                    />

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleWishlist(product);
                      }}
                      className={`absolute top-2 right-2 w-8 h-8 bg-white rounded-5 flex items-center justify-center`}
                    >
                      {likedItems?.[product._id] ? (
                        <Heart className='w-5 h-5' color="#fd0808" weight="fill" />
                      ) : (
                        <Heart className='w-5 h-5' color="#939393" />
                      )}
                    </button>
                  </div>

                  <div className="mt-3 cart-section">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-semibold mb-0 text-gray-900 leading-tight">
                        {product.title}
                      </p>
                      <div className="flex items-center gap-1 bg-yellow-50 border-1 border-yellow-300 px-1 py-0.5 rounded-sm ml-2 shrink-0">
                        <Star className="w-3 h-3  text-yellow-300" weight="fill" />
                        <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2 mb-2">
                      {product.netQuantity && product.netQuantity.length > 0 && (
                        <span className="tag">
                          {product.netQuantity[0]}
                        </span>
                      )}
                      <span className="tag">
                        {product?.productType}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="price-cart text-dark mb-0">
                        ₹ {product.prices && product.prices.length > 0
                          ? product.prices[0].toFixed(2)
                          : "0.00"}
                      </h6>
                      <button onClick={(e) => { e.preventDefault(); handleAddToCart(product) }}
                        className="btn btn-buy d-flex  align-items-center gap-1">
                          <ShoppingCart color="#ffffff" size={22} /><p className="text-xs">Add To Cart</p>
                     </button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h5 className="text-muted noproducts-found">No products found</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsTab;
