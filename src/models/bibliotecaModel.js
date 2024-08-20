const mysqlConnection = require('../db/mysqlConnection');
const oracleConnection = require('../db/oracleConnection');
const sqlServerConnection = require('../db/sqlServerConnection');

exports.guardarAutor = async ({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais }) => {
    
    const query = `INSERT INTO autor (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais) VALUES ('${Primer_Nombre}', '${Segundo_Nombre}', '${Primer_Apellido}', '${Segundo_Apellido}', ${Id_Pais})`;

    await mysqlConnection.query(query, [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais]);

    const sqlConn = await sqlServerConnection.poolPromise;
    await sqlConn.request().query(query);

    const oracleConn = await oracleConnection.connect();
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

    const oracleConn = await oracleConnection.connect();
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

    const oracleConn = await oracleConnection.connect();
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

exports.guardarEditorial = async ({ Nombre, Id_Pais }) => {
    
    const query = `INSERT INTO editorial (Nombre, Id_Pais) VALUES ('${Nombre}', ${Id_Pais})`;

    await mysqlConnection.query(query, [Nombre, Id_Pais]);

    const sqlConn = await sqlServerConnection.poolPromise;
    await sqlConn.request().query(query);

    const oracleConn = await oracleConnection.connect();
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