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
// Join docs ant category
router.get('/docsByCat', (req, res, next) => {
    docsModel.getDocsByCat((results) => {
        res.json(results);
    });
});
// return cat from id
router.get('/cat/:catId', (req, res, next) => {
    docsModel.getDocsByCatId(req.params.catId, (results) => {
        res.json(results);
    });
});

router.delete('/:docsId', (req, res, next) => {
    docsModel.deleteByDocsId(req.params.docsId);
});

router.post('/new', (req, res, next) => {
    console.log(req.body);
});

module.exports = router;