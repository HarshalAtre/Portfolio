import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Intro from './Intro';
import About from './About';
import Experiences from './Experiences';
import Projects from './Projects';
import Courses from './Courses';
import Contact from './Contact';
import Footer from './Footer';
import LeftSider from './LeftSider';
import { useSelector } from 'react-redux';

function Home() {
  const { portfolioData } = useSelector((state) => state.root);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [toggleVar, setToggleVar] = useState('default');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleAboutMouseEnter = () => {
    setToggleVar('text');
  };

  const handleAboutMouseLeave = () => {
    setToggleVar('default');
  };

  return (
    <div className='cursor-none sm:cursor-default'>
      <Header />
      {portfolioData && (
        <div className="bg-primary px-40 sm:px-5">
          <Intro enter={handleAboutMouseEnter} leave={handleAboutMouseLeave} cursorPosition={cursorPosition} />
          
          <About enter={handleAboutMouseEnter} leave={handleAboutMouseLeave} cursorPosition={cursorPosition} />

     
          <Experiences enter={handleAboutMouseEnter} leave={handleAboutMouseLeave} cursorPosition={cursorPosition}/>
          < Projects enter={handleAboutMouseEnter} leave={handleAboutMouseLeave} cursorPosition={cursorPosition}/>
          <Courses enter={handleAboutMouseEnter} leave={handleAboutMouseLeave} cursorPosition={cursorPosition}/>
          <Contact enter={handleAboutMouseEnter} leave={handleAboutMouseLeave} cursorPosition={cursorPosition} />
          <Footer />
          <LeftSider />
        </div>
      )}
      <motion.div
        className="cursor sm:hidden"
        animate={toggleVar}
        variants={{
          default: { scale: 1, opacity: 1 ,mixBlendMode:"difference"},
          text: { scale: 1.5, opacity: 1, height: 50, width: 50,backgroundColor:"white",mixBlendMode:"difference" },
        }}
        style={{
          zIndex: 0,
          position: 'fixed',
          top: cursorPosition.y-15,
          left: cursorPosition.x-15,
          transform: 'translate(-50%, -50%)',
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: 'white',
          pointerEvents: 'none',
          mixBlendMode: toggleVar === 'text' ? 'difference' : 'normal', // Apply mix blend mode conditionally
        }}
      />
    </div>
  );
}

export default Home;
