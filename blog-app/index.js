'use strict';
/* -------------------------------------- *
                BLOG API
/* -------------------------------------- */

const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

/* -------------------------------------- */
// Parse body
app.use(express.json());

// DB Connection
// const dbConnection = require('./src/dbConnection');
// dbConnection();
require('./src/dbConnection')()

/* -------------------------------------- */
// Main route
app.all('/', (req, res) => res.send('Welcome to Blog API'));

// Category route
app.use(require('./src/routes/category.route'));


/* -------------------------------------- */
// Not Found Handler
app.all('/*splat', (req, res) => {
    res.errorStatusCode = 404;
    throw new Error('Route is not found.');
});

// Error Handler
app.use(require('./src/middlewares/errorHandler'));
/* -------------------------------------- */
app.listen(PORT, console.log('Running port on: ', PORT));