'use strict';
/* ------------------------------------ *
            Error Management
/* ------------------------------------ */

// $ npm init -y
// $ npm i express dotenv
// $ echo PORT=8000 > .env

const express = require('express')
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

/* ------------------------------------ *
//* Throw an error.

app.get('/users/:id', (req, res) => {
    const { id } = req.params

    if (isNaN(id)) {

        throw new Error('Id is not a number')

    } else {

        res.send({
            error: false,
            id
        })
    }

});


/* ------------------------------------ *
//* lets use it with try catch

app.get('/users/:id', (req, res) => {
    const { id } = req.params

    try {
        if (isNaN(id)) {

            throw new Error('Id is not a number')

        } else {

            res.send({
                error: false,
                id
            })
        }
    } catch (error) {
        console.log(error);
        res.send({
            error: true,
            message: error.message
        })
    }

});

/* ------------------------------------ *
//* throw error with cause  while you have error handler middleware.

app.get('/users/:id', (req, res) => {
    const { id } = req.params

    if (isNaN(id)) {
        res.errorStatusCode = 400;
        throw new Error('Id is not a number', { cause: 'params.id=' + id });

    } else {

        res.send({
            error: false,
            id
        })
    }

});

/* ------------------------------------ */
//* Using try/catch with error handler middleware

app.get('/users/:id', (req, res, next) => {
    const { id } = req.params

    try {
        if (isNaN(id)) {

            res.errorStatusCode = 400;
            throw new Error('Id is not a number');

        } else {

            res.send({
                error: false,
                id
            })
        }
    } catch (error) {
        next(error) // so with error argument it will redirect to error handler middleware
    }

});

/* ------------------------------------ */
//* Async functions with error handler.

const asyncFn = async () => {

    await new Promise((resolve) => setTimeout(resolve, 3000));
    throw new Error('async error from async function')
    console.log('this is from async fn');
}

app.get('/async', async (req, res, next) => {

    // await asyncFn().catch(next) // with  express v4
    await asyncFn() // no need catch anymore with express v5

    res.send({
        error: false,
        message: 'async path'
    })
})


/* ------------------------------------ */
//*  Error Handler

const errorHandler = (err, req, res, next) => {

    // console.log(err);

    res.status(res.errorStatusCode ?? 500).send({
        error: true, // special data
        message: err.message, // error string message
        cause: err.cause, // errpr option cause
        stack: err.stack // error details
    })
};

// to make run error handler middleware, call in 'use' method.
// this must be last middleware.
app.use(errorHandler);

/* ------------------------------------ */
app.listen(PORT, () => console.log(`Running at: http://localhost:${PORT}`));