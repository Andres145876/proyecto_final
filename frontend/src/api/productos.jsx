import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const getProductos = async () => {
    try {
        const response = await axios.get(`${API_URL}/productos/ver`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        throw new Error('No se pudieron cargar los productos');
    }
};

export const addProducto = async (nombre, cantidad, precio) => {
    try {
        const response = await axios.post(`${API_URL}/productos/agregar`, { nombre, cantidad, precio }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        throw new Error('No se pudo agregar el producto');
    }
};
import axios from 'axios';
