// Importamos el modelo que contiene las funciones para interactuar con la base de datos
const modeloBiblioteca = require('../modelos/modeloBiblioteca');

// Función genérica para renderizar vistas
// Recibe como parámetro el nombre de la vista que se desea renderizar
// Devuelve una función que renderiza esa vista cuando es llamada
const renderVista = (vista) => (req, res) => {
    res.render(vista); // Renderiza la vista con el nombre proporcionado
};

// Función genérica para guardar datos
// Recibe el modelo (función de guardado en la base de datos) y la ruta a la que redirigir después del guardado
const guardarDatos = (modelo, redireccionar) => async (req, res) => {
    try {
        await modelo(req.body); // Llama al modelo para guardar los datos enviados en req.body
        res.redirect(redireccionar); // Redirige al usuario a la página especificada tras el éxito
    } catch (error) {
        console.error(error); // En caso de error, imprime el error en consola
        res.status(500).send(`Error al guardar ${redireccionar.slice(7)}`); // Envía un mensaje de error al cliente
    }
};

// Renderización de vistas
// Define las funciones que renderizan cada una de las vistas específicas de la aplicación
exports.inicio = renderVista('Inicio'); // Renderiza la vista 'Inicio'
exports.autor = renderVista('Autor'); // Renderiza la vista 'Autor'
exports.categoria = renderVista('Categoria'); // Renderiza la vista 'Categoria'
exports.departamento = renderVista('Departamento'); // Renderiza la vista 'Departamento'
exports.detalle_prestamo = renderVista('DetallePrestamo'); // Renderiza la vista 'DetallePrestamo'
exports.editorial = renderVista('Editorial'); // Renderiza la vista 'Editorial'
exports.empleado = renderVista('Empleado'); // Renderiza la vista 'Empleado'
exports.libro = renderVista('Libro'); // Renderiza la vista 'Libro'
exports.libro_autor = renderVista('LibroAutor'); // Renderiza la vista 'LibroAutor'
exports.libro_categoria = renderVista('LibroCategoria'); // Renderiza la vista 'LibroCategoria'
exports.miembro = renderVista('Miembro'); // Renderiza la vista 'Miembro'
exports.municipio = renderVista('Municipio'); // Renderiza la vista 'Municipio'
exports.pais = renderVista('Pais'); // Renderiza la vista 'Pais'
exports.prestamo = renderVista('Prestamo'); // Renderiza la vista 'Prestamo'

// Guardado de datos
// Define las funciones que guardan datos para cada entidad específica de la biblioteca en la base de datos
exports.guardarAutor = guardarDatos(modeloBiblioteca.guardarAutor, '/tabla/Autor'); // Guarda un autor y redirige a la tabla de autores
exports.guardarCategoria = guardarDatos(modeloBiblioteca.guardarCategoria, '/tabla/categoria'); // Guarda una categoría y redirige a la tabla de categorías
exports.guardarDepartamento = guardarDatos(modeloBiblioteca.guardarDepartamento, '/tabla/departamento'); // Guarda un departamento y redirige a la tabla de departamentos
exports.guardarDetallePrestamo = guardarDatos(modeloBiblioteca.guardarDetallePrestamo, '/tabla/detalle_prestamo'); // Guarda un detalle de préstamo y redirige a la tabla de detalles de préstamo
exports.guardarEditorial = guardarDatos(modeloBiblioteca.guardarEditorial, '/tabla/editorial'); // Guarda una editorial y redirige a la tabla de editoriales
exports.guardarEmpleado = guardarDatos(modeloBiblioteca.guardarEmpleado, '/tabla/empleado'); // Guarda un empleado y redirige a la tabla de empleados
exports.guardarLibro = guardarDatos(modeloBiblioteca.guardarLibro, '/tabla/libro'); // Guarda un libro y redirige a la tabla de libros
exports.guardarLibroAutor = guardarDatos(modeloBiblioteca.guardarLibroAutor, '/tabla/libro_autor'); // Guarda una relación libro-autor y redirige a la tabla libro-autor
exports.guardarLibroCategoria = guardarDatos(modeloBiblioteca.guardarLibroCategoria, '/tabla/libro_categoria'); // Guarda una relación libro-categoría y redirige a la tabla libro-categoría
exports.guardarMiembro = guardarDatos(modeloBiblioteca.guardarMiembro, '/tabla/miembro'); // Guarda un miembro y redirige a la tabla de miembros
exports.guardarMunicipio = guardarDatos(modeloBiblioteca.guardarMunicipio, '/tabla/municipio'); // Guarda un municipio y redirige a la tabla de municipios
exports.guardarPais = guardarDatos(modeloBiblioteca.guardarPais, '/tabla/pais'); // Guarda un país y redirige a la tabla de países
exports.guardarPrestamo = guardarDatos(modeloBiblioteca.guardarPrestamo, '/tabla/prestamo'); // Guarda un préstamo y redirige a la tabla de préstamos