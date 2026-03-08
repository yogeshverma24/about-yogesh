import React from 'react'
import assets from '../assets/assets'
import Title from './Title'
import ServicesCard from './ServicesCard'
import { motion } from "framer-motion";

const Services = () => {

    const servicesData = [
        {
            title: 'We Design',
            description: 'We create responsive, user-focused digital experiences that combine visual appeal with functionality to strengthen your brand and drive measurable growth.',
            icon: assets.ads_icon
        },
        {
            title: 'We Plan',
            description: 'We develop strategic roadmaps aligned with your business goals, identifying the right tools and creative strategies to ensure long-term success.',
            icon: assets.marketing_icon
        },
        {
            title: 'We Analyze',
            description: 'Through analytics, reporting, and data-driven insights, we optimize performance and help your business stay ahead in an evolving digital landscape.',
            icon: assets.content_icon
        },
        {
            title: 'We Promote',
            description: 'We blend creativity and technology to amplify your brand presence through digital campaigns, social engagement, and strategic market positioning.',
            icon: assets.social_icon
        }
    ]

  return (
    <motion.div 
    initial="hidden"
    whileInView="visible"
    viewport={{once: true}}
    transition={{staggerChildren: 0.2}}
    
    id='services' className='relative  flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white'>
      <img src={assets.bgImage2} alt="" className='absolute -top-110 -left-70 z-1 dark:hidden' />

      <div className="z-10">
        <Title 
          title='What We Do' 
          desc='From strategy to execution, we deliver integrated digital solutions that elevate brands and accelerate business growth.' 
        />
      </div>
      <div className="flex flex-col md:grid grid-cols-2">
        {servicesData.map((service, index)=>(
            <ServicesCard key={index} service={service} index={index}/>
        ))}
      </div>
    </motion.div>
  )
}

export default Services
