'use strict';

/* ------------------------------------ *
        Express Built-in Middleware
 * ------------------------------------ */

const express = require('express');
const path = require('node:path');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

// Middleware runs before route handlers. These two middleware functions
// read common request-body formats and put the parsed data in req.body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. JSON body
// Try: POST /json with Content-Type: application/json
// Body: {"name":"Ada","level":"beginner"}
app.post('/json', (req, res) => {
    res.json({
        explanation: 'express.json() parsed the JSON body into an object.',
        body: req.body
    });
});

// 2. HTML form body
// Try: POST /form with Content-Type: application/x-www-form-urlencoded
// Body: name=Ada&level=beginner
app.post('/form', (req, res) => {
    res.json({
        explanation: 'express.urlencoded() parsed the form fields into an object.',
        body: req.body
    });
});

// 3. Plain-text body
// Try: POST /text with Content-Type: text/plain
// Body: Hello from a plain-text request
app.post('/text', express.text(), (req, res) => {
    res.json({
        explanation: 'express.text() puts the request body in req.body as a string.',
        body: req.body,
        bodyType: typeof req.body
    });
});

// 4. Binary body
// Try: POST /raw with Content-Type: application/octet-stream
// express.raw() puts the body in req.body as a Buffer (bytes).
app.post('/raw', express.raw({ type: 'application/octet-stream' }), (req, res) => {
    res.json({
        explanation: 'express.raw() keeps the request body as a Buffer.',
        bodyAsText: req.body.toString('utf8'),
        byteLength: req.body.length,
        isBuffer: Buffer.isBuffer(req.body)
    });
});

// 5. Static files
// Open http://localhost:<PORT>/static/hello.html to see the sample file.
// __dirname makes the folder path work even if Node is started elsewhere.
app.use('/static', express.static(path.join(__dirname, 'public')));

// Keep a simple request-inspection example:
// GET /hello?course=express shows route params, query, headers, and body.
app.all('/:hi', (req, res) => {
    res.send({
        error: false,
        params: req.params,
        query: req.query,
        headers: req.headers,
        body: req.body
    });
});

app.listen(PORT, () => console.log(`Running at: http://localhost:${PORT}`));
