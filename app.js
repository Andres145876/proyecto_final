const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Importar rutas
const authRoutes = require('./Rutas/Usuarios.js');

//const productRoutes = require('./Rutas/Users.js');

dotenv.config();

const app = express();

// Middleware globales
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    // Eliminamos las opciones deprecated
})
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
    })
    .catch((error) => {
        console.error('Error al conectar con MongoDB:', error);
    });

// Rutas
app.use('/api/Usuarios', authRoutes);
//app.use('/api/Users', productRoutes);

// Ruta raíz
app.get('/', (req, res) => {
    console.log('Ruta raíz accedida');
    res.send('API de gestión de productos');
});

// Manejo de errores globales
app.use((err, req, res, next) => {
    console.error('Error inesperado:', err);
    res.status(500).json({ message: 'Hubo un error en el servidor' });
});

// Exportamos la instancia de la aplicación para poder usarla en Supertest
module.exports = app;
