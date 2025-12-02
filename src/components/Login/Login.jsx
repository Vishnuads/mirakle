import React, { useState, useContext, useEffect } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import LoginImg from '../../assets/images/new/onion.webp';
import LoginImg2 from '../../assets/images/new/login.webp';
import Logo from '../../assets/images/logo.png';
import signupValidation from '@/Vallidations/signupValidation';
import ForgotPassword from './ForgotPassword';
import { ProductListCreate } from '../../context/ClientContext';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from '../../Api';
import axios from 'axios';
import { CheckOutDetailsCreate } from '../../context/CheckoutContext';
import { CartContext } from '@/context/CartContext';


const Login = ({ close }) => {

    const { setUserData } = useContext(CheckOutDetailsCreate)
    const {
        signup,
        setSignup,
        handleChange,
        setError,
        error,
        email,
        password,
        setEmail,
        setPassword,
        setUser,
        userProduct,
        errors,
        setErrors
    } = useContext(ProductListCreate);
    const { getAddresses } = useContext(CartContext)
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [forgotPwd, setForgotPwd] = useState(false);

    // Signup Password visibility & form data
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Login Password visibility & form data
    const [loginPassword, setLoginPassword] = useState(false);


    const forgotPassword = () => {
        setForgotPwd(true);
        setLogin(false);
    }


    const handleLoginToggle = () => {
        setError("");
        setErrors({});
        setLogin(!login);
    };





    // Password validation function
    const isValidPassword = (pwd) => {
        const regex = /^.{6,}$/;
        // min 6 chars, 1 uppercase, 1 number
        return regex.test(pwd);
    };

    const formSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // start loading
        // Run validation
        const validateErrors = signupValidation(signup);

        // If validation errors exist → show them and stop submit
        if (Object.keys(validateErrors).length > 0) {
            setErrors(validateErrors);
            setLoading(false);
            return;
        }

        if (signup.password !== signup.confirmPassword) {
            setLoading(false);
            return setError('Passwords do not match');
        }

        if (!isValidPassword(signup.password)) {
            setLoading(false);
            return setError('Password must be at least 6 characters');
        }

        try {
            const res = await axios.post(`${BASE_URL}/api/register`, signup);
            localStorage.setItem('userToken', res.data.userToken);
            localStorage.setItem('userEmail', JSON.stringify(res.data.userEmail));
            setUser({ token: res.data.userToken, email: res.data.userEmail });
            toast.success('Signup successfully!');
            setSignup({ email: '', firstName: '', lastName: '', password: '', confirmPassword: '' });
            //   navigate('/my-account');
            if (typeof close === "function") {
                close(); // close the modal
            } else {
                console.log("close is not a function:", close);
            }
        } catch (error) {
            setError(error?.response?.data?.error || 'Signup failed!');
        }
        finally {
            setLoading(false);
        }
    };



    const submitLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true); // start loading
        try {
            const res = await axios.post(`${BASE_URL}/api/login`, { email, password });
            // ✅ Case 1: Normalbcrypt login
            if (res.data?.token || res.data?.userToken) {
                const token = res.data.token || res.data.userToken;
                const userInfo = res.data.user || res.data.userEmail;
                localStorage.setItem('userToken', token);
                localStorage.setItem('userEmail', JSON.stringify(userInfo));
                setUser({ token, email: userInfo });
                setUserData(userInfo);
                await userProduct();
                getAddresses()
                toast.success('Login successfully!');
                if (typeof close === "function") {
                    close(); // close the modal
                } else {
                    console.log("close is not a function:", close);
                }
                //   navigate('/my-account');
                setLoading(false);
                return;
            }
            // IMPORTANT: call close() here

            // ⚠️ Case 2: WordPress password requires update
            if (res.data?.requirePasswordUpdate) {
                setError(
                    <span>
                        {res.data.message || 'Please update your password for security reasons. '}

                        <Link to={'/updated-password'} state={{ email }}
                            style={{ color: 'blue', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}>Update Password</Link>
                    </span>
                );
                setLoading(false);
                return;
            }
            setError('Invalid login credentials.');
        } catch (error) {
            const errData = error?.response?.data;
            if (errData?.requirePasswordUpdate) {
                setError(
                    <span>
                        {errData.message || 'Please update your password for security reasons. '}
                        <Link to={'/updated-password'} state={{ email }}
                            style={{ color: 'blue', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}>Update Password</Link>
                    </span>
                );
                setLoading(false);
                return;
            }
            setError(errData?.error || 'Login failed.');
        }
        finally {
            setLoading(false); // stop loading
        }
    };
    // inside your component
    useEffect(() => {
        setError(null); // clear error when component loads
    }, []);

    return (
        <>
            {!forgotPwd ? (
                !login ?
                    <>
                        <section className='min-h-screen bg-black/70 flex items-center justify-center p-4' >
                            <div className='max-w-4xl mx-auto w-full relative login-form' >
                                <div className="absolute top-5 right-5">
                                    <button onClick={close} className='border-1 text-red-600  border-red-600 rounded-5 p-1 '>
                                        <X size={18} />
                                    </button>
                                </div>
                                <div className="grid md:grid-cols-2 rounded-lg overflow-hidden ">
                                    <div className='hidden md:block '>
                                        <img
                                            src={LoginImg2}
                                            className='w-full h-full object-cover '
                                        />
                                    </div>
                                    <div className='bg-[#F6F6F6]'>
                                        <div className="px-8 py-3">
                                            <div className="flex items-center justify-center">
                                                <img src={Logo} alt="Logo" className='w-32' loading='lazy' />
                                            </div>
                                            {/* {error && <div className="login-error"><p>{error}</p></div>} */}
                                            <h1 className='text-3xl font-bold text-gray-900'>Welcome Back !</h1>
                                            <p className='text-sm text-gray-600 mb-3'>Login to explore all the products and offers of our platform and see what’s new</p>

                                            <form onSubmit={submitLogin}>
                                                {/* Email */}
                                                <div className="mb-2">
                                                    <label htmlFor="email" className='block text-sm text-gray-400 mb-1'>
                                                        Enter Your Email Address
                                                    </label>
                                                    <input
                                                        id='email'
                                                        name='email'
                                                        type="email"
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder='example123@gmail.com'
                                                        className='bg-white w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors'
                                                    />
                                                    {/* {errors.email && <p className='text-red-400 mt-1 ps-1 text-xs'>{errors.email}</p>} */}
                                                </div>

                                                {/* Password */}
                                                <div className="mb-2">
                                                    <label htmlFor="password2" className='block text-sm text-gray-400 mb-1'>
                                                        Enter Your Password
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            id='password'
                                                            name='password'
                                                            type={loginPassword ? "text" : "password"}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            placeholder='******************'
                                                            className='bg-white w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors pr-12'
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setLoginPassword(!loginPassword)}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                        >
                                                            {loginPassword ? (
                                                                <EyeOff className="w-5 h-5" />
                                                            ) : (
                                                                <Eye className="w-5 h-5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    {/* {errors.password && <p className='text-red-400 mt-1 ps-1 text-xs'>{errors.password}</p>} */}
                                                </div>

                                                <div className="flex items-center justify-between my-3">
                                                    <div className='flex items-center gap-2 text-xs text-gray-400'>
                                                        <input type="checkbox" id='remember' name='remember' className='checkbox w-4 h-4' />
                                                        <label htmlFor="remember"> Remember Me</label>
                                                    </div>
                                                    <button type='button' className='' onClick={forgotPassword}>
                                                        <p className='mb-0 text-xs text-gray-600 underline'>Forgot Password?</p>
                                                    </button>
                                                </div>
                                                {error && (
                                                    <div className="bg-red-50 border border-red-300 text-red-700 mb-2 px-4 py-2 text-center rounded-lg text-sm mt-2">
                                                        {error}
                                                    </div>
                                                )}

                                                {loading
                                                    ? <button
                                                        // type='submit'
                                                        disabled={loading}
                                                        className='w-full bg-[#49600d] text-white font-semibold py-3 rounded-3 transition-colors duration-200'
                                                    >
                                                        <div class="text-center">
                                                            <div role="status">
                                                                <svg aria-hidden="true" class="inline  w-6 h-6 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                </svg>
                                                                <span className='px-2'>Loading...</span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                    : <button
                                                        type='submit'
                                                        className='w-full bg-[#56750A] hover:bg-[#49600d] text-white font-semibold py-3 rounded-3 transition-colors duration-200'
                                                    >
                                                        <p className='mb-0'>Login</p>
                                                    </button>
                                                }
                                            </form>
                                            <p className='text-center mb-0 mt-4 text-gray-700'>
                                                Don’t have an account?{' '}
                                                <button
                                                    type="button"
                                                    onClick={handleLoginToggle}
                                                    className='text-[#56750A] font-semibold underline'
                                                >
                                                    Register Now
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                    :
                    <>
                        <section className='min-h-screen bg-black/70 flex items-center justify-center p-4' >
                            <div className='max-w-4xl mx-auto w-full relative sign-form ' >
                                <div className="absolute top-5 right-5">
                                    <button onClick={close} className='border-1 text-red-600  border-red-600 rounded-5 p-1 '>
                                        <X size={18} />
                                    </button>
                                </div>
                                <div className="grid md:grid-cols-2 rounded-lg overflow-hidden ">
                                    <div className='hidden md:block '>
                                        <img
                                            loading='lazy'
                                            src={LoginImg}
                                            className='w-full h-full object-cover '
                                        />
                                    </div>
                                    <div className='bg-[#F6F6F6]'>
                                        <div className="px-8 py-6">

                                            <h1 className='text-4xl font-bold mb-6 text-gray-900'>Sign Up</h1>
                                            <form onSubmit={formSubmit}>
                                                {/* First Name and Last Name */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-2 mb-2">
                                                    <div>
                                                        <label htmlFor="fname" className='block text-sm text-gray-600 mb-1'>
                                                            First Name
                                                        </label>
                                                        <input
                                                            id='firstName'
                                                            name='firstName'
                                                            type="text"
                                                            value={signup.firstName}
                                                            onChange={handleChange}
                                                            placeholder=''
                                                            className='bg-white w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors'
                                                        />
                                                        {errors.firstName && <p className='text-red-400 mt-1 ps-1 text-xs'>{errors.firstName}</p>}
                                                    </div>
                                                    <div>
                                                        <label htmlFor="lname" className='block text-sm text-gray-600 mb-1'>
                                                            Last Name
                                                        </label>
                                                        <input
                                                            id='lastName'
                                                            name='lastName'
                                                            type="text"
                                                            value={signup.lastName}
                                                            onChange={handleChange}
                                                            placeholder=''
                                                            className='bg-white w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors'
                                                        />
                                                        {errors.lastName && <p className='text-red-400 mt-1 ps-1 text-xs'>{errors.lastName}</p>}
                                                    </div>
                                                </div>

                                                {/* Email */}
                                                <div className="mb-2">
                                                    <label htmlFor="mail" className='block text-sm text-gray-600 mb-1'>
                                                        Enter Your Email Address
                                                    </label>
                                                    <input
                                                        id='mail'
                                                        name='email'
                                                        type="text"
                                                        value={signup.email}
                                                        onChange={handleChange}
                                                        placeholder=''
                                                        className='bg-white w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors'
                                                    />
                                                    {errors.email && <p className='text-red-400 mt-1 ps-1 text-xs'>{errors.email}</p>}
                                                </div>

                                                {/* Password */}
                                                <div className="mb-2">
                                                    <label htmlFor="pwd" className='block text-sm text-gray-600 mb-1'>
                                                        Enter Your Password
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            id='pwd'
                                                            name='password'
                                                            type={showPassword ? "text" : "password"}
                                                            value={signup.password}
                                                            onChange={handleChange}
                                                            placeholder=''
                                                            className='bg-white w-full py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-green-600 transition-colors pr-12'
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
                                                    {errors.password && <p className='text-red-400 mt-1 ps-1 text-xs'>{errors.password}</p>}
                                                </div>

                                                {/* Confirm Password */}
                                                <div className="mb-4">
                                                    <label htmlFor="cpassword" className='block text-sm text-gray-600 mb-1'>
                                                        Re-Enter Your Password
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            id='confirmPassword'
                                                            name='confirmPassword'
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            value={signup.confirmPassword}
                                                            onChange={handleChange}
                                                            placeholder=''
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
                                                    {errors.confirmPassword && <p className='text-red-400 mt-1 ps-1 text-xs'>{errors.confirmPassword}</p>}
                                                </div>
                                                {error && (
                                                    <div className="bg-red-50 border border-red-300 text-red-700 mb-2 px-4 py-2 text-center rounded-lg text-sm mt-2">
                                                        {error}
                                                    </div>
                                                )}
                                                {/* Sign Up Button */}

                                                {loading
                                                    ? <button
                                                        // type='submit'
                                                        disabled={loading}
                                                        className='w-full bg-[#49600d] text-white font-semibold py-3 rounded-3 transition-colors duration-200'
                                                    >
                                                        <div class="text-center">
                                                            <div role="status">
                                                                <svg aria-hidden="true" class="inline  w-6 h-6 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                </svg>
                                                                <span className='px-2'>Loading...</span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                    : <button
                                                        type='submit'
                                                        className='w-full bg-[#56750A] hover:bg-[#49600d] text-white font-semibold py-3 rounded-3 transition-colors duration-200'
                                                    >
                                                        <p className='mb-0'>Sign Up</p>
                                                    </button>
                                                }
                                            </form>
                                            {/* Login Link */}
                                            <p className='text-center mb-0 mt-4 text-gray-700'>
                                                Already Have An Account?{' '}
                                                <button
                                                    type="button"
                                                    onClick={handleLoginToggle}
                                                    className='text-[#56750A] font-semibold underline'
                                                >
                                                    Login
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
            )
                :
                <ForgotPassword onClose={close} />

            }
        </>
    );
};

export default Login;