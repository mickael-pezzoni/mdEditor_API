const mysql = require('../sql_config');
const SQL_REQUEST = require('../constants/sql_request');
const fs = require('fs');
const os = require('os');

const FILE_DIRECTORY = `${os.homedir()}/git/mdEditor_API/docsFile`

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

    /*     this.getAlldoc = (print) => {
            mysql.query('SELECT * FROM doc;', (error, results, fields) => {
                print(results);
            });
        } */

    this.writeInFile = (content, fileTitle, print) => {
        fs.writeFile(`${FILE_DIRECTORY}/${fileTitle}.md`, content, (err) => {
            if (err) {
                console.log(err);
            }
            print('File saved');
        });
    }

    this.readFile = (fileTitle, print) => {
        fs.readFile(`${FILE_DIRECTORY}/${fileTitle}.md`, 'utf8', (err, data) => {
            if (err) {
                print(null, err.code)
            } else {
                print(data, null);
            }
        });
    }

    this.renameFile = (oldTitle, newTitle) => {
        fs.rename(`${FILE_DIRECTORY}/${oldTitle}.md`, `${FILE_DIRECTORY}/${newTitle}.md`, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }

    this.deleteFile = (fileTitle) => {
        fs.unlink(`${FILE_DIRECTORY}/${fileTitle}.md`, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }

    this.getContentByDocId = (docId, print) => {
        this.getDocById(docId, (res) => {
            if (res.length > 0) {
                const completeTitle = `#${res[0].idDoc}-${res[0].title}`;
                this.readFile(completeTitle, print);
            } else {
                print(null, 'Docs not exist');
            }
        });
    }

    this.getDocById = (docId, print) => {
        mysql.query(SQL_REQUEST.DOC.GET.DOCSID, [docId], (error, results, field) => {
            if (error) {
                console.log(error);
            } else {
                print(results);
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
                if (error) {
                    console.log(error);
                }
                else if (results.length > 0) {
                    reject(results[0]);
                } else {
                    resolve(true);
                }

            });
        })
    }

    this.newDoc = (doc, print) => {
        this.checkFileExist(doc._id).then(_x => {
            mysql.query(SQL_REQUEST.DOC.POST.NEW_DOC, [`${doc.title}`, `${FILE_DIRECTORY}`,
            doc.description, new Date(doc.modified), new Date(doc.created), doc.userId],
                (error, results, field) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(results);
                        const contentFile = doc.content ? doc.content : '';
                        this.writeInFile(contentFile, `#${results.insertId}-${doc.title}`, (arg) => {
                            print(results.insertId, arg);
                        });
                        if (doc.idCat.length > 0) { // if category
                            this.relDocCat(doc.idCat, results.insertId, () => { });
                        }
                    }
                });
        }).catch(docDb => { //  if file exist
            if (doc.title !== docDb.title) { // if file name change
                this.renameFile(`#${docDb.idDoc}-${docDb.title}`, `#${docDb.idDoc}-${doc.title}`);
            }
            const contentFile = doc.content ? doc.content : '';
            this.writeInFile(contentFile, `#${docDb.idDoc}-${doc.title}`, (arg) => {
                this.updateDoc(docDb.idDoc, `${doc.title}`, () => {
                    print(docDb.idDoc, arg);
                })
            });

        });
    };


    this.updateDoc = (docId, title, print) => {
        mysql.query(SQL_REQUEST.DOC.PUT.UPDATE_DOC, [title, new Date(), docId], (error, results, fields) => {
            if (error) {
                console.log(error);
            }
            print()
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
        this.checkFileExist(docId).then(_res => {
            print('doc not exist');
        }).catch(_doc => { // si le doc existe
            console.log('exist');
            this.deleteAllCategoryDoc(docId, () => {
                this.deleteFile(`#${docId}-${_doc.title}`);
                mysql.query(SQL_REQUEST.DOC.DELETE.DELETE, [docId], (error, results, field) => {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        print(`doc ${docId} deleted`);
                    }
                });
            });
        });
    }
}