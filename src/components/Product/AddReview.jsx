import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from "../ui/textarea";
import { Star } from 'lucide-react';
import axios from 'axios';
import BASE_URL from '@/Api';
import toast from 'react-hot-toast';


const AddReview = ({ productId, setReview }) => {
    const [rating, setRating] = useState(0);
    const [reviewmessag, setReviewmessag] = useState('');
    const [reviewname, setReviewname] = useState('');
    const [reviewemail, setReviewemail] = useState('');
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        const previewUrls = files.map(file => URL.createObjectURL(file));
        setPreview(previewUrls);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // start loading
        const formData = new FormData();
        formData.append('productId', productId._id);
        formData.append('reviewname', reviewname);
        formData.append('reviewemail', reviewemail);
        formData.append('reviewmessag', reviewmessag);
        formData.append('rating', rating);
        images.forEach(img => formData.append('reviewimages', img));

        try {
            const res = await axios.post(`${BASE_URL}/api/productreview`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            // alert("Review submitted!");
            toast.success("Review Submitted")
            // ✅ Clear form inputs
            setReviewname('');
            setReviewemail('');
            setReviewmessag('');
            setRating(0);
            setImages([]);
            setPreview([]); // if you have a preview state for images
            setReview(false)
        } catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false); // stop loading
        }
    };

    return (
        <section className="my-8 flex justify-center">
            <div className="bg-white p-6 w-full max-w-lg border rounded-3">
                <p className="text-2xl font-semibold mb-4 text-gray-800">Add Your Review</p>
                <div className="flex items-center gap-2 my-3">
                    {[1, 2, 3, 4, 5].map(id => (
                        <button type="button" key={id} onClick={() => setRating(id)}>
                            <Star size={18} className={`${id <= rating ? 'text-yellow-300 fill-amber-300' : 'text-gray-400'}`} />
                        </button>
                    ))}
                    <p className='mb-0'>{rating}.0</p>
                </div>

                <form className="space-y-4 flex flex-col" onSubmit={handleSubmit}>
                    <div>
                        <Textarea
                            name="reviewmessag"
                            rows={4}
                            value={reviewmessag}
                            onChange={e => setReviewmessag(e.target.value)}
                            className="w-full border rounded-md p-2"
                            placeholder="Share your experience..."
                            required
                        />
                    </div>
                    <Input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-600 border"
                    />
                    {/* Preview images */}
                    <div className="flex gap-2 flex-wrap">
                        {preview.map((img, idx) => (
                            <img key={idx} src={img} alt="preview" className="h-20 w-20 object-cover rounded-md" />
                        ))}
                    </div>

                    <div>
                        <Input
                            type="text"
                            value={reviewname}
                            onChange={e => setReviewname(e.target.value)}
                            className="block w-full text-sm text-gray-600 border"
                            placeholder="Display name..."
                        />
                    </div>
                    <div>
                        <Input
                            type="email"
                            value={reviewemail}
                            onChange={e => setReviewemail(e.target.value)}
                            className="block w-full text-sm text-gray-600 border"
                            placeholder="Your email address"
                        />
                    </div>


                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-[#56750A] btn-buy text-white px-6 py-2 rounded-md font-medium shadow flex items-center gap-2"
                            disabled={loading} // disable while loading
                        >
                            {loading ? (
                                <>
                                    <span className="loader-border h-4 w-4 border-2 border-white rounded-full animate-spin"></span>
                                    loading...
                                </>
                            ) : (
                                "Share Review"
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </section>
    );
};

export default AddReview;
