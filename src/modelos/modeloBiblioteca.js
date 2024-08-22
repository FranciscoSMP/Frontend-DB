const mysqlConnection = require('../conexiones_db/conexionMySQL');
const oracleConnection = require('../conexiones_db/conexionOracle');
const sqlServerConnection = require('../conexiones_db/conexionSQLServer');

exports.guardarAutor = async ({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais }) => {
    
    const query = `INSERT INTO autor (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais) VALUES ('${Primer_Nombre}', '${Segundo_Nombre}', '${Primer_Apellido}', '${Segundo_Apellido}', ${Id_Pais})`;

    await mysqlConnection.query(query, [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais]);

    const sqlConn = await sqlServerConnection.poolPromise;
    await sqlConn.request().query(query);

    const oracleConn = await oracleConnection.conectar();
        await oracleConn.execute(
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
        await oracleConn.close();

};

exports.guardarCategoria = async ({ Nombre }) => {
    
    const query = `INSERT INTO categoria (Nombre) VALUES ('${Nombre}')`;

    await mysqlConnection.query(query, [Nombre]);

    const sqlConn = await sqlServerConnection.poolPromise;
    await sqlConn.request().query(query);

    const oracleConn = await oracleConnection.conectar();
        await oracleConn.execute(
            `INSERT INTO categoria (Nombre) VALUES (:Nombre)`,
            {
                Nombre: Nombre
            },
            { autoCommit: true }
        );
        await oracleConn.close();

};

exports.guardarDepartamento = async ({ Nombre, Id_Pais }) => {
    
    const query = `INSERT INTO departamento (Nombre, Id_Pais) VALUES ('${Nombre}', ${Id_Pais})`;

    await mysqlConnection.query(query, [Nombre, Id_Pais]);

    const sqlConn = await sqlServerConnection.poolPromise;
    await sqlConn.request().query(query);

    const oracleConn = await oracleConnection.conectar();
        await oracleConn.execute(
            `INSERT INTO departamento (Nombre, Id_Pais) VALUES (:Nombre, :Id_Pais)`,
            {
                Nombre: Nombre,
                Id_Pais: Id_Pais
            },
            { autoCommit: true }
        );
        await oracleConn.close();

};

exports.guardarDetallePrestamo = async ({ Id_Prestamo, Id_Libro }) => {
    
    const query = `INSERT INTO detalle_prestamo (Id_Prestamo, Id_Libro) VALUES (${Id_Prestamo}, ${Id_Libro})`;

    await mysqlConnection.query(query, [Id_Prestamo, Id_Libro]);

    const sqlConn = await sqlServerConnection.poolPromise;
    await sqlConn.request().query(query);

    const oracleConn = await oracleConnection.conectar();
        await oracleConn.execute(
            `INSERT INTO detalle_prestamo (Id_Prestamo, Id_Libro) VALUES (:Id_Prestamo, :Id_Libro)`,
            {
                Id_Prestamo: Id_Prestamo,
                Id_Libro: Id_Libro
            },
            { autoCommit: true }
        );
        await oracleConn.close();
};

exports.guardarEditorial = async ({ Nombre, Id_Pais }) => {
    
    const query = `INSERT INTO editorial (Nombre, Id_Pais) VALUES ('${Nombre}', ${Id_Pais})`;

    await mysqlConnection.query(query, [Nombre, Id_Pais]);

    const sqlConn = await sqlServerConnection.poolPromise;
    await sqlConn.request().query(query);

    const oracleConn = await oracleConnection.conectar();
        await oracleConn.execute(
            `INSERT INTO editorial (Nombre, Id_Pais) VALUES (:Nombre, :Id_Pais)`,
            {
                Nombre: Nombre,
                Id_Pais: Id_Pais
            },
            { autoCommit: true }
        );
        await oracleConn.close();
};

exports.guardarEmpleado = async ({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion }) => {

    
    const formattedDate = new Date(Fecha_Contratacion).toISOString().slice(0, 10);

    const query = `INSERT INTO empleado (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion) 
                   VALUES ('${Primer_Nombre}', '${Segundo_Nombre}', '${Primer_Apellido}', '${Segundo_Apellido}', '${Puesto}', '${Fecha_Contratacion}')`;

    await mysqlConnection.query(query, [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion]);

    const sqlConn = await sqlServerConnection.poolPromise;
    await sqlConn.request().query(query);

    const oracleConn = await oracleConnection.conectar();
    await oracleConn.execute(
        `INSERT INTO empleado (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Puesto, Fecha_Contratacion) 
         VALUES (:Primer_Nombre, :Segundo_Nombre, :Primer_Apellido, :Segundo_Apellido, :Puesto, TO_DATE(:fechaContratacion, 'YYYY-MM-DD'))`,
        {
            Primer_Nombre: Primer_Nombre,
            Segundo_Nombre: Segundo_Nombre,
            Primer_Apellido: Primer_Apellido,
            Segundo_Apellido: Segundo_Apellido,
            Puesto: Puesto,
            fechaContratacion: formattedDate
        },
        { autoCommit: true }
    );
    await oracleConn.close();
};

exports.guardarLibro = async ({ Titulo, Fecha_Publicacion, ISBN, Id_Editorial }) => {

    const formattedDate = new Date(Fecha_Publicacion).toISOString().slice(0, 10);

    const query = `INSERT INTO libro (Titulo, Fecha_Publicacion, ISBN, Id_Editorial) 
                   VALUES ('${Titulo}', '${Fecha_Publicacion}', '${ISBN}', ${Id_Editorial})`;

    await mysqlConnection.query(query, [Titulo, Fecha_Publicacion, ISBN, Id_Editorial]);

    const sqlConn = await sqlServerConnection.poolPromise;
    await sqlConn.request().query(query);

    const oracleConn = await oracleConnection.conectar();
    await oracleConn.execute(
        `INSERT INTO libro (Titulo, Fecha_Publicacion, ISBN, Id_Editorial) 
         VALUES (:Titulo, TO_DATE(:fechaPublicacion, 'YYYY-MM-DD'), :ISBN, :Id_Editorial)`,
        {
            Titulo: Titulo,
            fechaPublicacion: formattedDate,
            ISBN: ISBN,
            Id_Editorial: Id_Editorial
        },
        { autoCommit: true }
    );
    await oracleConn.close();
};

exports.guardarLibroAutor = async ({ Id_Libro, Id_Autor }) => {

    const query = `INSERT INTO libro_autor (Id_Libro, Id_Autor) 
                   VALUES (${Id_Libro}, ${Id_Autor})`;

    await mysqlConnection.query(query, [Id_Libro, Id_Autor]);

    const sqlConn = await sqlServerConnection.poolPromise;
    await sqlConn.request().query(query);

    const oracleConn = await oracleConnection.conectar();
    await oracleConn.execute(
        `INSERT INTO libro_autor (Id_Libro, Id_Autor) 
         VALUES (:Id_Libro, :Id_Autor)`,
        {
            Id_Libro: Id_Libro,
            Id_Autor: Id_Autor
        },
        { autoCommit: true }
    );
    await oracleConn.close();
};

exports.guardarLibroCategoria = async ({ Id_Libro, Id_Categoria }) => {

    const query = `INSERT INTO libro_categoria (Id_Libro, Id_Categoria) 
                   VALUES (${Id_Libro}, ${Id_Categoria})`;

    await mysqlConnection.query(query, [Id_Libro, Id_Categoria]);

    const sqlConn = await sqlServerConnection.poolPromise;
    await sqlConn.request().query(query);

    const oracleConn = await oracleConnection.conectar();
    await oracleConn.execute(
        `INSERT INTO libro_categoria (Id_Libro, Id_Categoria) 
         VALUES (:Id_Libro, :Id_Categoria)`,
        {
            Id_Libro: Id_Libro,
            Id_Categoria: Id_Categoria
        },
        { autoCommit: true }
    );
    await oracleConn.close();
};

exports.guardarMiembro = async ({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio }) => {

    const formattedDate = new Date(Fecha_Registro).toISOString().slice(0, 10);

    const query = `INSERT INTO miembro (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio) 
                   VALUES ('${Primer_Nombre}', '${Segundo_Nombre}', '${Primer_Apellido}', '${Segundo_Apellido}', '${Telefono}', '${Fecha_Registro}', ${Id_Municipio})`;

    await mysqlConnection.query(query, [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio]);

    const sqlConn = await sqlServerConnection.poolPromise;
    await sqlConn.request().query(query);

    const oracleConn = await oracleConnection.conectar();
    await oracleConn.execute(
        `INSERT INTO miembro (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Telefono, Fecha_Registro, Id_Municipio) 
         VALUES (:Primer_Nombre, :Segundo_Nombre, :Primer_Apellido, :Segundo_Apellido, :Telefono, TO_DATE(:fechaRegistro, 'YYYY-MM-DD'), :Id_Municipio)`,
        {
            Primer_Nombre: Primer_Nombre,
            Segundo_Nombre: Segundo_Nombre,
            Primer_Apellido: Primer_Apellido,
            Segundo_Apellido: Segundo_Apellido,
            Telefono: Telefono,
            fechaRegistro: formattedDate,
            Id_Municipio: Id_Municipio
        },
        { autoCommit: true }
    );
    await oracleConn.close();
};

exports.guardarMunicipio = async ({ Nombre, Id_Departamento }) => {

    const query = `INSERT INTO municipio (Nombre, Id_Departamento) 
                   VALUES ('${Nombre}', ${Id_Departamento})`;

    await mysqlConnection.query(query, [Nombre, Id_Departamento]);

    const sqlConn = await sqlServerConnection.poolPromise;
    await sqlConn.request().query(query);

    const oracleConn = await oracleConnection.conectar();
    await oracleConn.execute(
        `INSERT INTO municipio (Nombre, Id_Departamento) 
         VALUES (:Nombre, :Id_Departamento)`,
        {
            Nombre: Nombre,
            Id_Departamento: Id_Departamento
        },
        { autoCommit: true }
    );
    await oracleConn.close();
};

exports.guardarPais = async ({ Nombre }) => {

    const query = `INSERT INTO pais (Nombre) 
                   VALUES ('${Nombre}')`;

    await mysqlConnection.query(query, [Nombre]);

    const sqlConn = await sqlServerConnection.poolPromise;
    await sqlConn.request().query(query);

    const oracleConn = await oracleConnection.conectar();
    await oracleConn.execute(
        `INSERT INTO pais (Nombre) 
         VALUES (:Nombre)`,
        {
            Nombre: Nombre
        },
        { autoCommit: true }
    );
    await oracleConn.close();
};

exports.guardarPrestamo = async ({ Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion }) => {

    const formattedDate1 = new Date(Fecha_Prestamo).toISOString().slice(0, 10);
    const formattedDate2 = new Date(Fecha_Devolucion).toISOString().slice(0, 10);
    
    const query = `INSERT INTO prestamo (Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion) 
                   VALUES (${Id_Miembro}, ${Id_Empleado}, '${Fecha_Prestamo}', '${Fecha_Devolucion}')`;

    await mysqlConnection.query(query, [Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion]);

    const sqlConn = await sqlServerConnection.poolPromise;
    await sqlConn.request().query(query);

    const oracleConn = await oracleConnection.conectar();
    await oracleConn.execute(
        `INSERT INTO prestamo (Id_Miembro, Id_Empleado, Fecha_Prestamo, Fecha_Devolucion) 
         VALUES (:Id_Miembro, :Id_Empleado, TO_DATE(:fechaPrestamo, 'YYYY-MM-DD'), TO_DATE(:fechaDevolucion, 'YYYY-MM-DD'))`,
        {
            Id_Miembro: Id_Miembro,
            Id_Empleado: Id_Empleado,
            fechaPrestamo: formattedDate1,
            fechaDevolucion: formattedDate2
        },
        { autoCommit: true }
    );
    await oracleConn.close();
};