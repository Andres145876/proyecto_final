import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
return (
    <nav>
    <Link to="/nosotros">Nosotros</Link>
    <Link to="/contactanos">Contacto</Link>
    <Link to="/cart">Ver Menú y Pedir</Link>
    <Link to="/login">Cerrar sesión</Link>
    <a href="https://maps.app.goo.gl/Npx5byAWPpSfkHH19" target="_blank" rel="noopener noreferrer">Ubicación</a>
    </nav>
);
};

export default NavBar;
