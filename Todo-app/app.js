"use strict";

const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;


const Todo = require('./modules/todo');
const checkTodoId = require('./middlewares/middleware');
const { where } = require('sequelize');

app.use(express.json());



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
app.put('/todos/:id', async (req, res) => {
    const result = await Todo.update(req.body, { where: { id: req.params.id } });

    if (!result[0]) {
        res.errorStatusCode = 400;
        throw new Error('Data is not updated. Someting went wrong.');
    }

    res.status(200).send({
        success: true,
        result
    });
});

// DELETE Todo:
app.delete('/todos/:id', async (req, res) => {
    const result = await Todo.destroy({ where: { id: req.params.id } });

    if(!result){
        res.errorStatusCode = 400;
        throw new Error('Data is not deleted. Something went wrong.');
    }
    res.sendStatus(204);
});

app.all('/*splat', (req, res)=>{
    throw new Error('Route is not found.');
});

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
app.listen(PORT, () => console.log('Listening on port:', PORT));