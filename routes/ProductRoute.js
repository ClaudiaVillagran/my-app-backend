const express = require('express')

const api = express.Router();

const productController = require('../controller/ProductController')

api.post('/agregarProducto', productController.CreateProduct)


module.exports = api;
