import React from 'react';

const Badge = ({ status, className = '' }) => {
  const isActive = status === 'Active';
  
  return (
    <span className={`inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-500 ease-out border ${
      isActive 
        ? 'bg-[#Edfaf3] text-[#20945A] border-[#CFF3E0]' 
        : 'bg-gray-50 text-gray-500 border-gray-200/80'
    } ${className}`}>
      {isActive && (
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34A853] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34A853]"></span>
        </span>
      )}
      {!isActive && <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></span>}
      {status}
    </span>
  );
};

export default Badge;
