import React from "react";
import {
  FaPhoneAlt,
  FaClock,
  FaMapMarkerAlt,
  FaFacebook,
  FaYoutube,
  FaEnvelope,
  FaInstagram,
} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { MdHeadsetMic } from "react-icons/md";

import footerBg from "../../assets/images/footerbottombg.png";
import logo from "../../assets/images/logo.png"; // your Mirakle logo
import './Footer.css'


export default function Footer() {
  
  return (
    <footer className="footer-section position-relative">
      {/* 🔹 Top Footer Content */}
      <div className="container py-5">
        <div className="row text-center text-md-start gy-4 align-items-start">
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
            <h6 className="footer-heading">Contact Us</h6>

            <div className="d-flex align-items-center mb-2 footer-contact-title">
              <MdHeadsetMic size={22} className="text-danger me-2 fa-contact shrink-0" />
              <span className="footer-contact-text">638-384-2861</span>
            </div>

            <div className="d-flex align-items-center footer-contact-title">
              <FaClock size={22} className="text-danger me-2 fa-contact shrink-0" />
              <span className="footer-contact-text">10 AM TO 6 PM</span>
            </div>
          </div>


          {/* 🟦 Address */}
          <div className="col-md-3 footer-address">
            <h6 className="footer-heading">Our Address</h6>
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
          <div className="col-md-3 text-md-start text-center">
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
          </div>
        </div>
      </div>

      {/* 🔻 Bottom Decorative Image */}
      <div className="footer-bg">
        <img src={footerBg} alt="Footer Background" className="img-fluid w-100" />
      </div>
    </footer>
  );
}
