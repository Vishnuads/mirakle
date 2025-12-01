import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Style.css";
import offerb1 from "../../assets/images/offerb1.png";
import offerp1 from "../../assets/images/offerProduct1.png";
import { mainContext } from "@/context/HomeContext";
import { Link } from 'react-router-dom'

const banners = [
  {
    title: "Pure Goodness, Poured With Care",
    subtitle:
      "Discover the richness of cold-pressed olive oils crafted for taste, health, and everyday nourishment.",
    btnText: "Explore Collection",
    img: offerp1,
    bg: offerb1,
  },
  {
    title: "Nourish Your Body, Naturally",
    subtitle:
      "Experience premium oils extracted with love and packed with healthy nutrients for daily cooking.",
    btnText: "Explore Collection",
    img: offerp1,
    bg: offerb1,
  },
];

const OfferBanners = () => {
  const settings = {
    dots: false, // remove dots
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // remove arrows
    pauseOnHover: false,
    cssEase: "ease-in-out",

  };
const { exploreCollection } = useContext(mainContext);
  
  return (
    <div className="container mt-3">
      <Slider {...settings}>
        {exploreCollection.map((item, index) => (
          <div key={index}>
            <div
              className="d-flex align-items-center offer-banner"
              style={{
                backgroundImage: `url(${item.productImage})`
              }}
            >
              <div className="container">
                <div className="row align-items-center">
                  {/* LEFT SIDE CONTENT */}
                  <div className="col-lg-6 col-md-7 col-12 banner-text offer-banner-content">
                    <h1>{item.title}</h1>
                    <p className="mb-2">{item.content}</p>
                    <Link to="/shop">
                    <button className="btn explore-btn">Explore Collection</button></Link>
                  </div>

                  {/* RIGHT SIDE IMAGE */}
                  <div className="col-lg-6 col-md-5 col-12 text-center">
                    <img
                      src={item.bannerImages?.[0]}
                      alt="Product"
                      className="img-fluid"
                      style={{ maxHeight: "300px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OfferBanners;
