import React, { useState } from 'react'
import NavBar from '../Home/Navbar'
import SectionBanner from '../SectionBanner'
import ProductBg from '../Home/ProductBg'
import Footer from '../Home/Footer'
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios'
import BASE_URL from '@/Api'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

const ChangePassword = () => {


     const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

      const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
   const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      return  toast.error("Passwords do not match")
    }
  
    try {
      const res = await axios.put(`${BASE_URL}/api/resetpassword/${token}`, {
        password,
      });
      toast.success(res.data.message)
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      console.error("Reset password error:", err);
      alert(
        err.response?.data?.message || err.message || "Error resetting password"
      );
    }
    finally {
      setLoading(false);
    }
  };

    return (
        <>
            <NavBar />
            <SectionBanner title="Set Password" />
            <section className='max-w-6xl mx-auto flex justify-center items-center py-10'>
                <div className='p-3 w-full md:w-lg '>
                   {/* <h1>Change </h1> */}
                    <form onSubmit={handleSubmit}>
                        {/* Password */}
                        <div className="mb-2">
                            <label htmlFor="pwd" className='block text-md text-gray-600 mb-2'>
                                Enter Your Password
                            </label>
                            <div className="relative">
                                <input
                                    id='pwd'
                                    name='pwd'
                                    type={showPassword ? "text" : "password"}
                                    // value={signupData.pwd}
                                    // onChange={signupChange}
                                       value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='New Password'
                                    className='bg-white py-2 px-3 w-full rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors pr-12'
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {/* {errors.pwd && <p className='text-red-400 mt-1 ps-1 text-xs'>{errors.pwd}</p>} */}
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-4">
                            <label htmlFor="cpassword" className='block text-md text-gray-600 mb-2'>
                                Re-Enter Your Password
                            </label>
                            <div className="relative">
                                <input
                                    id='confirmPassword'
                                    name='cpassword'
                                    type={showConfirmPassword ? "text" : "password"}
                                    // value={signupData.cpassword}
                                    // onChange={signupChange}
                                                                         value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder='Confirm New Password'
                                    className='bg-white w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors pr-12'
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {/* {errors.cpassword && <p className='text-red-400 mt-1 ps-1 text-xs'>{errors.cpassword}</p>} */}
                        </div>
                        <button
                            type="submit"
                            className="bg-[#56750A] text-white px-4 py-2 my-3 rounded w-full"
                        >
                            <p> Change Password</p>
                        </button>
                    </form>

                </div>
            </section>

            <ProductBg />
            <Footer />


        </>

    )
}

export default ChangePassword
