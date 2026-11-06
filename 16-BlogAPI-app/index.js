'use strict';
/* -------------------------------------- *
                BLOG API
/* -------------------------------------- */

const express = require('express');
const app = express();

app.set('query parser', 'extended');

require('dotenv').config();
const PORT = process.env.PORT;

/* -------------------------------------- */
// Parse body
app.use(express.json());

// Session Cookies
// https://expressjs.com/en/resources/middleware/cookie-session/
// $ npm i cookie-session

const cookieSession = require('cookie-session');

app.use(cookieSession({
    name: 'blog-api',
    keys: [process.env.SECRET_KEY],

    // Cookie Options
    // maxAge: 24 * 60 * 60 * 1000, // 24 hours -> if u provie this, it becomes cookie
}));


// Authentication Middleware
app.use(require('./src/middlewares/authentication'));
/* -------------------------------------- */

app.use(require('./src/middlewares/queryHandler'))

// DB Connection
// const dbConnection = require('./src/dbConnection');
// dbConnection();
require('./src/dbConnection')()

/* -------------------------------------- */
// Main route
app.all('/', (req, res) => res.send({
    message: 'Welcome to Blog API',
    // cookieSession: req.session
    isLoggedIn: !!req.user
}));

// Category route
app.use('/categories', require('./src/routes/category.route'));

// Post route
app.use('/posts', require('./src/routes/post.route'));

// User route
app.use('/users', require('./src/routes/user.route'));


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
// require('./sync')();
