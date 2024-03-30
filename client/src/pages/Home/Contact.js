import React, { useState, useEffect } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';
import "./All.css"
function Contact({ enter, leave, cursorPosition }) {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;

  // State to track the hovered item
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Function to enhance the text animation by splitting each letter
  const enhance = id => {
    const element = document.getElementById(id);
    if (element) {
      const text = element.innerText;
      element.innerHTML = ""; // Clear the content to add transformed letters
      for (let i = 0; i < text.length; i++) {
        const letter = text[i];
        const span = document.createElement("span");
        span.className = "letter";
        span.innerText = letter;
        element.appendChild(span);
      }
    }
  };
  
  

  // Call the enhance function after the DOM is fully loaded
  useEffect(() => {
    enhance("channel-link");
  }, []); // Empty dependency array ensures that it runs only once after component mount

  return (
    <div className='text-white'>
      <div onMouseEnter={enter} onMouseLeave={leave}>
        <SectionTitle title="Say Hello ... " hovered={hoveredIndex !== null} />
      </div>

      <div className="flex text-tertiary sm:flex-col-reverse items-center justify-center" style={{ transition: 'opacity 0.2s' }}>
        <div onMouseEnter={() => setHoveredIndex(null)} onMouseLeave={() => setHoveredIndex(null)} className="text-white flex flex-col gap-1">
          <h1 className='fancy text-white text-lg' style={{ opacity: hoveredIndex !== null ? 0.2 : 1, transition: 'opacity 0.2s' }}>{"{"}</h1>
          {Object.keys(contact).map((key, index) => key !== "_id" && (
            <a key={index}
              href=""
              className={`fancy text-white ml-5 cursor-none ${hoveredIndex === index ? 'scale-up' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.2 : 1, transition: 'opacity 0.2s, transform 0.3s', fontSize: '1.1rem', textDecoration: "none" }}>
              <span>{key} :</span>
              <span id="channel-link">{` ${contact[key]}`}</span> {/* Add id to the span element */}
            </a>
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
