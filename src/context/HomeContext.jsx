import BASE_URL from '@/Api';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const mainContext = createContext()

export default function HomeContext({ children }) {

  const [productData, setProductData] = useState([]);
  const [productCategory, setProductCategory] = useState([])
  const [imageSlider, setImageSlider] = useState([])
  const [exploreCollection, setExploreCollection] = useState([])
  const [loading, setLoading] = useState() 

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/products`);
      setProductData(res.data.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //   }, []);

  const categroryFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/categories`);
      setProductCategory(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }


  const imagesliderFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/offer/banner`);
      setImageSlider(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }


  const exploreCollectionFetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/explorecollection`);
      setExploreCollection(res.data.data);
    } catch (err) {
      console.error("Error fetching offers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    categroryFetch()
    fetchProducts()
    imagesliderFetch()
    exploreCollectionFetch()
  }, [])

  return (
    <mainContext.Provider value={{
      productData,
      loading,
      productCategory,
      imageSlider,
      exploreCollection
    }} >
      {children}
    </mainContext.Provider>
  )
}
