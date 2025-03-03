import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Token en localStorage:', token);

        if (token) {
            try {
                const decoded = jwtDecode(token); // Asegúrate de usar la función correctamente
                console.log('Token decodificado:', decoded);
                setUser(decoded);
            } catch (error) {
                console.error('Error al decodificar el token:', error);
            }
        }
    }, []);

    const login = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.rol);
        console.log('Login exitoso, token guardado:', data.token);
        setUser(data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        console.log('Usuario desconectado');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};