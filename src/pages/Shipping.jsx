import Footer from "@/components/Home/Footer";
import NavBar from "@/components/Home/Navbar";
import ProductBg from "@/components/Home/ProductBg";
import React from "react";

const Shipping = () => {
    return (

        <>
            <NavBar />

            <div className="max-w-5xl mx-auto px-6 py-15 mt-15 text-gray-800 leading-7">
                <h1 className="text-3xl font-bold mb-6 text-black text-center">Shipping Policy</h1>
                <br />
                <p className="mb-6 text-center">( DUMMY CONTENT ) </p><br />
                <p className="mb-6">Last Updated: 2025</p>
                <br />

                <p className="mb-6">
                    Thank you for shopping with <strong>MIRAKLE</strong>. <br /> Please review our shipping details below.
                </p>
                <br />

                {/* Dispatch Time */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">1. Order Processing & Dispatch</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Orders are processed within <strong>1–2 business days</strong></li>
                        <li>No dispatch on Sundays or public holidays</li>
                        <li>If delays occur due to stock issues, we will notify you</li>
                    </ul>
                </section>

                {/* Delivery */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">2. Delivery Time</h2>
                    <p>Estimated delivery time after dispatch:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                        <li>Metro Cities: 2–4 days</li>
                        <li>Other Cities: 4–7 days</li>
                        <li>Remote Areas: 7–10 days</li>
                    </ul>
                </section>

                {/* Shipping Fee */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">3. Shipping Charges</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Shipping fee varies based on location and weight</li>
                        <li>Free shipping may apply during promotions</li>
                    </ul>
                </section>

                {/* Tracking */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">4. Order Tracking</h2>
                    <p>
                        Once shipped, tracking information will be shared via email/SMS. Please allow courier systems time to update tracking status.
                    </p>
                </section>

                {/* Delivery Issues */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">5. Delivery Issues</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>We are not responsible for delays caused by courier partners</li>
                        <li>If the package is undelivered due to wrong address, customer must pay re-shipping charges</li>
                        <li>In case of lost packages, we will coordinate with the courier partner</li>
                    </ul>
                </section>

                {/* Contact */}
                {/* <section>
        <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
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

export default Shipping;
