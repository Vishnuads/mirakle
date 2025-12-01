import React, { useState } from 'react'

const useContactForm = (contactValidation) => {

    const [contactData, setContactData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        gmail: "",
        message: ""
    })
    const [errors, setErrors] = useState({});

    const contactChange = (e) => {
        const { name, value } = e.target;
        setContactData({ ...contactData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' })
        }
    }

    const contactSubmit = (e) => {
        e.preventDefault();
        const validateErrors = contactValidation(contactData);
        if (Object.keys(validateErrors).length === 0) {
            console.log("Signup form submitted");
            //  onclose();
        }
        else {  setErrors(validateErrors);  }
    }

    return {
        contactData,
        errors,
        contactChange,
        contactSubmit
    }
}

export default useContactForm
