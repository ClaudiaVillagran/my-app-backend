const express = require('express')
const api = express.Router();

const userController = require('../controller/UserController')

api.post('/register', userController.registerUser)
api.get('/login', userController.login)
module.exports = api;
