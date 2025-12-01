import React, { useState, useEffect, useContext } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '@/Api';
import { CartContext } from '../../context/CartContext'
import { ProductListCreate } from '@/context/ClientContext';
import Tabs from '@/components/Product/Tabs'
import Like from './Like';
import { Heart } from 'phosphor-react';

export default function Dummy() {

    //  const { addToCart, addFav } = useContext(CartContext);
    const { addToCart, setSelectedNetQty } = useContext(ProductListCreate)
    const { handleWishlist, likedItems, fetchWishlist, setShowLogin } = useContext(CartContext)

    const [selectedWeight, setSelectedWeight] = useState('100 g');
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [product, setProduct] = useState(null);

    const { id } = useParams();

    const qty = 5;

    const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    const increaseQty = () => setQuantity(prev => prev + 1);

    const handleNetQtySelect = (qty, price) => setSelectedNetQty({ qty, price });

    // Fetch product by ID
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/products/${id}`);
                setProduct(res.data.data);
                setSelectedWeight(res.data.data.netQuantity[0]);
                console.log(res.data);
            } catch (error) {
                console.log("Error fetching product:", error);
            }
        };
        fetchWishlist()
        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product?.netQuantity && product.netQuantity.length > 0) {
            setSelectedNetQty({
                qty: product.netQuantity[0],
                price: product.prices?.[0] || null,
            });
        }
    }, [product]);

    if (!product) {
        return <p className="text-center mt-20 text-xl">Loading...</p>;
    }
    const token = localStorage.getItem("userToken");
    const handleAddToCart = async (item) => {
        if (!token) {
            setShowLogin(true);
            return;
        }
        addToCart(item);
        // if (!product) return;
        // await addToCart(product, quantity); // context handles localStorage + DB
    };

    return (
        <>
            <div className="min-h-screen p-4 md:p-6 mt-15 ">
                <div className="max-w-6xl mx-auto  rounded-2xl  overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-12  md:p-10">
                        {/* Left Side - Images */}
                        <div className="space-y-4">
                            <div className=" rounded-2xl overflow-hidden">
                                <img
                                    src={product.images[selectedImage]}
                                    alt="Garlic Powder"
                                    className="md:w-full  md:h-96  object-cover"
                                />
                            </div>

                            <div className="grid grid-cols-3 md:gap-4 gap-2 px-1">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={` rounded-3  transition-all overflow-hidden ${selectedImage === idx ? 'ring-2 ring-[#56750A]' : 'hover:ring-2 ring-gray-300'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Garlic Powder view ${idx + 1}`}
                                            className="w-full h-28 object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Product Details */}
                        <div className="space-y-4">
                            <div>
                                <p className="inline-block mb-2 px-4 py-2 border-2 border-[#56750A] text-[#56750A] rounded-4 font-semibold text-sm ">
                                    {product.productName}
                                </p>
                            </div>

                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                                    {product.title}
                                </h1>
                            </div>
                            <div>
                                <p className="text-gray-600 text-lg line-clamp-2">
                                    {product.description}
                                </p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-gray-900">
                                    {/* ₹{product.prices[product.netQuantity.indexOf(selectedWeight)]} */}
                                    ₹{Number(product.prices[product.netQuantity.indexOf(selectedWeight)]).toFixed(2)}
                                </p>
                            </div>

                            <div>
                                <span className="block text-gray-900 font-semibold mb-3 font-[montserrat]">
                                    Weight
                                </span>
                                <div className="flex gap-3">
                                    {product.netQuantity.map((weight, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => {
                                                setSelectedWeight(weight);
                                                handleNetQtySelect(weight, product.prices[idx]);
                                            }}
                                            className={`px-6 py-2 font-medium rounded-5 transition-all 
                                                      ${selectedWeight === weight
                                                    ? "bg-gray-900 text-white"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                        >
                                            {weight}
                                        </button>
                                    ))}

                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-4  ">
                                <div className="border border-gray-200 flex items-center rounded-5 overflow-hidden">
                                    <button
                                        onClick={decreaseQty}
                                        className="w-12 h-12  border-r border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                    >
                                        <Minus className="w-5 h-5 text-gray-600" />
                                    </button>

                                    <input
                                        type="text"
                                        value={quantity}
                                        readOnly
                                        className="w-20 h-12 text-center text-xl font-semibold  rounded-lg"
                                    />

                                    <button
                                        onClick={increaseQty}
                                        className="w-12 h-12  border-l border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                    >
                                        <Plus className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>
                                {
                                    (product.stockQuantity > 0)
                                        ? <span className="text-green-600 font-semibold ml-4">
                                            In stock!
                                        </span>
                                        : <span className="text-red-600 font-semibold ml-4">
                                            Out of stock!
                                        </span>
                                }
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-3">
                                <button
                                    disabled={product.stockQuantity === 0}
                                    onClick={(e) => { e.preventDefault(); handleAddToCart(product) }}
                                    className="flex-1 btn-buy items-center bg-[#56750A] text-white font-semibold  rounded-5  transition-colors">
                                    {(product.stockQuantity > 0) ? <p className='mb-0 text-xl'>Add To Cart</p> : <p className='mb-0 text-xl'>Notify me</p>}
                                </button>
                                <button onClick={(e) => { e.preventDefault(); handleWishlist(product) }} className="w-14 h-14 border-2  border-gray-300 rounded-5 flex items-center justify-center hover:bg-gray-100 transition-colors group">
                                    {/* <Heart className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors" color="#fd0808" weight="fill" /> */}
                                    {likedItems?.[product._id] ? (
                                        <Heart className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors fill-red-500" color="#fd0808" weight="fill" />
                                    ) : (
                                        <Heart className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors" />
                                    )}
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Tabs product={product} />
            <Like product={product} />
        </>
    );
}
