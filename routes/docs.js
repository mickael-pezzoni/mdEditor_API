const express = require('express');
const router = express.Router();
const DocsModel = require('../models/docs');

const docsModel = new DocsModel();

router.get('/all', (req, res, next) => {
    docsModel.getDocsByUser((results) => {
        res.json(results);
    });
});

router.get('/:userId', (req, res, next) => {
    docsModel.getDocsByUser(req.param.userId, (results) => {
        res.json(results);
    });
});

router.get('/docsByCat', (req, res, next) => {
    docsModel.getDocsByCat((results) => {
        res.json(results);
    });
});

router.get('/:catId', (req, res, next) => {
    docsModel.getDocsByCatId(req.params.catId, (results) => {
        res.json(results);
    });
});

module.exports = router;