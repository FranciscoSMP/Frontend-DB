// Importa el módulo mssql para trabajar con bases de datos SQL Server
const sql = require('mssql');

// Importa el archivo de configuración que contiene las credenciales para la base de datos
const configuracion = require('../configuracion');

// Crea una instancia de ConnectionPool para conectarse a SQL Server
const poolPromise = new sql.ConnectionPool({
    user: configuracion.sqlserver.user,         // Usuario de la base de datos
    password: configuracion.sqlserver.password, // Contraseña del usuario
    server: configuracion.sqlserver.server,     // Servidor de la base de datos
    database: configuracion.sqlserver.database, // Nombre de la base de datos
    options: {
        encrypt: false,                // Opción de cifrado (false si no se usa SSL)
        trustServerCertificate: true   // Permitir conexiones a servidores con certificados de confianza
    }
}).connect(); // Inicia la conexión de manera asíncrona

// Exporta la promesa de la conexión para ser utilizada en otras partes del proyecto
module.exports = { poolPromise };