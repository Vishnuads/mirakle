import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowDownNarrowWideIcon, Star } from 'lucide-react';
import { UserCircle } from 'phosphor-react';
import BASE_URL from '@/Api';

const ReviewList = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [sort, setSort] = useState('Newest'); // for sorting

    const product = productId._id

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/productreview/${product}`);
                setReviews(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchReviews();
    }, [product]);

    // Optional: Sorting function
    const sortedReviews = [...reviews].sort((a, b) => {
        if (sort === 'Newest') return new Date(b.createdAt) - new Date(a.createdAt);
        if (sort === 'Oldest') return new Date(a.createdAt) - new Date(b.createdAt);
        if (sort === 'Highest') return b.rating - a.rating;
        if (sort === 'Lowest') return a.rating - b.rating;
        return 0;
    });

    return (
        <section className='mt-4'>
            <div className="flex items-center justify-between my-2">
                <p className='text-gray-400 mb-0 md:text-md text-sm'>
                    Showing {reviews.length} Review{reviews.length !== 1 ? 's' : ''}
                </p>
                <div className='flex gap-2 items-center'>
                   <div className="dropdown dropdown-end  text-black">
                            <div tabIndex={0} role="button" className="btn  bg-white shadow-none border rounded-5"><p className='flex itmes-center gap-2 '>{sort} <ArrowDownNarrowWideIcon size={20} /></p></div>
                            <ul tabIndex="-1" className="dropdown-content menu bg-white rounded-box z-1 w-fit p-2 shadow-md ">
                                {['Newest', 'Oldest', 'Highest', 'Lowest'].map((s) => (
                                    <li
                                       key={s} onClick={() => setSort(s)}
                                        className=' hover:bg-gray-100  text-sm rounded-2 cursor-pointer'
                                    >
                                        <p className='mb-0'> {s}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                </div>
            </div>

            {/* Render reviews */}
            {sortedReviews.map((review) => (
                <div key={review._id} className='border-b pb-3 mb-3'>
                    <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                            <UserCircle size={30} />
                            <p className='mb-0 font-bold'>{review.customername}</p>
                        </div>
                        <p className='mb-0 text-gray-400'>
                            {new Date(review.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 mb-2 mt-2">
                        {[1, 2, 3, 4, 5].map((id) => (
                            <Star key={id} size={18} className={id <= review.rating ? 'text-yellow-300 fill-yellow-300' : 'text-gray-300'} />
                        ))}
                        <p className='mb-0'>{review.rating}.0</p>
                    </div>
                    <p className='text-gray-500 mb-2'>{review.customermessage}</p>
                    <div className="grid md:grid-cols-12 grid-cols-3 gap-3">
                        {review.images.map((img, idx) => (
                            <div key={idx} className='rounded-3 overflow-hidden transition-all'>
                                <img
                                    src={img}
                                    alt={`Review image ${idx + 1}`}
                                    className="w-full h-22 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}

export default ReviewList;
