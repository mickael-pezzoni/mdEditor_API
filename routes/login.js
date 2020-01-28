const express = require('express');
const router = express.Router();
const LoginModel = require('../models/login');
const conf = require('../config');
let loginModel = new LoginModel();
const jwt = require('jsonwebtoken');  


router.post('/signin', (req, res, next) => {
    const loginForm = {
        username: req.body.username,
        password: req.body.password
    };
    const token = jwt.sign({username: loginForm.username}, conf.jwtSecret)
    loginModel.signin(loginForm).then(
        _user => {
            res.json({
                code: 200,
                msg: 'Login successfull',
                token: token,
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
            const token = jwt.sign({username: loginForm.username}, conf.jwtSecret);
            res.json({
                code: 200,
                msg: 'User create',
                token: token,
                userId: succes
            });
        }
    });
});

module.exports = router;