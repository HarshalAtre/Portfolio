import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux'

function Contact() {
  const {portfolioData}=useSelector((state)=>state.root)
    const {contact}=portfolioData
    
  return (
    <div className='text-white'>
        <SectionTitle title="Say Hello ... "/>
        <div className="flex text-tertiary sm:flex-col-reverse items-center justify-center">
            <div className=" text-white flex flex-col gap-1">
            <h1>{"{"}</h1>
            {Object.keys(contact).map((key, index) => (
    key!=="_id"&&(
    <h1 key={index} className=' text-white ml-5'>
        <span>{key} :</span>
        <span>{contact[key]}</span>
    </h1>)
))}
            <h1>{"}"}</h1>
            </div>
            <div className='h-[500px]'>
    <dotlottie-player src="https://lottie.host/5a8dc997-a8d1-4fc8-a16e-4214690391c6/XUvIytg29b.json" background="transparent" speed="1" loop autoplay></dotlottie-player>
            </div>
        </div>
    </div>
  )
}

export default Contact