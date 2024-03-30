import React, { useRef, useEffect } from 'react';

function Modal({ isOpen, onClose, image }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg z-50">
      <button 
        className="absolute top-4 right-4 text-secondary text-5xl bg-transparent border-none" 
        onClick={onClose}
      >
        &times;
      </button>
      <img src={image} alt="" className="max-w-[90vw] max-h-[90vh] border border-white border-5" />
    </div>
  );
}

export default Modal;
