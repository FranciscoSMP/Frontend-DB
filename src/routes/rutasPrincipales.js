const express = require('express'); // Importa el módulo express
const router = express.Router(); // Crea una instancia de Router para manejar rutas
const mainController = require('../controladores/controladorPrincipal'); // Importa el controlador principal

// Rutas GET para mostrar las vistas de inicio
router.get('/', mainController.inicio); // Ruta para la página de inicio
router.get('/inicio', mainController.inicio); // Alternativa de la página de inicio

// Rutas GET para mostrar las tablas de la base de datos
router.get('/tabla/autor', mainController.autor); // Muestra la tabla de autores
router.get('/tabla/categoria', mainController.categoria); // Muestra la tabla de categorías
router.get('/tabla/departamento', mainController.departamento); // Muestra la tabla de departamentos
router.get('/tabla/detalle_prestamo', mainController.detalle_prestamo); // Muestra la tabla de detalles de préstamos
router.get('/tabla/editorial', mainController.editorial); // Muestra la tabla de editoriales
router.get('/tabla/empleado', mainController.empleado); // Muestra la tabla de empleados
router.get('/tabla/libro', mainController.libro); // Muestra la tabla de libros
router.get('/tabla/libro_autor', mainController.libro_autor); // Muestra la tabla intermedia de libros y autores
router.get('/tabla/libro_categoria', mainController.libro_categoria); // Muestra la tabla intermedia de libros y categorías
router.get('/tabla/miembro', mainController.miembro); // Muestra la tabla de miembros
router.get('/tabla/municipio', mainController.municipio); // Muestra la tabla de municipios
router.get('/tabla/pais', mainController.pais); // Muestra la tabla de países
router.get('/tabla/prestamo', mainController.prestamo); // Muestra la tabla de préstamos

// Rutas POST para guardar registros en la base de datos
router.post('/guardar/autor', mainController.guardarAutor); // Guarda un nuevo autor
router.post('/guardar/categoria', mainController.guardarCategoria); // Guarda una nueva categoría
router.post('/guardar/departamento', mainController.guardarDepartamento); // Guarda un nuevo departamento
router.post('/guardar/detalle_prestamo', mainController.guardarDetallePrestamo); // Guarda un nuevo detalle de préstamo
router.post('/guardar/editorial', mainController.guardarEditorial); // Guarda una nueva editorial
router.post('/guardar/empleado', mainController.guardarEmpleado); // Guarda un nuevo empleado
router.post('/guardar/libro', mainController.guardarLibro); // Guarda un nuevo libro
router.post('/guardar/libro_autor', mainController.guardarLibroAutor); // Guarda una nueva relación entre libro y autor
router.post('/guardar/libro_categoria', mainController.guardarLibroCategoria); // Guarda una nueva relación entre libro y categoría
router.post('/guardar/miembro', mainController.guardarMiembro); // Guarda un nuevo miembro
router.post('/guardar/municipio', mainController.guardarMunicipio); // Guarda un nuevo municipio
router.post('/guardar/pais', mainController.guardarPais); // Guarda un nuevo país
router.post('/guardar/prestamo', mainController.guardarPrestamo); // Guarda un nuevo préstamo

module.exports = router; // Exporta el router para que pueda ser utilizado en otras partes de la aplicación
