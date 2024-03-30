import React, { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';

function Projects({ enter, leave, cursorPosition }) {
  const [selectedItem, setSelectedItem] = useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;
  const [hoveredTitleIndex, setHoveredTitleIndex] = useState(null);

  const handleTitleHoverEnter = (index) => {
    setHoveredTitleIndex(index);
  };

  const handleTitleHoverLeave = () => {
    setHoveredTitleIndex(null);
  };

  return (
    <div>
      <div onMouseEnter={enter} onMouseLeave={leave}>
        <SectionTitle title="Projects" />
      </div>
      <div className="flex gap-20 sm:flex-col">
        <div className='flex w-1/3 flex-col gap-10 border-l-2 border-[#61e8e8] sm:border-l-[0.5px] sm:flex-row sm:overflow-x-scroll sm:w-full sm:gap-5 sm:p-0'>
          {projects.map((project, index) => (
            <div
              key={index}
              className='cursor-pointer'
              onClick={() => {
                setSelectedItem(index);
              }}
              onMouseEnter={() => handleTitleHoverEnter(index)}
              onMouseLeave={handleTitleHoverLeave}
              style={{
                backgroundColor: hoveredTitleIndex === index ? '#43e7e422' : 'transparent',
                color: hoveredTitleIndex === index ? '#43e7e4' : 'white',
              }}
            >
              <h1
                className={`text-xl px-5 ${
                  selectedItem === index ? 'text-tertiary border-tertiary border-l-4 -ml-[3px] py-3' : 'text-white'
                }`}
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <img src={projects[selectedItem].image} alt="" className='h-60 ' />
          <div onMouseEnter={enter} onMouseLeave={leave} className='flex flex-col gap-5'>
            <h1 className='text-secondary text-xl'>{projects[selectedItem].title}</h1>
            <p className="text-white" style={{ whiteSpace: 'pre-wrap' }}>{projects[selectedItem].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
