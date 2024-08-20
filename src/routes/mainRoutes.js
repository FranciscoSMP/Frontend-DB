// src/routes/mainRoutes.js
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);

router.get('/tabla/autor', mainController.autor);

// Ruta para mostrar el formulario de libros
router.get('/tabla/libros', mainController.libros);

// Ruta para procesar y guardar los datos de libros
router.post('/guardar/autor', mainController.guardarAutor);

// Ruta para procesar y guardar los datos de libros
router.post('/guardar/libros', mainController.guardarLibro);

module.exports = router;