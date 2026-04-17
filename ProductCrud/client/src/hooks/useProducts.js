import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/productService';

export const useGetProducts = (query = '') => {
  return useQuery({
    queryKey: ['products', query],
    queryFn: () => query ? productService.searchProducts(query) : productService.getAllProducts(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetSingleProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => productService.updateProduct(id, data),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
      
      const updatedProduct = res?.data;
      if (updatedProduct?._id) {
        queryClient.setQueryData(['product', updatedProduct._id.toString()], updatedProduct);
      }
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
