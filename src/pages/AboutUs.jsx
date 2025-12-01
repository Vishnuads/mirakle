import Footer from '@/components/Home/Footer'
import NavBar from '@/components/Home/Navbar'
import ProductBg from '@/components/Home/ProductBg'
import SectionBanner from '@/components/SectionBanner'
import React from 'react'
import Pic1 from '../assets/images/abt1.png'
import Mission from '../assets/images/mission.png'
import Approach from '../assets/images/Approach.png'
import Why from '../assets/images/why.png'
import A1 from '../assets/icons/1.png'
import A2 from '../assets/icons/2.png'
import A3 from '../assets/icons/3.png'
import A4 from '../assets/icons/4.png'
import Promise from '@/components/Home/Promise'

const AboutUs = () => {

  const Infos = [
    { img: A1, name: "Sourcing with care", desc: "From sun-ripened olives and fine herbs to fresh chillies and high-grade vinegars, we work with producers and growers who share our values of sustainability and quality." },
    { img: A2, name: "Craft & quality ", desc: "We believe great taste comes from both nature and precision. Each blend, bottle and batch is crafted under strict standards to deliver consistent flavour and texture. " },
    { img: A3, name: "Transparency & trust ", desc: "Every product carries full ingredient and nutritional information, so you can cook confidently and health-consciously. " },
    { img: A4, name: " Design-driven experience", desc: " From hero banners to product imagery, we maintain a refined, minimal aesthetic because your kitchen deserves more than just good food; it deserves beautiful food." }
  ]




  return (
    <>
      <NavBar />
      <SectionBanner title="About Us" />
      <section className='max-w-6xl mx-auto '>
        <div className="grid md:grid-cols-3 grid-cols-1  my-5 px-4">
          <div className="col-span-2  text-justify">
            <h1 className='mb-3'>Our Story</h1>
            <p>At Mirakle, we believe that everyday nutrition deserves extraordinary craftsmanship. What began as a bold vision, to bring naturally-rich, thoughtfully - sourced ingredients into your kitchen has grown into a collection of premium oils, sauces, vinegars and seasonings designed to elevate every meal.</p>
            <br />
            <p>At Mirakle, every product is a reflection of our belief that wellness begins with honesty and nature. From sourcing the finest olives and sun-kissed coconuts to ensuring each drop retains its natural essence, we’ve built a brand that blends tradition with modern purity. Our journey isn’t just about creating oils and essentials, it’s about inspiring healthier lifestyles and meaningful connections to what we consume. Every bottle we craft carries our promise of authenticity, sustainability, and the true miracle of nature.</p>

          </div>
          <div className='flex justify-center items-center p-3'>
            <img src={Pic1} alt="About" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1  my-5 px-4">
          <div className='flex justify-center items-center  p-3'>
            <img src={Mission} alt="Misson" />
          </div>
          <div className="col-span-2 md:text-end text-justify flex items-center">
            <div>
              <h1 className='mb-3'>Our Mission</h1>
              <p>We aim for more than just flavour-enhancement. Our mission is to deliver “good for you, good to eat” products that align with wellness, simplicity and authenticity. Inspired by pioneering work in liposomal delivery of nutrients by our parent group ABT Limited, Mirakle applies the same scientific rigour and purity to food ingredients as it once did to health-drinks. For example, Mirakle’s earlier formulation of a liposomal vitamin-C drink boasted 98% absorption rate. That culture of innovation continues in our kitchens.</p>
            </div>
          </div>
        </div>

        <div className='px-3'>
          <h1 className="text-center">Our Approach</h1>
          <img src={Approach} alt="Approach-img" className='' />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-3">
            {Infos.map((info, idx) => (
              <div key={idx} className='p-3 bg-gray-100 rounded-4'>
                <img src={info.img} alt={info.name} className='w-14 h-14 mb-2'/>
                <p className='font-bold mb-2 '>{info.name}</p>
                <p className='text-sm'>{info.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1  my-5 px-4">
          <div className="col-span-2  text-justify flex justify-center items-center">
            <div>
            <h1 className='mb-3'>Why Mirakle?</h1>
            <p>Because we understand that food isn’t just fuel, it’s culture, connection and emotion. With Mirakle in your pantry, you’re not simply seasoning a dish, you’re celebrating flavour and integrity. Our range brings together taste-rich tradition with modern wellness standards. Whether it’s a drizzle of olive oil at dinner, a dash of garlic powder for midday cooking or a splash of chilli vinegar to finish your plate Mirakle products are designed to become beloved staples in your home.</p>
          </div>
          </div>
          <div className=' p-3'>
            <img src={Why} alt="About" />
          </div>
        </div>

      </section>
      <Promise/>

      <ProductBg />
      <Footer />

    </>
  )
}

export default AboutUs
