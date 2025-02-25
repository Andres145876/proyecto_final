const express = require('express');
const router = express.Router();
const Producto = require('../esquemas/Productos');
const { authenticate, isAdmin } = require('../middleware/auth');

// Agregar un producto (Solo admin)
router.post('/agregar', authenticate, isAdmin, async (req, res) => {
    try {
        const { nombre, cantidad, precio } = req.body;

        if (!nombre || cantidad === undefined || !precio) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        let productoExistente = await Producto.findOne({ nombre });

        if (productoExistente) {
            return res.status(400).json({ message: 'El producto ya existe. Si deaseas agregar mas productos prueba con editar.' });
        }

        const nuevoProducto = new Producto({ nombre, cantidad, precio });
        await nuevoProducto.save();

        res.status(201).json({ message: 'Producto agregado correctamente', producto: nuevoProducto });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar producto', error: error.message });
    }
});

// Editar producto (modifica cantidad y precio)
router.put('/editar/:id', authenticate, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad, precio } = req.body;

        let producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        producto.cantidad = cantidad !== undefined ? cantidad : producto.cantidad;
        producto.precio = precio !== undefined ? precio : producto.precio;
        await producto.save();

        res.json({ message: 'Producto actualizado correctamente', producto });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
    }
});
// Obtener todos los productos
router.get('/ver', authenticate, async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
});

// Eliminar un producto (Solo admin)
router.delete('/eliminar/:id', authenticate, isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const productoEliminado = await Producto.findByIdAndDelete(id);
        if (!productoEliminado) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
});

// Comprar un producto (Usuarios eliminan el producto del inventario)
router.delete('/comprar/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        if (producto.cantidad > 0) {
            producto.cantidad -= 1;
            await producto.save();
            res.status(200).json({ message: 'Producto comprado', producto });
        } else {
            res.status(400).json({ message: 'Producto agotado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al comprar el producto', error: error.message });
    }
});

module.exports = router;