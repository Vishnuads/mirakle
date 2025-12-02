import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Style.css";
import { mainContext } from "../../context/HomeContext";
import { useNavigate } from "react-router-dom";



function HomeBanner() {

  const navigate = useNavigate();
  const { imageSlider } = useContext(mainContext);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    arrows: false,
    fade: false, // 👈 set to true for fade effect
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    swipeToSlide: true,
    cssEase: "ease-in-out",
  };

  return (
    <div className="banner-slider md:mt-20 mt-10">
      
      <Slider {...settings}>
        {imageSlider?.data?.map((slide, index) => (
          <div key={index}>
            
            <div
              className="banner-slide"
              style={{ backgroundImage: `url(${slide.bannerImages?.[0]})` }}
              loading="lazy"
            >
              
              <div className="banner-overlay"></div>
              <div className="banner-content text-start text-light " >
                <h1 className="banner-text ">{slide.title}</h1>
                <p className="banner-para">{slide.content}</p>
                <button
                onClick={()=>navigate('/shop')}
                 className="shop-now-button">
                  <span>SHOP NOW </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HomeBanner;
