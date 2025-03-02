import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import RegisterUser from "./components/RegisterUser";
import RegisterAdmin from "./components/RegisterAdmin";
import ProductList from "./components/ProductList";
import AdminPage from './pages/AdminPage'; 
import UserPage from './pages/UserPage';
import Home from "./pages/Home";

function App() {
    const token = localStorage.getItem('token'); // Obtiene el token
    const rol = localStorage.getItem('role') || ''; // Obtiene el rol del usuario

    console.log("Rol obtenido desde localStorage en App.jsx:", rol);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/register-admin" element={<RegisterAdmin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login-admin" element={<Login />} />
                <Route path="/ver" element={<ProductList />} />
                <Route path="/comprar" element={<ProductList />} />

                {/* Rutas protegidas */}
                <Route 
                    path="/admin" 
                    element={token && rol === 'Administrador' ? <AdminPage /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/user" 
                    element={token && rol === 'Usuario' ? <UserPage /> : <Navigate to="/login" />} 
                />
            </Routes>
        </Router>
    );
}

export default App;
