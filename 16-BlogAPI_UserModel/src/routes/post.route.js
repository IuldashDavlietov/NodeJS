'use strict';

const router = require('express').Router();
const post = require('../controllers/post.controller');

// Path -> /posts

router.route('/')
    .get(post.list)
    .post(post.create);

router.route('/:id')
    .get(post.read)
    .put(post.update)
    .delete(post.deletee);

module.exports = router;