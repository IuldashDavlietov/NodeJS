'use strict'
/* ---------------------------------- *
                NODEJS
/* ---------------------------------- */

// 1. Created package.json -> $ npm init -y
// 2. Created index.js
// 3. Created .gitignore



const http = require('node:http'); // built-in module

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

const app = http.createServer((req, res)=>{
    res.end('server on')
});

app.listen(PORT, HOST, ()=> console.log('Server started: http://localhost:8000'))

/* ---------------------------------- */
/* ---------------------------------- */
/* ---------------------------------- */
/* ---------------------------------- */
/* ---------------------------------- */