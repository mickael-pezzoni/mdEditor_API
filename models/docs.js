const mysql = require('../sql_config');
const SQL_REQUEST = require('../constants/sql_request');
const os = require('os');


module.exports = function Doc() {

    this.getDocsByUser = (userId, print) => {
        mysql.query(SQL_REQUEST.DOC.GET.DOCS_USERID, [userId], (error, results, fields) => {
            if (error) {
                console.log(error);
            }
            const finalRes = [];
            results.map(_x => {
                if (_x.idCat === null) {
                    _x.idCat = [];
                } else {
                    _x.idCat = [_x.idCat];
                }
                return _x;
            }).forEach(_doc => {
                const index = finalRes.findIndex(_x => _x._id === _doc._id);
                if (index !== -1) {
                    finalRes[index].idCat.push(_doc.idCat[0]);
                } else {
                    finalRes.push(_doc)
                }
            });
            print(finalRes);
        });
    }

    this.getDocById = (docId, print) => {
        mysql.query(SQL_REQUEST.DOC.GET.DOCSID, [docId], (error, results, field) => {
            if (error) {
                console.log(error);
            } else {
                if (results.length < 1) {
                    print("Not res", null);
                } else {
                    print(null, results[0]);
                }
            }
        });
    }

    this.getAllDocs = (print) => {
        mysql.query(SQL_REQUEST.DOC.GET.ALL_DOCS, (error, results, fields) => {
            if (error) {
                console.log(error);
            } else {
                const finalRes = [];
                results.map(_x => {
                    if (_x.idCat === null) {
                        _x.idCat = [];
                    } else {
                        _x.idCat = [_x.idCat];
                    }
                    return _x;
                }).forEach(_doc => {
                    const index = finalRes.findIndex(_x => _x._id === _doc._id);
                    if (index !== -1) {
                        finalRes[index].idCat.push(_doc.idCat[0]);
                    } else {
                        finalRes.push(_doc)
                    }
                });
                print(finalRes);
            }
        });
    }

    this.getDocsByCatId = (catId, print) => {
        mysql.query(SQL_REQUEST.DOC.GET.DOCS_CATID, [catId], (error, results, fields) => {
            print(results);
        });
    }

    this.checkFileExist = (docId) => {
        return new Promise((resolve, reject) => {
            mysql.query(SQL_REQUEST.DOC.GET.DOCSID, [docId], (error, results, fields) => {
                console.log(results);
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    reject(false);
                }

            });
        })
    }

    this.newDoc = (doc, print) => {
        if (doc._id !== null) {
            this.updateDoc(doc, doc._id, print);
            console.log("RESOLVE");
        } else {
            console.log("REJECT");
            mysql.query(SQL_REQUEST.DOC.POST.NEW_DOC, [`${doc.title}`,
            doc.description, doc.content, new Date(doc.modified), new Date(doc.created), doc.userId],
                (error, results, field) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(results);
                        if (doc.idCat.length > 0) { // if category
                            this.relDocCat(doc.idCat, results.insertId, () => { });
                        }
                        print(results.insertId, 'created');
                    }
                });
        }
    };


    this.updateDoc = (doc, docId, print) => {
        mysql.query(SQL_REQUEST.DOC.PUT.UPDATE_DOC, [doc.title, new Date(), doc.content, docId], (error, results, fields) => {
            if (error) {
                console.log(error);
            }
            print(docId, 'saved');
        });
    }

    this.relDocCat = (catId, docId, print) => {
        mysql.query(SQL_REQUEST.CAT_DOC.POST.DOCS_CAT, [docId, catId], (error, results, fields) => {
            if (error) {
                console.log(error);
            } else {
                print(fields);
            }
        });
    }

    this.deleteAllCategoryDoc = (docId, next) => {
        mysql.query(SQL_REQUEST.CAT_DOC.DELETE_ALL_DOC, [docId], (error, results, fields) => {
            if (error) {
                console.log(error);
            } else {
                next();
            }
        });
    }

    this.deleteCategoryDoc = (docId, catId, print) => {
        mysql.query(SQL_REQUEST.CAT_DOC.DELETE, [docId, catId], (error, results, fields) => {
            if (error) {
                console.log(error);
            } else {
                print('Category deleted');
            }
        });
    }

    this.deleteByDocId = (docId, print) => {
        this.checkFileExist(docId).then(_doc => {
            console.log('exist');
            this.deleteAllCategoryDoc(docId, () => {
                mysql.query(SQL_REQUEST.DOC.DELETE.DELETE, [docId], (error, results, field) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        print(`doc ${docId} deleted`);
                    }
                });
            });
        }).catch(_doc => { // si le doc existe
            print('doc not exist');
        });
    }
}