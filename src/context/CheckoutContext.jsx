import React, {createContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import BASE_URL from "../../Api";
import axios from "axios";
import toast from "react-hot-toast";
import BASE_URL from "../Api";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
// eslint-disable-next-line react-refresh/only-export-components
export const CheckOutDetailsCreate = createContext();
export default function CheckoutContext({children}) {
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [giftCode, setGiftCode] = useState("");
    const [appliedGift, setAppliedGift] = useState(null);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [giftUsedAmount, setGiftUsedAmount] = useState(0);
    const [userCoupon, setUserCoupon] = useState(null);
    const [pendingCart, setPendingCart] = useState([]);
    const [loading, setLoading] = useState(false);

  //address
  
  // address change form
  const [showForm, setShowForm] = useState(false);
        const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);
  const [formData, setFormData] = useState({
    country: "India",
    state: "",
    city: "",
    pincode: "",
  });
  

const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  // ✅ Always validate main billing form
  if (!formData.firstName?.trim()) newErrors.firstName = "First name is required";
  if (!formData.lastName?.trim()) newErrors.lastName = "Last name is required";
  if (!formData.streetAddress?.trim()) newErrors.streetAddress = "Street address is required";
  if (!formData.city?.trim()) newErrors.city = "City is required";
  if (!selected) newErrors.state = "State is required";
  if (!formData.pincode?.trim()) newErrors.pincode = "Pincode is required";
  if (!formData.phone?.trim()) newErrors.phone = "Phone number is required";
  if (!formData.email?.trim()) newErrors.email = "Email is required";
  // ✅ Additional check: If user clicked "Ship to different address"
  if (shipToDifferentAddress) {
    if (!formData.firstNameShip?.trim()) newErrors.firstNameShip = "Shipping first name is required";
    if (!formData.lastNameShip?.trim()) newErrors.lastNameShip = "Shipping last name is required";
    if (!formData.streetAddressShip?.trim()) newErrors.streetAddressShip = "Shipping address is required";
    if (!formData.cityShip?.trim()) newErrors.cityShip = "Shipping city is required";
    if (!formData.pincodeShip?.trim()) newErrors.pincodeShip = "Shipping pincode is required";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: "" // ✅ ensures empty string, so conditional render hides message
  }));
};



  // options for selects
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ].map((s) => ({ value: s, label: s }));

  const [selected, setSelected] = useState(states.find((s) => s.value === "Tamil Nadu"));
  const [shipingSelected, setShipingSelected] = useState(states.find((s) => s.value === "Tamil Nadu"));
  const countryList = ["India"].map((s) => ({ value: s, label: s }));
  const [country, setCountry] = useState(countryList[0]);

   // Load data from localStorage on component mount
   const [addressSave, setAddressSave] = useState([])


const handleUpdateAddress = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("userToken");
  const userDataRaw = localStorage.getItem("userEmail");
  const userData = userDataRaw ? JSON.parse(userDataRaw) : null;

  // Use same structure as main form
  const addressData = {
    billing: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      companyName: formData.companyName,
      streetAddress: formData.streetAddress,
      apartment: formData.apartment,
      city: formData.city,
      state: selected?.value || "",
      pincode: formData.pincode,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    },
    shipping: shipToDifferentAddress
      ? {
          firstName: formData.firstNameShip,
          lastName: formData.lastNameShip,
          companyName: formData.companyNameShip,
          streetAddress: formData.streetAddressShip,
          apartment: formData.apartmentShip,
          city: formData.cityShip,
          state: shipingSelected?.value || "",
          pincode: formData.pincodeShip,
        }
      : {},
    shipToDifferentAddress,
  };

  try {
    if (token && userData?._id) {
      // Logged-in → save/update backend
      const res = await axios.post(
        `${BASE_URL}/api/users/${userData._id}/addresses`,
        addressData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Address updated!");
      setAddressSave(res.data || addressData);
      setShowForm(false)
    } else {
      // Guest → save locally
      localStorage.setItem("addressData", JSON.stringify(addressData));
      toast.success("Address updated!");
      setAddressSave(addressData);
      setShowForm(false)
    }
  } catch (err) {
    console.error("Failed to save address:", err);
    toast.error("Failed to save address");
  }
};



 

//coupon

    const token = userCoupon?.token || localStorage.getItem("userToken");
        const getSubtotal = () => {
    return pendingCart.reduce((total, item) => {
      const price = item.selectedPrice
        ? item.selectedPrice
        : item.prices;
      return total + price * item.quantity;
    }, 0);
  };
  


    const applyCoupon = async () => {
    if (!token) {
    setAppliedCoupon(null);
    setDiscountAmount(0);

    await Swal.fire({
      title: "Login Required",
      text: "Please login to apply coupon",
      icon: "warning",
      confirmButtonText: "OK",
    });
    return; // Stop function if no token
  }
      try {
        const cartTotal = getSubtotal();
        const res = await axios.post(`${BASE_URL}/api/coupon/validate`, { code: couponCode, cartTotal }, 
        { headers: { Authorization:` Bearer ${token}` } });
        // shows calculated discount but not persisted until redeem
           setAppliedCoupon(res.data.coupon);
        // setDiscountAmount(res.data.discount);
        // toast.success(Coupon valid — discount ₹${res.data.discount});
          await Swal.fire({
      title: "Coupon Valid ✅",
      text: `This coupon can be used only once. After applying, it will be expired. Your discount is ₹${res.data.discount}. Do you want to apply it?`,
      icon: "success",
      confirmButtonText: "OK",
    });
      } catch (err) {
        // toast.error(err.response?.data?.error || "Invalid coupon");
        setAppliedCoupon(null);
        setDiscountAmount(0);
         await Swal.fire({
      title: "Invalid Coupon ❌",
      text: err.response?.data?.error || "Invalid coupon",
      icon: "error",
      confirmButtonText: "OK",
    });
      }
    };
    
    // finalize coupon (persist redemption)
    const redeemCoupon = async () => {
      try {
        const cartTotal = getSubtotal();
        const res = await axios.post(`${BASE_URL}/api/coupon/redeem`, { code: couponCode, cartTotal }, 
          { headers: { Authorization:`Bearer ${token} ` } });
        setAppliedCoupon(res.data.coupon);
        setDiscountAmount(res.data.discount);
        setCouponCode("")
      await Swal.fire({
      title: "Coupon Applied ✅",
      text: `Saved ₹${res.data.discount}`,
      icon: "success",
      confirmButtonText: "OK",
    });
        } catch (err) {
        // toast.error(err.response?.data?.error || "Failed to apply coupon");
         await Swal.fire({
      title: "Failed ❌",
      text: err.response?.data?.error || "Failed to apply coupon",
      icon: "error",
      confirmButtonText: "OK",
    });
      }
    };   

    
    const validateGift = async () => {
  if (!giftCode) {
    Swal.fire({
      title: "Enter Gift Card Code",
      icon: "warning",
      confirmButtonText: "OK",
    });
    return;
  }

  try {
    const res = await axios.post(`${BASE_URL}/api/giftcard/validate`, { code: giftCode });
    setAppliedGift(res.data);

    // Show gift card balance info only
    Swal.fire({
      title: "Gift Card Valid 🎁",
      text:`This gift card can be used only once. After applying, it will be expired. Your gift card balance is ₹${res.data.balance}. Do you want to apply it?`,
      icon: "success",
      confirmButtonText: "OK",
    });
  } catch (err) {
    setAppliedGift(null);
    Swal.fire({
      title: "Error ❌",
      text: err.response?.data?.error || "Invalid gift card",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};

 const myOrderId = `ORD-${Date.now().toString().slice(-4)}`;
    const useGiftCard = async () => {
     if (!token) {
    await Swal.fire({
      title: "Login Required",
      text: "Please login to use a gift card",
      icon: "warning",
      confirmButtonText: "OK",
    });
    return; // Stop if no token
  }
      try {
        const cartTotal = getSubtotal() - discountAmount; // apply coupon first (if any)
        const desired = cartTotal; // you might allow partial amount instead
     const res = await axios.post(`${BASE_URL}/api/giftcard/redeem`, { code: giftCode, amount: desired, orderId: myOrderId }, 
        { headers: { Authorization: `Bearer ${token}` } });
        setGiftUsedAmount(res.data.usedAmount);
        setGiftCode("")

    await Swal.fire({
      title: "Gift Card Applied 🎉",
      text: `Used ₹${res.data.usedAmount} from gift card. Remaining ₹${res.data.remainingBalance}`,
      icon: "success",
      confirmButtonText: "OK",
    });        // if you want to persist coupon/gift usage to checkout flow, store this in context or localStorage
      } catch (err) {
        toast.error(err.response?.data?.error || "Failed to use gift card");
      }
    };

const [userData, setUserData] = useState(() => {
    const data = localStorage.getItem("userEmail");
    return data ? JSON.parse(data) : null;
  }); 

useEffect(() => {
  const fetchAddress = async () => {
    if (token && userData?._id) {
      // ✅ Logged-in user → fetch from backend
      try {
        const res = await axios.get(
          `${BASE_URL}/api/users/${userData._id}/addresses`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data) {
          setAddressSave(res.data);
          setFormData({
            firstName: res.data.billing?.firstName || "",
            lastName: res.data.billing?.lastName || "",
            companyName: res.data.billing?.companyName || "",
            streetAddress: res.data.billing?.streetAddress || "",
            apartment: res.data.billing?.apartment || "",
            city: res.data.billing?.city || "",
            state: res.data.billing?.state || "",
            pincode: res.data.billing?.pincode || "",
            phone: res.data.billing?.phone || "",
            email: res.data.billing?.email || "",
            message: res.data.billing?.message || "",
            firstNameShip: res.data.shipping?.firstName || "",
            lastNameShip: res.data.shipping?.lastName || "",
            companyNameShip: res.data.shipping?.companyName || "",
            streetAddressShip: res.data.shipping?.streetAddress || "",
            apartmentShip: res.data.shipping?.apartment || "",
            cityShip: res.data.shipping?.city || "",
            stateShip: res.data.shipping?.state || "",
            pincodeShip: res.data.shipping?.pincode || "",
          });

          if (res.data.billing?.state) {
            const selectedOption = states.find(
              (s) => s.value === res.data.billing.state
            );
            setSelected(selectedOption || null)
             const selectedOptionshipping = states.find(
              (s) => s.value === res.data.shipping.state
            );
            setShipingSelected(selectedOptionshipping || null);
            
          }

          setShipToDifferentAddress(!!res.data.shipToDifferentAddress);

          // ✅ Clear guest localStorage after login
          localStorage.removeItem("addressData");
        }
      } catch (err) {
        console.error("Failed to fetch address:", err);
      }
    } else {
      // ❌ Not logged in → fetch from localStorage (guest)
      const guestAddress = localStorage.getItem("addressData");
      if (guestAddress) {
        const data = JSON.parse(guestAddress);
        setAddressSave(data);
        setFormData({
          firstName: data.billing?.firstName || "",
          lastName: data.billing?.lastName || "",
          companyName: data.billing?.companyName || "",
          streetAddress: data.billing?.streetAddress || "",
          apartment: data.billing?.apartment || "",
          city: data.billing?.city || "",
          state: data.billing?.state || "",
          pincode: data.billing?.pincode || "",
          phone: data.billing?.phone || "",
          email: data.billing?.email || "",
          message: data.billing?.message || "",
          firstNameShip: data.shipping?.firstName || "",
          lastNameShip: data.shipping?.lastName || "",
          companyNameShip: data.shipping?.companyName || "",
          streetAddressShip: data.shipping?.streetAddress || "",
          apartmentShip: data.shipping?.apartment || "",
          cityShip: data.shipping?.city || "",
          stateShip: data.shipping?.stateShip || "",
          pincodeShip: data.shipping?.pincode || "",
        });
        setShipToDifferentAddress(!!data.shipToDifferentAddress);
      }
    }
  };
  fetchAddress();
}, [token, userData?._id]);




const handleSubmit = async (e) => {
  e.preventDefault();
    setLoading(true); // start loading

  if (!validate()) {
    console.log("Validation failed");
    setLoading(false)
    return;
  }

  const token = localStorage.getItem("userToken"); // JWT token
  const userData = JSON.parse(localStorage.getItem("userEmail"));

  const addressData = {
    billing: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      companyName: formData.companyName,
      streetAddress: formData.streetAddress,
      apartment: formData.apartment,
      city: formData.city,
      state: selected?.value || "",
      pincode: formData.pincode,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    },
    shipping: shipToDifferentAddress
      ? {
          firstName: formData.firstNameShip,
          lastName: formData.lastNameShip,
          companyName: formData.companyNameShip,
          streetAddress: formData.streetAddressShip,
          apartment: formData.apartmentShip,
          city: formData.cityShip,
          state: shipingSelected?.value || "",
          pincode: formData.pincodeShip,
        }
      : {},
    shipToDifferentAddress,
  };

  try {
    if (token && userData?._id) {
      // User is logged in → save to backend
      await axios.post(
        `${BASE_URL}/api/users/${userData._id}/addresses`,
        addressData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Address saved successfully!");
    } else {
      // User not logged in → save locally
      localStorage.setItem("addressData", JSON.stringify(addressData));
      toast.success("Address saved successfully!");
    }

    setAddressSave(addressData);
  } catch (err) {
    console.error(err);
    toast.error("Failed to save address");
  }
  finally {
    setLoading(false); // stop loading
  }
};



  const [user, setUser] = useState(null);
  const [redeemAmount, setRedeemAmount] = useState(0);
  const [redeemClicked, setRedeemClicked] = useState(false);


  const pointsNeededToRedeem = 10000;
  const redeemValue = 500;

    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${BASE_URL}/api/user/single`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        localStorage.setItem("userEmail", JSON.stringify(res.data));
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
      useEffect(() => {
    fetchUser();
  }, [token]);

  
  // Compute redeemable amount proportional to points
  useEffect(() => {
    if (!user) return;
    const pointsPerRupee = redeemValue / pointsNeededToRedeem;
    const amount = Math.floor(user.rewardPoints * pointsPerRupee);
    setRedeemAmount(amount);
  }, [user]);
    
  
  return (
   <CheckOutDetailsCreate.Provider value={{
couponCode,
setCouponCode,
appliedCoupon,
setAppliedCoupon,
giftCode,
setGiftCode,
appliedGift,
setAppliedGift,
discountAmount,
setDiscountAmount,
giftUsedAmount,
setGiftUsedAmount,
userCoupon,
setUserCoupon,
applyCoupon,
pendingCart,
setPendingCart,
getSubtotal,
redeemCoupon,
validateGift,
useGiftCard,
token,

showForm,
setShowForm,
formData,
setFormData,
handleChange,
addressSave,
setAddressSave,
handleSubmit,
selected,
setSelected,
countryList,
country,
setCountry,
states,
errors,
setErrors,
handleUpdateAddress,
shipToDifferentAddress,
setShipToDifferentAddress,
setUserData,
setShipingSelected,
shipingSelected,
validate,
loading,
setLoading,
    
         user,
        redeemAmount,
        redeemClicked,
        setRedeemClicked,
        pointsNeededToRedeem,
        setRedeemAmount
   }}>
    {children}
   </CheckOutDetailsCreate.Provider>
  )
}
