import React, { useEffect, useState } from 'react'
import BASE_URL from '@/Api'
import axios from 'axios'

const SectionBanner = ({title}) => {
      const[coverImage,setCoverImage] = useState([])
      const fetchcoverImage = async () => {
      try{
       const response = await axios.get(`${BASE_URL}/api/combodeal/banner`)
       setCoverImage(response.data)       
      }catch(error){
        console.log('fetching error',error);
      }
    }

    useEffect(() => {
    fetchcoverImage()
    },[])

  return (
    <>
      <section className='relative'>
        <div className='relative md:mt-20  mt-16 '>
            <div className="absolute inset-0 bg-black/60"></div>
            {coverImage.map((item,index) => {
              return(
                <div key={index}>
                 <img src={item.combodealsimg} alt="Section banner"  className='md:h-[200px] h-[100px] object-cover w-full'/>
                </div>
              )
            })}
            <div className="absolute top-1/2 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2 text-white">
            <h1>{title}</h1>
            <p className='text-xs md:text-md w-full mb-0'>The Essence of Good Food, Born from Nature & Science</p>
            </div>
        </div>
      </section>
    </>
  )
}

export default SectionBanner
