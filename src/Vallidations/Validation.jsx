import React from 'react'

const Validation = (data) => {

    const newErrors = {};

    if (!data.title.trim()) newErrors.title = 'Title is required *';

    if (!data.cname.trim()) newErrors.cname = 'Receiver name is required';

    if (!data.number1.trim()) {
      newErrors.number1 = 'Contact number is required';
    } else if (data.number1 && !/^\d{10}$/.test(data.number1)) {
      newErrors.number1 = 'Contact number must be 10 digits';
    }
    if (data.number2 && !/^\d{10}$/.test(data.number2)) {
      newErrors.number2 = 'Alternative number must be 10 digits';
    }
    if (!data.door.trim()) newErrors.door = 'Door number is required';

    if (!data.street.trim()) newErrors.street = 'Street is required';

    if (!data.area.trim()) newErrors.area = 'Area is required';

    if (!data.city.trim()) newErrors.city = 'City is required';

    if (!data.state.trim()) newErrors.state = 'State is required';

    if (!data.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(data.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    // if (!loginData.email.trim()) newErrors.email = "Email is required"

    // if (!loginData.password.trim()) newErrors.password = "Password is required"
    
    return newErrors;
  };

export default Validation
