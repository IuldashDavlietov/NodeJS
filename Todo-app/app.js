"use strict";

const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;


const Todo = require('./modules/todo'); 
const checkTodoId = require('./middlewares/middleware');

/* ------------------------------------------ */
//* MIDDLEWARES:
// Parsed JSON body
app.use(express.json());

/* ------------------------------------------ */
//* ROUTES

// HOME PATH
app.get('/', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'TODO REST API'
    });
});

// LIST TODO:
app.get('/todos', async (req, res) => {
    const result = await Todo.findAndCountAll({ attributes: ['title', 'id', 'isDone'] });
    res.status(200).send({
        success: true,
        result
    });
});

// CREATE TODO:
app.post('/todos', async (req, res) => {
    const result = await Todo.create(req.body); 
    res.status(201).send({
        success: true,
        result
    });
});

// READ SINGLE TODO:
app.get('/todos/:id', checkTodoId, async (req, res) => {
    res.status(200).send({
        success: true,
        result: req.todo 
    });
});

// UPDATE TODO:
app.put('/todos/:id', checkTodoId, async (req, res) => {
    const result = await req.todo.update(req.body);

    res.status(200).send({
        success: true, 
        result
    });
});

// DELETE Todo:
app.delete('/todos/:id', checkTodoId, async (req, res) => {
    await req.todo.destroy();
    
    res.status(200).send({
        success: true,
        message: "Deleted"
    });
});

/* ------------------------------------------ */
//* ERROR HANDLER

const errorHandler = (err, req, res, next) => {
    res.status(res.errorStatusCode ?? 500).send({
        success: false,
        message: err.message,
        cause: err.cause,
        stack: err.stack
    });
};

app.use(errorHandler);

/* ------------------------------------------ */
app.listen(PORT, () => console.log('Listening on port:', PORT));