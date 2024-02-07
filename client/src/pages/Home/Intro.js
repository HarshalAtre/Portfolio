import React from 'react'

function Intro() {
  return (<>
    <div className='h-[80vh] bg-primary flex flex-col items-start justify-center gap-8 py-10'>
    <h1 className='text-white'>Hi , I am</h1>
    <h1 className=' text-7xl sm:text-3xl text-secondary font-semibold'>Harshal Atre</h1>
    <h1 className=' text-6xl sm:text-3xl text-white font-semibold'>I Make Things For Web</h1>
    <p className="text-white w-2/3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus quisquam reprehenderit accusamus molestias deserunt veritatis sequi quo sapiente porro, temporibus quaerat similique laudantium numquam doloremque alias. Cum iste deleniti cupiditate.</p>
    <button className='border-2 border-tertiary text-white px-10 py-3 rounded'>Get Started</button>
    </div>
    </>
  )
}

export default Intro