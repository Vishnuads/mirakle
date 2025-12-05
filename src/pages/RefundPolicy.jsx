import Footer from "@/components/Home/Footer";
import NavBar from "@/components/Home/Navbar";
import ProductBg from "@/components/Home/ProductBg";
import React from "react";

const RefundPolicy = () => {
    return (

        <>
            <NavBar />

            <div className="max-w-5xl mx-auto px-6 py-15 mt-15 text-gray-800 leading-7">
                <h1 className="text-3xl text-center font-bold mb-6 text-black">Refund Policy</h1><br />
                <p className="mb-6 text-center">( DUMMY CONTENT ) </p><br />
                <p className="mb-6">Last Updated: 2025</p><br />

                <p className="mb-6">
                    At <strong>MIRAKLE</strong>, we prioritize quality and customer satisfaction. Since we sell food items, returns are limited to specific cases outlined below.
                </p><br />

                {/* Valid Return Reasons */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">1. Valid Reasons for Refund or Replacement</h2>
                    <p>Refunds/replacements are accepted only if:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                        <li>You received a damaged or leaked item</li>
                        <li>The product is expired on arrival</li>
                        <li>You received an incorrect item</li>
                        <li>Packaging is tampered</li>
                    </ul>
                </section>

                {/* Conditions */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">2. Conditions for Claiming Refund</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Proof (photos/videos) must be submitted within <strong>48 hours</strong> of delivery</li>
                        <li>The product must be unused and unopened</li>
                        <li>We may inspect the product before approving refund</li>
                    </ul>
                </section>

                {/* Non-Returnable */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">3. Non-Returnable Items</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Opened or used products</li>
                        <li>Products damaged due to customer mishandling</li>
                        <li>Items returned without valid proof</li>
                        <li>Change of mind</li>
                    </ul>
                </section>

                {/* Cancellation */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">4. Cancellation Policy</h2>
                    <p>Orders can be cancelled only before shipping. Once dispatched, cancellations are not allowed.</p>
                </section>

                {/* Refund Processing */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">5. Refund Processing Time</h2>
                    <p>
                        Approved refunds will be processed to your original payment method within <strong>5–7 business days</strong>.
                    </p>
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

export default RefundPolicy;
