import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange }) => {

  return (
    <div className="search-container fade-in">
      <input
        type="text"
        placeholder="Search products by title..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ paddingLeft: '54px' }}
      />
      <Search 
        size={20} 
        className="search-icon"
      />
    </div>
  );
};


export default SearchBar;
