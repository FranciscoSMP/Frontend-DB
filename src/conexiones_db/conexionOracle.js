// Importa el módulo oracledb para trabajar con bases de datos Oracle
const oracledb = require('oracledb');

// Importa el archivo de configuración que contiene las credenciales para la base de datos
const configuracion = require('../configuracion');

// Función asíncrona para establecer la conexión a la base de datos Oracle
async function conectar() {
    try {
        // Establece la conexión usando las credenciales almacenadas en el archivo de configuración
        const conexion = await oracledb.getConnection({
            user: configuracion.oracle.user,            // Usuario de la base de datos
            password: configuracion.oracle.password,    // Contraseña del usuario
            connectString: configuracion.oracle.connectString // Cadena de conexión (host/puerto/sid)
        });
        // Retorna la conexión para ser utilizada en otras operaciones
        return conexion;
    } catch (err) {
        // Maneja los errores de conexión y los imprime en la consola
        console.error('Error al conectar Oracle', err);
    }
}

// Exporta la función conectar para ser utilizada en otras partes del proyecto
module.exports = { conectar };