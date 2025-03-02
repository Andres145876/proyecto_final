// src/pages/UserHome.jsx
import React from 'react';
import ProductList from '../components/ProductList';

const UserHome = () => {
return (
    <div className="user-home">
    <h2>Bienvenido, Usuario</h2>
      {/* Muestra la lista de productos para comprar */}
    <ProductList />
    </div>
);
};

export default UserHome;
