import React from "react";
import { FaClock, FaMapMarkerAlt, } from "react-icons/fa";
import footerBg from "../../assets/images/footerbottombg.png";
import logo from "../../assets/images/logo.png";
import './Footer.css'
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";


export default function Footer() {

  return (
    <footer className="footer-section position-relative">
      {/* 🔹 Top Footer Content */}
      <div className="container py-5">
        <div className="row  text-md-start gy-4 align-items-start">
          {/* 🟥 Logo & Text */}
          <div className="col-md-3 gy-0">
            <img src={logo} alt="Mirakle Logo" width={150} className="footer-logo " />
            <p className="footer-text">
              The Essence Of Good Food.
              Authentic Ingredients.
              Exceptional Taste.
            </p>
          </div>

          {/* 🟩 Contact Info */}
          <div className="col-md-3 footer-contact text-left   ">
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="ps-2 mt-2 links">
              <Link to="/">
              <li className="footer-contact-text">Home</li></Link>
              <Link to="/shop">
              <li className="footer-contact-text">Shop</li></Link>
              <Link to="/about">
              <li className="footer-contact-text">About Us</li></Link>
              <Link to="/contact">
              <li className="footer-contact-text">Contact Us</li></Link>
            </ul>

          </div>
          <div className="col-md-3">
            <h6 className="footer-heading">Support</h6>
            <ul className="ps-2 mt-2 links">
              <Link to="/terms">
              <li className="footer-contact-text">Terms & Conditions</li></Link>
              <Link to="/privacy">
              <li className="footer-contact-text">Privacy Policy</li></Link>
              <Link to="/refund">
              <li className="footer-contact-text">Refund Policy</li></Link>
              <Link to="/shipping">
              <li className="footer-contact-text">Shipping Policy</li></Link>
            </ul>
          </div>

          {/* 🟦 Address */}
          <div className="col-md-3 footer-address">
            <h6 className="footer-heading">Get in Touch</h6>
            <div className="d-flex align-items-center mb-2 footer-contact-title">
              <Phone size={18} className="text-danger fill-red-600 me-2 fa-contact shrink-0" />
              <span className="footer-contact-text">638-384-2861</span>
            </div>

            <div className="d-flex align-items-center mb-2 footer-contact-title">
              <FaClock size={18} className="text-danger me-2 fa-contact shrink-0" />
              <span className="footer-contact-text">10 am - 6 pm</span>
            </div>
            <div className="d-flex align-items-start f-address">
              <FaMapMarkerAlt className="text-danger me-2 fs-5 shrink-0 mt-1" />
              <p className="mb-0 footer-address-text">
                Plot No: 24, Arunachalla Avenue,<br />
                Paraniputhur Main Road,<br />
                Iyyapanthangal,<br />
                Chennai - 600 122
              </p>
            </div>

          </div>


          {/* 🟨 Social Links */}
          {/* <div className="col-md-3 text-md-start text-center">
            <h6 className="footer-heading">Social Links</h6>
            <div className="d-flex justify-content-md-start justify-content-center gap-3 mt-2">
              <a href="#" className="social-icon">
                <FaFacebook  />
              </a>
              <a href="#" className="social-icon">
                <FaYoutube  />
              </a>
              <a href="#" className="social-icon">
                <FaEnvelope  />
              </a>
              <a href="#" className="social-icon">
                <AiFillInstagram  />
              </a>
            </div>
          </div> */}
        </div>
      </div>

      {/* 🔻 Bottom Decorative Image */}
      <div className="footer-bg">
        <img src={footerBg} alt="Footer Background" className="img-fluid w-100" />
      </div>
    </footer>
  );
}
