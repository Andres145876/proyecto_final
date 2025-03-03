import React from 'react';
import { Link } from 'react-router-dom';
import '../estilos/Nosotros.css'; // Asegúrate de tener un archivo CSS para los estilos

const Nosotros = () => {
    return (
        <div>
            <header>
                <h1>Nosotros</h1>
            </header>

            <nav>
                <Link to="/">Cerrar sesion</Link>
                <Link to="/user">Ver Menú y Pedir</Link>
                <Link to="/contactanos">Contacto</Link>
                <Link to="/pagina-inicio">Inicio</Link>
                <a href="https://maps.app.goo.gl/Npx5byAWPpSfkHH19" target="_blank" rel="noopener noreferrer">Ubicación</a>
            </nav>

            <main>
                <section>
                    <h2>Sobre Nosotros</h2>
                    <p>Esta es una cafetería donde puedes venir a pasarla bien con tus amigos y disfrutar el momento. Nos enorgullecemos de ofrecer un ambiente relajado y estético, perfecto para desconectar del estrés diario. 
                    Además, contamos con una amplia variedad de cafes y postres para todos los gustos. ¡Ven y vive la experiencia Bora!</p>
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

export default Nosotros;