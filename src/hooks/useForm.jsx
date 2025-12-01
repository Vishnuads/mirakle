import React, { useState } from 'react'

function useForm(Validation, loginValidation, signupValidation)  {

    const [addressData, setAddressData] = useState({
        title: "",
        cname: "",
        contact1: "",
        contact2: "",
        door: "",
        street: "",
        area: "",
        city: "",
        state: "",
        pincode: ""
    })

    const [loginData, setLoginData] = useState({
        email:"",
        password:""
    })

    const [signupData, setSignupData] = useState({
        fname:"",
        lname:"",
        mail:"",
        pwd:"",
        cpassword:""
    })


    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressData({ ...addressData, [name]: value });
        if (errors[name]) {
            setErrors({...errors, [name]: ''})
        }
    }
    const loginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
        if (errors[name]) {
            setErrors({...errors, [name]: ''})
        }
    }
    const signupChange = (e) => {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value });
        if (errors[name]) {
            setErrors({...errors, [name]: ''})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validateErrors = Validation(addressData);
        if(Object.keys(validateErrors).length === 0){
        console.log("form submitted");
        onclose();
        }
        else{
            setErrors(validateErrors);
        }
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const validateErrors = loginValidation(loginData);
        if(Object.keys(validateErrors).length === 0){
        console.log("Login form submitted");
        onclose();
        }
        else{
            setErrors(validateErrors);
        }
    }

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        const validateErrors = signupValidation(signupData);
        if(Object.keys(validateErrors).length === 0){
        console.log("Signup form submitted");
        onclose();
        }
        else{
            setErrors(validateErrors);
        }
    }

    

    return {
        addressData,
        loginData,
        signupData,
        errors,
        handleChange,
        loginChange,
        signupChange,
        handleSubmit,
        handleLoginSubmit,
        handleSignupSubmit,
       
    }

}

export default useForm
