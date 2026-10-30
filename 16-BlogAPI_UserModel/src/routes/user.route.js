'use strict';

const router = require('express').Router();
const user = require('../controllers/user.controller');

// Path -> /users

router.route('/')
    .get(user.list)
    .post(user.create);

router.route('/:id')
    .get(user.read)
    .put(user.update)
    .delete(user.deletee);

module.exports = router;