import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { ArrowLeft, Star, Tag, Box, Trash2, Edit2 } from 'lucide-react';
import Loading from '../components/common/Loading';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, deleteProduct } = useProduct();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await getProductById(id);
      setProduct(data);
      setLoading(false);
    };
    fetchDetail();
  }, [id, getProductById]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      navigate('/');
    }
  };

  if (loading) return <Loading />;

  if (!product) return (
    <div className="glass" style={{ textAlign: 'center', padding: '5rem', borderRadius: '30px' }}>
      <h2>Product not found</h2>
      <button onClick={() => navigate('/')} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
        Return to Catalog
      </button>
    </div>
  );

  return (
    <div className="detail-container fade-in">
      <button 
        onClick={() => navigate(-1)} 
        className="btn btn-outline" 
        style={{ marginBottom: '2rem' }}
      >
        <ArrowLeft size={18} />
        Back to Gallery
      </button>

      <div className="glass detail-card">
        <div className="detail-image-container">
          <img 
            src={product.images?.[0] || product.thumbnail} 
            alt={product.title} 
            className="detail-image"
          />
        </div>

        <div className="detail-info">
          <div>
            <span className="detail-badge">
              {product.category}
            </span>
            <h1 style={{ fontSize: '2.8rem', marginTop: '0.5rem', lineHeight: '1.1' }}>{product.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '1rem' }}>
              <div style={{ display: 'flex', color: '#fbbf24', alignItems: 'center', gap: '4px' }}>
                <Star size={18} fill="#fbbf24" />
                <span style={{ fontWeight: '600', color: 'var(--text)' }}>{product.rating}</span>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              <span style={{ color: 'var(--text-muted)' }}>{product.stock} units in stock</span>
            </div>
          </div>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>{product.description}</p>

          <div className="detail-price">
            ${product.price}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="glass detail-meta-item">
              <Tag size={20} color="var(--primary)" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Brand</div>
                <div style={{ fontWeight: '600' }}>{product.brand}</div>
              </div>
            </div>
            <div className="glass detail-meta-item">
              <Box size={20} color="var(--primary)" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SKU</div>
                <div style={{ fontWeight: '600' }}>{product.sku || 'CAT-0'+product.id}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '1rem' }}>
            <Link to={`/edit/${product.id}`} className="btn btn-primary" style={{ flex: 1, padding: '16px' }}>
              <Edit2 size={18} />
              Edit Specification
            </Link>
            <button onClick={handleDelete} className="btn btn-danger" style={{ flex: 1, padding: '16px' }}>
              <Trash2 size={18} />
              Remove Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
