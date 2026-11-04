'use strict';

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({

    // _id 

    name: {
        type: String,
        trim: true,
        required: true
    }

}, { collection: 'categories' });


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

/* ------------------------------------------------- *
//* 1-Create Schema
// new mongoose.schema({fields}, {options})

const mongoose = require('mongoose');

const nameSchema = new mongoose.Schema({

    // _id: auto created my mongodb

    fieldName1: Number,
    fieldName2: Boolean,
    
    fieldName3: {
        type: String, // Jd data type
        default: null,
        trim: true, // cuts the spaces before & after
        unique: true, // dont repeat value again in this table 
        select: false, // dont send this field to user
        // required: true,
        required: [true, 'custom error message'],
        // enum: [1, 2, 3, 4],
        enum: [[1, 2, 3, 4], 'custom enum error message'],
        validate: () => true,  // it returns boolean that shows is validated or not. if not it raises an error.
        // they work default in read and create/update operations.
        get: () => data,
        set: () => data
    }
}, {
    collection: 'collectionName', // table name
    timestamps: true // createdAt & updatedAt
});

//* 2- Convert Schema to Model
// mongoose.model('ModelName', nameSchema)

mongoose.model('Model', nameSchema);

/* ------------------------------------------------- */