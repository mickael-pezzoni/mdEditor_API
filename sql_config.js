const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '51.77.193.65',
    user: 'root',
    password: 'Mpafthuf47s0',
    database: 'mdEditor'
});

connection.connect();

module.exports = connection;