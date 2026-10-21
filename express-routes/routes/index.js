'use strict'

const router = require('express').Router()

router.route('/')
    .get((req, res) => res.send({ method: 'GET' }))
    .post((req, res) => res.send({ method: 'POST' }))
    .put((req, res) => res.send({ method: 'PUT' }))
    .delete((req, res) => res.send({ method: 'DELETE' }))

module.exports = router