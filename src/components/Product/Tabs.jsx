import React, { useEffect, useState } from 'react'
import Icon1 from '../../assets/icons/SealCheck.png'
import { Progress } from "@/components/ui/progress"
import { Star } from 'lucide-react'
import ReviewList from './ReviewList'
import AddReview from './AddReview'
import BASE_URL from '@/Api'
import axios from 'axios'

const Tabs = ({ product }) => {

  const [activeTab, setActiveTab] = useState('tab1');
  const [review, setReview] = useState(false);

  const [reviews, setReviews] = useState([]);

  const productId = product._id
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/productreview/${productId}`);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [productId]);

  // Initialize counts for 5-star to 1-star
  const ratings = [0, 0, 0, 0, 0]; // [5-star, 4-star, 3-star, 2-star, 1-star]

  reviews.forEach((review) => {
    const r = review.rating;
    if (r >= 1 && r <= 5) {
      ratings[5 - r] += 1; // index 0 = 5-star, 1 = 4-star...
    }
  });

  const totalReviews = ratings.reduce((acc, val) => acc + val, 0);
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : 0;


  return (
    <>
      <section>
        <div className="max-w-6xl mx-auto mt-8 p-4  ">
          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-300">
            <button
              className={`flex py-2 text-center ${activeTab === "tab1"
                ? "border-b-2 border-black font-semibold text-black"
                : "text-gray-500"
                }`}
              onClick={() => setActiveTab("tab1")}
            >
              <p className='md:text-xl text-md mb-0'>Description</p>
            </button>
            <button
              className={`flex py-2 text-center ${activeTab === "tab2"
                ? "border-b-2 border-black font-semibold text-black"
                : "text-gray-500"
                }`}
              onClick={() => setActiveTab("tab2")}
            >
              <p className='md:text-xl text-md mb-0'>Ratings & Reviews</p>
            </button>
          </div>

          {/* Content */}
          <div className="mt-4">
            {activeTab === "tab1" ?
              <div>
                <h1 className="text-lg font-bold mb-2">{product.title}</h1>
                <p className='font-bold'>{product.subtitle}</p>
                <p className='text-gray-500'>{product.description}</p>
                <div className='mt-4'>
                  <p className='font-bold text-xl my-3'>Key Highlights</p>
                  <div className="grid md:grid-cols-4 grid-cols-1 gap-4 ">
                    {product.keyBenefits.map((point, index) => (
                      <div key={index} className='flex items-center justify-center border gap-3 rounded-4 px-3 py-3'>
                        <img src={Icon1} alt="seal check" className='w-8' />
                        <p className='mb-0 text-sm'>{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              :
              <div>
                <div className='border-b pb-3'>
                  <div className="grid md:grid-cols-3 grid-cols-2">
                    {/* Average Rating */}
                    <div className='md:border-r text-center'>
                      <p className='font-bold mb-1 md:text-[70px] text-[40px]'>{averageRating}</p>
                      <div className="flex items-center justify-center gap-2 md:mb-3">
                        {[1, 2, 3, 4, 5].map((id) => (
                          <Star
                            key={id}
                            size={18}
                            className={id <= Math.round(averageRating) ? "text-yellow-300 fill-yellow-300" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <p className='mb-0 text-gray-400'>{totalReviews} Reviews</p>
                    </div>

                    {/* Rating Progress Bars */}
                    <div className='px-4'>
                      {ratings.map((count, idx) => {
                        const star = 5 - idx;
                        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                        return (
                          <div key={star} className='md:mb-2 flex items-center justify-between'>
                            <div className="flex gap-2 items-center">
                              <span>{star}</span>
                              <Star size={14} className="text-yellow-300" />
                            </div>
                            <Progress value={percentage} className="flex-1 mx-2" />
                            <span>{count}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Write Review */}
                    <div className='md:border-l mt-3 md:mt-0 col-span-2 md:col-span-1 flex items-center justify-center text-center'>
                      <div>
                        <p className='mb-1 font-semibold'>Review This Product</p>
                        <p className='text-sm text-gray-500 mb-2'>Share your thoughts with other customers</p>
                        <button
                          onClick={() => setReview(!review)}
                          className='border rounded-5 px-3 py-2 border-black'
                        >
                          Write a customer review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {review &&
                  <AddReview productId={product} setReview={setReview} />}
                <ReviewList productId={product}  />
              </div>
            }
          </div>
        </div>
      </section>

    </>
  )
}

export default Tabs
