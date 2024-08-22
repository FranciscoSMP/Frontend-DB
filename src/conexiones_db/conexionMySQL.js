// Importa el módulo mysql2 que permite trabajar con MySQL de forma asíncrona usando promesas
const mysql = require('mysql2/promise');

// Importa el archivo de configuración que contiene las credenciales para la base de datos
const configuracion = require('../configuracion');

// Crea un pool de conexiones con las credenciales y configuraciones de la base de datos MySQL
const conexion = mysql.createPool({
    host: configuracion.mysql.host,        // Dirección del servidor MySQL
    user: configuracion.mysql.user,        // Usuario de la base de datos
    password: configuracion.mysql.password,// Contraseña del usuario
    database: configuracion.mysql.database // Nombre de la base de datos
});

// Exporta la conexión para que pueda ser usada en otras partes del proyecto
module.exports = conexion;