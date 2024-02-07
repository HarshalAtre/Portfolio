import React from 'react'

function SectionTitle({title}) {
  return (
    <div className='flex items-center gap-10 py-10'>
       <h1 className='text-2xl text-secondary font-semibold'>{title}</h1> 
       <div className='w-60 bg-tertiary h-[1px]'></div>
    </div>
  )
}

export default SectionTitle