import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png'
import { X } from 'lucide-react';
import BASE_URL from '@/Api';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = ({ onClose }) => {
  
   const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
        setLoading(true); // ✅ start loading
    try {
      const res = await axios.post(`${BASE_URL}/api/forgotpassword`, { email });
      toast.success(res.data.message)
      setEmail('')
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong")
    }
    finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <div className="bg-black/70 flex items-center justify-center min-h-screen" onClick={onClose}>

        <div className="bg-white p-6 w-xl rounded-lg relative" onClick={(e)=>e.stopPropagation() }>
          <div className="absolute top-5 right-5">
            <button onClick={onClose} className='border-1 text-red-600  border-red-600 rounded-5 p-1 '>
              <X size={18} />
            </button>
          </div>
          <div className="flex items-center justify-center">
            <img src={Logo} alt="Logo" className='w-32' />
          </div>
          <p className='font-bold'>Enter your Email to get verification link</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="border p-2 rounded w-full my-3 "
            />

              <button
                type="submit"
                className="bg-[#56750A] text-white px-4 py-2 rounded w-full"
              >
                <p> Send Link</p>
              </button>
          </form>
        </div>

      </div>

    </>
  );
};

export default ForgotPassword;
