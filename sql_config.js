const mysql = require('mysql');
const dbConfig = require('./config_db');

const connection = mysql.createConnection(dbConfig);

connection.connect();

module.exports = connection;