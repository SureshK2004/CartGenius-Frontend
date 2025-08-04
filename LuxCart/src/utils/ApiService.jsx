import axiosInstance from './axiosInstance'; // Your existing axios instance
import dayjs from 'dayjs';

// Helper function to validate responses
const validateResponse = (data, expectedType) => {
  if (expectedType === 'array' && !Array.isArray(data)) {
    throw new Error(`Expected array, got ${typeof data}`);
  }
  if (expectedType === 'object' && (typeof data !== 'object' || data === null)) {
    throw new Error(`Expected object, got ${typeof data}`);
  }
};

// API Service Functions
export const ApiService = {
  fetchCategories: async () => {
    try {
      const response = await axiosInstance.get('/api/products/categories/');
      validateResponse(response.data, 'array');
      
      return response.data.map(category => ({
        id: category.id || 0,
        slug: category.slug || '',
        name: category.name || 'Uncategorized',
        image: category.image || null,
        description: category.description || '',
      }));
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  },

  fetchProducts: async (categorySlug = null) => {
    try {
      const endpoint = categorySlug 
        ? `api/products/category/${categorySlug}`
        : 'api/products/';
      
      const response = await axiosInstance.get(endpoint);
      validateResponse(response.data, 'array');
      
      return response.data.map(product => ({
        id: product.id || 0,
        title: product.title || 'Untitled Product',
        price: parseFloat(product.price) || 0,
        description: product.description || '',
        category: product.category || { name: 'Uncategorized' },
        image: product.image || null,
        rating: parseFloat(product.rating) || 0,
      }));
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  },

  fetchProductDetail: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/products/${id}/`);
      validateResponse(response.data, 'object');
      
      return {
        id: response.data.id || 0,
        title: response.data.title || 'Untitled Product',
        price: parseFloat(response.data.price) || 0,
        description: response.data.description || '',
        category: response.data.category || { name: 'Uncategorized' },
        image: response.data.image || null,
        rating: parseFloat(response.data.rating) || 0,
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Product not found');
    }
  },

  // Add other authenticated API calls here
  createProduct: async (productData) => {
    try {
      const response = await axiosInstance.post('/api/products/', productData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create product');
    }
  }
};

export default ApiService;