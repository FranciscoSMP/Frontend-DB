const mysqlConnection = require('../db/mysqlConnection');
const oracleConnection = require('../db/oracleConnection');
const sqlServerConnection = require('../db/sqlServerConnection');

exports.guardarAutor = async ({ Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais }) => {
    
    //const query = 'INSERT INTO autor (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais) VALUES (?, ?, ?, ?, ?)';
    
    //await mysqlConnection.query(query, [Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais]);

    const query = `INSERT INTO dbo.Autor (Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Id_Pais) VALUES ('${Primer_Nombre}', '${Segundo_Nombre}', '${Primer_Apellido}', '${Segundo_Apellido}', ${Id_Pais})`;

    // Usar SQL Server
    const sqlConn = await sqlServerConnection.poolPromise;
    await sqlConn.request().query(query);

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
