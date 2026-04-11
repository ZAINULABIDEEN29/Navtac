import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useProduct } from '../hooks/useProduct';

const SearchBar = () => {
  const { searchProducts, searchTerm } = useProduct();
  const [localTerm, setLocalTerm] = useState(searchTerm);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchProducts(localTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [localTerm]);

  return (
    <div className="search-container fade-in">
      <input
        type="text"
        placeholder="Search products by title..."
        value={localTerm}
        onChange={(e) => setLocalTerm(e.target.value)}
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
