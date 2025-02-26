// Definición de Módulos
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Llamada de esquemas MongoDB
const User = require('../esquemas/User'); // Cambié Login a User por claridad
const Admin = require('../esquemas/Admin');
const { authenticate, isAdmin } = require('../middleware/auth');

// Registro de usuario normal
router.post('/register', async (req, res) => {
    try {
        const { name, email, pass } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        const existingAdmin = await Admin.findOne({ email });
        
        if (existingUser || existingAdmin) {
            return res.status(400).json({ message: 'Esta cuenta ya esta registrada' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(pass, 10);

        // Crear un nuevo usuario
        const newUser = new User({ name, email, pass: hashedPassword });

        // Guardar en la base de datos
        await newUser.save();

        return res.status(201).json({ message: 'Bienvenido a cafeteria bora, ahora eres parte de muestra familia!!!' });
    } catch (error) {
        return res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
});

// Registro de administrador
router.post('/register-admin', async (req, res) => {
    try {
        const { name, email, pass } = req.body;

        // Verificar si el administrador ya existe
        const existingUser = await User.findOne({ email });
        const existingAdmin = await Admin.findOne({ email });
        
        if (existingUser || existingAdmin) {
            return res.status(400).json({ message: 'Esta cuenta ya esta registrada' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(pass, 10);

        // Crear un nuevo administrador
        const newAdmin = new Admin({ name, email, pass: hashedPassword });

        // Guardar en la base de datos
        await newAdmin.save();

        return res.status(201).json({ message: 'Administrador creado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error de servidor', error: error.message });
    }
});

// Inicio de sesión para usuarios normales
router.post('/login', async (req, res) => {
    try {
        const { email, pass } = req.body;

        // Buscar usuario en la base de datos
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(pass, user.pass);
        if (!isMatch) {
            return res.status(400).json({ message: 'Los campos son incorrectos, intenta de nuevo' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user._id, role: 'user' },
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        );

        // Decodificar token
        const decoded = jwt.decode(token);

        // Formatear timestamps en hora legible
        const formatTime = (timestamp) => 
            new Date(timestamp * 1000).toLocaleString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
                timeZone: 'America/Mexico_City' // Cambia según tu zona horaria
            });

        return res
            .status(200)
            .header('x-token-iat', decoded.iat)
            .header('x-token-exp', decoded.exp)
            .json({
                message: 'Inicio de sesión exitoso',
                token,
                emitido: formatTime(decoded.iat),
                expira: formatTime(decoded.exp),
                userId: user._id,
                rol:"Usuario"
            });

    } catch (error) {
        return res.status(500).json({ message: 'Error de servidor', error: error.message });
    }
});
router.post('/login-admin', async (req, res) => {
    try {
        const { email, pass } = req.body;

        // Buscar usuario en la base de datos
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(pass, admin.pass);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: admin._id, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        );

        // Decodificar token
        const decoded = jwt.decode(token);

        // Formatear timestamps en hora legible
        const formatTime = (timestamp) => 
            new Date(timestamp * 1000).toLocaleString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
                timeZone: 'America/Mexico_City' // Cambia según tu zona horaria  
            });

        return res
            .status(200)
            .header('x-token-iat', decoded.iat)
            .header('x-token-exp', decoded.exp)
            .json({
                message: 'Inicio de sesión exitoso',
                token,
                emitido: formatTime(decoded.iat),
                expira: formatTime(decoded.exp),
                userId: admin._id,
                rol:"Administrador"
            });

    } catch (error) {
        return res.status(500).json({ message: 'Error de servidor', error: error.message });
    }
});


// Obtener todos los usuarios normales (Solo admins)
router.get('/ver-usuarios', authenticate, isAdmin, async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
});

// Obtener todos los administradores (Solo admins)
router.get('/ver-admins', authenticate, isAdmin, async (req, res) => {
    try {
        const admins = await Admin.find();
        return res.status(200).json(admins);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener administradores', error: error.message });
    }
});

// Editar un usuario (Solo admins)
router.put('/editar-usuario/:id', authenticate, isAdmin, async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body; // Datos nuevos del usuario

        // Buscar y actualizar usuario
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({ message: 'Usuario actualizado correctamente', updatedUser });
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
});

// Eliminar un usuario (Solo admins
router.delete('/eliminar-usuario/:id', authenticate, isAdmin, async (req, res) => {
    try {
        console.log("Valor original de id:", req.params.id);
        const userId = req.params.id.trim();
        console.log("Valor de id después de trim:", userId);
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'El id proporcionado no es válido' });
        }

        // Eliminar el usuario de la base de datos
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
});






module.exports = router;