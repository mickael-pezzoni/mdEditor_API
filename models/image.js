const mysql = require('../sql_config');
const fs = require('fs');
const SQL_REQUEST = require('../constants/sql_request');

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

    this.newImg = (img) => {
        
    }

    this.writeImage = () => {

    }
}