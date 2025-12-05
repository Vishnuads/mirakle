import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'swiper/css';
import ProductPage from './pages/ProductPage';
import ScrollToTop from './pages/ScrollTop';
import Shop from './pages/Shop';
import Login from './components/Login/Login';
import Cart from './pages/Cart';
import Address from './components/Cart/Address';
import Account from './pages/Account';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import WishList from './pages/WishList';
import AddToCart from './components/Cart/AddToCart';
import ChangePassword from './components/Login/ChangePassword';
import { Toaster } from 'react-hot-toast';
import Producted from './pages/Producted';
import TC from './pages/TC';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import Shipping from './pages/Shipping';

function AppLayout() {

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/cart' element={<Producted><Cart /></Producted>} />
        <Route path='/cart/address' element={<Address />} />
        <Route path='/products/:name/:title/:id' element={<ProductPage />} />
        <Route path='/account' element={<Producted><Account /> </Producted>} />
        {/* <Route path='/login' element={ <Login/> } /> */}
        <Route path='/contact' element={<Contact />} />
        <Route path='/wishlist' element={<Producted><WishList /></Producted>} />
        <Route path='/change/:token' element={<ChangePassword />} />
        <Route path='/terms' element={<TC/>}/>
       <Route path='/privacy' element={ <PrivacyPolicy/> }/>
       <Route path='/refund' element={ <RefundPolicy/> }/>
       <Route path='/shipping' element={ <Shipping/> }/>
      </Routes>
      <AddToCart />
    </>
  )
}


export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}