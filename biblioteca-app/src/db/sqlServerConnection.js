const sql = require('mssql');
const config = require('../config');

const poolPromise = new sql.ConnectionPool({
    user: config.sqlserver.user,
    password: config.sqlserver.password,
    server: config.sqlserver.server,
    database: config.sqlserver.database,
    options: {
        encrypt: false, // Use this if you're on Windows Azure
        trustServerCertificate: true  // Change to true for local dev / self-signed certs
    }
}).connect();

module.exports = { poolPromise };
