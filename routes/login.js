const express = require('express');
const router = express.Router();
const LoginModel = require('../models/login');

let loginModel = new LoginModel();

router.post('/signin', (req, res, next) => {
    const loginForm = {
        username: req.body.username,
        password: req.body.password
    };
    loginModel.signin(loginForm).then(
        _user => {
            res.json({
                code: 200,
                msg: 'Login successfull',
                userId: _user.idUser
            });
        }
    ).catch(
        _err => {
            res.status(401);
            res.json({
                code: 401,
                err: _err
            });
        }
    )
});

router.post('/signup', (req, res, next) => {
    const loginForm = {
        username: req.body.username,
        password: req.body.password
    };
    loginModel.signup(loginForm, (succes, err) => {
        if (err != null) {
            res.json({
                err: err
            });
        } else {
            res.json({
                code: 200,
                msg: 'User create',
                userId: succes
            });
        }
    });
});

module.exports = router;