import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../constants/api';

export const productService = {
  getAllProducts: async () => {
    const data = await apiClient.get(API_ENDPOINTS.PRODUCTS);
    return data.products;
  },

  getProductById: async (id) => {
    return apiClient.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  },

  searchProducts: async (query) => {
    const data = await apiClient.get(`${API_ENDPOINTS.SEARCH}?q=${query}`);
    return data.products;
  },

  createProduct: async (productData) => {
    return apiClient.post(API_ENDPOINTS.ADD, productData);
  },

  updateProduct: async (id, productData) => {
    // DummyJSON might not like updating non-existent IDs (like those added locally)
    // but we simulate the production behavior here.
    return apiClient.put(`${API_ENDPOINTS.PRODUCTS}/${id}`, productData);
  },

  deleteProduct: async (id) => {
    return apiClient.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`);
  },
};
