import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Contexto/Authentication';
import Home from './pages/Home';
import RegisterUser from './components/RegisterUser';
import RegisterAdmin from './components/RegisterAdmin';
import Login from './pages/Login';
import ProductList from './components/ProductList';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import ProtectedRoute from './components/ProtectedRoute';
import PaginaInicio from './pages/PaginaInicio';
import Nosotros from './pages/Nosotros';
import Contactanos from './pages/Contactanos';

function App() {
    return (
        <AuthProvider> 
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<RegisterUser />} />
                    <Route path="/register-admin" element={<RegisterAdmin />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/login-admin" element={<Login />} />
                    <Route path="/ver" element={<ProductList />} />
                    <Route path="/comprar" element={<ProductList />} />
                    <Route path="/pagina-inicio" element={<PaginaInicio />} />
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/contactanos" element={<Contactanos />} />

                    {/* Rutas protegidas */}
                    <Route path="/admin" element={
                        <ProtectedRoute role="Administrador">
                            <AdminPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/user" element={
                        <ProtectedRoute role="Usuario">
                            <UserPage />
                        </ProtectedRoute>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;