import React, { useContext, useState } from 'react'
import ProductBg from '../Home/ProductBg'
import { Trash2, Plus, User } from 'lucide-react'
import Edit from '../../assets/icons/pencil-line.svg'
import Address from '../Cart/Address'
import Product from '../../assets/images/onion.png'
import { CartContext } from '@/context/CartContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AccountHome = () => {
    const { addresses, editAddressUser, deleteAddress, setAddressesUpdated, clearWishlistState } = useContext(CartContext)
    const [activeTab, setActiveTab] = useState("tab1");
    const [address, setAddress] = useState(false);
    const navigate = useNavigate()
    const editClick = (id) => {
        setAddress(true)
        editAddressUser(id)
    }

    const closeEdit = () => {
        setAddress(false)
        setAddressesUpdated(null)
    }

    const user = JSON.parse(localStorage.getItem("userEmail"));
    const token = localStorage.getItem("userToken");

    const logoutUser = () => {
        if (token && user) {
            localStorage.removeItem("userToken");
            localStorage.removeItem("userEmail");
            clearWishlistState();
            toast.success("Logged out successfully!");
            navigate("/");
        } else {
            navigate("/");
        }
    };


    return (
        <>
            <section className='bg-gray-100'>
                <div className="bg-white">
                    <div className="max-w-6xl  mx-auto">
                        <div className="flex items-center justify-between py-3 px-3">
                            <div>
                                <p className='font-bold mb-1 sm:text-md'>Mirakle account</p>
                                <p className='sm:text-md'>User Name: <span className='font-bold' > {user?.firstName
                                    ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()
                                    : ""}

                                    {user?.lastName
                                        ? " " + (user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase())
                                        : ""}</span> </p>
                            </div>
                            <button className="flex items-center gap-2 px-3 py-2 rounded-5  bg-red-100 text-red-600" onClick={logoutUser}>
                                <User size={18} />
                                <p className='mb-0'>Sign Out</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className=" max-w-6xl  mx-auto py-3  px-3">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setActiveTab('tab1')}
                            className={`${activeTab == 'tab1' ? 'border-1 border-[#56750A] bg-[#EFF3E4] px-3 py-1 rounded-5' : 'bg-transparent  px-3 py-1'} `}>
                            <p>My Profile</p>
                        </button>

                        <button onClick={() => setActiveTab('tab2')} className={`${activeTab == 'tab2' ? 'border-1 border-[#56750A] bg-[#EFF3E4] px-3 py-1 rounded-5' : 'bg-transparent  px-3 py-1'}`}>
                            <p> Order</p>
                        </button>
                    </div>

                    {activeTab == 'tab1'
                        ?
                        <>
                            <div className="my-3">
                                <div className="flex items-center justify-between">
                                    <p className='font-bold md:text-xl text-md'>Personal Information</p>

                                </div>
                            </div>
                            <div className='grid md:grid-cols-3 gap-3 my-1'>
                                <div className="mb-2">
                                    <label htmlFor="name" className='block text-sm text-gray-500 mb-1'>
                                        Name
                                    </label>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder={`${user?.firstName.charAt(0).toUpperCase() + user?.firstName.slice(1)} ${user?.lastName.charAt(0).toUpperCase() + user?.lastName.slice(1)}`}
                                        className="bg-white w-full py-2 px-3 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
                                        readOnly
                                    />

                                </div>
                                <div className="mb-2">
                                    <label htmlFor="email" className='block text-sm text-gray-500 mb-1'>
                                        Email
                                    </label>
                                    <input
                                        name='email'
                                        type="email"
                                        placeholder={user?.email}
                                        readOnly
                                        className='bg-white w-full py-2 px-3 rounded-lg focus:outline-none focus:border-green-600 transition-colors'
                                    />
                                </div>
                            </div>
                            <div className="my-3">
                                <div className="flex items-center justify-between">
                                    <p className='font-bold md:text-xl text-md'>Address</p>
                                    <button onClick={() => setAddress(true)} className='flex  items-center gap-1 border-1 border-black px-3 py-1 rounded-4'>
                                        <p className='text-sm'>Add New Address </p> <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 grid-cols-1 gap-3 my-1">

                                {addresses.map((a, index) => (
                                    <div key={index}>

                                        <div className="flex items-center justify-between bg-white py-3 px-4 rounded-3 mb-2 ">
                                            <p className="font-bold text-sm">{a.title}</p>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => editClick(a._id)}
                                                    className="flex  items-center gap-1 border-1 border-black px-2 py-1 rounded-4"
                                                >
                                                    <p className="text-xs font-medium">Edit</p>
                                                    <img src={Edit} alt="Edit" className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteAddress(a._id)}
                                                    className="flex  items-center gap-1 border-1 border-black px-2 py-1 rounded-4"
                                                >
                                                    <p className="text-xs font-medium">Delete</p>
                                                    <Trash2 className="w-4 h-4 text-gray-600" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="bg-white p-3 rounded-3">
                                            <p className='font-bold'>{a.cnmae}</p>
                                            <p className='font-bold my-1 text-sm'>{a.number1}</p>
                                            <p className='text-gray-400'> {a.door}, {a.street}, {a.area}, {a.city}, {a.state} - {a.pincode}.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </>
                        :
                        <>
                            <div className="mt-4">
                                <div className="flex items-center gap-3 border relative p-3 bg-white my-2 rounded-3">
                                    <div className="shrink-0">
                                        <img
                                            src={Product}
                                            alt="product"
                                            className='h-26 w-26 sm:h-28 sm:w-28 md:h-34 md:w-34 object-cover rounded-3'
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <p className='font-bold md:text-xl text-sm mb-1  '>Olive oil on</p>
                                        <p className='text-gray-500 mb-1 md:text-md text-sm'>Order ID : #MIRKL1234</p>
                                        <p className='text-gray-500 mb-2 md:text-md text-sm'>Ordered on : 07/11/2025</p>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            {/* Price - Mobile below status, Desktop on right */}
                                            <p className='text-[#56750A] text-md sm:text-2xl font-bold'>
                                                ₹2,249.25
                                            </p>
                                            <p className='inline-block border px-3 py-1.5  w-fit rounded-full bg-[#EFF3E4] text-[#56750A] text-xs sm:text-sm font-medium'>
                                                Arriving on 07 Jul 2025
                                            </p>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </>
                    }
                </div>
                <ProductBg />
            </section>
            {address &&
                <div className="fixed inset-0  z-50  ">
                    <Address onClose={closeEdit} />
                </div>
            }

        </>
    )
}

export default AccountHome
