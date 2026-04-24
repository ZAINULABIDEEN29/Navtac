import { apiClient } from './apiClient';

export const productService = {
  getAllProducts: async (page = 1, limit = 10, q = "", category = "") => {
    try {
      let url = `/products?page=${page}&limit=${limit}`;
      if (q) {
        url += `&q=${encodeURIComponent(q)}`;
      }
      if (category) {
        url += `&category=${encodeURIComponent(category)}`;
      }
      const data = await apiClient.get(url);
      return data;
    } catch (error) {
      if (error.message === "No products found matching your criteria") {
        return { data: [], pagination: { totalPages: 0, currentPage: 1, hasNextPage: false, hasPrevPage: false } };
      }
      throw error;
    }
  },

  getProductById: async (id) => {
    const data = await apiClient.get(`/products/${id}`);
    return data.data;
  },

  createProduct: async (productData) => {
    const isFormData = productData instanceof FormData;
    return apiClient.post("/products", productData, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {}
    });
  },

  updateProduct: async (id, productData) => {
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
