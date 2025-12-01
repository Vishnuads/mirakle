// src/pages/clientcontext/ClientContext.jsx
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import BASE_URL from "../Api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
// eslint-disable-next-line react-refresh/only-export-components
export const ProductListCreate = createContext();

export default function ClientContext({ children }) {
  const [productData, setProductData] = useState([]);
  const[videocommerce,setVideoCommerce] = useState([])
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [selectedNetQty, setSelectedNetQty] = useState(""); 
  const[loading,setLoading]=useState(false)
  const [signup, setSignup] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [overlayVisiable, setOverlayVisiable] = useState(false);


  const hideOverlay = () => {
    setOverlayVisiable(false);
  }

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      setProductData(res.data.data || []);
      setFilteredProducts(res.data.data);      
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

   const fetchVideoProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products/video-commerce`);
      setVideoCommerce(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchVideoProducts();
  }, []);

  // Merge DB cart with local cart
  const mergeCarts = (dbCart, localCart) => {
    const merged = [...dbCart];
    localCart.forEach(localItem => {
      const index = merged.findIndex(dbItem => dbItem._id === localItem._id);
      if (index > -1) {
        merged[index].quantity = Math.max(merged[index].quantity, localItem.quantity);
      } else {
        merged.push(localItem);
      }
    });
    return merged;
  };



  
  // Load user cart
  const userProduct = async () => {
    const token = localStorage.getItem("userToken");
    const emailStored = localStorage.getItem("userEmail");
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];

    if (token && emailStored) {
      setUser({ token, email: JSON.parse(emailStored) });
      try {
        const res = await axios.get(`${BASE_URL}/api/user/cart`, { headers: { Authorization: `Bearer ${token}` } });
        const dbCart = res.data || [];
        if (localCart.length > 0) {
          const mergedCart = mergeCarts(dbCart, localCart);
          await axios.post(`${BASE_URL}/api/user/cart`, { cartItems: mergedCart, replace: true }, { headers: { Authorization: `Bearer ${token}` } });
          localStorage.removeItem("cart");
          setCartItems(mergedCart);
        } else {
          
          setCartItems(dbCart);
        }
      } catch (err) {
        console.error("Error loading DB cart:", err);
      }
    } else {
      setCartItems(localCart);
    }
  };


 


  useEffect(() => {
    userProduct();
  }, []);




  // Add to Cart
const addToCart = async (product, qty = 1) => {
  setLastAddedProduct(product.title);

  // required: selectedNetQty must come from context or parent component
  const selectedQty = selectedNetQty?.qty ?? (product.netQuantity?.[0] ?? null);
  const selectedPrice = selectedNetQty?.price ?? (product.prices?.[0] ?? null);


  const cartItem = {
    _id: product._id,
    title: product.title,
    productName:product.productName,
    images: product.images || [],
    netQuantity: selectedQty,       // string, e.g. "100ml"
    prices: selectedPrice,// array with numeric price
    quantity: Number(qty),
  };

  // update local UI state
  setCartItems(prevCart => {
    const updatedCart = [...prevCart];
    const index = updatedCart.findIndex(
      item => item._id === cartItem._id && item.netQuantity === cartItem.netQuantity
    );
    if (index > -1) {
      updatedCart[index].quantity = (updatedCart[index].quantity || 0) + cartItem.quantity;
    } else {
      updatedCart.push(cartItem);
    }
    if (!user?.token) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    return updatedCart;
  });

  // sync to backend: POST the EXACT cartItem (not the full product)
  if (user?.token) {
    try {
      await axios.post(
        `${BASE_URL}/api/user/cart`,
        { cartItems: [cartItem], replace: false },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      //  userProduct();
    setOverlayVisiable(true);
    } catch (err) {
      console.error("Failed to sync cart with DB:", err.response?.data || err.message);
      toast.error("Could not sync cart to server");
    }
  }
  toast.success("Item added to cart");
};



const addToCartSampleProduct = async (product) => {
  setLastAddedProduct(product.title);

  const selectedQty = selectedNetQty?.qty ?? product.netQuantity?.[0] ?? null;
  const selectedPrice = selectedNetQty?.price ?? product.prices?.[0] ?? 0;

  const cartItem = {
    _id: product._id.toString(),
    title: product.title,
    images: product.images || [],
    netQuantity: selectedQty,
    prices: selectedPrice,
    quantity: 1, // ✅ Always 1 for sample products
    productName: product.productName,
  };

  setCartItems(prevCart => {
    const updatedCart = [...prevCart];

    // Filter only sample products
    const sampleCartItems = updatedCart.filter(
      item => item.productName?.toLowerCase() === "sample products"
    );

    // Check if this product already exists in cart
    const index = updatedCart.findIndex(
      item => item._id === cartItem._id && item.netQuantity === cartItem.netQuantity
    );

    // ❌ Block if trying to add more than 3 different sample products
    if (index === -1 && sampleCartItems.length >= 3) {
      Swal.fire({
        title: "⚠️ Limit Reached!",
        html: `You can only add <b>3 different sample products</b> to your cart.`,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ff4d6d",
      });
      return updatedCart;
    }

    // ❌ Block duplicate sample product
    if (index > -1) {
      Swal.fire({
        title: "⚠️ Already Added!",
        html: `<b>${cartItem.title}</b> is already in your cart.<br>You can only add it once.`,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#ff4d6d",
      });
      return updatedCart;
    }

    // ✅ Add new sample product
    updatedCart.push(cartItem);

    // Sync to localStorage if not logged in
    if (!user?.token) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item added to cart");
    }

    // Sync to backend if logged in
    if (user?.token) {
    
      axios.post(
        `${BASE_URL}/api/user/cart`,
        { cartItems: [cartItem], replace: false },
        { headers: { Authorization: `Bearer ${user.token}` } }
      ).catch(err => {
        console.error("Failed to sync cart:", err.response?.data || err.message);
        toast.error("Could not sync cart to server");
      });
      toast.success("Item added to cart");
    }

    return updatedCart;
  });

  
};


const addToWishlists = async (product, qty = 1) => {
  setLastAddedProduct(product.title);

  // Determine the variant being added
  const selectedQty = product.netQuantity; // exact netQuantity from product/wishlist
  let selectedPrice;

  // If product has variants array with price info
  if (product.variants) {
    const variant = product.variants.find(v => v.netQuantity === selectedQty);
    selectedPrice = variant?.price;
  } else {
    // fallback: if product has a single price
    selectedPrice = product.prices || product.price;
  }

  if (!selectedPrice) {
    return toast.error("Price not found for this variant");
  }

  const cartItem = {
    _id: product._id.toString(),
    title: product.title,
    images: product.images || [],
    netQuantity: selectedQty,
    prices: selectedPrice,
    quantity: Number(qty),
  };

  // Update local cart
  setCartItems(prevCart => {
    const updatedCart = [...prevCart];
    const index = updatedCart.findIndex(
      item => item._id === cartItem._id && item.netQuantity === cartItem.netQuantity
    );

    if (index > -1) {
      updatedCart[index].quantity += cartItem.quantity;
    } else {
      updatedCart.push(cartItem);
    }

    if (!user?.token) localStorage.setItem("cart", JSON.stringify(updatedCart));
    return updatedCart;
  });

  // Sync to backend
  if (user?.token) {
    try {
      await axios.post(
        `${BASE_URL}/api/user/cart`,
        { cartItems: [cartItem], replace: false },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
    } catch (err) {
      console.error("Failed to sync cart with DB:", err.response?.data || err.message);
      toast.error("Could not sync cart to server");
    }
  }

  toast.success("Item added to cart");
};




// addMultipleToCart.js
 const videocommerceAddToCart = async ({
  productsToAdd,
  setCartItems,
  user,
  BASE_URL,
  onComplete
}) => {
  // build the cartItems array for backend + local state
  const cartItems = productsToAdd.map(({ product, qty, selectedNetQty }) => ({
    _id: product._id.toString(),
    title: product.title,
    images: product.images || [],
    netQuantity: selectedNetQty?.qty ?? (product.netQuantity?.[0] ?? null),
    prices: selectedNetQty?.price ?? (product.prices?.[0] ?? null),
    quantity: Number(qty),
  }));

  // update local state immediately
  setCartItems(prev => {
    let updated = [...prev];
    cartItems.forEach(cartItem => {
      const idx = updated.findIndex(
        item => item._id === cartItem._id && item.netQuantity === cartItem.netQuantity
      );
      if (idx > -1) {
        updated[idx].quantity += cartItem.quantity;
      } else {
        updated.push(cartItem);
      }
    });
    if (!user?.token) {
      localStorage.setItem("cart", JSON.stringify(updated));
    }
    return updated;
  });

  
  // send once to backend
  if (user?.token) {
    try {
      await axios.post(
        `${BASE_URL}/api/user/cart`,
        { cartItems, replace: false },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      // userProduct()
    } catch (err) {
      console.error("Failed to sync cart with DB:", err.response?.data || err.message);
      toast.error("Could not sync cart to server");
    }
  }
 if (onComplete) {
    onComplete(); // call after updating cart
  }
  toast.success("Items added to cart");
};


 const removeFromCart = async (_id, netQuantity) => {
  try {
    if (user?.token) {
      await axios.delete(`${BASE_URL}/api/user/cart/${_id}/${netQuantity}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
    }
    const updatedCart = cartItems.filter(
      item => !(item._id === _id && item.netQuantity === netQuantity)
    );
    setCartItems(updatedCart);
    toast.success("Item removed from cart");
  } catch (err) {
    console.error(err);
    toast.error("Failed to remove item");
  }
};


  const handleChange = e => {
    const { name, value } = e.target;
    setSignup(prev => ({ ...prev, [name]: value }));
 setErrors((prev) => ({
    ...prev,
    [name]: "", // clear specific field error only
  }));  };




  

  return (
    <ProductListCreate.Provider
      value={{
        productData,
        cartItems,
        setCartItems,
        user,
        setUser,
        signup,
        setSignup,
        handleChange,
        email,
        setEmail,
        password,
        setPassword,
        error,
        setError,
        accepted,
        setAccepted,
        addToCart,
        removeFromCart,
        lastAddedProduct,
        userProduct,
        filteredProducts,
        setFilteredProducts,
        showWarning,
        setShowWarning,
        setSelectedNetQty,
        selectedNetQty,
        addToWishlists,
        videocommerce,
        videocommerceAddToCart,
        addToCartSampleProduct,
        loading,
        setLoading,
        errors,
        setErrors,
        overlayVisiable,
        hideOverlay
      }}
    >
      {children}
    </ProductListCreate.Provider>
  );
}
