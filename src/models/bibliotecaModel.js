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

exports.guardarLibro = async ({ Primer_Nombre, Primer_Apellido, Id_Pais }) => {
    // Ejemplo para MySQL, puedes replicar esto para Oracle y SQL Server
    const query = 'INSERT INTO autor (Primer_Nombre, Primer_Apellido, Id_Pais) VALUES (?, ?, ?)';
    
    // Insertar en MySQL
    await mysqlConnection.query(query, [Primer_Nombre, Primer_Apellido, Id_Pais]);
    
    // Insertar en Oracle (con sintaxis adecuada para Oracle)
    // await oracleConnection.execute(query, [titulo, autor, categoria, editorial, anio]);
    
    // Insertar en SQL Server (con sintaxis adecuada para SQL Server)
    // await sqlServerConnection.query(query, [titulo, autor, categoria, editorial, anio]);
};
