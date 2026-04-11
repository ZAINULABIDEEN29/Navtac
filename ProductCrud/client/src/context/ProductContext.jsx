import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { productService } from '../services/productService';
import { useToast } from './ToastContext';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { showToast } = useToast();

  const fetchProducts = useCallback(async (force = false) => {
    // If we already have products and aren't forcing, don't re-fetch
    // This prevents losing local state during navigation
    if (!force && products.length > 0) return;

    setLoading(true);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please check your connection.');
      showToast('Error loading products', 'error');
    } finally {
      setLoading(false);
    }
  }, [products.length, showToast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const searchProducts = async (term) => {
    setSearchTerm(term);
    
    // Don't trigger a re-fetch for empty search if we already have the main list
    if (!term) {
      // Just keep what we have (which includes any local additions)
      return; 
    }

    setLoading(true);
    try {
      const data = await productService.searchProducts(term);
      setProducts(data);
      setError(null);
    } catch (err) {
      showToast('Search failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      const resp = await productService.createProduct(productData);
      // DummyJSON always returns ID 101 for new products.
      // We'll give it a more unique local ID to avoid conflicts if needed,
      // but only if 101 is already taken or to be safe.
      const newProduct = {
        ...resp,
        id: products.some(p => p.id === resp.id) ? Date.now() : resp.id
      };
      
      setProducts(prev => [newProduct, ...prev]);
      showToast('Product added successfully');
      return newProduct;
    } catch (err) {
      showToast('Failed to add product', 'error');
      throw err;
    }
  };

  const updateProduct = async (id, updatedData) => {
    try {
      // Try to update on server
      let updatedProduct;
      try {
        updatedProduct = await productService.updateProduct(id, updatedData);
      } catch (err) {
        // If it's a new product not on server (ID > 100 in DummyJSON), update locally
        if (id > 100) {
          updatedProduct = { ...updatedData, id };
        } else {
          throw err;
        }
      }
      
      setProducts(prev => prev.map(p => (p.id.toString() === id.toString() ? { ...p, ...updatedProduct } : p)));
      showToast('Product updated successfully');
      return updatedProduct;
    } catch (err) {
      showToast('Failed to update product', 'error');
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      // Only attempt server delete for products that exist there
      if (id <= 100) {
        await productService.deleteProduct(id);
      }
      setProducts(prev => prev.filter(p => p.id.toString() !== id.toString()));
      showToast('Product deleted');
    } catch (err) {
      showToast('Failed to delete product', 'error');
      throw err;
    }
  };

  const getProductById = async (id) => {
    // Check local state first (for newly added items)
    const local = products.find(p => p.id.toString() === id.toString());
    if (local) return local;

    try {
      return await productService.getProductById(id);
    } catch (err) {
      showToast('Product not found', 'error');
      return null;
    }
  };

  const value = {
    products,
    loading,
    error,
    searchTerm,
    searchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    refreshProducts: fetchProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

