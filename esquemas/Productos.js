const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true },
}, { timestamps: true });

ProductoSchema.virtual('precioTotal').get(function () {
    return this.cantidad * this.precio;
});

module.exports = mongoose.model('Producto', ProductoSchema);
