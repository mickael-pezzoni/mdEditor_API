module.exports = {
    LOGIN: {
        SIGNUP: 'INSERT INTO User(`username`, `passwd`, `createdDate`) VALUES(?, ?, ?);',
        SIGNIN: 'SELECT * FROM User WHERE username = ?;',
        RETRIEVE_USER: 'SELECT * FROM User WHERE username = ?;',
        UPDATE_USER: 'UPDATE User SET lastLogin = ?, nbLogin = nbLogin + 1 WHERE idUser = ?;',
    },
    DOC: {
        GET: {
            DOCS_USERID: 'SELECT D.idDoc as _id, D.title, D.description, D.modified, D.created, D.path, C.idCat '+
            'FROM Docs D ' +
            'LEFT JOIN catDoc CT ON CT.idDoc = D.idDoc ' +
            'LEFT JOIN Categories C ON C.idCat = CT.idCat ' +
            'WHERE D.idUser = ? ' +
            'GROUP BY D.idDoc, D.title, D.description, D.modified, D.created, D.path, C.idCat; ',

            DOCSID: 'SELECT * FROM Docs WHERE idDoc = ?;',

            ALL_DOCS: 'SELECT D.idDoc as _id, U.username, D.title, D.description, D.modified, D.created, D.path, C.idCat '+ 
            'FROM Docs D '+
            'INNER JOIN User U ON U.idUser = D.idUser '+
            'LEFT JOIN catDoc CT ON CT.idDoc = D.idDoc '+
            'LEFT JOIN Categories C ON C.idCat = CT.idCat '+
            'WHERE D.public = True ' +
            'GROUP BY D.idDoc, U.username, D.title, D.description, D.modified, D.created, D.path, C.idCat;',

            DOCS_CATID: 'SELECT D.title, D.description, D.modified, D.created, D.path ' +
            'FROM Docs D ' +
            'INNER JOIN catDoc CT ON CT.idDoc = D.idDoc ' +
            'INNER JOIN Categories C ON C.idCat = CT.idCat ' +
            'WHERE C.idCat = ? ' +
            'GROUP BY D.title, D.description, D.modified, D.created, D.path;',
        },
        POST: {
            NEW_DOC: 'INSERT INTO Docs(`title`, `path`, `description`, `modified`, `created`, `idUser`) VALUES (?, ?, ?, ?, ?, ?)',

        },
        PUT: {
            UPDATE_DOC: 'UPDATE Docs SET title = ?, modified = ? WHERE idDoc = ?;'
        },
        DELETE: {
            DELETE: 'DELETE FROM Docs WHERE idDoc = ?;'
        }
    },
    CAT_DOC: {
        POST: {
            DOCS_CAT: 'INSERT INTO catDoc (`idDoc`, `idCat`) VALUES(?, ?);'
        },
        DELETE: 'DELETE FROM catDoc WHERE idDoc = ? AND idCat = ?;',
        DELETE_ALL_DOC: 'DELETE FROM catDoc WHERE idDoc = ?'
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
    },
    IMG:  {
        GET_USER: 'SELECT * FROM `Images` WHERE idUser = ?;',
        NEW: 'INSERT INTO `Images`(`file`, `name`, `idUser`) VALUES (?, ?, ?);'
    }
}