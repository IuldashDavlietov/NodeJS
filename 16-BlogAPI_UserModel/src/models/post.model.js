'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    // _id // hesadecimal objectId type

    categoryId: { // default relation; OneToMany
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        // unique: true // convert to  OneToOne relation
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    title: {
        type: String,
        trim: true,
        required: true
    },

    content: {
        type: String,
        trim: true,
        required: true
    }

    // createdAt    
    // updatedAt    

}, {
    collection: 'posts',
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post