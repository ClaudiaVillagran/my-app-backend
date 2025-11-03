const express = require('express')

const api = express.Router();

const productController = require('../controller/ProductController')

api.post('/agregarProducto', productController.CreateProduct)
api.delete('/eliminarProducto/:id', productController.EliminarProducto)

module.exports = api;
