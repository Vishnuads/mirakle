import { LucideSquareArrowOutUpRight, PlusCircle, Trash2 } from 'lucide-react'
import React, { useContext, useState } from 'react'
import CartCard from './CartCard'
import ProductBg from '../Home/ProductBg'
import { Link } from 'react-router-dom'
import Address from '../Cart/Address'
import { ProductListCreate } from '@/context/ClientContext';
import { CartContext } from '@/context/CartContext'


const CartHome = () => {
    const { cartItems } = useContext(ProductListCreate);
    // const [checked, setChecked] = useState(false);
    const [address, setAddress] = useState(false);
    const { addresses, loading } = useContext(CartContext)
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    // console.log(addresses);


    const getSubtotal = () => {
        return cartItems
            .filter(item => item.productName?.toLowerCase())
            .reduce((acc, item) => acc + item.prices * item.quantity, 0);
    };
    const cartSubtotal = getSubtotal();

    return (
        
        <>
            <section className='bg-gray-100 min-h-screen relative '>
                {!cartItems.length == 0 ? (
                <div className="grid md:grid-cols-3 grid-cols-1 md:gap-5 max-w-6xl mx-auto py-5 px-2">
                    <div className="col-span-2 md:mb-0 mb-3">

                        <CartCard />
                    </div>

                    <div className='w-full my-0 px-2'>
                        <p className='mb-2'>Choose an Address for Delivery</p>
                        { addresses.map((item, index) => {
                                const checkedd = selectedAddressId === item._id; // only one selected                                                                               
                                return (
                                    <div key={index} className={`flex items-start mb-2 gap-2 ${checkedd ? `bg-[#E8EDDB]` : `bg-white `} rounded-3 p-2`}>
                                        <input type="checkbox"
                                            checked={checkedd}
                                            onChange={() => setSelectedAddressId(item._id)} // select this one
                                            className='checkbox w-5  h-5 m-1 ' />

                                        <div>
                                            <p className='mb-1 font-bold text-sm '>{item.cname}
                                                <span> | {item.number1}</span> </p>
                                            <p className='mb-1 font-bold text-sm '>{item.title}</p>
                                            <p className='text-sm mb-0'>
                                                {item.door}, {item.street}, {item.area}, {item.city}, {item.state} - {item.pincode}.
                                            </p>
                                        </div>

                                    </div>
                                )
                            })
                        }
                        <button onClick={() => setAddress(true)} className='flex items-center justify-center w-full border border-black py-2 px-3 bg-white rounded-3 my-2'>
                            <p className='mb-0 flex items-center gap-2'><span> <PlusCircle size={18} /> </span> Add New Address</p>
                        </button>

                        <div className="bg-white my-3  p-3 rounded-3   w-full">
                            <div className="flex items-center justify-between mb-1 text-sm">
                                <p>Subtotal</p>
                                <p className='text-gray-400'>₹ {cartSubtotal}</p>
                            </div>
                            <div className="flex items-center justify-between mb-2 text-sm">
                                <p>Shipping</p>
                                <p className='text-gray-400'>Free</p>
                            </div>
                            <div className="flex items-center justify-between text-xl font-bold">
                                <p>Total</p>
                                <p>₹ {cartSubtotal}</p>
                            </div>
                            <div className='flex items-center justify-center text-white py-2 px-3 bg-[#56750A] rounded-3 my-2'>
                                <p > Proceed to Checkout</p>
                            </div>
                            <div className='flex items-center justify-center border border-black py-2 px-3 bg-white rounded-3 my-2'>
                                <p > Continue Shopping</p>
                            </div>
                        </div>
                    </div>
                </div>
                ): (
                    <div className='min-h-[60vh] flex  justify-center items-center py-3 '>
                        <div className='text-center md:flex  items-center gap-5'>
                            <p className='text-xl text-gray-500  py-6 '>Your Cart is Empty</p>
                            <div className='h-10 w-[1px] bg-black/50 hidden md:block'></div>
                            <Link to="/shop">
                               <p className='flex items-center gap-3 underline text-xl font-bold text-black rounded-3'>Countinue Shoping <LucideSquareArrowOutUpRight/> </p> 
                            </Link>
                        </div>
                    </div>
                )}
                <ProductBg />
            </section>
            {address &&
                <div className="md:fixed absolute inset-0  z-50 ">
                    <Address onClose={() => setAddress(false)} />
                </div>
            }

        </>
    )
}

export default CartHome
