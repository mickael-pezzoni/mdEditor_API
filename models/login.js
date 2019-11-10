const mysql = require('../sql_config');
const bcrypt = require('bcrypt');

module.exports = function Login() {
    this.signup = (register, next) => {
        this.checkUserExist(register.username).then(
            _status => {
                bcrypt.hash(register.password, 10, (err, hash) => {
                    mysql.query('INSERT INTO User(`username`, `passwd`) VALUES(?, ?);', [register.username, hash], (error, results, fields) => {
                        if (error)
                            console.log(error);
                        next(null);
                    });
                });
            }
        ).catch(
            _err => {
                next(_err);
            }
        )
    }

    this.signin = (loginForm) => {
        return new Promise((resolve, reject) => {
            this.getUserByUsername(loginForm.username).then(
                _res =>  {
                    bcrypt.compare(loginForm.password, _res.passwd, (err, res) => {
                        if (res) {
                            resolve(true);
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
            mysql.query('SELECT * FROM User WHERE username = ?;', [username], (error, results, fields) => {
                console.log(results);
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
            mysql.query('SELECT * FROM User WHERE username = ?;', [username], (error, results, fields) => {
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
}