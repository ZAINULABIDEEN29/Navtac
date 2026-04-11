import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from './Icons';

const ModalContent = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto animate-fade-in">
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 text-center">
        {/* Backdrop overlay */}
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" 
          onClick={onClose} 
        />
        
        {/* Modal Box */}
        <div className="relative bg-white rounded-[24px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-lg text-left animate-slide-up transform transition-all my-8 align-middle">
          <div className="flex justify-between items-center px-6 sm:px-8 py-5 border-b border-gray-100 bg-gray-50/50 rounded-t-[24px]">
            <h2 className="text-xl sm:text-[22px] font-extrabold text-gray-900 tracking-tight leading-tight pr-4">{title}</h2>
            <button 
              onClick={onClose} 
              className="shrink-0 p-2 text-gray-400 hover:text-black hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200 hover:shadow-sm focus:outline-none"
            >
              <CloseIcon className="w-5 h-5 sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
          <div className="p-6 sm:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const Modal = (props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(<ModalContent {...props} />, document.body);
};

export default Modal;
