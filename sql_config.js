const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '***REMOVED***',
    user: '***REMOVED***',
    password: '***REMOVED***',
    database: '***REMOVED***'
});

connection.connect();

module.exports = connection;