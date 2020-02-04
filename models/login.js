const mysql = require('../sql_config');
const bcrypt = require('bcrypt');
const SQL_REQUEST = require('../constants/sql_request');

module.exports = function Login() {
    this.signup = (register, next) => {
        this.checkUserExist(register.username).then(
            _status => {
                console.log();
                bcrypt.hash(register.password, 10, (err, hash) => {
                    mysql.query(SQL_REQUEST.LOGIN.SIGNUP, [register.username, hash, new Date()], (error, results, fields) => {
                        if (error)
                            console.log(error);
                        else {
                            next(results.insertId, null);
                        }
                    });
                });
            }
        ).catch(
            _err => {
                next(null, _err);
            }
        )
    }

    this.signin = (loginForm) => {
        return new Promise((resolve, reject) => {
            this.getUserByUsername(loginForm.username).then(
                _res =>  {
                    bcrypt.compare(loginForm.password, _res.passwd, (err, res) => {
                        if (res) {
                            this.setLastLoginDate(_res.idUser);
                            resolve(_res);
                        } else {
                            reject('Incorrect login');
                        }
                    });
                }
            ).catch(
                _err => {
                    reject('User not exist');
                }
            )
        })
    }

    this.checkUserExist = (username) => {
        return new Promise((resolve, reject) => {
            mysql.query(SQL_REQUEST.LOGIN.SIGNIN, [username], (error, results, fields) => {
                if (results.length > 0) {
                    reject('User Already exist');
                } else {
                    resolve(true);
                }
            });
        })
    }

    this.getUserByUsername = (username) => {
        return new Promise((resolve, reject) => {
            mysql.query(SQL_REQUEST.LOGIN.RETRIEVE_USER, [username], (error, results, fields) => {
                if (error)
                    console.log(error);
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    reject(true);
                }
            });
        });
    }

    this.setLastLoginDate = (userId) => {
        mysql.query(SQL_REQUEST.LOGIN.UPDATE_USER, [new Date(), userId], (error, results, fields) => {
            if (error) {
                throw Error('Erreur lastLogin');
            }
        });
    }
}