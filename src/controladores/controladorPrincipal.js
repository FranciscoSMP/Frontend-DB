const modeloBiblioteca = require('../modelos/modeloBiblioteca');

// Función para renderizar vistas
// Devuelve una función que renderiza la vista especificada
exports.renderVista = (vista) => (req, res) => {
    res.render(vista);
};

// Rutas para renderizar vistas
// Asocia rutas específicas con vistas correspondientes
exports.inicio = exports.renderVista('Inicio');
exports.autor = exports.renderVista('Autor');
exports.categoria = exports.renderVista('Categoria');
exports.departamento = exports.renderVista('Departamento');
exports.detalle_prestamo = exports.renderVista('DetallePrestamo');
exports.editorial = exports.renderVista('Editorial');
exports.empleado = exports.renderVista('Empleado');
exports.libro = exports.renderVista('Libro');
exports.libro_autor = exports.renderVista('LibroAutor');
exports.libro_categoria = exports.renderVista('LibroCategoria');
exports.miembro = exports.renderVista('Miembro');
exports.municipio = exports.renderVista('Municipio');
exports.pais = exports.renderVista('Pais');
exports.prestamo = exports.renderVista('Prestamo');

// Mapa de modelos y rutas para el guardado
// Asocia cada tipo de registro con su modelo de guardado y ruta de redirección
const modelos = {
    autor: modeloBiblioteca.guardarAutor,
    categoria: modeloBiblioteca.guardarCategoria,
    departamento: modeloBiblioteca.guardarDepartamento,
    detalle_prestamo: modeloBiblioteca.guardarDetallePrestamo,
    editorial: modeloBiblioteca.guardarEditorial,
    empleado: modeloBiblioteca.guardarEmpleado,
    libro: modeloBiblioteca.guardarLibro,
    libro_autor: modeloBiblioteca.guardarLibroAutor,
    libro_categoria: modeloBiblioteca.guardarLibroCategoria,
    miembro: modeloBiblioteca.guardarMiembro,
    municipio: modeloBiblioteca.guardarMunicipio,
    pais: modeloBiblioteca.guardarPais,
    prestamo: modeloBiblioteca.guardarPrestamo
};

// Rutas para redirección después de guardar
const rutas = {
    autor: '/tabla/Autor',
    categoria: '/tabla/categoria',
    departamento: '/tabla/departamento',
    detalle_prestamo: '/tabla/detalle_prestamo',
    editorial: '/tabla/editorial',
    empleado: '/tabla/empleado',
    libro: '/tabla/libro',
    libro_autor: '/tabla/libro_autor',
    libro_categoria: '/tabla/libro_categoria',
    miembro: '/tabla/miembro',
    municipio: '/tabla/municipio',
    pais: '/tabla/pais',
    prestamo: '/tabla/prestamo'
};

// Mensajes de error personalizados para cada tipo de registro
const mensajesError = {
    autor: 'Error al guardar el autor',
    categoria: 'Error al guardar la categoría',
    departamento: 'Error al guardar el departamento',
    detalle_prestamo: 'Error al guardar el detalle del préstamo',
    editorial: 'Error al guardar la editorial',
    empleado: 'Error al guardar el empleado',
    libro: 'Error al guardar el libro',
    libro_autor: 'Error al guardar la relación libro-autor',
    libro_categoria: 'Error al guardar la relación libro-categoría',
    miembro: 'Error al guardar el miembro',
    municipio: 'Error al guardar el municipio',
    pais: 'Error al guardar el país',
    prestamo: 'Error al guardar el préstamo'
};

// Función genérica para guardar registros
// Guarda el registro en la base de datos y maneja errores
async function guardarRegistro(tipo, datos, res) {
    try {
        await modelos[tipo](datos);  // Llama al modelo correspondiente para guardar los datos
        res.redirect(rutas[tipo]);   // Redirige a la ruta correspondiente si el guardado es exitoso
    } catch (error) {
        console.error(error);        // Imprime el error en la consola para depuración
        res.status(500).send(mensajesError[tipo]);  // Envía un mensaje de error al cliente
    }
}

// Función para obtener datos del cuerpo de la solicitud
// Extrae los campos específicos del cuerpo de la solicitud basándose en el tipo de registro
const obtenerDatos = (tipo, body) => {
    // Define los campos requeridos para cada tipo de registro
    const datos = {
        autor: ['Primer_Nombre', 'Segundo_Nombre', 'Primer_Apellido', 'Segundo_Apellido', 'Id_Pais'],
        categoria: ['Nombre'],
        departamento: ['Nombre', 'Id_Pais'],
        detalle_prestamo: ['Id_Prestamo', 'Id_Libro'],
        editorial: ['Nombre', 'Id_Pais'],
        empleado: ['Primer_Nombre', 'Segundo_Nombre', 'Primer_Apellido', 'Segundo_Apellido', 'Puesto', 'Fecha_Contratacion'],
        libro: ['Titulo', 'Fecha_Publicacion', 'ISBN', 'Id_Editorial'],
        libro_autor: ['Id_Libro', 'Id_Autor'],
        libro_categoria: ['Id_Libro', 'Id_Categoria'],
        miembro: ['Primer_Nombre', 'Segundo_Nombre', 'Primer_Apellido', 'Segundo_Apellido', 'Telefono', 'Fecha_Registro', 'Id_Municipio'],
        municipio: ['Nombre', 'Id_Departamento'],
        pais: ['Nombre'],
        prestamo: ['Id_Miembro', 'Id_Empleado', 'Fecha_Prestamo', 'Fecha_Devolucion']
    };

    // Extrae los datos del cuerpo de la solicitud basándose en los campos definidos
    return datos[tipo].reduce((acc, campo) => {
        if (body[campo] !== undefined) {
            acc[campo] = body[campo];
        }
        return acc;
    }, {});
};

// Funciones para guardar registros específicos
// Llaman a la función genérica `guardarRegistro` con los datos extraídos
exports.guardarAutor = (req, res) => {
    const datos = obtenerDatos('autor', req.body);
    guardarRegistro('autor', datos, res);
};

exports.guardarCategoria = (req, res) => {
    const datos = obtenerDatos('categoria', req.body);
    guardarRegistro('categoria', datos, res);
};

exports.guardarDepartamento = (req, res) => {
    const datos = obtenerDatos('departamento', req.body);
    guardarRegistro('departamento', datos, res);
};

exports.guardarDetallePrestamo = (req, res) => {
    const datos = obtenerDatos('detalle_prestamo', req.body);
    guardarRegistro('detalle_prestamo', datos, res);
};

exports.guardarEditorial = (req, res) => {
    const datos = obtenerDatos('editorial', req.body);
    guardarRegistro('editorial', datos, res);
};

exports.guardarEmpleado = (req, res) => {
    const datos = obtenerDatos('empleado', req.body);
    guardarRegistro('empleado', datos, res);
};

exports.guardarLibro = (req, res) => {
    const datos = obtenerDatos('libro', req.body);
    guardarRegistro('libro', datos, res);
};

exports.guardarLibroAutor = (req, res) => {
    const datos = obtenerDatos('libro_autor', req.body);
    guardarRegistro('libro_autor', datos, res);
};

exports.guardarLibroCategoria = (req, res) => {
    const datos = obtenerDatos('libro_categoria', req.body);
    guardarRegistro('libro_categoria', datos, res);
};

exports.guardarMiembro = (req, res) => {
    const datos = obtenerDatos('miembro', req.body);
    guardarRegistro('miembro', datos, res);
};

exports.guardarMunicipio = (req, res) => {
    const datos = obtenerDatos('municipio', req.body);
    guardarRegistro('municipio', datos, res);
};

exports.guardarPais = (req, res) => {
    const datos = obtenerDatos('pais', req.body);
    guardarRegistro('pais', datos, res);
};

exports.guardarPrestamo = (req, res) => {
    const datos = obtenerDatos('prestamo', req.body);
    guardarRegistro('prestamo', datos, res);
};