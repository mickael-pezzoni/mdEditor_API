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

router.get('/content/:docId', (req, res, next) => {
    docsModel.getContentByDocId(req.params.docId, (content, err) => {
        if(err) {
            res.json({err: err})
        } else {
            res.json({content: content});
        }
    })
});
// return cat from id
router.get('/cat/:catId', (req, res, next) => {
    docsModel.getDocsByCatId(req.params.catId, (results) => {
        res.json(results);
    });
});

router.delete('/:docsId', (req, res, next) => {
    docsModel.deleteByDocId(req.params.docsId);
});

router.delete('/category/:docId/:catId', (req, res, next) => {
    docsModel.deleteCategoryDoc(req.params.docId, req.params.catId, (arg) => {
        res.json({msg: arg});
    });
})

router.post('/new', (req, res, next) => {
    const doc = req.body;
    console.log(doc);
    docsModel.newDoc(doc, (docId, arg) => {
        res.json({
            'msg': arg,
            'docId': docId,
        });
    });
});

router.post('/category/new', (req, res, next) => {
     docsModel.relDocCat(req.body.catId, req.body.docId, (arg) => {
        res.json({msg: arg});
    });
});
module.exports = router;