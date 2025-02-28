import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [pass, setpass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pass }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      onLogin();
    } else {
      alert(data.message || "Error en el inicio de sesión");
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={pass} onChange={(e) => setpass(e.target.value)} required />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
