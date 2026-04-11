import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { Save, X } from 'lucide-react';
import Loading from '../components/common/Loading';

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, addProduct, updateProduct } = useProduct();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    brand: '',
    thumbnail: '' 
  });
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        const product = await getProductById(id);
        if (product) {
          setFormData({
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            brand: product.brand,
            thumbnail: product.thumbnail
          });
        }
        setLoading(false);
      };
      fetchProduct();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Prepare data (ensure price is a number)
    const productToSubmit = {
      ...formData,
      price: parseFloat(formData.price)
    };

    try {
      if (isEdit) {
        await updateProduct(id, productToSubmit);
      } else {
        await addProduct(productToSubmit);
      }
      navigate('/');
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="form-container fade-in">
      <header className="page-header">
        <h1>{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
        <p>Fill in the details below to {isEdit ? 'update' : 'create'} the product.</p>
      </header>

      <div className="glass" style={{ padding: '2.5rem', borderRadius: '25px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="form-row">
            <div className="form-group">
              <label>Product Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. iPhone 15 Pro"
              />
            </div>
            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="fragrances">Fragrances</option>
                <option value="skincare">Skincare</option>
                <option value="groceries">Groceries</option>
                <option value="home-decoration">Home Decoration</option>
              </select>
            </div>
            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                required
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Apple"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description here..."
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="thumbnail"
              required
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            {formData.thumbnail && (
              <div style={{ marginTop: '1rem', borderRadius: '12px', overflow: 'hidden', height: '150px', width: '150px', border: '1px solid var(--border)' }}>
                <img src={formData.thumbnail} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button 
              type="button" 
              onClick={() => navigate('/')} 
              className="btn btn-outline" 
              style={{ flex: 1, padding: '14px' }}
            >
              <X size={20} />
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={submitting}
              className="btn btn-primary" 
              style={{ flex: 2, padding: '14px' }}
            >
              {submitting ? (
                <Loading />
              ) : (
                <>
                  <Save size={20} />
                  {isEdit ? 'Update Product' : 'Add Product'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;
