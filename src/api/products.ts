import api from '@/lib/axios';
import type { Product } from '@/types';


export const fetchProducts = async (limit?: number): Promise<Product[]> => {
    const res = await api.get('/products',
        {
            params: limit ? { _limit: limit } : {}
        }
    );
    return res.data;
};

export const fetchProduct = async (productId: string): Promise<Product> => {
    const res = await api.get(`/products/${productId}`);
    return res.data;
};

const pause = (duration: number) => {
    return new Promise(resolve => setTimeout(resolve, duration));
};

export const createProduct = async (newProduct: Omit<Product, '_id' | 'user' | 'createdAt'>): Promise<Product> => {
    const payload = {
        id: Math.random().toString(36).substring(2, 15),
        ...newProduct,
        createdAt: new Date().toISOString(),
    };
    await pause(1000);
    const res = await api.post('/products', payload);
    return res.data;
};


export const deleteProduct = async (productId: string): Promise<void> => {
    await pause(500);
    await api.delete(`/products/${productId}`);
};

export const updateProduct = async (productId: string, updatedData: Omit<Product, '_id' | 'user' | 'createdAt'>): Promise<Product> => {
    await pause(500);
    const res = await api.put(`/products/${productId}`, updatedData);
    return res.data;
}
