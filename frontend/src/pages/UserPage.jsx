import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../estilos/UserPage.css';

const UserPage = () => {
    const [productos, setProductos] = useState([]);
    const [originalProductos, setOriginalProductos] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        const res = await fetch('http://localhost:4000/api/productos/ver', {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setProductos(data);
        setOriginalProductos(data.map(producto => ({ ...producto }))); // Guardar una copia del estado original
    };

    const comprarProducto = (producto) => {
        if (producto.cantidad <= 0) {
            alert(`Lo sentimos, ya no tenemos ${producto.nombre}`);
            return;
        }

        const exists = allProducts.some(item => item.title === producto.nombre);

        if (exists) {
            const updatedProducts = allProducts.map(item => {
                if (item.title === producto.nombre) {
                    if (producto.cantidad > 0) {
                        item.quantity++;
                        producto.cantidad--;
                    }
                    return item;
                } else {
                    return item;
                }
            });
            setAllProducts(updatedProducts);
        } else {
            if (producto.cantidad > 0) {
                const newProduct = {
                    quantity: 1,
                    title: producto.nombre,
                    price: producto.precio,
                };
                producto.cantidad--;
                setAllProducts([...allProducts, newProduct]);
            }
        }
    };

    const eliminarProducto = (title) => {
        const updatedProducts = allProducts.filter(item => item.title !== title);
        const producto = productos.find(item => item.nombre === title);
        const originalProducto = originalProductos.find(item => item.nombre === title);

        if (producto && originalProducto) {
            producto.cantidad = originalProducto.cantidad; // Restaurar la cantidad original
        }

        setAllProducts(updatedProducts);
    };

    const handleGoHome = () => {
        navigate('/');  // Redirige a la página principal
    };

    const handleComprar = async () => {
        await Promise.all(allProducts.map(async (product) => {
            const producto = productos.find(item => item.nombre === product.title);
            if (producto) {
                for (let i = 0; i < product.quantity; i++) {
                    await fetch(`http://localhost:4000/api/productos/comprar/${producto._id}`, {
                        method: 'DELETE',
                        headers: { Authorization: `Bearer ${token}` },
                    });
                }
            }
        }));
        setAllProducts([]);
        fetchProductos();
    };

    const total = allProducts.reduce((acc, product) => acc + product.quantity * product.price, 0);
    const totalOfProducts = allProducts.reduce((acc, product) => acc + product.quantity, 0);

    return (
        <div>
            <header>
                <h1>Realiza tu pedido aquí</h1>
                <nav>
                    <Link to="/">Cerrar sesión</Link>
                    <Link to="/user">Ver Menú y Pedir</Link>
                    <Link to="/nosotros">Nosotros</Link>
                    <Link to="/pagina-inicio">Inicio</Link>
                    <a href="https://maps.app.goo.gl/Npx5byAWPpSfkHH19" target="_blank" rel="noopener noreferrer">Ubicación</a>
                </nav>
                <div className="container-icon" onClick={() => document.querySelector('.container-cart-products').classList.toggle('hidden-cart')}>
                    <div className="container-cart-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="icon-cart"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>
                        <div className="count-products">
                            <span id="contador-productos">{totalOfProducts}</span>
                        </div>
                    </div>
                </div>
                <div className="container-cart-products hidden-cart">
                    {allProducts.length === 0 ? (
                        <p className="cart-empty">El carrito está vacío</p>
                    ) : (
                        <>
                            <div className="row-product">
                                {allProducts.map((product, index) => (
                                    <div className="cart-product" key={index}>
                                        <div className="info-cart-product">
                                            <span className="cantidad-producto-carrito">{product.quantity}</span>
                                            <p className="titulo-producto-carrito">{product.title}</p>
                                            <span className="precio-producto-carrito">${product.price}</span>
                                        </div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="icon-close"
                                            onClick={() => eliminarProducto(product.title)}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                            <div className="cart-total">
                                <h3>Total:</h3>
                                <span className="total-pagar">${total}</span>
                            </div>
                            <button className="btn-comprar" onClick={handleComprar}>Comprar</button>
                        </>
                    )}
                </div>
            </header>
            <div className="container-items">
                {productos.map((producto) => (
                    <div className="item" key={producto._id}>
                        <figure>
                            <img src={producto.imagen} alt={producto.nombre} />
                        </figure>
                        <div className="info-product">
                            <h2>{producto.nombre}</h2>
                            <p className="price">${producto.precio}</p>
                            <button className="btn-add-cart" onClick={() => comprarProducto(producto)}>Añadir al carrito</button>
                        </div>
                    </div>
                ))}
            </div>
            <footer>
            <p>&copy; 2025 Cafetería Bora. Todos los derechos reservados.</p>
                <p>Síguenos en:
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> |
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </p>
            </footer>
        </div>
    );
};

export default UserPage;