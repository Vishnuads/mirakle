import React from 'react'

const contactValidation = (contactData) => {

  const newErrors = {};
  
  if (!contactData.firstName.trim()){
    newErrors.firstName = "First Name is required"
  }

  if (!contactData.lastName.trim()){
    newErrors.lastName = "Last Name is required"
  }

  if (!contactData.phone.trim()){
    newErrors.phone = "Phone number is required" 
  } else if (contactData.phone.length < 10 || contactData.phone.length > 10){
    newErrors.phone = "Enter a valid Number"
  }

  if (!contactData.gmail.trim()){
    newErrors.gmail = "Mail is required"
  }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.gmail)){
    newErrors.gmail = "Enter a valid Mail ID"
  }

  if (!contactData.message.trim()){
    newErrors.message = "Message is required"
   }

  return newErrors
}

export default contactValidation
