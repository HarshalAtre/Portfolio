import React from 'react'
import SectionTitle from '../../components/SectionTitle'

function About() {
    const skills=["Javascript","React","Node","Express","MongoDB"]
  return (
    <>
    <SectionTitle title="About"/>
    <div className='flex w-full items-center sm:flex-col '>

        <div className='h-[70vh] w-1/2 sm:w-full'>
       <dotlottie-player src="https://lottie.host/85509418-d8e2-4054-a425-b6d601a58004/32hbbZbPeX.json" background="transparent" speed="1"  loop autoplay></dotlottie-player>
        </div>
      <div className="flex flex-col gap-5 w-1/2 sm:w-full">
        <p className='text-white'>Hello! My name is Harshal Atre. I enjoy creating things that live
on the internet. My interest in web development started  in 2022
when I decided to try editing custom Tumblr themes — turns out
hacking together a custom reblog button taught me a lot about HTML & CSS</p>
        <p className='text-white'>Fast-forward to today. and I've had the privilege of working at an
advertising agency, a start-up, a huge corporation, and a student-led
design studio. My maln focus these days is building accessible, inclusive
products and digital experiences at Upstatement for a variety of clients. I
also recently launched a course that covers everything you need to build
a web app with the Spotify API using Node & React.</p>
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