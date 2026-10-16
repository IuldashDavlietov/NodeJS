'use strict'
/* ---------------------------------- *
                NODEJS
/* ---------------------------------- */

// 1. Created package.json -> $ npm init -y
// 2. Created index.js
// 3. Created .gitignore

const http = require('node:http'); // built-in module
const { json } = require('node:stream/consumers');

/* ---------------------------------- *
//? HTTPSERVER:

// http.createServer((request, response)=>{...})

http.createServer((request, response) => {
    console.log('hi there')
    response.end('this is chort 12')
}).listen(8000, ()=> console.log('Server started: http://localhost:8000'))

/* ---------------------------------- *

const app = http.createServer((request, response) => {
    console.log('hi there')
    response.end('this is chort 12')
});

// default server domain is localhost(127.0.0.1)
// app.listen(8000, 'localhost', () => console.log('Server started: http://localhost:8000'));
// app.listen(8000, '127.0.0.1', () => console.log('Server started: http://localhost:8000'));
app.listen(8000, () => console.log('Server started: http://localhost:8000'));

/* ---------------------------------- *
//* Routes in nodejs server

const app = http.createServer((req, res) => {
    // console.log(req)
    // console.log(res)
    console.log(req.url)

    res.write('firts line\n')
    res.write('second line\n')
    res.write('third line\n')

    if(req.url === '/'){
        res.end('main page')
    } else if (req.url === '/users'){
        res.end('users data')
    } else if (req.url === '/products'){
        res.end('products data')
    } else {
        res.end('404 page not found')
    }


});

app.listen(8000, () => console.log('Server started: http://localhost:8000'));

/* ---------------------------------- */
//* Mini Server Logic

// $ npm i dotenv

let items = [
    { id: 1, name: "learn nodejs server" },
    { id: 2, name: "be expert on express" },
];

require('dotenv').config()
const PORT = process.env.PORT
const HOST = process.env.HOST


const parseBody = require('./helper')

const app = http.createServer(async (req, res) => {
    // console.log(req.url)
    // console.log(req.method)
    if (req.url === '/' && req.method === 'GET') {

        res.end(JSON.stringify({
            error: false,
            message: 'Welcome to my mini server',
        }))

    } else if (req.url === '/items' && req.method === 'GET') {
        // READ - list all items

        res.end(JSON.stringify({
            error: false,
            data: items
        }))

    } else if (req.url === '/items' && req.method === 'POST') {
        // CREATE - adding new item
        const body = await parseBody(req);
        items.push({ id: Date.now(), name: body.name });
        res.end(JSON.stringify({
            error: false,
            message: 'new data created'
        }))
    } else if (req.url.match(/^\/items\/(\d+)$/) && req.method === 'GET') {
        // GET - get single item

        const id = req.url.split('/')[2]
        const item = items.find(item => item.id === parseInt(id));
        console.log(item)

        if (!item) {
            res.end(JSON.stringify({
                error: true,
                message: 'item not found'
            }))
        } else {
            res.end(JSON.stringify({
                error: false,
                data: item
            }))
        }
    }


    else if ((req.url.match(/^\/items\/(\d+)$/) && req.method === 'PUT')) {
        const id = req.url.split('/')[2]
        const item = items.find(item => item.id === parseInt(id));

        if (!item) {
            res.end(JSON.stringify({
                error: true,
                message: 'item not found'
            }))
        } else {
            console.log(item)
               const body = await parseBody(req);
            item.name = body.name
            res.end(JSON.stringify({
                error: false,
                message: 'data is updateded'
            }))
        }
    }

    else {
        res.end('not found')
    }
});

app.listen(PORT, HOST, () => console.log('Server started: http://localhost:8000'))

/* ---------------------------------- */
/* ---------------------------------- */
/* ---------------------------------- */
/* ---------------------------------- */
/* ---------------------------------- */
