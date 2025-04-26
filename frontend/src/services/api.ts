import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: 0;
  available: boolean;
}

export const getProducts = async () => {
  try {
    const response = await api.get<Product[]>('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProduct = async (id: number) => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (productData: Omit<Product, 'id'>) => {
  try {
    const response = await api.post<Product>('/products', { product: productData });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id: number, productData: Partial<Product>) => {
  try {
    const response = await api.put<Product>(`/products/${id}`, { product: productData });
    return response.data;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
}; 