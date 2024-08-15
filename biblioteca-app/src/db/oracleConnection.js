const oracledb = require('oracledb');
const config = require('../config');

async function connect() {
    try {
        const connection = await oracledb.getConnection({
            user: config.oracle.user,
            password: config.oracle.password,
            connectString: config.oracle.connectString
        });
        return connection;
    } catch (err) {
        console.error('Error connecting to Oracle', err);
    }
}

module.exports = { connect };
