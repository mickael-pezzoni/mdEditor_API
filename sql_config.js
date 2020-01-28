const mysql = require('mysql');
const dbConfig = require('./config');

const connection = mysql.createConnection(dbConfig);

connection.connect();

module.exports = connection;