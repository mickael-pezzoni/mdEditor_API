const express = require('express');
const router = express.Router();
const ImageModel = require('../models/image');
const conf = require('../config');

const imageModel = new ImageModel();

router.get('/user/:userId',(req, res, next) => {

});
router.post('/new', (req, res, next) => {
    imageModel.newImg(req.body.img, req.body.userId, (arg) => {
        res.json({msg: arg});
    });
});

module.exports = router;