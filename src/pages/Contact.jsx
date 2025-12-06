import Footer from '@/components/Home/Footer'
import NavBar from '@/components/Home/Navbar'
import ProductBg from '@/components/Home/ProductBg'
import SectionBanner from '@/components/SectionBanner'
import useContactForm from '@/hooks/useContactForm'
import contactValidation from '@/Vallidations/contactValidation'

import React from 'react'

const Contact = () => {

    const { contactData, contactChange, contactSubmit, errors } = useContactForm(contactValidation)

    return (
        <>
            <NavBar />
            <SectionBanner title="Contact Us" />
            <section className='bg-gray-100'>
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-5">
                        <div className='p-4'>
                            <h1>Get In Touch With Us</h1>
                            <p className='mb-4 text-gray-500'>we love hearing from you! whether it’s a question, feedback, or just a hello - we’re here for you</p>
                            <div className='mb-3'>
                                <p className='mb-2 text-gray-500'>Email : </p>
                                 <p className='font-bold'> <a href="mailto:support@mirakle.com" target='_blank'>
                              support@mirakle.com</a></p>
                            </div>
                            <div className='mb-3'>
                                <p className='mb-2 text-gray-500'>Phone :</p>
                                <p className='font-bold'>+91 8056915668</p>
                            </div>
                            <div className='mb-4'>
                                <p className='mb-2 text-gray-500'>Customer Care Hours : </p>
                                <p className='font-bold'>Mon - Sat | 10 am - 6 pm</p>
                            </div>
                            <div className='mb-4'>
                                <p className='mb-2 text-gray-500'>Registered Address : </p>
                                <p className='font-bold'>MIRAKLE</p>
                                <p className='font-bold'>Plot No: 24, Arunachalla Avenue,
                                     Paraniputhur Main Road,
                                     Iyyapanthangal,
                                    Chennai - 600 122, Tamilnadu, India</p>
                                  
                            </div>
                            <p className='text-gray-500'>we aim to respond to all queries within 24-48 business hours</p>

                        </div>
                        <div className="bg-white p-4 rounded-4 mx-2">
                            <form onSubmit={contactSubmit}>
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mb-2">
                                    <div>
                                        <label htmlFor="firstName" className='mb-1'>First Name</label>
                                        <input type="text"
                                            name='firstName'
                                            placeholder='John'
                                            onChange={contactChange}
                                            value={contactData.firstName}
                                            className='bg-gray-100 rounded-3  border px-3 h-10 w-full text-sm ' />
                                        {errors.firstName && <p className='text-red-600 text-xs mt-1'>{errors.firstName}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className='mb-1'>Last Name</label>
                                        <input type="text"
                                            name='lastName'
                                            placeholder='Doe'
                                            onChange={contactChange}
                                            value={contactData.lastName}
                                            className='bg-gray-100 rounded-3 border px-3 h-10 w-full' />
                                        {errors.lastName && <p className='text-red-600 text-xs mt-1'>{errors.lastName}</p>}
                                    </div>
                                </div>
                                <div className='mb-2'>
                                    <label htmlFor="phone" className='mb-1'>Phone Number</label>
                                    <input type="number"
                                        name='phone'
                                        placeholder='+91 ...'
                                        onChange={contactChange}
                                        value={contactData.phone}
                                        className='bg-gray-100 rounded-3 border px-3 h-10 w-full' />
                                    {errors.phone && <p className='text-red-600 text-xs mt-1'>{errors.phone}</p>}
                                </div>
                                <div className='mb-2' >
                                    <label className='mb-1' htmlFor="gmail">Email</label>
                                    <input type="email"
                                        name='gmail'
                                        placeholder='example@mail.com'
                                        onChange={contactChange}
                                        value={contactData.gmail}
                                        className='bg-gray-100 rounded-3 border px-3 h-10 w-full' />
                                    {errors.gmail && <p className='text-red-600 text-xs mt-1'>{errors.gmail}</p>}
                                </div>
                                <div className='mb-2'>
                                    <label htmlFor="message" className='mb-1'>How Can We Help You?</label>
                                    <textarea type="text"
                                        name='message'
                                        placeholder='Share your thoughts...'
                                        onChange={contactChange}
                                        value={contactData.message}
                                        className='bg-gray-100 rounded-3 border px-3 w-full h-24 py-1' />
                                    {errors.message && <p className='text-red-600 text-xs mt-1'>{errors.message}</p>}
                                </div>
                                <button type="submit" className='btn-buy text-center py-2 w-full bg-[#56750A] text-white rounded-3 my-2 '><p>Send Message</p> </button>
                            </form>
                        </div>
                    </div>

                </div>
                <ProductBg />
            </section>
            <Footer />

        </>
    )
}

export default Contact
