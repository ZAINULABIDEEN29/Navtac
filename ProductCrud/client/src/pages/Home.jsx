import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Loading from '../components/common/Loading';
import { useGetProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedTerm = useDebounce(searchTerm, 500);
  
  const { data:products = [], isLoading:loading, error } = useGetProducts(debouncedTerm);

  if (error) return (
    <div className="glass" style={{ textAlign: 'center', padding: '3rem', margin: '2rem 0', borderRadius: '20px' }}>
      <h2 style={{ color: 'var(--danger)' }}>{error.message || "An error occurred"}</h2>
    </div>
  );



  return (
    <div className="fade-in">
      <header className="page-header">
        <h1>Product Catalog</h1>
        <p>Manage and explore your inventory with ease.</p>
      </header>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {loading ? (
        <Loading />
      ) : (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="glass" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', borderRadius: '20px' }}>
              <p style={{ color: 'var(--text-muted)' }}>No products found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

