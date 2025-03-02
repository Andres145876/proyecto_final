import React, { useEffect } from 'react';
import RegisterUser from '../components/RegisterUser';
import RegisterAdmin from '../components/RegisterAdmin';
import Login from '../components/Login';
import { useAuth } from '../Contexto/Authentication';
import { useNavigate } from 'react-router-dom';
import '../estilos/HomePage.css';

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Estado del usuario:', user);

        if (user) {
            if (user.role === 'Administrador') {
                navigate('/admin');
            } else if (user.role === 'Usuario') {
                navigate('/user');
            }
        }
    }, [user, navigate]);

    return (
        <div className="home-container">
            <h1>Bienvenido a la Cafetería</h1>
            <p>Regístrate o inicia sesión para ser parte de nuestra:</p>

            <div className="forms-container">
                <RegisterUser />
                <RegisterAdmin />
                <Login />
            </div>
        </div>
    );
};

export default Home;