module.exports = {
    LOGIN: {
        SIGNUP: 'INSERT INTO User(`username`, `passwd`, `createdDate`) VALUES(?, ?, ?);',
        SIGNIN: 'SELECT * FROM User WHERE username = ?;',
        RETRIEVE_USER: 'SELECT * FROM User WHERE username = ?;',
        UPDATE_USER: 'UPDATE User SET lastLogin = ?, nbLogin = nbLogin + 1 WHERE idUser = ?;',
    },
    DOC: {
        GET: {
            DOCS_USERID: 'SELECT * FROM Docs WHERE idUser = ?;',

            ALL_DOCS: 'SELECT D.title, D.description, D.modified, D.created, D.file, C.name ' +
            'FROM Docs D ' +
            'INNER JOIN catDoc CT ON CT.idDoc = D.idDoc ' +
            'INNER JOIN Categories C ON C.idCat = CT.idCat ' +
            'GROUP BY D.title, D.description, D.modified, D.created, D.file, C.name;',

            DOCS_CATID: 'SELECT D.title, D.description, D.modified, D.created, D.file ' +
            'FROM Docs D ' +
            'INNER JOIN catDoc CT ON CT.idDoc = D.idDoc ' +
            'INNER JOIN Categories C ON C.idCat = CT.idCat ' +
            'WHERE C.idCat = ? ' +
            'GROUP BY D.title, D.description, D.modified, D.created, D.file;',
        },
        POST: {
            NEW_DOC: 'INSERT INTO `Docs`(title`, `file`, `description`, `modified`, `created`, `idUser`) VALUES (?, ?, ?, ?, ?, ?, ?)',

        },
        PUT: {

        },
        DELETE: {

        }
    },
    CAT: {
        GET: {
            ALL: 'SELECT * FROM Categories;',
            CATID: 'SELECT * FROM Categories WHERE `idCat` = ?'
        },
        POST: {

        },
        PUT: {

        },
        DELETE: {

        }
    }
}