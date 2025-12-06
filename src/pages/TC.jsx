import Footer from "@/components/Home/Footer";
import NavBar from "@/components/Home/Navbar";
import ProductBg from "@/components/Home/ProductBg";
import React from "react";

const TC = () => {

    return (
        <>
            <NavBar />

            <div className="max-w-5xl mx-auto px-6 py-15 mt-15 text-gray-800 leading-7">
                <h1 className="text-3xl text-center font-bold mb-6 text-black">
                    Terms & Conditions
                </h1><br />

                <p><strong>Introduction</strong></p>

                <p>
                    Welcome to Mirakle. By accessing or purchasing from our website, you agree to the following Terms & Conditions. Please read them carefully.
                </p>
                <br />
                <p><strong>Products</strong></p>
                <p> Mirakle offers high-quality food products including oils, spices, sauces, herbal blends, and other consumables. All products are handled and packed as per FSSAI standards.
                </p>
                <br />
                <p><strong>Use of Website</strong></p>
                <ul className="list-disc">
                    <li>You must be 18 years or older to place an order.</li>
                    <li>You agree not to misuse the website or engage in fraudulent or malicious activity.</li>
                    <li>Product prices, stock availability, and offers may change without prior notice.</li>

                </ul>
                <br />
                <p><strong> Orders & Payments</strong></p>
                <ul className="list-disc">
                    <li>An order is considered confirmed only after successful payment.</li>
                    <li>Mirakle may cancel or hold an order if the payment is flagged or incomplete.</li>
                    <li>All payments must be made using secure gateways provided on the website.</li>
                </ul>
                <br />
                <p><strong> Intellectual Property</strong></p>
                <p>  All content, including the Mirakle logo, website design, product images, and descriptions, is owned by Mirakle. Reproduction is prohibited without written consent.</p>
                <br />
                <p><strong> Liability</strong></p>

                <p>Mirakle is not responsible for:</p>
                <ul className="list-disc">
                    <li>allergic reactions caused by product ingredients (ingredients are clearly mentioned on labels),</li>
                    <li>courier delays or operational interruptions,</li>
                    <li>product damage caused due to improper storage after delivery.</li>
                </ul>
                <br />
                <p><strong> Governing Law</strong></p>

                <p> These terms are governed by the laws of India.</p>
            </div>
            <ProductBg />
            <Footer />
        </>
    );
};

export default TC;
