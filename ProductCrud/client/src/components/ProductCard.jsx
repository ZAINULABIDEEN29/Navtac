import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { useProduct } from '../hooks/useProduct';

const ProductCard = ({ product }) => {
  const { deleteProduct } = useProduct();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${product.title}"?`)) {
      deleteProduct(product.id);
    }
  };

  return (
    <div className="glass product-card fade-in">
      <div className="product-card__image-container">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="product-card__image"
        />
        <div className="product-card__price-tag">
          ${product.price}
        </div>
      </div>
      
      <div className="product-card__content">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__description">
          {product.description}
        </p>
        
        <div className="product-card__actions">
          <Link to={`/product/${product.id}`} className="btn btn-outline" style={{ flex: 1, padding: '8px' }}>
            <Eye size={18} />
          </Link>
          <Link to={`/edit/${product.id}`} className="btn btn-primary" style={{ flex: 1, padding: '8px' }}>
            <Edit2 size={18} />
          </Link>
          <button onClick={handleDelete} className="btn btn-danger" style={{ flex: 1, padding: '8px' }}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};


export default ProductCard;
