import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URI = 'http://localhost:4000/api/Usuarios';
const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [role, setRole] = useState('user'); // user | admin
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Dependiendo del rol, llamamos a /login o /login-admin
            const endpoint = role === 'user' ? '/login' : '/login-admin';
            const res = await axios.post(`${API_URI}${endpoint}`, { email, pass });
            const data = res.data;

            console.log("Datos recibidos del backend:", data);

            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.rol); // "Usuario" o "Administrador"

            setMessage(data.message);

            // Redirigir según el rol
            if (data.rol === 'Administrador') {
                navigate('/admin');
            } else {
                navigate('/user');
            }
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <label>Iniciar como:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>

                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;