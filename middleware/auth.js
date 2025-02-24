const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware de autenticación
const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Acceso denegado: No se proporcionó un token' });
    }

    // Obtener el token del encabezado
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (!verified || !verified.role) {
            return res.status(403).json({ message: 'Token inválido o sin permisos' });
        }

        req.user = verified; // Asigna la info del usuario al request
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

// Middleware para verificar si el usuario es admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado: Se requieren permisos de administrador' });
    }
    next();
};

module.exports = { authenticate, isAdmin };