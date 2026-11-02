'use strict';

const router = require('express').Router();
const category = require('../controllers/category.controller');

// Path -> /categories

router.route('/')
    .get(category.list)
    .post(category.create);

router.route('/:id')
    .get(category.read)
    .put(category.update)
    .delete(category.deletee);

module.exports = router;