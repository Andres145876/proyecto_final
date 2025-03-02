import axios from 'axios';

const API_URL = 'http://localhost:4000';  // Cambia esto por la URL de tu backend

export const login = async (email, password) => {
    try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
    } catch (error) {
    throw new Error('Correo electrónico o contraseña incorrectos');
    }
};

export const register = async (name, email, password) => {
    try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    return response.data;
    } catch (error) {
    throw new Error('Error en el registro');
    }
};
