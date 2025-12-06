import Footer from "@/components/Home/Footer";
import NavBar from "@/components/Home/Navbar";
import ProductBg from "@/components/Home/ProductBg";
import React from "react";

const Shipping = () => {
    return (

        <>
            <NavBar />

            <div className="max-w-5xl mx-auto px-6 py-15 mt-15 text-gray-800 leading-7">
                <h1 className="text-3xl font-bold mb-6 text-black text-center">Shipping & Delivery Policy</h1>
                <br />
                <p><strong>Shipping Locations</strong></p>

                <p>  Mirakle ships across India through verified courier partners.</p>
                <br />
                <p><strong>Order Processing Time</strong></p>
                <ul className="list-disc">
                    <li>Orders are processed within 24–48 hours.</li>
                    <li>Delivery timeline ranges from 3–7 business days, depending on pincode.</li>
                </ul>
                <br />
                <p><strong>Shipping Charges</strong></p>

                <p> Shipping charges vary based on order value, weight, and destination.</p>
                <p>  Free shipping may be offered on select orders or during promotions.</p>
                <br />
                <p><strong>Tracking</strong></p>


                <p>  A tracking link is shared via SMS/email/WhatsApp once the order is dispatched.</p>
                   <br />
                <p><strong>Undeliverable Packages</strong></p>  
                <p>     If delivery fails due to incorrect address or customer unavailability, additional re-delivery fees may apply.
                </p>
            </div>
            <ProductBg />
            <Footer />
        </>
    );
};

export default Shipping;
