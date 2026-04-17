import { apiClient } from './apiClient';

export const productService = {
  getAllProducts: async () => {
    const data = await apiClient.get("/products");
    return data.products;
  },

  getProductById: async (id) => {
    const data = await apiClient.get(`/products/${id}`);
    return data.data;
  },

  searchProducts: async (query) => {
    const data = await apiClient.get(`/products?q=${encodeURIComponent(query)}`);
    return data.products;
  },

  createProduct: async (productData) => {
    const isFormData = productData instanceof FormData;
    return apiClient.post("/products", productData, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {}
    });
  },

  updateProduct: async (id, productData) => {
    console.log(id,"id");
    const isFormData = productData instanceof FormData;
    return apiClient.put(`/products/${id}`, productData, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {}
    });
  },

  deleteProduct: async (id) => {
    const data = await apiClient.delete(`/products/${id}`);
    return data.products;
  },
};
