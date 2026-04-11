import React from 'react';
import Input from '../ui/Input';
import { SearchIcon, ChevronDownIcon } from '../ui/Icons';

const UserFilters = ({ searchTerm, onSearchChange, roleFilter, onRoleChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 relative z-20">
      <div className="flex-1 w-full max-w-2xl">
        <Input 
          icon={<SearchIcon className="w-5 h-5 text-gray-400" />}
          placeholder="Search teammates by name or email address..." 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="relative w-full sm:w-[220px] group shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow duration-300 rounded-2xl">
        <select 
          className="w-full h-full min-h-[52px] px-5 py-3 border border-gray-200/80 bg-white hover:border-gray-300 rounded-2xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-[3px] focus:ring-black/5 focus:border-gray-400 transition-all duration-300 appearance-none cursor-pointer"
          value={roleFilter}
          onChange={(e) => onRoleChange(e.target.value)}
        >
          <option value="">All Privileges</option>
          <option value="admin">Administrator</option>
          <option value="manager">Manager</option>
          <option value="user">Standard User</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none text-gray-400 transition-colors duration-300 group-hover:text-black">
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default UserFilters;
