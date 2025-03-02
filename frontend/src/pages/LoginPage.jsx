import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const { login } = useContext(AuthContext);
const navigate = useNavigate();

const handleLogin = () => {
    // Implementar la lógica de autenticación
    login({ name: 'Usuario', email, role: 'user' });  // Ejemplo de login
    navigate('/');
};

return (
    <div>
    <h2>Iniciar Sesión</h2>
    <form onSubmit={handleLogin}>
        <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Correo electrónico" 
        />
        <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Contraseña" 
        />
        <button type="submit">Iniciar Sesión</button>
    </form>
    </div>
);
};

export default LoginPage;
