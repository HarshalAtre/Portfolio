import React from 'react'
import SectionTitle from '../../components/SectionTitle'
import { projects } from '../../resources/projects';

function Projects() {
  const [Selecteditem, setSelectedItem] = React.useState(0);
  return (
    <div>
    <SectionTitle title="Projects"/>
    <div className="flex gap-20 sm:flex-col">
        <div className='flex w-1/3 flex-col gap-10 border-l-2 border-[#61e8e8] sm:border-l-[0.5px]  sm:flex-row sm:overflow-x-scroll sm:w-full sm:gap-5 sm:p-0 '>
          {projects.map((project, index) => (
            <div key={index} className=' cursor-pointer' onClick={()=>{setSelectedItem(index)}}>
              <h1 className={`text-xl px-5  ${Selecteditem===index?"text-tertiary border-tertiary border-l-4 -ml-[3px] py-3 bg-[#43e7e422]":"text-white"}`}>{project.title}</h1>
            </div>
          ))}
        </div>
       <div className="flex items-center justify-center gap-10 sm:flex-col">
        <img src={projects[Selecteditem].image} alt="" className='h-60 w-72' />
       <div className='flex flex-col gap-5    '>
          <h1 className='text-secondary text-xl'>
            {projects[Selecteditem].title}
          </h1>
          <p className="text-white">{projects[Selecteditem].description}</p>
          <p className='text-white'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia ab cumque itaque corporis, ea nulla, iste consequuntur alias praesentium inventore laborum aliquid maxime quisquam laudantium quidem, aperiam odio nisi earum.</p>
        </div>
       </div>
    </div>
</div>
  )
}

export default Projects 