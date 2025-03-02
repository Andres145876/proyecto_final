import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import '../estilos/UserPage.css';

const UserPage = () => {
    const [productos, setProductos] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();  // Inicializar useNavigate

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        const res = await fetch('http://localhost:4000/api/productos/ver', {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProductos(data);
    };

    const comprarProducto = async (id) => {
        await fetch(`http://localhost:4000/api/productos/comprar/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchProductos();
    };

    // Función para redirigir a la página principal
    const handleGoHome = () => {
        navigate('/');  // Redirige a la página principal
    };

    return (
        <div>
            <h2>Bienvenido, Usuario</h2>

            <button onClick={handleGoHome}>Volver a Inicio</button>  {/* Botón para volver a la página principal */}

            <h3>Productos Disponibles</h3>
            <ul>
                {productos.map((p) => (
                    <li key={p._id}>
                        {p.nombre} - {p.cantidad} disponibles - ${p.precio}
                        <button onClick={() => comprarProducto(p._id)}>Comprar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserPage;
