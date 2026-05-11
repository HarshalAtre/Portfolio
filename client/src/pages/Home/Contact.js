import React, { useMemo, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';
import "./All.css"

function Contact({ enter, leave }) {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const visibleContactEntries = useMemo(() => {
    if (!contact) return [];
    return Object.entries(contact).filter(([key]) => key !== "_id" && key !== "gender");
  }, [contact]);

  const splitToLetters = (text) =>
    String(text).split("").map((char, idx) => {
      const motionPresets = [
        { x: -10, y: 8, r: 8 },
        { x: 10, y: -10, r: -6 },
        { x: -6, y: 12, r: 10 },
        { x: 14, y: -6, r: -12 },
        { x: -12, y: -8, r: 14 },
        { x: 8, y: 10, r: -8 },
        { x: -8, y: -12, r: 12 },
        { x: 12, y: 6, r: -10 },
      ];

      const preset = motionPresets[idx % motionPresets.length];

      return (
        <span
          key={idx}
          className="letter"
          style={{
            '--tx': `${preset.x}px`,
            '--ty': `${preset.y}px`,
            '--rot': `${preset.r}deg`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });

  return (
    <div className='text-white'>
      <div onMouseEnter={enter} onMouseLeave={leave}>
        <SectionTitle title="Say Hello ... " hovered={hoveredIndex !== null} />
      </div>

      <div className="flex text-tertiary sm:flex-col-reverse items-center justify-center" style={{ transition: 'opacity 0.2s' }}>
        <div onMouseEnter={() => setHoveredIndex(null)} onMouseLeave={() => setHoveredIndex(null)} className="text-white flex flex-col gap-1">
          <h1 className='fancy text-white text-lg' style={{ opacity: hoveredIndex !== null ? 0.2 : 1, transition: 'opacity 0.2s' }}>{"{"}</h1>
          {visibleContactEntries.map(([key, value], index) => (
            <div
              key={key}
              role="button"
              tabIndex={0}
              onClick={(e) => e.preventDefault()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') e.preventDefault();
              }}
              className={`fancy text-white ml-5 cursor-none ${hoveredIndex === index ? 'scale-up' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.2 : 1, transition: 'opacity 0.2s, transform 0.3s', fontSize: '1.1rem' }}
            >
              <span>{splitToLetters(`${key} : ${value}`)}</span>
            </div>
          ))}
          <h1 className='text-white text-lg' style={{ opacity: hoveredIndex !== null ? 0.2 : 1, transition: 'opacity 0.2s' }}>{"}"}</h1>
        </div>
        <div className='h-[500px]' onMouseEnter={() => setHoveredIndex(null)} style={{ opacity: hoveredIndex !== null ? 0.2 : 1, transition: 'opacity 0.2s' }}>
          <dotlottie-player src="https://lottie.host/5a8dc997-a8d1-4fc8-a16e-4214690391c6/XUvIytg29b.json" background="transparent" speed="1" loop autoplay></dotlottie-player>
        </div>
      </div>
    </div>
  );
} 

export default Contact;
