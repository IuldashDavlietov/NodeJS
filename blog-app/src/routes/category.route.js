'use strict'

const router = require('express').Router();
const category = require('../controllers/category.controller')

router.route('/blogs/categories')
    .get(category.list)
    .post(category.create)

router.route('/blogs/category/:id')
    .get(category.read)

module.exports = router;