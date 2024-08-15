const express = require('express');
const mysql = require('mysql2');
const oracledb = require('oracledb');
const sql = require('mssql');
const app = express();

// Configurar el motor de plantillas EJS

app.set('view engine', 'ejs');

// Servir archivos estáticos
app.use(express.static('public'));

// Configurar conexiones a las bases de datos
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'r62af79a',
    database: 'Biblioteca'
});

const oracleConnection = async () => {
    return await oracledb.getConnection({
        user: 'BIBLIOTECA',
        password: 'r62af79a',
        connectString: 'localhost/xepdb1'
    });
};

const sqlServerConnection = new sql.ConnectionPool({
    user: 'sa',
    password: 'r62af79a',
    server: 'SQLEXPRESS',
    database: 'Biblioteca'
});

sqlServerConnection.connect(err => {
    if (err) console.log('Error connecting to SQL Server:', err);
    else console.log('Connected to SQL Server');
});

// Ruta principal
app.get('/', (req, res) => {
    res.render('index', { title: 'Biblioteca' });
});

// Rutas para cada base de datos
app.get('/mysql', (req, res) => {
    mysqlConnection.query('SELECT * FROM Pais', (err, results) => {
        if (err) throw err;
        res.render('mysql', { data: results });
    });
});

app.get('/oracle', async (req, res) => {
    const connection = await oracleConnection();
    const result = await connection.execute('SELECT * FROM Pais');
    res.render('oracle', { data: result.rows });
});

app.get('/sqlserver', (req, res) => {
    sqlServerConnection.request().query('SELECT * FROM Pais', (err, result) => {
        if (err) throw err;
        res.render('sqlserver', { data: result.recordset });
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});