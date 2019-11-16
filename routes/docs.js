const express = require('express');
const router = express.Router();
const DocsModel = require('../models/docs');

const docsModel = new DocsModel();

router.get('/all', (req, res, next) => {
    docsModel.getAllDocs((results) => {
        res.json(results);
    });
});

router.get('/user/:userId', (req, res, next) => {
    docsModel.getDocsByUser(req.params.userId, (results) => {
        res.json(results);
    });
});

router.get('/docsByCat', (req, res, next) => {
    docsModel.getDocsByCat((results) => {
        res.json(results);
    });
});

router.get('/cat/:catId', (req, res, next) => {
    docsModel.getDocsByCatId(req.params.catId, (results) => {
        res.json(results);
    });
});
router.post('/new', (req, res, next) => {

});
module.exports = router;