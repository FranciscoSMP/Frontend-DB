const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/home', mainController.home);

router.get('/tabla/autor', mainController.autor);
router.get('/tabla/categoria', mainController.categoria);
router.get('/tabla/departamento', mainController.departamento);
router.get('/tabla/editorial', mainController.editorial);

router.post('/guardar/autor', mainController.guardarAutor);
router.post('/guardar/categoria', mainController.guardarCategoria);
router.post('/guardar/departamento', mainController.guardarDepartamento);
router.post('/guardar/editorial', mainController.guardarEditorial);

module.exports = router;