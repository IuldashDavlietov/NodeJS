'use strict';
/* ------------------------------------ *
                Middlewares
/* ------------------------------------ */

const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

/* ------------------------------------ *
//* Middleware is a function and must have three parameters. (functional middlewares)

const middlewareA = (req, res, next) => {
    console.log('middleware A worked')
    next() // go to next route or middleware
}

const middlewareB = (req, res, next) => {
    console.log('middleware B worked')
    next()
}

const middlewareC = (req, res, next) => {
    console.log('middleware C worked')
    next()
}

//? 1. way / runs for each request / position of middleware are important
// app.use(middlewareB)
// app.use(middlewareA)

//? 2. way / runs for each request
// app.use(middlewareA, middlewareB)

//? 3. way / runs on specific route
// app.use('/', middlewareA, middlewareB) // default path in app.use is '/'
app.use('/users', middlewareB) // this will  run on /users path only.

// how to choose specific method and route to run ?
app.post('/users', middlewareA)

//? 4. way / you can use them between route and controller (handler)
app.get('/', [middlewareC, middlewareB], (req, res) => {
    console.log('home path worked')
    res.send({ message: 'ok' })
})

app.get('/users', (req, res) => {
    console.log('user path worked')
    res.send({ message: 'ok' })
})

app.post('/users', (req, res) => {
    console.log('user post path worked')
    res.send({ message: 'ok' })
});

/* ------------------------------------ */
//* Middleware routing and sending data one to another.

app.get('/', (req, res, next) => {
    console.log('message 1');

    // console.log(typeof req)

    // const obj = { a: 1 }
    // obj.b = 2
    // console.log(obj)

    req.message1 = 'middleware 1'
    // console.log(req)

    next();
});

app.get('/', (req, res) => {
    // console.log(req.message1)

    res.send({
        message1: req.message1
    })
})

/* ------------------------------------ */
app.listen(PORT, () => console.log(`http://127.0.0.1:${PORT}`))
