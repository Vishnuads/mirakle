import React, { useContext, useEffect, useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { ProductListCreate } from '@/context/ClientContext';
import { CheckOutDetailsCreate } from '@/context/CheckoutContext';
import BASE_URL from '@/Api';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CartContext } from '@/context/CartContext';
import '../../components/Home/Style.css'
import { Heart } from 'phosphor-react';
import { Checkbox } from "@/components/ui/checkbox"

const CartCard = () => {
  const { cartItems, setCartItems, user, removeFromCart } = useContext(ProductListCreate);
  const { pendingCart, setPendingCart, setLoading } = useContext(CheckOutDetailsCreate);
  const { wishlistItems, handleWishlist, likedItems, fetchWishlist, handleWishlistt, handleWishlisttt } = useContext(CartContext)
  const [selectedItems, setSelectedItems] = useState([]);

  // ✅ Handle select/unselect individual cart item
  const handleSelectItem = (_id, netQuantity) => {
    const key = `${_id}-${netQuantity}`;
    setSelectedItems((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key]
    );
  };

  // ✅ Select all items
  const handleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => `${item._id}-${item.netQuantity}`));
    }
  };

  // ✅ Delete selected items (bulk delete)
  const handleDeleteSelected = async () => {
    if (!selectedItems.length) return toast.error("No items selected");

    setLoading(true);
    try {
      const updatedCart = cartItems.filter(
        (item) => !selectedItems.includes(`${item._id}-${item.netQuantity}`)
      );
      setCartItems(updatedCart);
      setPendingCart(updatedCart);

      if (user?.token) {
        await axios.put(`${BASE_URL}/api/user/cart`, { cartItems: updatedCart }, { headers: { Authorization: `Bearer ${user.token}` } });
      }
      setSelectedItems([]);
      toast.success("Selected items removed successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete selected items");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Change quantity
  const changeQuantity = (id, netQuantity, delta) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id && item.netQuantity === netQuantity
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updatedCart);
    setPendingCart(updatedCart);

    // Update DB if logged in
    if (user?.token) {
      axios.put(`${BASE_URL}/api/user/cart`, { cartItems: updatedCart }, { headers: { Authorization: `Bearer ${user.token}` } });
    }
  };

  // ✅ Sync pendingCart with cartItems
  useEffect(() => {
    setPendingCart(cartItems);
  }, [cartItems]);

  return (
    <>
      {/* Top bar: select all & delete selected */}
      <div className="flex items-center justify-between px-3 bg-white rounded-4 py-3 mb-3">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-5 h-5 checkbox"
            onChange={handleSelectAll}
            checked={selectedItems.length === cartItems.length && cartItems.length > 0}
          />
          <p className="mb-0">Select All</p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-5 bg-red-100 text-red-600 cursor-pointer"
          onClick={handleDeleteSelected}
        >
          <Trash2 size={20} />
          <p className="mb-0">Delete Selected</p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="border-gray-200 rounded-xl lg:p-3 p-3 bg-white hover:shadow-lg transition-shadow mb-3">
        {cartItems.map((item) => {
          const key = `${item._id}-${item.netQuantity}`;
          return (
            <div key={key} className="flex gap-3 border-b py-4">
              {/* Checkbox + Image */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="w-5 h-5 checkbox"
                  checked={selectedItems.includes(key)}
                  onChange={() => handleSelectItem(item._id, item.netQuantity)}
                />
                <img src={item.images?.[0]}
                  alt={item.title}
                  loading='lazy'
                  className="md:w-32 w-24 h-24 object-cover rounded-lg" />
              </div>

              {/* Product Details */}
              <div className="flex-1 md:mx-4 ">
                <div className="flex items-center justify-between">
                  <div className="mb-2">
                    <p className="inline-block mb-0 w-fit px-2 py-[2px] text-xs border-[1px] border-[#56750A] text-[#56750A] rounded-3">
                      {item.netQuantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">

                    <button
                      className={` p-2 border hover:bg-gray-100 rounded-5 ${likedItems[item.productId || item._id] ? "active" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleWishlisttt(item);
                      }}
                    >
                      {likedItems[item.productId || item._id]
                        ? <Heart className="md:w-4 md:h-4 w-3 h-3 text-red-500 " color='#ff0000' weight="fill" />
                        : <Heart className="md:w-4 md:h-4 w-3 h-3 text-gray-900" />}

                    </button>
                    <button
                      onClick={() => removeFromCart(item._id, item.netQuantity)}
                      className="p-2 border hover:bg-gray-100 rounded-5 transition-colors"
                    >
                      <Trash2 className="md:w-4 md:h-4 w-3 h-3 text-gray-900" />
                    </button>


                  </div>
                </div>
                <p className="md:text-xl text-sm font-semibold text-black line-clamp-2 mb-2">{item.title}</p>

                {/* Quantity + Price */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center overflow-hidden border border-gray-300 rounded-5 bg-white">
                    <button
                      onClick={() => changeQuantity(item._id, item.netQuantity, -1)}
                      className="md:w-10 md:h-8 w-8 h-5 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors border-r"
                    >
                      <Minus className="w-4 md:w-5 md:h-5 h-4 text-gray-600" />
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="md:w-14 md:h-8 w-10 h-6 text-center text-lg font-semibold text-gray-800 bg-white outline-none"
                    />
                    <button
                      onClick={() => changeQuantity(item._id, item.netQuantity, 1)}
                      className="md:w-10 md:h-8 w-8 h-5 flex border-gray-300 items-center justify-center hover:bg-gray-50 transition-colors border-l"
                    >
                      <Plus className="w-4 md:w-5 md:h-5 text-gray-600" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="md:text-2xl text-lg font-bold text-[#56750A] mb-0">
                      ₹{item.quantity * (Array.isArray(item.prices) ? item.prices[0] : item.prices)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CartCard;
