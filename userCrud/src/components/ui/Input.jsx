import React from 'react';

const Input = ({ icon, className = '', ...props }) => {
  return (
    <div className="relative flex-1 w-full group">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-black group-focus-within:scale-110 transition-all duration-300">
          {icon}
        </div>
      )}
      <input 
        className={`w-full ${icon ? 'pl-11' : 'pl-5'} pr-5 py-3.5 bg-white border border-gray-200/80 rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-[3px] focus:ring-black/5 focus:border-gray-400 transition-all duration-300 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:border-gray-300 hover:shadow-md ${className}`} 
        {...props} 
      />
    </div>
  );
};

export default Input;
