const conexionMySQL = require('../conexiones_db/conexionMySQL');
const conexionOracle = require('../conexiones_db/conexionOracle');
const conexionSQLServer = require('../conexiones_db/conexionSQLServer');

exports.guardarAutor = async ({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais }) => {
    
    const query = `INSERT INTO autor (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais) VALUES ('${Primer_Nombre}', '${Segundo_Nombre}', '${Primer_Apellido}', '${Segundo_Apellido}', ${Id_Pais})`;

    await conexionMySQL.query(query, [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais]);

    const conSQL = await conexionSQLServer.poolPromise;
    await conSQL.request().query(query);

    const conOracle = await conexionOracle.conectar();
        await conOracle.execute(
            `INSERT INTO autor (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais) VALUES (:Primer_Nombre, :Segundo_Nombre, :Primer_Apellido, :Segundo_Apellido, :Id_Pais)`,
            {
                Primer_Nombre: Primer_Nombre,
                Segundo_Nombre: Segundo_Nombre,
                Primer_Apellido: Primer_Apellido,
                Segundo_Apellido: Segundo_Apellido,
                Id_Pais: Id_Pais
            },
            { autoCommit: true }
        );
        await conOracle.close();

};

exports.guardarCategoria = async ({ Nombre }) => {
    
    const query = `INSERT INTO categoria (Nombre) VALUES ('${Nombre}')`;

    await conexionMySQL.query(query, [Nombre]);

    const conSQL = await conexionSQLServer.poolPromise;
    await conSQL.request().query(query);

    const conOracle = await conexionOracle.conectar();
        await conOracle.execute(
            `INSERT INTO categoria (Nombre) VALUES (:Nombre)`,
            {
                Nombre: Nombre
            },
            { autoCommit: true }
        );
        await conOracle.close();

};

exports.guardarDepartamento = async ({ Nombre, Id_Pais }) => {
    
    const query = `INSERT INTO departamento (Nombre, Id_Pais) VALUES ('${Nombre}', ${Id_Pais})`;

    await conexionMySQL.query(query, [Nombre, Id_Pais]);

    const conSQL = await conexionSQLServer.poolPromise;
    await conSQL.request().query(query);

    const conOracle = await conexionOracle.conectar();
        await conOracle.execute(
            `INSERT INTO departamento (Nombre, Id_Pais) VALUES (:Nombre, :Id_Pais)`,
            {
                Nombre: Nombre,
                Id_Pais: Id_Pais
            },
            { autoCommit: true }
        );
        await conOracle.close();

};

exports.guardarDetallePrestamo = async ({ Id_Prestamo, Id_Libro }) => {
    
    const query = `INSERT INTO detalle_prestamo (Id_Prestamo, Id_Libro) VALUES (${Id_Prestamo}, ${Id_Libro})`;

    await conexionMySQL.query(query, [Id_Prestamo, Id_Libro]);

    const conSQL = await conexionSQLServer.poolPromise;
    await conSQL.request().query(query);

    const conOracle = await conexionOracle.conectar();
        await conOracle.execute(
            `INSERT INTO detalle_prestamo (Id_Prestamo, Id_Libro) VALUES (:Id_Prestamo, :Id_Libro)`,
            {
                Id_Prestamo: Id_Prestamo,
                Id_Libro: Id_Libro
            },
            { autoCommit: true }
        );
        await conOracle.close();
};

exports.guardarEditorial = async ({ Nombre, Id_Pais }) => {
    
    const query = `INSERT INTO editorial (Nombre, Id_Pais) VALUES ('${Nombre}', ${Id_Pais})`;

    await conexionMySQL.query(query, [Nombre, Id_Pais]);

    const conSQL = await conexionSQLServer.poolPromise;
    await conSQL.request().query(query);

    const conOracle = await conexionOracle.conectar();
        await conOracle.execute(
            `INSERT INTO editorial (Nombre, Id_Pais) VALUES (:Nombre, :Id_Pais)`,
            {
                Nombre: Nombre,
                Id_Pais: Id_Pais
            },
            { autoCommit: true }
        );
        await conOracle.close();
};

exports.guardarEmpleado = async ({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion }) => {

    
    const formatoFecha = new Date(Fecha_Contratacion).toISOString().slice(0, 10);

    const query = `INSERT INTO empleado (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion) 
                   VALUES ('${Primer_Nombre}', '${Segundo_Nombre}', '${Primer_Apellido}', '${Segundo_Apellido}', '${Puesto}', '${Fecha_Contratacion}')`;

    await conexionMySQL.query(query, [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion]);

    const conSQL = await conexionSQLServer.poolPromise;
    await conSQL.request().query(query);

    const conOracle = await conexionOracle.conectar();
    await conOracle.execute(
        `INSERT INTO empleado (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion) 
         VALUES (:Primer_Nombre, :Segundo_Nombre, :Primer_Apellido, :Segundo_Apellido, :Puesto, TO_DATE(:fechaContratacion, 'YYYY-MM-DD'))`,
        {
            Primer_Nombre: Primer_Nombre,
            Segundo_Nombre: Segundo_Nombre,
            Primer_Apellido: Primer_Apellido,
            Segundo_Apellido: Segundo_Apellido,
            Puesto: Puesto,
            fechaContratacion: formatoFecha
        },
        { autoCommit: true }
    );
    await conOracle.close();
};

exports.guardarLibro = async ({ Titulo, Fecha_Publicacion, ISBN, Id_Editorial }) => {

    const formatoFecha = new Date(Fecha_Publicacion).toISOString().slice(0, 10);

    const query = `INSERT INTO libro (Titulo, Fecha_Publicacion, ISBN, Id_Editorial) 
                   VALUES ('${Titulo}', '${Fecha_Publicacion}', '${ISBN}', ${Id_Editorial})`;

    await conexionMySQL.query(query, [Titulo, Fecha_Publicacion, ISBN, Id_Editorial]);

    const conSQL = await conexionSQLServer.poolPromise;
    await conSQL.request().query(query);

    const conOracle = await conexionOracle.conectar();
    await conOracle.execute(
        `INSERT INTO libro (Titulo, Fecha_Publicacion, ISBN, Id_Editorial) 
         VALUES (:Titulo, TO_DATE(:fechaPublicacion, 'YYYY-MM-DD'), :ISBN, :Id_Editorial)`,
        {
            Titulo: Titulo,
            fechaPublicacion: formatoFecha,
            ISBN: ISBN,
            Id_Editorial: Id_Editorial
        },
        { autoCommit: true }
    );
    await conOracle.close();
};

exports.guardarLibroAutor = async ({ Id_Libro, Id_Autor }) => {

    const query = `INSERT INTO libro_autor (Id_Libro, Id_Autor) 
                   VALUES (${Id_Libro}, ${Id_Autor})`;

    await conexionMySQL.query(query, [Id_Libro, Id_Autor]);

    const conSQL = await conexionSQLServer.poolPromise;
    await conSQL.request().query(query);

    const conOracle = await conexionOracle.conectar();
    await conOracle.execute(
        `INSERT INTO libro_autor (Id_Libro, Id_Autor) 
         VALUES (:Id_Libro, :Id_Autor)`,
        {
            Id_Libro: Id_Libro,
            Id_Autor: Id_Autor
        },
        { autoCommit: true }
    );
    await conOracle.close();
};

exports.guardarLibroCategoria = async ({ Id_Libro, Id_Categoria }) => {

    const query = `INSERT INTO libro_categoria (Id_Libro, Id_Categoria) 
                   VALUES (${Id_Libro}, ${Id_Categoria})`;

    await conexionMySQL.query(query, [Id_Libro, Id_Categoria]);

    const conSQL = await conexionSQLServer.poolPromise;
    await conSQL.request().query(query);

    const conOracle = await conexionOracle.conectar();
    await conOracle.execute(
        `INSERT INTO libro_categoria (Id_Libro, Id_Categoria) 
         VALUES (:Id_Libro, :Id_Categoria)`,
        {
            Id_Libro: Id_Libro,
            Id_Categoria: Id_Categoria
        },
        { autoCommit: true }
    );
    await conOracle.close();
};

exports.guardarMiembro = async ({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio }) => {

    const formatoFecha = new Date(Fecha_Registro).toISOString().slice(0, 10);

    const query = `INSERT INTO miembro (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio) 
                   VALUES ('${Primer_Nombre}', '${Segundo_Nombre}', '${Primer_Apellido}', '${Segundo_Apellido}', '${Telefono}', '${Fecha_Registro}', ${Id_Municipio})`;

    await conexionMySQL.query(query, [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio]);

    const conSQL = await conexionSQLServer.poolPromise;
    await conSQL.request().query(query);

    const conOracle = await conexionOracle.conectar();
    await conOracle.execute(
        `INSERT INTO miembro (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio) 
         VALUES (:Primer_Nombre, :Segundo_Nombre, :Primer_Apellido, :Segundo_Apellido, :Telefono, TO_DATE(:fechaRegistro, 'YYYY-MM-DD'), :Id_Municipio)`,
        {
            Primer_Nombre: Primer_Nombre,
            Segundo_Nombre: Segundo_Nombre,
            Primer_Apellido: Primer_Apellido,
            Segundo_Apellido: Segundo_Apellido,
            Telefono: Telefono,
            fechaRegistro: formatoFecha,
            Id_Municipio: Id_Municipio
        },
        { autoCommit: true }
    );
    await conOracle.close();
};

exports.guardarMunicipio = async ({ Nombre, Id_Departamento }) => {

    const query = `INSERT INTO municipio (Nombre, Id_Departamento) 
                   VALUES ('${Nombre}', ${Id_Departamento})`;

    await conexionMySQL.query(query, [Nombre, Id_Departamento]);

    const conSQL = await conexionSQLServer.poolPromise;
    await conSQL.request().query(query);

    const conOracle = await conexionOracle.conectar();
    await conOracle.execute(
        `INSERT INTO municipio (Nombre, Id_Departamento) 
         VALUES (:Nombre, :Id_Departamento)`,
        {
            Nombre: Nombre,
            Id_Departamento: Id_Departamento
        },
        { autoCommit: true }
    );
    await conOracle.close();
};

exports.guardarPais = async ({ Nombre }) => {

    const query = `INSERT INTO pais (Nombre) 
                   VALUES ('${Nombre}')`;

    await conexionMySQL.query(query, [Nombre]);

    const conSQL = await conexionSQLServer.poolPromise;
    await conSQL.request().query(query);

    const conOracle = await conexionOracle.conectar();
    await conOracle.execute(
        `INSERT INTO pais (Nombre) 
         VALUES (:Nombre)`,
        {
            Nombre: Nombre
        },
        { autoCommit: true }
    );
    await conOracle.close();
};

exports.guardarPrestamo = async ({ Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion }) => {

    const formatoFecha1 = new Date(Fecha_Prestamo).toISOString().slice(0, 10);
    const formatoFecha2 = new Date(Fecha_Devolucion).toISOString().slice(0, 10);
    
    const query = `INSERT INTO prestamo (Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion) 
                   VALUES (${Id_Miembro}, ${Id_Empleado}, '${Fecha_Prestamo}', '${Fecha_Devolucion}')`;

    await conexionMySQL.query(query, [Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion]);

    const conSQL = await conexionSQLServer.poolPromise;
    await conSQL.request().query(query);

    const conOracle = await conexionOracle.conectar();
    await conOracle.execute(
        `INSERT INTO prestamo (Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion) 
         VALUES (:Id_Miembro, :Id_Empleado, TO_DATE(:fechaPrestamo, 'YYYY-MM-DD'), TO_DATE(:fechaDevolucion, 'YYYY-MM-DD'))`,
        {
            Id_Miembro: Id_Miembro,
            Id_Empleado: Id_Empleado,
            fechaPrestamo: formatoFecha1,
            fechaDevolucion: formatoFecha2
        },
        { autoCommit: true }
    );
    await conOracle.close();
};