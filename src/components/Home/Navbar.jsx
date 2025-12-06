import React, { useContext, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from '../../assets/images/logo.png'
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import User from '../../assets/icons/user.svg'
import Heart1 from '../../assets/icons/heart.svg'
import Cart from '../../assets/icons/shopping-cart.svg'
import Search from '../../assets/icons/magnifying-glass.svg'
import { Heart, SignOut } from 'phosphor-react'
import Login from "@/components/Login/Login";
import { CartContext } from "@/context/CartContext";
import toast from "react-hot-toast";
import { ProductListCreate } from "@/context/ClientContext";
import { mainContext } from "@/context/HomeContext";


function NavBar() {
  const { showLogin, setShowLogin, clearWishlistState } = useContext(CartContext)
  const { cartItems } = useContext(ProductListCreate)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const { productData } = useContext(mainContext);

  const navigate = useNavigate()
  const location = useLocation();
  const isActive = location.pathname === "/wishlist";


  const menus = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "About Us", link: "/about" },
    { name: "Contact Us", link: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const loggedin = false
  const user = JSON.parse(localStorage.getItem("userEmail"));
  const token = localStorage.getItem("userToken");
  const loggedIn = !!user;

  const logoutUser = () => {
    if (token && user) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userEmail");
      clearWishlistState();  // 🔥 IMPORTANT FIX
      toast.success("Logged out successfully!");
      navigate("/");
    } else {
      navigate("/");
    }
  };


  useEffect(() => {
    setUserMenuOpen(false);
  }, [location.pathname]);

  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts([]);
      return;
    }

    const results = productData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(results);
  }, [searchTerm, productData]);


  return (
    <>
      <nav className="bg-white shadow-lg w-full fixed top-0 backdrop-blur-sm  z-50 ">
        {/* Desktop & Mobile Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="shrink-0">
              <Link to={"/"} className="flex items-center">
                <img
                  src={Logo}
                  alt="Mirakle"
                  className="w-24 h-auto"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {menus.map((menu, id) => (
                <NavLink
                  key={id}
                  to={menu.link}
                  className={({ isActive }) => isActive
                    ? "text-danger font-bold "
                    : "text-black font-medium "
                  }
                >
                  <p className='hover:text-red-600'>{menu.name}</p>
                </NavLink>
              ))}
            </div>

            {/* Desktop Search & Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center border border-black rounded-full overflow-hidden">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearchTerm(value);

                      if (value.trim() === "") setShowSearch(false);
                      else setShowSearch(true);
                    }}
                    className="w-48 lg:w-64 h-10 px-4 text-sm text-gray-700 focus:outline-none"
                    placeholder="Search for products..."
                  />
                  <button
                    onClick={() => {
                      handleSearch();
                      setShowSearch(true);
                    }}
                    className="px-4 h-10 hover:bg-gray-100 transition-colors"
                  >
                    <img src={Search} alt="search" className="w-5 h-5 text-gray-800" />
                  </button>
                </div>
                {/* OVERLAY */}
                {showSearch && (
                  <div
                    className="fixed inset-0 from-purple-50 via-white to-pink-50/70 z-50 flex justify-center items-start pt-24 animate-fadeIn" style={{ height: "100vh" }}
                    onClick={() => {
                      setSearchTerm("");
                      setShowSearch(false);
                    }}

                  >
                    {/* POPUP CARD */}
                    <div
                      className="w-11/12 md:w-2/3 lg:w-1/2 rounded-2xl p-6 bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.1)] animate-zoomIn relative border border-gray-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* CLOSE BUTTON */}
                      <button
                        className="absolute right-4 top-2 text-gray-500 text-xl hover:text-gray-800 transition"
                        onClick={() => {
                          setSearchTerm("");
                          setShowSearch(false);
                        }}
                      >
                        ✕
                      </button>

                      {/* RESULTS LIST */}
                      <div className="max-h-80 overflow-y-auto custom-scroll space-y-2">
                        {(searchTerm ? filteredProducts : productData)?.map((p) => (
                          <Link
                            to={`/products/${p.productName.replace(/\s+/g, "-").toLowerCase()}/${p.title.replace(/\s+/g, "-").toLowerCase()}/${p._id}`}
                            key={p._id}
                            className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:shadow-md hover:border-purple-300 transition cursor-pointer bg-white"
                            onClick={() => setShowSearch(false)}
                          >
                            <img
                              src={p.images?.[0]}
                              className="w-14 h-14 object-cover rounded-lg shadow-sm border"
                            />

                            <div>
                              <p className="text-sm font-semibold text-gray-800">{p.title}</p>
                              <p className="text-xs text-gray-500">{p.productName}</p>
                            </div>
                          </Link>
                        ))}

                        {/* NO RESULT */}
                        {searchTerm && filteredProducts.length === 0 && (
                          <p className="text-center py-5 text-gray-600 text-sm">
                            No matching products found
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

              </div>

              <div className="flex items-center justify-center gap-3">
                {loggedIn && (
                  <>
                    <Link to="/wishlist">
                      <button className="text-black">
                        {isActive
                          ? <Heart size={24} color="#eb0000" weight="fill" className="transition-transform" />
                          : <Heart size={24} color="#030303" className="transition-transform" />}
                      </button>
                    </Link>

                    <Link to="/cart">
                      <button className="text-black hover:text-green-100 transition-colors relative">
                        <img src={Cart} alt="cart" className="w-6 h-6" />
                        {cartItems.length > 0 &&
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                            {cartItems.length}
                          </span>}
                      </button>
                    </Link>
                  </>
                )}


                <div className="relative" ref={userMenuRef}>
                  {loggedIn ? (
                    <>
                      {/* USER BUTTON */}
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="text-black hover:text-green-100 transition-colors flex flex-col items-center"
                      >
                        <img src={User} alt="user" className="w-6 h-6" />
                      </button>

                      {/* DROPDOWN */}
                      {userMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50" onClick={(e) => e.stopPropagation()} >
                          <p className="px-4 py-2 text-sm text-gray-800 border-b ">
                            Hi,{" "}
                            {user?.firstName
                              ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()
                              : ""}

                            {user?.lastName
                              ? " " + (user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase())
                              : ""}
                          </p>
                          <button
                            onClick={() => navigate("/account")}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            Account
                          </button>

                          <button
                            className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                            onClick={logoutUser}
                          >
                            Logout <SignOut />
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => setShowLogin(true)}
                      className="text-black hover:text-green-100 transition-colors flex flex-col items-center"
                    >
                      <img src={User} alt="user" className="w-6 h-6" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Icons & Menu Button */}
            <div className="flex md:hidden items-center gap-3">

              {loggedIn && (
                <Link to="/cart">
                  <button className="text-black hover:text-green-100 transition-colors relative">
                    <img src={Cart} alt="cart" className="w-6 h-6" />

                    {cartItems.length > 0 &&
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                        {cartItems.length}
                      </span>}
                  </button>
                </Link>
              )}
              <div className="relative" ref={userMenuRef}>
                {loggedIn ? (
                  <>
                    {/* USER BUTTON */}
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="text-black hover:text-green-100 transition-colors flex flex-col items-center"
                    >
                      <img src={User} alt="user" className="w-6 h-6" />
                    </button>

                    {/* DROPDOWN */}
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2 z-50">
                        <p className="px-4 py-2 text-sm text-gray-700 border-b">
                          Hi,{" "}
                          {user?.firstName
                            ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()
                            : ""}

                          {user?.lastName
                            ? " " + (user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase())
                            : ""}
                        </p>


                        <button
                          onClick={() => navigate("/account")}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Account
                        </button>

                        <button
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                          onClick={logoutUser}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => setShowLogin(true)}
                    className="text-black hover:text-green-100 transition-colors flex flex-col items-center"
                  >
                    <img src={User} alt="user" className="w-6 h-6" />
                  </button>
                )}
              </div>

              <button
                onClick={toggleMobileMenu}
                className="text-black hover:text-green-100 transition-colors p-1"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-96" : "max-h-0"
            }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-3 bg-white">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="flex items-center bg-gray-200 rounded-full overflow-hidden">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);

                    if (value.trim() === "") setShowSearch(false);
                    else setShowSearch(true);
                  }}
                  className="w-full h-10 px-4 text-sm text-gray-500 focus:outline-none"
                  placeholder="Search for products..."
                />
                <button
                  onClick={() => {
                    handleSearch();
                    setShowSearch(true);
                  }}
                  className="px-4 h-10 hover:bg-gray-100 transition-colors"
                >
                  <img src={Search} alt="search" className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              {/* OVERLAY */}
              {showSearch && (
                <div
                  className="fixed inset-0 from-purple-50 via-white to-pink-50/70 z-50 flex justify-center items-start pt-32 animate-fadeIn" style={{ height: "100vh" }}
                  onClick={() => {
                    setSearchTerm("");
                    setShowSearch(false);
                  }}

                >
                  {/* POPUP CARD */}
                  <div
                    className="w-11/12 md:w-2/3 lg:w-1/2 rounded-2xl p-6 bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.1)] animate-zoomIn relative border border-gray-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* CLOSE BUTTON */}
                    <button
                      className="absolute right-4 top-2 text-gray-500 text-xl hover:text-gray-800 transition"
                      onClick={() => {
                        setSearchTerm("");
                        setShowSearch(false);
                      }}
                    >
                      ✕
                    </button>

                    {/* RESULTS LIST */}
                    <div className="max-h-80 overflow-y-auto custom-scroll space-y-2">
                      {(searchTerm ? filteredProducts : productData)?.map((p) => (
                        <Link
                          to={`/products/${p.productName.replace(/\s+/g, "-").toLowerCase()}/${p.title.replace(/\s+/g, "-").toLowerCase()}/${p._id}`}
                          key={p._id}
                          className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:shadow-md hover:border-purple-300 transition cursor-pointer bg-white"
                          onClick={() => setShowSearch(false)}
                        >
                          <img
                            src={p.images?.[0]}
                            className="w-14 h-14 object-cover rounded-lg shadow-sm border"
                          />

                          <div>
                            <p className="text-sm font-semibold text-gray-800">{p.title}</p>
                            <p className="text-xs text-gray-500">{p.productName}</p>
                          </div>
                        </Link>
                      ))}

                      {/* NO RESULT */}
                      {searchTerm && filteredProducts.length === 0 && (
                        <p className="text-center py-5 text-gray-600 text-sm">
                          No matching products found
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Mobile Menu Links */}
            {menus.map((menu, id) => (
              <a
                key={id}
                href={menu.link}
                onClick={closeMobileMenu}
                className="block text-black text-decoration-none hover:text-green-100 hover:bg-green-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <p className="mb-0">{menu.name}</p>
              </a>
            ))}

            {/* Mobile Bottom Icons */}
            <div className="flex items-center justify-around pt-4 border-t border-black">
              {loggedIn &&
                <Link to="/wishlist"  >
                  <button
                    className="text-black 
                 hover:text-green-100 transition-colors flex  items-center gap-2">
                    <img src={Heart1} alt="heart" className="w-6 h-6" />
                    <p className="">Wishlist</p>
                  </button>
                </Link>
              }
            </div>
          </div>
        </div>
      </nav>

      {showLogin &&
        <div className="fixed inset-0 z-50">
          <Login close={() => setShowLogin(false)} />
        </div>
      }


    </>

  );
}

export default NavBar;