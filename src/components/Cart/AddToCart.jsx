import { Minus, Plus, ShoppingCart, X } from 'phosphor-react'
import React, {  useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {ProductListCreate} from "@/context/ClientContext"
import { CheckOutDetailsCreate } from '@/context/CheckoutContext';
import axios from 'axios'
import BASE_URL from '@/Api'

const AddToCart = () => { 

    const { cartItems,overlayVisiable,hideOverlay,removeFromCart,setCartItems,user } = useContext(ProductListCreate)
    const { pendingCart, setPendingCart, setLoading } = useContext(CheckOutDetailsCreate);

  // ✅ Change quantity
  const changeQuantity = (id, netQuantity, delta) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id && item.netQuantity === netQuantity
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updatedCart);
    setPendingCart(updatedCart);
    // Update DB if logged in
    if (user?.token) {
      axios.put(`${BASE_URL}/api/user/cart`, { cartItems: updatedCart }, { headers: { Authorization: `Bearer ${user.token}` } });
    }
  };

  // ✅ Sync pendingCart with cartItems
  useEffect(() => {
    setPendingCart(cartItems);
  }, [cartItems]);

    if (!overlayVisiable) return null;

    const getSubtotal = () => {
  return cartItems
    .filter(item => item.productName?.toLowerCase())
    .reduce((acc, item) => acc + item.prices * item.quantity, 0);
};
const cartSubtotal = getSubtotal();

    return (
        <>
            <div className="fixed inset-0 z-50 ">
                <div className="bg-black/30 min-h-screen  flex items-center justify-end" onClick={hideOverlay}>
                    <div className="bg-white h-screen md:w-1/3 w-80 flex flex-col relative " onClick={overlayVisiable ? (e) => e.stopPropagation() : null}>
                        <div className="flex items-center justify-between my-3 px-3">
                            <div className="flex items-center text-xl gap-2">
                                <ShoppingCart />
                                <p className='font-bold'>Your Cart</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className='text-gray-500'>{cartItems.length} items</p>
                                <button onClick={hideOverlay} className='text-black px-2 py-2 border rounded-5'><X /></button>
                            </div>
                        </div>

                        <div className="flex-1 bg-gray-100 rounded-t-lg p-3 overflow-y-auto mx-3 ">
                            {cartItems.map((item, index) => (
                              
                                <div className="flex gap-2 border-b border-black/20 py-3" key={`${item._id}-${item.netQuantity}`}>
                                    <div className='flex items-start '>
                                        <img src={item.images?.[0]} alt="product" className='w-20 h-20 object-cover rounded-3' />
                                    </div>
                                    <div className="flex-1  ">
                                        <div className="flex place-items-baseline  justify-between">
                                            <p  className='text-xs text-[#56750A] font-semibold'>{item.netQuantity}</p> 
                                            <p className='text-lg font-bold'> ₹ {item.quantity * (Array.isArray(item.prices) ? item.prices[0] : item.prices)}</p>
                                        </div>
                                        <p className='font-bold md:text-lg text-sm mb-2'>{item.title}</p>

                                        <div className="flex items-center justify-between">
                                            <div className=''>
                                                <div className="flex items-center  overflow-hidden border border-gray-500 rounded-5 ">
                                                    <button
                                                        onClick={() => changeQuantity(item._id, item.netQuantity, -1)}
                                                        className=" w-6 h-5 border-gray-300  flex items-center justify-center hover:bg-gray-50 transition-colors border-r "
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="w-3   text-gray-600" />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        value={item.quantity}
                                                        readOnly
                                                        style={{ fontSize: '12px' }}
                                                        className=" w-8 h-5  qty text-center text-xs  text-gray-800  outline-none"
                                                    />
                                                    <button
                                                          onClick={() => changeQuantity(item._id, item.netQuantity, 1)}
                                                        className=" w-6 h-5 flex  border-gray-300  items-center justify-center hover:bg-gray-50 transition-colors border-l "
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="w-3  text-gray-600" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button className='text-gray-500'  onClick={() => removeFromCart(item._id, item.netQuantity)} ><p className='text-xs'>Remove</p> </button>
                                            
                                        </div>
                                    </div>
                                </div>
                                
                            ))}
                        </div>
                        
                            <div className="bg-white  shadow-lg p-3" >
                                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                                    <p>Sub Total</p>
                                    <p>₹{cartSubtotal}</p>
                                </div>
                                <div className="flex items-center justify-between text-md text-gray-400 mb-2">
                                    <p>Shipping</p>
                                    <p>Free</p>
                                </div>
                                <div className="flex items-center justify-between text-xl text-gray-800 mb-3 font-bold">
                                    <p>Total</p>
                                    <p>₹{cartSubtotal}</p>
                                </div>

                                <div className=''>
                                    <Link to="/cart">
                                    <button
                                    onClick={hideOverlay}
                                     className='border border-black text-black w-full rounded-5 py-2 mb-2' >
                                        <p>View Cart</p>
                                    </button>
                                    </Link>
                                    <button className='border w-full rounded-5 py-2 bg-[#56750A] text-white'>
                                        <p>Proceed To Checkout</p>
                                    </button>
                                </div>
                            </div>
                     
                    </div>

                </div>
            </div>
        </>
    )
}

export default AddToCart
