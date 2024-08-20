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