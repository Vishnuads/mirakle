import Footer from "@/components/Home/Footer";
import NavBar from "@/components/Home/Navbar";
import ProductBg from "@/components/Home/ProductBg";
import React from "react";

const PrivacyPolicy = () => {

  return (
    <>
      <NavBar />
      <div className="max-w-5xl mx-auto px-6 py-15 mt-15 text-gray-800 leading-7">
        <h1 className="text-3xl text-center font-bold mb-6 text-black">
          Privacy Policy
        </h1><br />
        <p><strong>Information We Collect</strong></p>
        <br />

        <p><strong>Mirakle may collect:</strong></p>
        <ul className="list-disc">
          <li>Name, mobile number, email address</li>
          <li>Delivery address</li>
          <li>Payment details (processed securely through third-party gateways)</li>
          <li>Usage data (cookies, analytics, browsing behavior)</li>
        </ul>
        <br />
        <p><strong>How We Use Your Data</strong></p>
        <ul className="list-disc">
          <li>To process and deliver orders</li>
          <li>To send order updates and support-related communication</li>
          <li>To improve our website, product offerings, and customer experience</li>
          <li>To send promotional messages (only with your permission)</li>
        </ul>
        <br />
        <p><strong>Data Security</strong></p>
        <ul className="list-disc">
          <li>Payment card details are not stored by Mirakle.</li>
          <li>Your data is not sold or shared with external parties except logistics partners for delivery.</li>

        </ul>
        <br />
        <p> <strong>Cookies</strong> </p>

        <p>  Mirakle uses cookies to enhance site experience. You may disable them in browser settings.</p>
        <br />
        <p> <strong>Your Rights</strong> </p>
        <p>You may request access, correction, or deletion of your personal data (excluding mandatory transaction records).</p>
      </div>
      <ProductBg />
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
