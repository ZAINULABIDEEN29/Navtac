import { useProduct } from '../hooks/useProduct';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Loading from '../components/common/Loading';
import { useEffect } from 'react';

const Home = () => {
  const { products, loading, error } = useProduct();

  if (error) return (
    <div className="glass" style={{ textAlign: 'center', padding: '3rem', margin: '2rem 0', borderRadius: '20px' }}>
      <h2 style={{ color: 'var(--danger)' }}>{error}</h2>
    </div>
  );



  return (
    <div className="fade-in">
      <header className="page-header">
        <h1>Product Catalog</h1>
        <p>Manage and explore your inventory with ease.</p>
      </header>

      <SearchBar />

      {loading ? (
        <Loading />
      ) : (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
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

