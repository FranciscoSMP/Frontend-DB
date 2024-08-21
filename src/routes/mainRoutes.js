const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.home);
router.get('/home', mainController.home);

router.get('/tabla/autor', mainController.autor);
router.get('/tabla/categoria', mainController.categoria);
router.get('/tabla/departamento', mainController.departamento);
router.get('/tabla/editorial', mainController.editorial);
router.get('/tabla/empleado', mainController.empleado);
router.get('/tabla/libro', mainController.libro);
router.get('/tabla/miembro', mainController.miembro);
router.get('/tabla/municipio', mainController.municipio);
router.get('/tabla/pais', mainController.pais);

router.post('/guardar/autor', mainController.guardarAutor);
router.post('/guardar/categoria', mainController.guardarCategoria);
router.post('/guardar/departamento', mainController.guardarDepartamento);
router.post('/guardar/empleado', mainController.guardarEmpleado);
router.post('/guardar/libro', mainController.guardarLibro);
router.post('/guardar/miembro', mainController.guardarMiembro);
router.post('/guardar/pais', mainController.guardarPais);

module.exports = router;