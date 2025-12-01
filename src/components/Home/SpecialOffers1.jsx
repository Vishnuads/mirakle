
import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css";
import offertag from "../../assets/images/offer-tag.png"
import { Heart, ShoppingCart, Star } from "phosphor-react";
import { CartContext } from '../../context/CartContext'
import { mainContext } from "@/context/HomeContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ProductListCreate } from "@/context/ClientContext"



const SpecialOffers1 = () => {
  const { showLogin, setShowLogin,  handleWishlist, likedItems, addToCartSidebar } = useContext(CartContext)
  const { addToCart } = useContext(ProductListCreate)
  // const { addToCart } = useContext(CartContext);
  const { productData } = useContext(mainContext);


  // ✅ Filter only products with offer === "true"
  const offerProducts = productData?.filter(
    (product) => product.offer === "true"
  ) || [];




  const user = JSON.parse(localStorage.getItem("userEmail"));
  const token = localStorage.getItem("userToken");

  const handleAddToCart = (item) => {
    if (!token) {
      setShowLogin(true);
      return;
    }

    addToCartSidebar(item)
    addToCart(item);
  };



  return (
    <section className="special-offers py-5">
      <div className="container">
        <div className="d-flex align-items-end mb-4">
          <h2 className="section-title mb-0">Special Offers</h2>
          <span className="section-index ms-2">
            {offerProducts.length.toString().padStart(2, "0")}
          </span>
        </div>

        <div className="row g-4">
          {offerProducts.map((product, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12">
              <Link
                to={`/products/${product.productName.replace(/\s+/g, "-").toLowerCase()}/${product.title.replace(/\s+/g, "-").toLowerCase()}/${product._id}`}
                className="text-decoration-none"
              >
                <div className="offer-card position-relative bg-white rounded-4 shadow-sm p-3">
                  {/* 🏷️ Offer Tag - top of card */}
                  {product.status && (
                    <div className="discount-badge">
                      <img src={offertag} alt="Offer Tag" className="offer-tag-img" />
                      <span className="offer-text">{product.status}</span>
                    </div>
                  )}
                  {/* Product image */}
                  <div className="position-relative">
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="product-img h-42 w-42"
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

                  {/* Product details */}
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

                    <div className="d-flex flex-wrap gap-2 mb-3">
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
                      <button
                        onClick={(e) => { e.preventDefault(); handleAddToCart(product) }}
                        className="btn-buy flex items-center gap-1"> <ShoppingCart size={20} /> <p className='text-sm'>Add To Cart</p></button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

          ))}
        </div>

      </div>
    </section>
  );
};

export default SpecialOffers1;
