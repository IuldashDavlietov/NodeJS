'use strict'

const express = require('express')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8000
// const router = express.Router()

// router.route('/').get((req,res)=>res.send({method: 'GET'}))
// router.route('/').post((req,res)=>res.send({method: 'POST'}))
// router.route('/').delete((req,res)=>res.send({method: 'DELETE'}))


// router.route('/')
// .get((req,res)=>res.send({method: 'GET'}))
// .post((req,res)=>res.send({method: 'POST'}))
// .put((req,res)=>res.send({method: 'PUT'}))
// .delete((req,res)=>res.send({method: 'DELETE'}))

const router = require('./routes/index')
app.use(router)


app.listen(PORT, () => console.log(`http://127.0.0.1: ${PORT}`))


