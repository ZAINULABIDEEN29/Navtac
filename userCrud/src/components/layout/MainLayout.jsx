import React from 'react';
import Header from './Header';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111] font-sans selection:bg-black/10 selection:text-black pb-20 overflow-x-hidden">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 animate-fade-in relative">
        {/* Subtle background glow effect for an award-winning depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white rounded-full blur-[120px] -z-10 pointer-events-none opacity-60"></div>
        <div className="animate-slide-up relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
