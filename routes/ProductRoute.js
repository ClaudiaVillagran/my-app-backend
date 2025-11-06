const express = require('express')

const api = express.Router();

const productController = require('../controller/ProductController')

api.post('/agregarProducto', productController.CreateProduct)
api.delete('/eliminarProducto/:id', productController.EliminarProducto)
api.get('/traerProductos', productController.TraerProductos )
api.put('/editarProducto/:id', productController.EditarProducto )
module.exports = api;
