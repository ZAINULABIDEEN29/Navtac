import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  icon, 
  fullWidth = false,
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]";
  
  const variants = {
    primary: "bg-black text-white rounded-full hover:bg-gray-800 shadow-[0_4px_14px_0_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:-translate-y-0.5",
    secondary: "bg-white text-gray-700 rounded-full border border-gray-200/80 hover:border-gray-300 hover:bg-gray-50/50 shadow-sm hover:shadow-md hover:-translate-y-0.5",
    danger: "bg-white text-red-600 rounded-full border border-red-200 hover:bg-red-50 hover:border-red-300 shadow-sm hover:shadow-md",
    ghost: "text-gray-500 hover:text-black hover:bg-gray-100 rounded-xl",
    icon: "p-2.5 text-gray-400 hover:text-black hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-sm rounded-full transition-all",
    destructive: "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-xl font-bold shadow-sm",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm tracking-wide",
    lg: "px-8 py-3.5 text-base tracking-wide",
    icon: "",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[variant === 'ghost' || variant === 'icon' || variant === 'destructive' ? 'icon' : size]} ${widthStyle} ${className}`} 
      {...props}
    >
      {icon && <span className={`${children ? 'mr-2' : ''}`}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
