const mysql = require('../sql_config');


module.exports = function Categorie() {
    this.getAll = (print) => {
        mysql.query('SELECT * FROM Categories;', (error, results, fields) => {
            print(results);
        });
    }
    
    this.getById = (id, print) => {
        mysql.query('SELECT * FROM Categories WHERE `idCat` = ?', [id],  (error, results, fields) => {
            print(results);
        });
    }
}