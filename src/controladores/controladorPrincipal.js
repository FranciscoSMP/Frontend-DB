const modeloBiblioteca = require('../modelos/modeloBiblioteca');

exports.inicio = (req, res) => {
    res.render('inicio');
};

exports.autor = (req, res) => {
    res.render('Autor');
};

exports.categoria = (req, res) => {
    res.render('Categoria');
};

exports.departamento = (req, res) => {
    res.render('Departamento');
};

exports.detalle_prestamo = (req, res) => {
    res.render('DetallePrestamo');
};

exports.editorial = (req, res) => {
    res.render('Editorial');
};

exports.empleado = (req, res) => {
    res.render('Empleado');
};

exports.libro = (req, res) => {
    res.render('Libro');
};

exports.libro_autor = (req, res) => {
    res.render('LibroAutor');
};

exports.libro_categoria = (req, res) => {
    res.render('LibroCategoria');
};

exports.miembro = (req, res) => {
    res.render('Miembro');
};

exports.municipio = (req, res) => {
    res.render('Municipio');
};

exports.pais = (req, res) => {
    res.render('Pais');
};

exports.prestamo = (req, res) => {
    res.render('Prestamo');
};

exports.guardarAutor = async (req, res) => {
    const { Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais } = req.body;

    try {
        await modeloBiblioteca.guardarAutor({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais });
        res.redirect('/tabla/Autor');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el autor');
    }
};

exports.guardarCategoria= async (req, res) => {
    const { Nombre } = req.body;

    try {
        await modeloBiblioteca.guardarCategoria({ Nombre });
        res.redirect('/tabla/categoria');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar la categoria');
    }
};

exports.guardarDepartamento= async (req, res) => {
    const { Nombre, Id_Pais } = req.body;

    try {
        await modeloBiblioteca.guardarDepartamento({ Nombre, Id_Pais });
        res.redirect('/tabla/departamento');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el departamento');
    }
};

exports.guardarDetallePrestamo= async (req, res) => {
    const { Id_Prestamo, Id_Libro } = req.body;

    try {
        await modeloBiblioteca.guardarDetallePrestamo({ Id_Prestamo, Id_Libro });
        res.redirect('/tabla/detalle_prestamo');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el detalle prestamo');
    }
};

exports.guardarEditorial = async (req, res) => {
    const { Nombre, Id_Pais } = req.body;

    try {
        await modeloBiblioteca.guardarEditorial({ Nombre, Id_Pais });
        res.redirect('/tabla/editorial');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar la editorial');
    }
};

exports.guardarEmpleado = async (req, res) => {
    const { Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion } = req.body;

    try {
        await modeloBiblioteca.guardarEmpleado({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion });
        res.redirect('/tabla/empleado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el empleado');
    }
};

exports.guardarLibro = async (req, res) => {
    const { Titulo, Fecha_Publicacion, ISBN, Id_Editorial } = req.body;

    try {
        await modeloBiblioteca.guardarLibro({ Titulo, Fecha_Publicacion, ISBN, Id_Editorial });
        res.redirect('/tabla/libro');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el libro');
    }
};

exports.guardarLibroAutor = async (req, res) => {
    const { Id_Libro, Id_Autor } = req.body;

    try {
        await modeloBiblioteca.guardarLibroAutor({ Id_Libro, Id_Autor });
        res.redirect('/tabla/libro_autor');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el libro_autor');
    }
};

exports.guardarLibroCategoria = async (req, res) => {
    const { Id_Libro, Id_Categoria } = req.body;

    try {
        await modeloBiblioteca.guardarLibroCategoria({ Id_Libro, Id_Categoria });
        res.redirect('/tabla/libro_categoria');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el libro_categoria');
    }
};

exports.guardarMiembro = async (req, res) => {
    const { Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio } = req.body;

    try {
        await modeloBiblioteca.guardarMiembro({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio });
        res.redirect('/tabla/miembro');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el miembro');
    }
};

exports.guardarMunicipio = async (req, res) => {
    const { Nombre, Id_Departamento } = req.body;

    try {
        await modeloBiblioteca.guardarMunicipio({ Nombre, Id_Departamento });
        res.redirect('/tabla/municipio');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el municipio');
    }
};

exports.guardarPais = async (req, res) => {
    const { Nombre } = req.body;

    try {
        await modeloBiblioteca.guardarPais({ Nombre });
        res.redirect('/tabla/pais');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el pais');
    }
};

exports.guardarPrestamo = async (req, res) => {
    const { Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion } = req.body;

    try {
        await modeloBiblioteca.guardarPrestamo({ Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion });
        res.redirect('/tabla/prestamo');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el prestamo');
    }
};