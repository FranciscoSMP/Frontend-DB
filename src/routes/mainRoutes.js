const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);

router.get('/tabla/autor', mainController.autor);
router.get('/tabla/categoria', mainController.categoria);

// Ruta para procesar y guardar los datos de libros
router.post('/guardar/autor', mainController.guardarAutor);
router.post('/guardar/categoria', mainController.guardarCategoria);

module.exports = router;