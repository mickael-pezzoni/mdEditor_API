const mysql = require('../sql_config');

module.exports = function Docs() {

    this.getDocsByUser = (userId, print) => {
        mysql.query('SELECT * FROM Docs WHERE idUser = ?;', [userId], (error, results, fields) => {
            print(results);
        });
    }

    this.getAllDocs = (print) => {
        mysql.query('SELECT * FROM Docs;', (error, results, fields) => {
            print(results);
        });
    }

    this.getDocsByCat = (print) => {
        mysql.query('SELECT D.title, D.description, D.modified, D.created, D.file' +
            'FROM Docs D' +
            'INNER JOIN catDoc CT ON CT.idDoc = D.idDoc' +
            'INNER JOIN Categories C ON C.idCat = CT.idCat' +
            'GROUP BY D.title, D.description, D.modified, D.created, D.file;', (error, results, fields) => {
                print(results);
            });
    }

    this.getDocsByCatId = (catId) => {
        mysql.query('SELECT D.title, D.description, D.modified, D.created, D.file' +
        'FROM Docs D' +
        'INNER JOIN catDoc CT ON CT.idDoc = D.idDoc' +
        'INNER JOIN Categories C ON C.idCat = CT.idCat' +
        'WHERE C.idCat = ?' +
        'GROUP BY D.title, D.description, D.modified, D.created, D.file;', [catId], (error, results, fields) => {
            print(results);
        });
    }
}