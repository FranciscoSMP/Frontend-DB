const bibliotecaModel = require('../models/bibliotecaModel');

exports.home = (req, res) => {
    res.render('home');
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

exports.editorial = (req, res) => {
    res.render('Editorial');
};

exports.empleado = (req, res) => {
    res.render('Empleado');
};

exports.libro = (req, res) => {
    res.render('Libro');
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

exports.guardarAutor = async (req, res) => {
    const { Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais } = req.body;

    try {
        await bibliotecaModel.guardarAutor({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais });
        res.redirect('/tabla/Autor');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el autor');
    }
};

exports.guardarCategoria= async (req, res) => {
    const { Nombre } = req.body;

    try {
        await bibliotecaModel.guardarCategoria({ Nombre });
        res.redirect('/tabla/categoria');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar la categoria');
    }
};

exports.guardarDepartamento= async (req, res) => {
    const { Nombre, Id_Pais } = req.body;

    try {
        await bibliotecaModel.guardarDepartamento({ Nombre, Id_Pais });
        res.redirect('/tabla/departamento');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el departamento');
    }
};

exports.guardarEditorial = async (req, res) => {
    const { Nombre, Id_Pais } = req.body;

    try {
        await bibliotecaModel.guardarEditorial({ Nombre, Id_Pais });
        res.redirect('/tabla/editorial');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar la editorial');
    }
};

exports.guardarEmpleado = async (req, res) => {
    const { Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion } = req.body;

    try {
        await bibliotecaModel.guardarEmpleado({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion });
        res.redirect('/tabla/empleado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el empleado');
    }
};

exports.guardarLibro = async (req, res) => {
    const { Titulo, Fecha_Publicacion, ISBN, Id_Editorial } = req.body;

    try {
        await bibliotecaModel.guardarLibro({ Titulo, Fecha_Publicacion, ISBN, Id_Editorial });
        res.redirect('/tabla/libro');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el libro');
    }
};

exports.guardarMiembro = async (req, res) => {
    const { Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio } = req.body;

    try {
        await bibliotecaModel.guardarMiembro({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio });
        res.redirect('/tabla/miembro');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el miembro');
    }
};

exports.guardarMunicipio = async (req, res) => {
    const { Nombre, Id_Departamento } = req.body;

    try {
        await bibliotecaModel.guardarMunicipio({ Nombre, Id_Departamento });
        res.redirect('/tabla/municipio');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el municipio');
    }
};

exports.guardarPais = async (req, res) => {
    const { Nombre } = req.body;

    try {
        await bibliotecaModel.guardarPais({ Nombre });
        res.redirect('/tabla/pais');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el pais');
    }
};

exports.autor = async (req, res) => {
    try {
        const paises = await bibliotecaModel.obtenerPaises(); // Obtener la lista de países
        res.render('Autor', { paises }); // Enviar los países a la vista
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar los datos de los países');
    }
};
