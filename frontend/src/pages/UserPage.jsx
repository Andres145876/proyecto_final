import React, { useState, useEffect } from 'react';

const UserPage = () => {
    const [productos, setProductos] = useState([]);
    const token = localStorage.getItem('token'); // Obtiene el token del localStorage

    useEffect(() => {
        fetchProductos(); // Llama a la función para obtener los productos disponibles
    }, []);

    // Función para obtener los productos disponibles
    const fetchProductos = async () => {
        const res = await fetch('http://localhost:4000/api/productos/ver', {
            headers: { Authorization: `Bearer ${token}` }, // Envia el token en las cabeceras
        });
        const data = await res.json();
        setProductos(data); // Establece los productos en el estado
    };

    // Función para comprar un producto
    const comprarProducto = async (id) => {
        await fetch(`http://localhost:4000/api/productos/comprar/${id}`, {
            method: 'DELETE', // Método para eliminar el producto después de la compra
            headers: { Authorization: `Bearer ${token}` }, // Envia el token en las cabeceras
        });
        fetchProductos(); // Actualiza la lista de productos después de la compra
    };

    return (
        <div>
            <h2>Bienvenido, Usuario</h2>

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
