import React, { useState } from "react";
import Login from "../Componentes/Login";
import Register from "../Componentes/Register";
import ProductList from "../Componentes/ProductList";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <h1>Bienvenido a la Cafetería</h1>
      {!isAuthenticated ? (
        <>
          <Login onLogin={() => setIsAuthenticated(true)} />
          <Register />
        </>
      ) : (
        <ProductList />
      )}
    </div>
  );
};

export default Home;
