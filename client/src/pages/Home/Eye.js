import React, { useEffect } from 'react';
import './All.css';
import { Link } from 'react-router-dom';

function Eye() {
  useEffect(() => {
    const balls = document.getElementsByClassName("ball");

    function handleMouseMove(e) {
      const x = e.clientX * 100 / window.innerWidth + "%";
      const y = e.clientY * 100 / window.innerHeight + "%";
      for (let i = 0; i < 2; i++) {
        balls[i].style.left = x;
        balls[i].style.top = y;
        balls[i].style.transform = `translate(-${x}, -${y})`;
      }
    }

    document.onmousemove = handleMouseMove;

    return () => {
      document.onmousemove = null; // Cleanup function
    };
  }, []); // Empty dependency array to run the effect only once after mount

  return (
    <div className="eyes sm:hidden">
      <div className="eye">
        <div className="ball"></div>
      </div>
      <div className="eye">
        <div className="ball"></div>
      </div>
    </div>
  );
}

export default Eye;
