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