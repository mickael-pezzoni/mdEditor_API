const mysql = require('../sql_config');
const SQL_REQUEST = require('../constants/sql_request');

module.exports = function Docs() {

    this.getDocsByUser = (userId, print) => {
        mysql.query(SQL_REQUEST.DOC.GET.DOCS_USER, [userId], (error, results, fields) => {
            print(results);
        });
    }

/*     this.getAllDocs = (print) => {
        mysql.query('SELECT * FROM Docs;', (error, results, fields) => {
            print(results);
        });
    } */

    this.getDocsByCat = (print) => {
        mysql.query(SQL_REQUEST.DOC.GET.ALL_DOCS, (error, results, fields) => {
                if (error)
                    console.log(error);
                print(results);
            });
    }

    this.getDocsByCatId = (catId, print) => {
        mysql.query(SQL_REQUEST.DOC.GET.DOCS_CATID, [catId], (error, results, fields) => {
            print(results);
        });
    }

    this.newDocs = (docs) => {
        mysql.query(SQL_REQUEST.DOC.POST.NEW_DOC, [docs.title, docs.file, docs.description, docs.modified, docs.created, docs.idUser], 
                    (error, results, field) => {
                        print(results);
                    });
    };

    this.relDocsCat = (catId, docId) => {
        mysql.query('INSERT INTO ')
    }
    this.deleteByDocsId = (docsId) => {
        console.log(docsId);
    };
}