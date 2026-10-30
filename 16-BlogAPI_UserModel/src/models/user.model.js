'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    firstName: String,

    lastName: String,

    email: {
        type: String,
        trim: true,
        required: true,
        // unique: true,
        unique: [true, 'This email address is already in use.'],

        // validate: () => false // if validate retunr false it raises a validation error.

        // validate: [
        //     (email) => {
        //         if (email.includes('@') && email.includes('.')) {
        //             return true
        //         }
        //         return false
        //     },
        //     'Please enter a valid email address.'
        // ]

        match: [/.+@.+\..+/, 'Please enter a valid email address.']
    },

    password: {
        type: String,
        trim: true,
        required: true,

        set: (pass) => 'ondia' // whatwver set method returns, it will be saved to DB.
    }

}, {
    collection: 'users',
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;