import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Loading from '../components/common/Loading';
import { useGetProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const limit = 2;
  const debouncedTerm = useDebounce(searchTerm, 500);
  
  // Reset page to 1 on new search or category change
  useEffect(() => {
    setPage(1);
  }, [debouncedTerm, category]);

  const { data: response, isLoading: loading, error } = useGetProducts({ query: debouncedTerm, page, limit, category });
  const products = response?.data || [];
  const pagination = response?.pagination;

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

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ flex: 1 }}>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="form-input"
          style={{ width: '200px', cursor: 'pointer', padding: '12px 20px', borderRadius: '12px', background: 'var(--surface-light)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
        >
          <option value="">All Categories</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Laptops">Laptops</option>
          <option value="Fragrances">Fragrances</option>
          <option value="Skincare">Skincare</option>
          <option value="Groceries">Groceries</option>
          <option value="Home Decoration">Home Decoration</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
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
          
          {pagination && pagination.totalPages > 1 && (
            <div className="pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem', paddingBottom: '2rem' }}>
              <button 
                className="btn btn-secondary" 
                disabled={!pagination.hasPrevPage} 
                onClick={() => setPage(p => p - 1)}
              >
                Previous
              </button>
              <span style={{color: 'var(--text-primary)'}}>Page {pagination.currentPage} of {pagination.totalPages}</span>
              <button 
                className="btn btn-secondary" 
                disabled={!pagination.hasNextPage} 
                onClick={() => setPage(p => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
