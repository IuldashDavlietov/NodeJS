"use strict";
/* ------------------------------------------ *
            Todo API with Sequelize
/* ------------------------------------------ */

// $ npm init -y
// $ npm i express dotenv
// $ echo PORT=8000 > .env
// $ npm i sequelize sqlite3

const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

/* ------------------------------------------ */
//* MIDDLEWARES:

// Parsed JSON body
app.use(express.json());

/* ------------------------------------------ */
//* Sequelize
const { Sequelize, DataTypes } = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize('sqlite:./db.sqlite3');

// Create a Todo model
// sequelize.define(TableName, {columns(attributes/fields)})
const Todo = sequelize.define('todos', {

    // no need to define ID field. it will be created auto.
    // id

    title: {
        type: DataTypes.STRING(256), // varchar(250),
        allowNull: false
    },

    description: DataTypes.TEXT,

    priority: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },

    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    // No need to define createdAt and updatedAt fields. it will come from sequelize
    // createdAt
    // updatedAt

    // newFiled: DataTypes.STRING
});

// Synchronization (runs only once)
// sequelize.sync() // CREATE TABLE
// sequelize.sync({ force: true }) // DROP TABLE + CREATE TABLE
// sequelize.sync({ alter: true }) // BACKUP EXISITING TABLES + DROP TABLE + CREATE TABLE FROM BACKUP DATA


// Testing the connection
sequelize.authenticate()
    .then(() => console.log('* DB Connected *'))
    .catch(() => console.log('! DB NOT Connected !'))

/* ------------------------------------------ */
//* ROUTES

// HOME PATH
app.get('/', (req, res) => {

    res.status(200).send({
        success: true,
        message: 'TODO REST API'
    })
});

// LIST TODO:
app.get('/todos', async (req, res) => {

    // const result = await Todo.findAll(); // SELECT * FROM  `todos`;
    // const result = await Todo.findAll({ attributes: ['title', 'id'] }); // SELECT title, id FROM  `todos`;
    const result = await Todo.findAndCountAll({ attributes: ['title', 'id', 'isDone'] });

    res.status(200).send({
        success: true,
        result
    });
});


// CREATE TODO:
app.post('/todos', async (req, res) => {

    // const result = await Todo.create({
    //     title: 'title 3',
    //     description: 'desc 3'
    // });

    const result = await Todo.create(req.body); // INSERT INTO `todos` ...

    res.status(201).send({
        success: true,
        result
    });
});

// READ SINGLE TODO:
app.get('/todos/:id', async (req, res) => {

    // const result = await Todo.findOne({ where: { id: req.params.id } }) // SELECT * FROM `todos` WHERE id === 1...
    // const result = await Todo.findOne({ where: { title: req.params.id } }) // SELECT * FROM `todos` WHERE title === title 3
    const result = await Todo.findByPk(req.params.id);

    res.status(200).send({
        success: true,
        result
    });
});

// UPDATE TODO:
app.put('/todos/:id', async (req, res) => {


    const result = await Todo.update(req.body, { where: { id: req.params.id } })
    // if returns [1] -> updated
    // if returns [0] -> failed

    // todo: if faild trhow error saying data is not found.

    res.status(200).send({
        succes: true,
        result
    });
});


// todo: delete route


/* ------------------------------------------ */
//* ERROR HANDLER

const errorHandler = (err, req, res, next) => {

    res.status(res.errorStatusCode ?? 500).send({
        success: false,
        message: err.message,
        cause: err.cause,
        stack: err.stack
    })
};

app.use(errorHandler);

/* ------------------------------------------ */
app.listen(PORT, console.log('Listening on port:', PORT));