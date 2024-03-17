import React from 'react';
import Eye from './Eye';

function LeftSider() {
  return (
    <div className='fixed left-0 bottom-0 px-10 sm:static'>
      
      <div className="flex flex-col items-center">
        
        <div className="flex flex-col text-gray-400 text-xl gap-3  sm:flex-row sm:pb-3 ">
  
          <a href="https://www.facebook.com"><i className="ri-facebook-circle-line icon transition duration-300 transform hover:scale-110 hover:text-white" title="Facebook"></i></a>
          <a href="mailto:example@example.com"><i className="ri-mail-line icon transition duration-300 transform hover:scale-110 hover:text-white" title="Mail"></i></a>
          <a href="https://www.instagram.com"><i className="ri-instagram-line icon transition duration-300 transform hover:scale-110 hover:text-white" title="Instagram"></i></a>
          <a href="https://www.linkedin.com"><i className="ri-linkedin-box-line icon transition duration-300 transform hover:scale-110 hover:text-white" title="LinkedIn"></i></a>
          <a href="https://github.com"><i className="ri-github-fill icon transition duration-300 transform hover:scale-110 hover:text-white" title="GitHub"></i></a>     
        </div>
        <div className='h-32 w-[1px] bg-[#2fa0a083] sm:hidden'></div>
      </div>
    </div>
  );
}

export default LeftSider;
