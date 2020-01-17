const mysql = require('../sql_config');
const SQL_REQUEST = require('../constants/sql_request');


module.exports = function Categorie() {
    this.getAll = (print) => {
        mysql.query(SQL_REQUEST.CAT.GET.ALL, (error, results, fields) => {
            print(results);
        });
    }
    
    this.getById = (id, print) => {
        mysql.query(SQL_REQUEST.CAT.GET.CATID, [id],  (error, results, fields) => {
            print(results);
        });
    }
}