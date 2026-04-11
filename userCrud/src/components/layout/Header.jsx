import React, { useState } from 'react';
import { MenuIcon, CloseIcon, UserCircleIcon } from '../ui/Icons';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200/50 transition-all duration-300 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo area */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <span className="font-extrabold text-xl tracking-tight hidden sm:block text-gray-900 drop-shadow-sm">User Management</span>
          </div>
          
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-2 p-1.5 bg-gray-50 rounded-full border border-gray-200/50 shadow-inner">
            <a href="#" className="px-5 py-2 rounded-full bg-white text-black font-semibold text-sm shadow-[0_2px_8px_-2px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-default">Directory</a>
            <a href="#" className="px-5 py-2 rounded-full text-gray-500 hover:text-black font-medium text-sm transition-all duration-300 hover:bg-white/50">Security</a>
            <a href="#" className="px-5 py-2 rounded-full text-gray-500 hover:text-black font-medium text-sm transition-all duration-300 hover:bg-white/50">Settings</a>
          </nav>

          {/* Profile area */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <div className="font-bold text-sm tracking-tight text-gray-900">System Admin</div>
              <div className="text-xs font-medium text-gray-400">admin@navtac.com</div>
            </div>
            <div className="w-11 h-11 rounded-full flex items-center justify-center bg-gray-50 border border-gray-200 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden group">
              <UserCircleIcon className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
            </div>
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden ml-1 p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-black focus:outline-none transition-all active:scale-95"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden absolute left-0 w-full bg-white/95 backdrop-blur-3xl border-b border-gray-100 shadow-2xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${mobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
        <div className="px-5 py-6 flex flex-col gap-2 relative z-50">
          <a href="#" className="px-5 py-4 rounded-2xl text-black font-bold text-sm bg-gray-50 shadow-sm">Users Directory</a>
          <a href="#" className="px-5 py-4 rounded-2xl text-gray-500 hover:text-black font-semibold text-sm hover:bg-gray-50 transition-colors">Security Controls</a>
          <a href="#" className="px-5 py-4 rounded-2xl text-gray-500 hover:text-black font-semibold text-sm hover:bg-gray-50 transition-colors">System Settings</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
