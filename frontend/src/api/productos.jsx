import axios from 'axios';

export const addProduct = async (productData) => {
    try {
        const response = await axios.post('/api/productos', productData);
        return response.data;
    } catch (error) {
        throw new Error('Error al agregar producto');
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await axios.put(`/api/productos/${id}`, productData);
        return response.data;
    } catch (error) {
        throw new Error('Error al actualizar producto');
    }
};

export const getProducts = async () => {
    try {
        const response = await axios.get('/api/productos');
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener productos');
    }
};