const mysql = require('../sql_config');
const fs = require('fs');
const SQL_REQUEST = require('../constants/sql_request');

const LOCAL_IMG_DIR = '/home/micka/git/mdEditor/src/assets/';
const CLIENT_IMG_DIR = './assets/';

module.exports = function Image() {

    this.getImageByUser = (userId, print) => {
        mysql.query(SQL_REQUEST.IMG.GET_USER, [userId], (results, err) => {
            if (err) {
                console.log(err);
            } else {
                print(results);
            }
        });
    }

    this.newImg = (img, userId, print) => {
        let png = /png/g.test(img);
        const picture = img.replace(/^data:image\/png;base64,/, "");
        const nameFile = new Date().getTime().toString();
        let pathName = `${userId}/${nameFile}`;
        if (png) {
            pathName += '.png'
        } else {
            pathName += '.jpg';
        }
        mysql.query(SQL_REQUEST.IMG.NEW, [`${CLIENT_IMG_DIR}/${pathName}`, userId], (error, results, field) => {
            if (error) {
                console.log(error);
            } else {
                fs.exists(`${LOCAL_IMG_DIR}/${userId}`, (exist) => {
                    if (exist) {
                        this.writeImage(pathName, picture, (arg) => {
                            print(arg);
                        });
                    } else {
                        fs.mkdir(`${LOCAL_IMG_DIR}/${userId}`, () => {
                            this.writeImage(pathName, picture, (arg) => {
                                print(arg);
                            });
                        });
                    }
                })
            }
        });


    }

    this.writeImage = (finalPath, b64, print) => {
        fs.writeFile(`${LOCAL_IMG_DIR}${finalPath}`, b64, 'base64', function (err) {
            if (err) {
                console.log(err);
            } else {
                print('Image saved');
            }
        });
    }

}