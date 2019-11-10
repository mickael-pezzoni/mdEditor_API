const express = require('express');
const router = express.Router();
const CategorieModel = require('../models/categorie');

const catModel = new CategorieModel();

router.get('/all', (req, res, next) => {
    catModel.getAll((result) => {
        res.json(result);
    });
});

router.get('/:id', (req, res, next) => {
    catModel.getById(req.params.id, (result) => {
        res.json(result);
    });
});

module.exports = router;