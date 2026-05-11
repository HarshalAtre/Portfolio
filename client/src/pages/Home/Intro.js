import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Eye from './Eye'
import { Link } from 'react-router-dom'

function Intro({enter,leave,cursorPosition}) {
  const {loading,portfolioData}=useSelector((state)=>state.root)
  const {intro}=portfolioData
  const{firstName,lastName,welcomeText,description,caption}=intro
  const [imageError, setImageError] = useState(false);
  const profileImage = process.env.REACT_APP_PROFILE_IMAGE || '/harshal-profile.jpg';

  return (<>
    <div className='min-h-[80vh] bg-primary grid grid-cols-12 items-center gap-8 py-10 sm:grid-cols-1'>
      <div className='col-span-8 sm:col-span-1 sm:order-2 flex flex-col items-start justify-center gap-8 min-w-0 pr-6 xl:pr-3 sm:pr-0'>
        <h1 className='text-white'>{welcomeText||""}</h1>
        <h1 onMouseEnter={enter} onMouseLeave={leave} className='text-[clamp(2.7rem,5.2vw,5rem)] text-secondary font-semibold leading-[1.05] whitespace-nowrap'>
          {firstName||""} {lastName||""}
        </h1>
        <div onMouseEnter={enter} onMouseLeave={leave} className='flex flex-row items-start gap-3 xl:gap-2 flex-nowrap w-full'>
          <h1 className='text-[clamp(1.9rem,3.1vw,3.3rem)] xl:text-[clamp(1.7rem,2.65vw,2.5rem)] text-white font-semibold whitespace-nowrap leading-[1.1]'>
            {caption||""}
          </h1>
          <Link to="/admin-login" className="cursor-none inline-flex items-start -mt-1">
            <Eye/>
          </Link>
        </div>
        <p className="text-white w-2/3 sm:w-full">{description||""}</p>
        <a href="https://drive.google.com/file/d/1dQsbdNGNStsAM7YcNjcPIP3_XVSTC0J4/view?usp=sharing" target="_blank" rel="noreferrer" download>
          <button className='border-2 border-tertiary text-white px-10 py-3 rounded cursor-none btn'>Download CV</button>
        </a>
      </div>

      <div className='col-span-4 sm:col-span-1 sm:order-1 flex items-center justify-center mb-10 lg:mb-6 sm:mb-0 sm:mt-2'>
        <div className='relative h-[340px] w-[340px] xl:h-[300px] xl:w-[300px] lg:h-[270px] lg:w-[270px] sm:h-[250px] sm:w-[250px]'>
          <div className='absolute inset-0 rounded-full bg-gradient-to-br from-tertiary/70 to-secondary/70 blur-2xl opacity-40' />
          <div className='absolute inset-0 rounded-full border-2 border-tertiary [box-shadow:0_0_30px_rgba(82,199,194,0.45)]' />

          {!imageError ? (
            <img
              src={profileImage}
              alt={`${firstName || 'Profile'} ${lastName || 'Photo'}`}
              className='relative z-10 h-full w-full rounded-full object-cover border-4 border-primary'
              onError={() => setImageError(true)}
            />
          ) : (
            <div className='relative z-10 h-full w-full rounded-full bg-[#12335d] border-4 border-primary flex items-center justify-center text-6xl sm:text-5xl font-semibold text-tertiary'>
              {(firstName?.[0] || 'H')}{(lastName?.[0] || 'A')}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default Intro
