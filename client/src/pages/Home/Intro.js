import React from 'react'
import { useSelector } from 'react-redux'
import Eye from './Eye'
import { Link } from 'react-router-dom'

function Intro({enter,leave,cursorPosition}) {
  const {loading,portfolioData}=useSelector((state)=>state.root)
  const {intro}=portfolioData
  const{firstName,lastName,welcomeText,description,caption}=intro
  return (<>
    <div className='h-[80vh] bg-primary flex flex-col items-start justify-center gap-8 py-10'>
    <h1 className='text-white'>{welcomeText||""}</h1>
    <h1 onMouseEnter={enter} onMouseLeave={leave} className=' text-7xl sm:text-3xl text-secondary font-semibold'>{firstName||""} {lastName||""}</h1>
   <div onMouseEnter={enter} onMouseLeave={leave} className='flex flex-row  items-center'> <h1  className=' text-6xl sm:text-3xl text-white font-semibold inline'>{caption||""}</h1>   <Link to="/admin-login" className="cursor-none"><Eye/> </Link></div>
    <p className="text-white w-2/3">{description||""}</p>
    <a href="Harshal_Updated.pdf" download><button  className='border-2 border-tertiary text-white px-10 py-3 rounded cursor-none btn'>Download CV</button></a>
    </div>
    </>
  )
}

export default Intro
