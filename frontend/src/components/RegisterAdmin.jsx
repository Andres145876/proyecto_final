// src/components/RegisterAdmin.jsx
import React, { useState } from 'react';
import axios from 'axios';

const API_URI = 'http://localhost:4000/api/Usuarios';

const RegisterAdmin = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [pass, setPass] = useState('');
const [message, setMessage] = useState('');

const handleRegisterAdmin = async (e) => {
    e.preventDefault();
    try {
    const res = await axios.post(`${API_URI}/register-admin`, { name, email, pass });
    setMessage(res.data.message);
    } catch (err) {
    setMessage(err.response?.data?.message || 'Error al registrar admin');
    }
};

return (
    <div className="register-container">
    <h2>Registro de Administrador</h2>
    <form onSubmit={handleRegisterAdmin}>
        <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        />
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
        <button type="submit">Registrar Admin</button>
    </form>
    {message && <p>{message}</p>}
    </div>
);
};

export default RegisterAdmin;
