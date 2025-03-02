import React from 'react';
import RegisterUser from '../components/RegisterUser';
import RegisterAdmin from '../components/RegisterAdmin';
import Login from '../components/Login';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenido a la Cafetería</h1>
      <p>Regístrate o inicia sesión según tu rol:</p>

      <div className="forms-container">
        {/* Formulario para registrar un usuario normal */}
        <RegisterUser />

        {/* Formulario para registrar un administrador */}
        <RegisterAdmin />

        {/* Formulario de login con opción de logueo como usuario o admin */}
        <Login />
      </div>
    </div>
  );
};

export default Home;
