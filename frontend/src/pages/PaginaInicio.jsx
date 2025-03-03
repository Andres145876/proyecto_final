import { Link } from "react-router-dom";

const Index = () => {
    return (
        <div>
        <h1>Bienvenido a la Cafetería</h1>
        <nav>
            <ul>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/contactanos">Contáctanos</Link></li>
            <li><Link to="/cart">Carrito</Link></li>
            <li><Link to="/">Cerrar sesión</Link></li>
            </ul>
        </nav>
        </div>
    );
    };

    export default Index;