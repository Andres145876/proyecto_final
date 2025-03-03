import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/PaginaInicio.css';
import fondo from '../ass/fondo.jpg';

const PaginaInicio = () => {
    return (
        <div>
            <header>
                <h1>Bienvenidos a Cafetería Bora</h1>
            </header>

            <nav>
                <Link to="/">Cerrar sesion</Link>
                <Link to="/user">Ver Menú y Pedir</Link>
                <Link to="/contactanos">Contacto</Link>
                <Link to="/nosotros">Nosotros</Link>
                <a href="https://maps.app.goo.gl/Npx5byAWPpSfkHH19" target="_blank" rel="noopener noreferrer">Ubicación</a>
            </nav>

            <img src={fondo} alt="Cafetería Bora" style={{ width: '100%', maxHeight: '100', objectFit: 'cover' }} />

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

export default PaginaInicio;