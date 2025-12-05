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
        <p className="mb-6 text-center">( DUMMY CONTENT ) </p><br />
       
        <p className="mb-6">Last Updated: 2025</p><br />

        <p className="mb-6">
          This Privacy Policy explains how <strong>MIRAKLE</strong> (“we”, “us”, “our”) collects, uses, and safeguards your personal information when you visit or purchase from our website.
        </p>
 <br />
        {/* Information We Collect */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Personal information: Name, email, phone number, billing/shipping address</li>
            <li>Payment details (processed securely through third-party gateways)</li>
            <li>Order history</li>
            <li>Device & browser information</li>
            <li>Cookies and tracking data</li>
          </ul>
        </section>

        {/* How We Use Data */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To process and deliver orders</li>
            <li>To send order updates and notifications</li>
            <li>To improve website performance</li>
            <li>To personalize user experience</li>
            <li>To comply with legal requirements</li>
          </ul>
        </section>

        {/* Sharing Information */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">3. Sharing Your Information</h2>
          <p>
            We do not sell your data. We share information only with trusted partners such as:
          </p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Payment gateways</li>
            <li>Courier and delivery partners</li>
            <li>Marketing and analytics tools</li>
            <li>Legal authorities (if required)</li>
          </ul>
        </section>

        {/* Cookies */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">4. Cookies & Tracking</h2>
          <p>
            We use cookies to enhance your shopping experience, analyze website traffic, and remember your preferences.
          </p>
        </section>

        {/* Data Protection */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">5. Data Protection & Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information. However, no system is 100% secure.
          </p>
        </section>

        {/* User Rights */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access or update your personal information</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for marketing</li>
          </ul>
        </section>

        {/* Changes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Updated versions will be posted on this page.
          </p>
        </section>

        {/* Contact */}
        {/* <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
          <p>
            Email: <strong>[your@email.com]</strong> <br />
            Phone: <strong>[your phone number]</strong>
          </p>
        </section> */}
      </div>
      <ProductBg />
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
