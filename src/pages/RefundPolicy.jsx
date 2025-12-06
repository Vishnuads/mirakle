import Footer from "@/components/Home/Footer";
import NavBar from "@/components/Home/Navbar";
import ProductBg from "@/components/Home/ProductBg";
import React from "react";

const RefundPolicy = () => {
    return (

        <>
            <NavBar />

            <div className="max-w-5xl mx-auto px-6 py-15 mt-15 text-gray-800 leading-7">
                <h1 className="text-3xl text-center font-bold mb-6 text-black">Refund & Return Policy</h1><br />
                <p><strong>Return Eligibility</strong></p>

                <p>Due to the nature of food and consumable items, Mirakle does not accept returns except under the following conditions:</p>
                <ul className="list-disc">
                    <li>Wrong product delivered</li>
                    <li>Damaged product received</li>
                    <li>Expired product delivered</li>
                </ul>
                <br />
                <p><strong>Conditions for Refund/Replacement</strong></p>
                <ul className="list-disc">
                    <li>The complaint must be raised within 24–48 hours of delivery with clear photos/videos.</li>
                    <li>Product must be unused, unopened, and in original packaging.</li>
                    <li>Used or opened products are not eligible for return.</li>
                </ul>
                <br />
                <p><strong>  Non-Returnable Items</strong></p>
                <ul className="list-disc">
                    <li>Oils, sauces, spices that are opened or tampered with</li>
                    <li>Products damaged due to improper storage by the customer</li>
                    <li>Clearance or discounted items.</li>
                </ul>

                <br />
                <p><strong>Refund Timeline</strong></p>

                <p>  Approved refunds will be processed within 5–7 working days via the original payment method or as Mirakle store credit.</p>
            </div>
            <ProductBg />
            <Footer />
        </>
    );
};

export default RefundPolicy;
