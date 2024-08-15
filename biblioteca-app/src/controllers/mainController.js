const mysqlConnection = require('../db/mysqlConnection');
const oracleConnection = require('../db/oracleConnection');
const sqlServerConnection = require('../db/sqlServerConnection');

exports.home = (req, res) => {
    res.render('home');
};

exports.insertData = async (req, res) => {
    const { nombrePais, nombreDepartamento, nombreMunicipio } = req.body;

    try {
        // MySQL
        await mysqlConnection.execute('INSERT INTO Pais (Nombre) VALUES (?)', [nombrePais]);

        // Oracle
        const oracleConn = await oracleConnection.connect();
        await oracleConn.execute('INSERT INTO Pais (Nombre) VALUES (:nombre)', [nombrePais]);
        await oracleConn.commit();
        oracleConn.close();

        // SQL Server
        const sqlConn = await sqlServerConnection.poolPromise;
        await sqlConn.request().query(`INSERT INTO dbo.Pais (Nombre) VALUES ('${nombrePais}')`);

        res.redirect('/');
    } catch (err) {
        console.error('Error inserting data', err);
        res.status(500).send('Error inserting data');
    }
};
