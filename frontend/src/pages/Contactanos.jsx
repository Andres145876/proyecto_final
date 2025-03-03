import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/Contactanos.css'; // Asegúrate de tener un archivo CSS para los estilos

const Contactanos = () => {
    return (
        <div>
            <header>
                <h1>Contacto</h1>
            </header>

            <nav>
                <Link to="/">Cerrar sesion</Link>
                <Link to="/user">Ver Menú y Pedir</Link>
                <Link to="/nosotros">Nosotros</Link>
                <Link to="/pagina-inicio">Inicio</Link>
                <a href="https://maps.app.goo.gl/Npx5byAWPpSfkHH19" target="_blank" rel="noopener noreferrer">Ubicación</a>
            </nav>

            <main>
                <section>
                    <h2>¿Cómo podemos ayudarte?</h2>
                    <div id="info-contacto">
                        <h3>Información de Contacto</h3>
                        <ul>
                            <li><strong>Dirección:</strong> Plaza Auriga segundo piso</li>
                            <li><strong>Teléfono:</strong> 8136206222</li>
                            <li><strong>Correo:</strong> contacto@cafeteriabora.com</li>
                        </ul>
                    </div>
                </section>
            </main>

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

export default Contactanos;