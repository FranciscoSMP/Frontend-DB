const express = require('express');
const app = express();
const port = 3000;
const oracledb = require('oracledb');

const oracleConfig = {
    user: 'BIBLIOTECA',
    password: 'r62af79a',
    connectString: '192.168.0.17:1521/XE' // Ajusta esto según tu configuración
};

app.get('/test-oracle', async (req, res) => {
    try {
        // Establecer conexión con la base de datos
        const connection = await oracledb.getConnection(oracleConfig);
        
        // Ejecutar la consulta
        const result = await connection.execute('SELECT * FROM Libro');
        
        // Cerrar la conexión
        await connection.close();
        
        // Verificar si se recibieron resultados
        if (result.rows.length > 0) {
            // Convertir los resultados a un formato adecuado para mostrar
            const formattedResults = result.rows.map(row => {
                // Puedes ajustar esto según la estructura de tu tabla
                return row.join(', '); // Une los valores de cada fila con una coma
            }).join('\n');
            res.send('Resultado de la consulta:\n' + formattedResults);
        } else {
            res.send('No se encontraron resultados en la tabla Libro.');
        }
    } catch (err) {
        res.status(500).send('Error al consultar Oracle: ' + err.message);
    }
});

app.listen(port, () => {
    console.log(`Aplicación escuchando en el puerto ${port}`);
});
