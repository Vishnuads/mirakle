import React from 'react'
import Product from '../../assets/images/offers1.png'


const ProductHome = () => {

    const imgs = [
        { name: "Product 1", url: Product },
        { name: "Product 2", url: Product },
        { name: "Product 3", url: Product },

    ]
    return (
        <>
            <section className=''>
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 grid-cols-1 ">
                        <div className=''>
                            <img src={Product} alt="products" className='object-cover h-[532px] w-full' />
                            <div className="grid grid-cols-3 gap-3">
                                {imgs.map((pic, id) => (
                                    <div key={id} className='rounded-xl overflow-hidden h-52 w-full'>
                                        <img src={pic.url} alt={pic.name} className='object-cover' />
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div>
                            <p>Spaices & Seasoning</p>
                            <h1>Garlic Powder</h1>
                            <p>Pure, aromatic, and finely ground Mirakle Garlic Powder that brings instant flavor to every dish</p>
                            <h2>₹170.00</h2>
                            <p>Weight</p>
                            <div className="flex">
                                <p>110g</p>
                            </div>
                            <div className="flex">
                                <div className='border flex items-center'>
                                    <button className=''>-</button>
                                    <p>01</p>
                                    <button>+</button>
                                </div>
                                <p>In Stock</p>
                            </div>
                            <div className="flex items-center">
                                <div className="grid grid-cols-4">
                                    <div className="col-span-3"> <button>Add To Cart</button></div>
                                    <div>E</div>
                                </div>
                               

                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default ProductHome
