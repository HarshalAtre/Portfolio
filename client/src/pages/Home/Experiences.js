import React, { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';

function Experiences({ enter, leave, cursorPosition }) {
  const [selectedItem, setSelectedItem] = useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { experience } = portfolioData;
  const [hoveredPeriodIndex, setHoveredPeriodIndex] = useState(null);

  const handlePeriodHoverEnter = (index) => {
    setHoveredPeriodIndex(index);
  };

  const handlePeriodHoverLeave = () => {
    setHoveredPeriodIndex(null);
  };

  return (
    <div>
      <div onMouseEnter={enter} onMouseLeave={leave}>
        <SectionTitle title="Position Of responsibility" />
      </div>
      <div className="flex gap-20 sm:flex-col">
        <div className='flex w-1/3 flex-col gap-10 border-l-2 border-[#61e8e8] sm:border-l-[0.5px]  sm:flex-row sm:overflow-x-scroll sm:w-full sm:gap-5 sm:p-0'>
          {experience.map((exp, index) => (
            <div
              key={index}
              className='cursor-pointer'
              onClick={() => {
                setSelectedItem(index);
              }}
              onMouseEnter={() => handlePeriodHoverEnter(index)}
              onMouseLeave={handlePeriodHoverLeave}
              style={{
                backgroundColor: hoveredPeriodIndex === index ? '#43e7e422' : 'transparent',
                color: hoveredPeriodIndex === index ? '#43e7e4' : 'white',
              }}
            >
              <h1
                className={`text-xl px-5  ${
                  selectedItem === index ? 'text-tertiary border-tertiary border-l-4 -ml-[3px] py-3' : 'text-white'
                }`}
              >
                {exp.period}
              </h1>
            </div>
          ))}
        </div>
        <div onMouseEnter={enter} onMouseLeave={leave} className='flex flex-col gap-5'>
          <h1 className='text-secondary text-xl'>{experience[selectedItem].title}</h1>
          <h1 className='text-tertiary text-xl'>{experience[selectedItem].company}</h1>
          <p className='text-white'>{experience[selectedItem].description}</p>
        </div>
      </div>
    </div>
  );
}

export default Experiences;
