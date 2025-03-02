import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
    const user = JSON.parse(localStorage.getItem('user')); // Obtener el usuario desde localStorage
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    if (user.role !== role) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
