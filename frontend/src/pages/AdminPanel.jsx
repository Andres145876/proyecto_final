// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URI = 'http://localhost:4000';

const AdminPanel = () => {
const [usuarios, setUsuarios] = useState([]);
const [admins, setAdmins] = useState([]);
const [message, setMessage] = useState('');

const token = localStorage.getItem('token');

useEffect(() => {
    fetchUsuarios();
    fetchAdmins();
}, []);

const fetchUsuarios = async () => {
    try {
    const res = await axios.get(`${API_URI}/ver-usuarios`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    setUsuarios(res.data);
    } catch (err) {
    console.error('Error al obtener usuarios:', err);
    }
};

const fetchAdmins = async () => {
    try {
    const res = await axios.get(`${API_URI}/ver-admins`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    setAdmins(res.data);
    } catch (err) {
    console.error('Error al obtener admins:', err);
    }
};

const handleEliminarUsuario = async (id) => {
    try {
    const res = await axios.delete(`${API_URI}/eliminar-usuario/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    setMessage(res.data.message);
      // Recargar la lista de usuarios
    fetchUsuarios();
    } catch (err) {
    setMessage(err.response?.data?.message || 'Error al eliminar usuario');
    }
};

return (
    <div className="admin-panel">
    <h2>Panel de Administrador</h2>

    <h3>Usuarios Registrados</h3>
    <ul>
        {usuarios.map((u) => (
        <li key={u._id}>
            {u.name} - {u.email}{' '}
            <button onClick={() => handleEliminarUsuario(u._id)}>Eliminar</button>
        </li>
        ))}
    </ul>

    <h3>Administradores Registrados</h3>
    <ul>
        {admins.map((a) => (
        <li key={a._id}>
            {a.name} - {a.email}
            {/* Podrías agregar botón de eliminar o editar admin si lo deseas */}
        </li>
        ))}
    </ul>

    {message && <p>{message}</p>}
    </div>
);
};

export default AdminPanel;
