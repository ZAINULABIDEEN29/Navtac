import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useQuery } from '@tanstack/react-query';
import * as Yup from 'yup';
import { useUpdateProduct, useCreateProduct } from '../hooks/useProducts';
import { Save, X, Image as ImageIcon } from 'lucide-react';
import Loading from '../components/common/Loading';
import { productService } from '../services/productService';
import { getImageUrl } from '../utils/getImageUrl';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title must be at least 2 characters')
    .required('Product title is required'),
  price: Yup.number()
    .typeError('Price must be a valid number')
    .positive('Price must be greater than zero')
    .required('Price is required'),
  category: Yup.string()
    .oneOf(
      ['Smartphones', 'Laptops', 'Fragrances', 'Skincare', 'Groceries', 'Home Decoration', 'Other'],
      'Invalid category'
    )
    .required('Category is required'),
  brand: Yup.string()
    .min(2, 'Brand must be at least 2 characters')
    .required('Brand is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  thumbnail: Yup.mixed()
    .required('Product image is required')
});

const ErrorFeedback = ({ error, touched }) => {
  if (!error || !touched) return null;
  return (
    <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.4rem', fontWeight: 500 }}>
      {error}
    </div>
  );
};

const AddEditProduct = () => {
  const { _id: id } = useParams();
  const navigate = useNavigate();
  const updateMutation = useUpdateProduct();
  const createMutation = useCreateProduct();
  const isEdit = !!id;

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    enabled: isEdit,
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      price: '',
      description: '',
      category: '',
      brand: '',
      thumbnail: null
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const sku = values.title.toLowerCase().replace(/\s+/g, '-') + '-' + Math.floor(Math.random() * 10000);
      
      const submitData = new FormData();
      submitData.append('title', values.title);
      submitData.append('price', parseFloat(values.price));
      submitData.append('description', values.description);
      submitData.append('category', values.category);
      submitData.append('brand', values.brand);
      submitData.append('sku', sku);
      submitData.append('rating', 5);
      submitData.append('stock', 10);

      
      if (values.thumbnail instanceof File) {
        submitData.append('image', values.thumbnail);
      } else if (typeof values.thumbnail === 'string' && values.thumbnail) {
        submitData.append('image', values.thumbnail);
        submitData.append('thumbnail', values.thumbnail);
      }

      try {
        if (isEdit) {
          await updateMutation.mutateAsync({ id, data: submitData });
        } else {
          await createMutation.mutateAsync(submitData);
        }
        navigate('/');
      } catch (err) {
        console.error('Submission error:', err);
      } finally {
        setSubmitting(false);
      }
    }
  });

  useEffect(() => {
    if (product) {
      formik.setValues({
        title: product.title || '',
        price: product.price || '',
        description: product.description || '',
        category: product.category || '',
        brand: product.brand || '',
        thumbnail: product.thumbnail || product.image || ''
      });
    }
  }, [product, formik.setValues]);

  const handleImageChange = (e) => {
    const file = e.currentTarget.files && e.currentTarget.files[0];
    if (file) {
      formik.setFieldValue('thumbnail', file);
      formik.setFieldTouched('thumbnail', true, false); 
    }
  };

  const previewUrl = formik.values.thumbnail instanceof File 
    ? URL.createObjectURL(formik.values.thumbnail) 
    : (formik.values.thumbnail ? getImageUrl(formik.values.thumbnail) : null);

  if (isLoading) return <Loading />;

  const getInputStyles = (field) => ({
    borderColor: formik.errors[field] && formik.touched[field] ? 'var(--danger)' : undefined,
    boxShadow: formik.errors[field] && formik.touched[field] ? '0 0 0 1px var(--danger)' : undefined
  });

  return (
    <div className="form-container fade-in">
      <header className="page-header">
        <h1>{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
        <p>Fill in the details below to {isEdit ? 'update' : 'create'} the product.</p>
      </header>

      <div className="glass" style={{ padding: '2.5rem', borderRadius: '25px' }}>
        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="form-row">
            <div className="form-group">
              <label>Product Title</label>
              <input
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g. iPhone 15 Pro"
                style={getInputStyles('title')}
              />
              <ErrorFeedback error={formik.errors.title} touched={formik.touched.title} />
            </div>
            
            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="0.00"
                style={getInputStyles('price')}
              />
              <ErrorFeedback error={formik.errors.price} touched={formik.touched.price} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select 
                name="category" 
                value={formik.values.category} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                style={getInputStyles('category')}
              >
                <option value="">Select Category</option>
                <option value="Smartphones">Smartphones</option>
                <option value="Laptops">Laptops</option>
                <option value="Fragrances">Fragrances</option>
                <option value="Skincare">Skincare</option>
                <option value="Groceries">Groceries</option>
                <option value="Home Decoration">Home Decoration</option>
                <option value="Other">Other</option>
              </select>
              <ErrorFeedback error={formik.errors.category} touched={formik.touched.category} />
            </div>
            
            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="e.g. Apple"
                style={getInputStyles('brand')}
              />
              <ErrorFeedback error={formik.errors.brand} touched={formik.touched.brand} />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows="4"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter product description here..."
              style={{ ...getInputStyles('description'), resize: 'vertical' }}
            />
            <ErrorFeedback error={formik.errors.description} touched={formik.touched.description} />
          </div>

          <div className="form-group" style={{ 
            background: 'var(--glass)', 
            padding: '1.5rem', 
            borderRadius: '16px', 
            border: formik.errors.thumbnail && formik.touched.thumbnail 
              ? '1px solid var(--danger)' 
              : '1px solid var(--border)',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: 'var(--text)', fontWeight: '600' }}>
               <ImageIcon size={20} color={formik.errors.thumbnail && formik.touched.thumbnail ? "var(--danger)" : "var(--primary)"} /> Product Image
            </label>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ flex: '1', minWidth: '250px' }}>
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleImageChange}
                  onBlur={() => formik.setFieldTouched('thumbnail', true)}
                  style={{
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px dashed var(--border)',
                    borderRadius: '12px',
                    color: 'var(--text)',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                  Select an image file. High-quality images look best.
                </p>
                <ErrorFeedback error={formik.errors.thumbnail} touched={formik.touched.thumbnail} />
              </div>
              
              <div className="fade-in" style={{
                width: '150px',
                height: '150px',
                borderRadius: '16px',
                border: previewUrl ? '2px solid var(--primary)' : '2px dashed var(--text-muted)',
                background: 'rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0,
                position: 'relative',
                boxShadow: previewUrl ? '0 8px 24px var(--primary-glow)' : 'none',
                transition: 'var(--transition)'
              }}>
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Thumbnail Preview" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/150x150/161b2c/94a3b8?text=Invalid+Image";
                    }}
                  />
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    <ImageIcon size={32} style={{ opacity: 0.5, marginBottom: '8px', margin: '0 auto' }} />
                    <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>No Image</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button 
              type="button" 
              onClick={() => navigate('/')} 
              className="btn btn-outline" 
              style={{ flex: 1, padding: '14px' }}
              disabled={formik.isSubmitting}
            >
              <X size={20} />
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={formik.isSubmitting}
              className="btn btn-primary" 
              style={{ flex: 2, padding: '14px' }}
            >
              {formik.isSubmitting ? (
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
