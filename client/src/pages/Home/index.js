import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import Intro from './Intro';
import About from './About';
import Experiences from './Experiences';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import LeftSider from './LeftSider';
import { useSelector } from 'react-redux';
import ScrollReveal from '../../components/ScrollReveal';

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
        <div id="home" className="bg-primary pl-40 pr-12 pt-24 sm:px-5 sm:pt-20">
          <Intro enter={handleAboutMouseEnter} leave={handleAboutMouseLeave} cursorPosition={cursorPosition} />

          <ScrollReveal delay={0.05}>
            <section id="about">
              <About enter={handleAboutMouseEnter} leave={handleAboutMouseLeave} cursorPosition={cursorPosition} />
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <section id="experience">
              <Experiences enter={handleAboutMouseEnter} leave={handleAboutMouseLeave} cursorPosition={cursorPosition} />
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.1} amount={0.08}>
            <section id="projects">
              <Projects enter={handleAboutMouseEnter} leave={handleAboutMouseLeave} cursorPosition={cursorPosition} />
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.14}>
            <section id="contact">
              <Contact enter={handleAboutMouseEnter} leave={handleAboutMouseLeave} cursorPosition={cursorPosition} />
            </section>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <Footer />
          </ScrollReveal>

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
          zIndex: 1000,
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
