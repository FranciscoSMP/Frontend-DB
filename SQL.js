const express = require('express');
const sql = require('mssql');
const app = express();
const port = 3000;

const sqlConfig = {
    user: 'sa',
    password: 'r62af79a',
    server: 'LAPTOP-C6AMNR9V\\SQLEXPRESS',
    database: 'Biblioteca',
    options: {
        encrypt: false, // Utiliza esto si estás en Azure
        trustServerCertificate: true
    }
};

app.get('/test-sqlserver', async (req, res) => {
    try {
        await sql.connect(sqlConfig);
        res.send('Conexión a SQL Server exitosa');
    } catch (err) {
        res.status(500).send('Error al conectar a SQL Server: ' + err.message);
    }
});


app.listen(port, () => {
    console.log(`Aplicación escuchando en el puerto ${port}`);
});
