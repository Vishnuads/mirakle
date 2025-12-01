import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext';
import  HomeContext from './context/HomeContext';
import CheckoutContext from './context/CheckoutContext';
import ClientContext from './context/ClientContext';


createRoot(document.getElementById('root')).render(
 <ClientContext>
  <CheckoutContext>
  <HomeContext>
  <CartProvider>
    <App />
  </CartProvider>
  </HomeContext>
  </CheckoutContext>
  </ClientContext>
)
