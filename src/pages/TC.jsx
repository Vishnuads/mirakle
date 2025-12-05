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
                <p className="mb-6 text-center">( DUMMY CONTENT ) </p><br />
                <p className="mb-6">Last Updated: 2025</p><br />

                <p className="mb-6">
                    Welcome to <strong>MIRAKLE</strong>. By accessing or purchasing
                    from our website (“the Site”), you agree to comply with these Terms &
                    Conditions. Please read them carefully.
                </p>
                <br />

                {/* 1. General Information */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold my-2">1. General Information</h2>
                    <p>
                        This website is owned and operated by <strong>MIRAKLE</strong>.
                        By using our website, you agree to these Terms & Conditions and our
                        Privacy Policy. If you do not agree, please discontinue using our
                        services.
                    </p>
                </section>

                {/* 2. Eligibility */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>You are at least 18 years old.</li>
                        <li>You have legal capacity to enter into a contract.</li>
                        <li>
                            Minors may use the website only under the supervision of a parent or
                            guardian.
                        </li>
                    </ul>
                </section>

                {/* 3. Products */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">
                        3. Products & Descriptions
                    </h2>
                    <p>
                        We sell food products including <strong>seasoning powders, oils,
                            vinegars, and spice blends</strong>. While we aim for 100% accuracy,
                        product colors, packaging, and descriptions may vary slightly.
                    </p>
                </section>

                {/* 4. Pricing */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">4. Pricing & Payment</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>All prices are shown in INR.</li>
                        <li>Prices may change without notice.</li>
                        <li>Payment must be completed at the time of order.</li>
                        <li>
                            We accept UPI, Cards, Net Banking, Wallets, and secure payment
                            gateways.
                        </li>
                    </ul>
                </section>

                {/* 5. Orders */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">
                        5. Orders & Acceptance
                    </h2>
                    <p>
                        Order confirmation does not guarantee acceptance. We may cancel an
                        order if:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Product is out of stock</li>
                        <li>Payment fails</li>
                        <li>Invalid shipping details</li>
                        <li>Suspicious or fraudulent activity</li>
                    </ul>
                </section>

                {/* 6. Shipping */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">
                        6. Shipping & Delivery
                    </h2>
                    <p>
                        Delivery timelines are estimated. Delays due to courier, weather, or
                        unforeseen situations are not our responsibility. Tracking details will
                        be shared once shipped.
                    </p>
                </section>

                {/* 7. Refunds */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">
                        7. Returns, Refunds & Replacements
                    </h2>
                    <p>
                        As we sell food products, returns are accepted only for:
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Damaged or leaked products</li>
                        <li>Expired items on arrival</li>
                        <li>Tampered packaging</li>
                    </ul>

                    <p className="mt-2">
                        Issues must be reported within <strong>48 hours</strong> with photo/video
                        proof.
                    </p>

                    <p className="mt-2">
                        We do not accept returns for opened products, change of mind, or
                        customer mishandling.
                    </p>
                </section>

                {/* 8. Cancellations */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">8. Cancellations</h2>
                    <p>
                        Orders can be cancelled only before shipping. After dispatch, orders
                        cannot be cancelled. We may cancel orders due to stock or payment
                        issues.
                    </p>
                </section>

                {/* 9. Health Disclaimer */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">
                        9. Allergies & Health Disclaimer
                    </h2>
                    <p>
                        Products may contain spices, nuts, gluten, or allergens. Customers must
                        check ingredients before consumption. We are not liable for allergic
                        reactions or misuse.
                    </p>
                </section>

                {/* 10. IP */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">
                        10. Intellectual Property
                    </h2>
                    <p>
                        All website content—including text, images, graphics, and logos—is the
                        property of <strong>MIRAKLE</strong>. Unauthorized copying or
                        distribution is prohibited.
                    </p>
                </section>

                {/* 11. Prohibited Use */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">11. Prohibited Use</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Illegal use of the website</li>
                        <li>Unauthorized access attempts</li>
                        <li>Copying product information</li>
                        <li>Distributing viruses or harmful software</li>
                    </ul>
                </section>

                {/* 12. Liability */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">
                        12. Limitation of Liability
                    </h2>
                    <p>
                        We are not responsible for misuse of products, courier delays, or
                        technical issues on the Site. Our liability is limited to the amount
                        paid for the product.
                    </p>
                </section>

                {/* 13. Law */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">
                        13. Governing Law
                    </h2>
                    <p>
                        These Terms are governed by the laws of India. Disputes will be resolved
                        in courts located in <strong>[Your City/State]</strong>.
                    </p>
                </section>

                {/* 14. Contact */}
                {/* <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">
                        14. Contact Information
                    </h2>
                    <p>
                        Email: <strong>[your@email.com]</strong> <br />
                        Phone: <strong>[your phone number]</strong> <br />
                        Address: <strong>[Your Office/Store Address]</strong>
                    </p>
                </section> */}
            </div>
            <ProductBg />
            <Footer />
        </>
    );
};

export default TC;
