const modeloBiblioteca = require('../modelos/modeloBiblioteca');

// Función genérica para renderizar vistas
const renderVista = (vista) => (req, res) => {
    res.render(vista);
};

// Función genérica para guardar datos
const guardarDatos = (modelo, redireccionar) => async (req, res) => {
    try {
        await modelo(req.body); // Usamos req.body aquí
        res.redirect(redireccionar);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Error al guardar ${redireccionar.slice(7)}`);
    }
};

// Renderización de vistas
exports.inicio = renderVista('Inicio');
exports.autor = renderVista('Autor');
exports.categoria = renderVista('Categoria');
exports.departamento = renderVista('Departamento');
exports.detalle_prestamo = renderVista('DetallePrestamo');
exports.editorial = renderVista('Editorial');
exports.empleado = renderVista('Empleado');
exports.libro = renderVista('Libro');
exports.libro_autor = renderVista('LibroAutor');
exports.libro_categoria = renderVista('LibroCategoria');
exports.miembro = renderVista('Miembro');
exports.municipio = renderVista('Municipio');
exports.pais = renderVista('Pais');
exports.prestamo = renderVista('Prestamo');

// Guardado de datos
exports.guardarAutor = guardarDatos(modeloBiblioteca.guardarAutor, '/tabla/Autor');
exports.guardarCategoria = guardarDatos(modeloBiblioteca.guardarCategoria, '/tabla/categoria');
exports.guardarDepartamento = guardarDatos(modeloBiblioteca.guardarDepartamento, '/tabla/departamento');
exports.guardarDetallePrestamo = guardarDatos(modeloBiblioteca.guardarDetallePrestamo, '/tabla/detalle_prestamo');
exports.guardarEditorial = guardarDatos(modeloBiblioteca.guardarEditorial, '/tabla/editorial');
exports.guardarEmpleado = guardarDatos(modeloBiblioteca.guardarEmpleado, '/tabla/empleado');
exports.guardarLibro = guardarDatos(modeloBiblioteca.guardarLibro, '/tabla/libro');
exports.guardarLibroAutor = guardarDatos(modeloBiblioteca.guardarLibroAutor, '/tabla/libro_autor');
exports.guardarLibroCategoria = guardarDatos(modeloBiblioteca.guardarLibroCategoria, '/tabla/libro_categoria');
exports.guardarMiembro = guardarDatos(modeloBiblioteca.guardarMiembro, '/tabla/miembro');
exports.guardarMunicipio = guardarDatos(modeloBiblioteca.guardarMunicipio, '/tabla/municipio');
exports.guardarPais = guardarDatos(modeloBiblioteca.guardarPais, '/tabla/pais');
exports.guardarPrestamo = guardarDatos(modeloBiblioteca.guardarPrestamo, '/tabla/prestamo');