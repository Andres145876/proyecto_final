// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URI = 'http://localhost:4000/api/Productos';

const ProductList = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get(`${API_URI}/productos/ver`);
        setProductos(res.data);
      } catch (err) {
        console.error('Error al obtener productos:', err);
      }
    };
    fetchProductos();
  }, []);

  const handleComprar = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.delete(`${API_URI}/productos/comprar/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.message);
      // Recargar productos
      const updated = await axios.get(`${API_URI}/productos/ver`);
      setProductos(updated.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Error al comprar producto');
    }
  };

  return (
    <div>
      <h3>Lista de Productos</h3>
      <ul>
        {productos.map((prod) => (
          <li key={prod._id}>
            {prod.nombre} - Cantidad: {prod.cantidad} - Precio: {prod.precio}
            {' '}
            <button onClick={() => handleComprar(prod._id)}>Comprar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
