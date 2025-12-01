import React from 'react'

const loginValidation = (loginData) => {
    const newErrors = {};
    if (!loginData.email.trim()) { newErrors.email = "Email is required" }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) { 
        newErrors.email = "Please enter a valid email";
    }

    if (!loginData.password.trim()) newErrors.password = "Password is required"
    else if (loginData.password.length < 6 )newErrors.password = "Password must be at least 6 characters"
    return newErrors;
}

export default loginValidation
