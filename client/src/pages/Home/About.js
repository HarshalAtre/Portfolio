import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux'

function About() {
    const {loading,portfolioData}=useSelector((state)=>state.root)
    const {about}=portfolioData
    const{lottieUrl,description1,description2,skills}=about
  return (
    <>
    <SectionTitle title="About"/>
    <div className='flex w-full items-center sm:flex-col '>

        <div className='h-[70vh] w-1/2 sm:w-full'>
       <dotlottie-player src={lottieUrl||""} background="transparent" speed="1"  loop autoplay></dotlottie-player>
        </div>
      <div className="flex flex-col gap-5 w-1/2 sm:w-full">
        <p className='text-white'>{description1||""}</p>
        <p className='text-white'>{description2||""}</p>
      </div>
   
    
    </div>
    <div className='py-5 '>
        <h1 className='text-tertiary text-xl'>
            Here are few technologies I've been working with recently:
        </h1>
        <div className='flex flex-wrap gap-10 mt-5'>
        {skills.map((skill, index) => (
  <div className='border border-tertiary py-3 px-5' key={index}>
    <h1 className='text-tertiary'>{skill}</h1>
  </div>
))}
        </div>
    </div>
    </>
  )
}

export default About