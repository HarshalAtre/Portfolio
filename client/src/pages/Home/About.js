import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';

function About({ enter, leave }) {
  const { portfolioData } = useSelector((state) => state.root);
  const { about } = portfolioData;
  const { lottieUrl, description1, description2, skills } = about;
  const scrollingSkills = [...skills, ...skills];

  return (
    <div>
      <SectionTitle title="About" />
      <div className='flex w-full items-center sm:flex-col '>
        <div className='h-[70vh] w-1/2 sm:w-full'>
          <dotlottie-player src={lottieUrl || ""} background="transparent" speed="1" loop autoplay></dotlottie-player>
        </div>
        <div onMouseEnter={enter} onMouseLeave={leave} className="flex flex-col gap-5 w-1/2 sm:w-full">
          <p className='text-white'>{description1 || ""}</p>
          <p className='text-white'>{description2 || ""}</p>
        </div>
      </div>
      <div className='py-5 '>
        <h1 className='text-tertiary text-xl'>
          Here are a few technologies I've been working with recently:
        </h1>
        <div className='skills-strip mt-6' onMouseEnter={enter} onMouseLeave={leave}>
          <div className='skills-strip__track'>
            {scrollingSkills.map((skill, index) => (
              <div key={`${skill}-${index}`} className='skills-strip__item'>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
