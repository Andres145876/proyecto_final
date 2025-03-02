import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminPage = () => {
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');
    const [editing, setEditing] = useState(false); // Controla si estamos editando un producto
    const [currentProductId, setCurrentProductId] = useState(null);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductos();
        fetchUsuarios();
    }, []);

    const fetchProductos = async () => {
        const res = await fetch('http://localhost:4000/api/productos/ver', {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProductos(data);
    };

    const fetchUsuarios = async () => {
        const res = await fetch('http://localhost:4000/api/usuarios/ver-usuarios', {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUsuarios(data);
    };

    const eliminarProducto = async (id) => {
        await fetch(`http://localhost:4000/api/productos/eliminar/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchProductos();
    };

    const eliminarUsuario = async (id) => {
        await fetch(`http://localhost:4000/api/usuarios/eliminar-usuario/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchUsuarios();
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();

        if (!nombre || !cantidad || !precio) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            const res = await fetch('http://localhost:4000/api/productos/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ nombre, cantidad, precio }),
            });

            if (!res.ok) {
                throw new Error('Hubo un error al agregar el producto.');
            }

            alert('Producto agregado correctamente');
            setNombre('');
            setCantidad('');
            setPrecio('');
            fetchProductos();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEditProduct = async (e) => {
        e.preventDefault();

        if (!nombre || !cantidad || !precio) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        try {
            const res = await fetch(`http://localhost:4000/api/productos/editar/${currentProductId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ nombre, cantidad, precio }),
            });

            if (!res.ok) {
                throw new Error('Hubo un error al editar el producto.');
            }

            alert('Producto editado correctamente');
            setEditing(false);
            setCurrentProductId(null);
            setNombre('');
            setCantidad('');
            setPrecio('');
            fetchProductos();
        } catch (error) {
            setError(error.message);
        }
    };

    const startEditing = (producto) => {
        setNombre(producto.nombre);
        setCantidad(producto.cantidad);
        setPrecio(producto.precio);
        setEditing(true);
        setCurrentProductId(producto._id);
    };

    return (
        <div>
            <h2>Panel de Administrador</h2>

            <h3>Productos</h3>
            <button onClick={() => setEditing(true)}>Agregar Producto</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {editing ? (
                <div>
                    <h3>{currentProductId ? 'Editar Producto' : 'Agregar Producto'}</h3>
                    <form onSubmit={currentProductId ? handleEditProduct : handleAddProduct}>
                        <div>
                            <label>Nombre del Producto</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Cantidad</label>
                            <input
                                type="number"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Precio</label>
                            <input
                                type="number"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                            />
                        </div>
                        <button type="submit">{currentProductId ? 'Guardar Cambios' : 'Agregar Producto'}</button>
                        <button type="button" onClick={() => { setEditing(false); setCurrentProductId(null); }}>
                            Cancelar
                        </button>
                    </form>
                </div>
            ) : (
                <ul>
                    {productos.map((p) => (
                        <li key={p._id}>
                            {p.nombre} - {p.cantidad} disponibles - ${p.precio}
                            <button onClick={() => eliminarProducto(p._id)}>Eliminar</button>
                            <button onClick={() => startEditing(p)}>Editar</button>
                        </li>
                    ))}
                </ul>
            )}

            <h3>Usuarios</h3>
            <ul>
                {usuarios.map((u) => (
                    <li key={u._id}>
                        {u.name} - {u.email}
                        <button onClick={() => eliminarUsuario(u._id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;
