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
        _status => {
            res.json({
                code: 200,
                msg: 'Login successfull'
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
    loginModel.signup(loginForm, (err) => {
        if (err != null) {
            res.json({
                err: err
            });
        } else {
            res.json({
                msg: 'user create'
            });
        }
    });
});

module.exports = router;