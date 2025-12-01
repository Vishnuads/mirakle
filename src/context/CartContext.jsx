import BASE_URL from '@/Api';
import axios from 'axios';
import React, { useState, createContext, useEffect } from 'react'
import toast from 'react-hot-toast';

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [overlayVisiable, setOverlayVisiable] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favItems, setFavItems] = useState([]);


     const [showLogin, setShowLogin] = useState(false);
  const [likedItems, setLikedItems] = useState({});
const [wishlistItems, setWishlistItems] = useState([]);

const user = JSON.parse(localStorage.getItem("userEmail")); 
const token = localStorage.getItem("userToken");
 const [addresses, setAddresses] = useState([]);
 const [addressesUpdated, setAddressesUpdated] = useState(null);
  const [loading, setLoading] = useState(false);


  const addToCartSidebar = (item) => {
    setCartItems(prev => [...prev, { ...item, qty: 1  }]);
    setOverlayVisiable(true);
  }

  const toggleFav= (item, itemId)=>{
    setFavItems(prev =>{

      const existingIndex = prev.findIndex(favItem => favItem.id === itemId);
      // console.log("ex",existingIndex);

      if (existingIndex !== -1){
        return prev.filter((_,i)=> i !== existingIndex);
      }
      else{
       return [...prev, { ...item}]
      }
    });
  }

  const isFavorite = (itemId) => {
    return favItems.some(item => item.id === itemId);
    
  }
  // console.log(isFavorite)

  const hideOverlay = () => {
    setOverlayVisiable(false);
  }
  const removeAll = () => {
    setCartItems([]);
    // console.log("remveredws")
  }

  const removeProduct = (idx) => {
    setCartItems(prev => prev.filter((item, index) => index !== idx));
    // console.log("Removed item with id:", id);
    // console.log(item.id);
  }
  const updateQty = (index, qty) => {
    setCartItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, qty } : item
      )
    );
  };

  const total = cartItems.reduce((sum, item) => {
    const price = item.price || 0;
    const qnty = item.qty || 1;
    return sum + (price * qnty);
  }, 0)



  const toggleLike = (id) => {
  setLikedItems(prev => ({
    ...prev,
    [id]: !prev[id]
  }));
};





  const fetchWishlist = async () => {
       if (!token) {
      setWishlistItems([]);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/wishlist`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success && data.wishlist) {
        const liked = {};
        data.wishlist.items.forEach(item => {
          liked[item.productId] = true;
        });
        setLikedItems(liked);
       setWishlistItems(data.wishlist.items);
      }
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    }
  };

  
useEffect(() => {
  fetchWishlist();
}, [token]);


const handleWishlistt = async (product) => {
  if (!token) {
    setShowLogin(true);
    return;
  }
  try {
    if (likedItems[product.productId]) {
      const res = await fetch(`${BASE_URL}/api/wishlist/${product.productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Removed from wishlist");
        toggleLike(product.productId);
      } else {
        toast.error("Failed to remove from wishlist");
      }
    } else {
      // Not liked → add to wishlist
      const res = await fetch(`${BASE_URL}/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: [{
            productId: product._id,
            title: product.title,
            images: product.images,
            netQuantity: product.netQuantity?.[0] || "",
            prices: product.prices?.[0] || product.prices,
          }]
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Added to wishlist");
        toggleLike(product._id);
      } else {
        toast.error("Failed to add wishlist");
      }
    }
    fetchWishlist()
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }
};


const handleWishlist = async (product) => {
  if (!token) {
    setShowLogin(true);
    return;
  }
  try {
    if (likedItems[product._id]) {
      // Already liked → remove from wishlist
      const res = await fetch(`${BASE_URL}/api/wishlist/${product._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Removed from wishlist");
         fetchWishlist()
        toggleLike(product._id);
      } else {
        toast.error("Failed to remove from wishlist");
      }
    } else {
      // Not liked → add to wishlist
      const res = await fetch(`${BASE_URL}/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: [{
            productId: product._id,
            title: product.title,
            images: product.images,
            netQuantity: product.netQuantity?.[0] || "",
            prices: product.prices?.[0] || product.prices,
          }]
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Added to wishlist");
        toggleLike(product._id);
      } else {
        toast.error("Failed to add wishlist");
      }
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }
};

const handleWishlisttt = async (product) => {
  if (!token) {
    setShowLogin(true);
    return;
  }

  // 🟢 Always use consistent ID
  const id = product.productId || product._id;

  // 🟢 Use correct netQuantity
  const qty = product?.netQuantity;

  try {
    if (likedItems[id]) {
      // REMOVE
      const res = await fetch(`${BASE_URL}/api/wishlist/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Removed from wishlist");
        toggleLike(id);
      }
      return;
    }else{
          // ADD
    const res = await fetch(`${BASE_URL}/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: [
          {
            productId: id,
            title: product.title,
            images: product.images,
            netQuantity: qty,
           prices: product.prices?.[0] || product.prices,
          }
        ]
      }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Added to wishlist");
      toggleLike(id);
    }
    }


  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }
};

// const handleWishlisttt = async (product) => {
//   if (!token) {
//     setShowLogin(true);
//     return;
//   }

//   const id = product._id; // 🔥 ONE ID only

//   try {
//     if (likedItems[id]) {
//       // REMOVE
//       const res = await fetch(`${BASE_URL}/api/wishlist/${id}/${product.netQuantity || ""}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       if (data.success) {
//         toast.success("Removed");
//         toggleLike(id);
//       }
//     } else {
//       // ADD
//       const res = await fetch(`${BASE_URL}/api/wishlist`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           items: [{
//             productId: id,
//             title: product.title,
//             images: product.images,
//             netQuantity: product.netQuantity?.[0] || "",
//             prices: product.prices?.[0] || product.prices,
//           }]
//         }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         toast.success("Added");
//         toggleLike(id);
//       }
//     }

//     fetchWishlist();

//   } catch (err) {
//     console.error(err);
//     toast.error("Something went wrong");
//   }
// };



const clearWishlistState = () => {
  setLikedItems({});
};


    //address
    const addAddress = async (formData) => {
       setLoading(true)
    try {
      const res = await axios.post(
        `${BASE_URL}/api/address/add`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setAddresses(res.data.addresses); // update after add
      return { success: true };
    } catch (err) {
      console.error("Add Address Error:", err);
      return { success: false };
    }finally{
      setLoading(false)
    }
  };

  const getAddresses = async () => {
  try {
    setLoading(true);
    // Read token directly from localStorage
    const token = localStorage.getItem("userToken"); 
    if (!token) throw new Error("No token found");

    const res = await axios.get(`${BASE_URL}/api/address/list`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setAddresses(res.data); // array
  } catch (err) {
    console.error("Get Address Error:", err);
  } finally {
    setLoading(false);
  }
};

 useEffect(() => {
  if (token) {
    getAddresses();
  }
}, [token]);

  const editAddressUser = async (id) => {
    if(window.confirm('Are You Sure Edit')){
    const response = addresses.find((stud) => stud._id === id)
    setAddressesUpdated(response)
    }
  }

   const editAddress = async (addUpdate) => {
  setLoading(true);
  try {
   await axios.put(`${BASE_URL}/api/address/edit/${addUpdate._id}`, addUpdate, {
      headers: { Authorization: `Bearer ${token}` },
    });
   setAddressesUpdated(null)
   getAddresses()
  } catch (err) {
    console.error("Edit Address Error:", err);
  } finally {
    setLoading(false);
  }
};

const deleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) {
    return; // exit if user cancels
  }
  setLoading(true);
  try {
    const res = await axios.delete(`${BASE_URL}/api/address/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAddresses(res.data.addresses);
  } catch (err) {
    console.error("Delete Address Error:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <CartContext.Provider value={{ 
      total,removeAll,   updateQty, removeProduct, toggleFav, favItems, isFavorite,
       overlayVisiable,  cartItems, hideOverlay, 
      showLogin,
      setShowLogin,
      handleWishlist,
      likedItems,
      clearWishlistState,
      wishlistItems,
      fetchWishlist,
      handleWishlistt,
      handleWishlisttt,
      addAddress,
      addresses,
      loading,
      getAddresses,
      deleteAddress,
      editAddress,
      editAddressUser,
      addressesUpdated,
      setAddressesUpdated,
      addToCartSidebar
      }}>
      {children}
    </CartContext.Provider>

  )
}

