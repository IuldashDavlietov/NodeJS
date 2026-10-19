'use strict';
/* -------------------------------------------- *
                Express & Routing
/* -------------------------------------------- *
// https://expressjs.com/

// $ npm init -y
// $ npm i express
// $ npm i dotenv

const express = require('express'); // Assign expressfaremework to express variable.

const app = express(); // Run application on express and assigned it to variable called app.

// app.METHOD(PATH, HANDLER);
Where:
// app is an instance of express.
// METHOD is an HTTP request method, in lowercase.
// PATH is a path on the server.
// HANDLER is the function executed when the route is matched.

app.get('/', (request, response)=>{
    response.send('Welcome to the express routing session.')
})

require('dotenv').config(); // helps to get varaibles inside .env file

const PORT = process.env.PORT;

app.listen(PORT, ()=> console.log('Running at: http://127.0.0.1:8000'))

/* -------------------------------------------- */

const express = require('express');
require('dotenv').config();

const app = express();

/* -------------------------------------------- *
//? HTTP_METHODS & URI'S;
// app.get('/', (req, res)=> res.end("called in 'get' method."));
// app.post('/', (req, res)=> res.end("called in 'post' method."));
// app.put('/', (req, res)=> res.end("called in 'put' method."));
// app.patch('/', (req, res)=> res.end("called in 'patch' method."));
// app.delete('/', (req, res)=> res.end("called in 'delete' method."));

//* Allow all the methods at once for an uri
// app.all('/', (req, res)=> res.end("called in 'all' method."));

//* if your uri is same but methods different -> app.route(uri)
app.route('/')
    .get((req, res)=> res.end("called in 'get' method."))
    .post((req, res)=> res.end("called in 'post' method."))
    .put((req, res) => res.end('called in "put method"...'))
    .patch((req, res) => res.end('called in "patch method"...'))
    .delete((req, res) => res.end('called in "delete method"...'));

/* -------------------------------------------- *
//? URI Parameters:
app.get('/blogs/:blogId/search/:text', (req, res) => {
    // console.log(req)
    // console.log(req.params)
    console.log(req.params.blogId)

    res.send({
        message: 'ok',
        blogId: req.params.blogId,
        url: {
            protocol: req.protocol,
            subdomains: req.subdomains,
            hostname: req.hostname,
            params: req.params,
            query: req.query,
            path: req.path
        }
    })
})

/* -------------------------------------------- *
//? URI (Path) Options:

//* Optional segments
// Use braces to define optional segments in a route path. When the segment is not present, the parameter is omitted from req.params.

// app.get('/:file{.:ext}', (req, res) => {
//   // GET /image.png => req.params = { file: 'image', ext: 'png' }
//   // GET /image => req.params = { file: 'image' }
//   console.log(req.params)
//   res.send('ok');
// });

// app.get('/user/{:id}', (req, res) => {
//   // GET /user/42 => req.params = { id: '42' }
//   // GET /user/ => req.params = {}
//   // GET /user => 404, only the parameter is optional
//   res.send('ok');
// });

// app.get('/order{/:id}', (req, res) => {
//   // GET /order/42 => req.params = { id: '42' }
//   // GET /order => req.params = {}, the whole segment is optional
//   res.send('ok');
// });


//* Wildcards
// Wildcards match any path after a prefix. Like other route parameters they must have a name, but they are captured as an array of path segments instead of a string.
// app.get('/files/*filepath', (req, res) => {
//     // GET /files/images/logo.png
//     console.log(req.params.filepath);
//     // => [ 'images', 'logo.png' ]
//   res.send(`File: ${req.params.filepath.join('/')}`);
// });


// To also match the root path, wrap the wildcard in braces:
// Matches / , /foo , /foo/bar , etc.

// app.get('/{*splat}', (req, res) => {
//   // GET / => req.params = {}, splat is omitted
//   // GET /foo/bar => req.params.splat = [ 'foo', 'bar' ]
//   console.log(req.params.splat)
//   res.send('ok');
// });

//* Regex
// Any path that contains the letter “a”
app.get(/a/, (req, res) => {
  res.send('Matched /a/');
});

// Paths that end with “fly” (butterfly, dragonfly, etc.)
app.get(/.*fly$/, (req, res) => {
  res.send('Matched /.*fly$/');
})

/* -------------------------------------------- *
//? Response Methods:

app.get('/', (req, res) => {

    //* 1. way 
    // res.sendStatus(401)

    //* 2. way 
    // res.status(401)
    // res.send('ok');

    //* 3. way 
    res.status(202).send({
        error: false,
        message: 'ok'
    })
})

app.get('/status-code', (req, res) => res.send({ message: 'ok' })) // default status code : 200
app.post('/status-code', (req, res) => res.status(201).send({ message: 'ok' })) // post status code : 201
app.put('/status-code', (req, res) => res.status(202).send({ message: 'ok' })) // put status code : 202
app.delete('/status-code', (req, res) => res.sendStatus(204)) // delete status code : 204

/* -------------------------------------------- */
//? Download File:

app.get('/download', (req, res)=> res.download('./app.js', 'express-intro.txt'))

app.get('/download', (req, res) => {
  res.download('./app.js', 'express-intro.txt', (err) => {
    if (err) {
      console.error('Download failed:', err);
      if (!res.headersSent) {
        res.status(500).send('Could not download the file');
      }
      return;
    }

    console.log('Download completed');
  });
});

//? Redirect:
app.get('/redirect', (req, res)=> res.redirect(301, 'https://www.clarusway.com'))
app.get('/redirect-temp', (req, res)=> res.redirect(302, 'https://www.google.com'))


/* -------------------------------------------- */

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Running at: http://127.0.0.1:8000'))
