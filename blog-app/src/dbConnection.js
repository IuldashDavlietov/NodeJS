'use strict';

const mongoose = require('mongoose');
const dbConnection = () => {
    mongoose.connect('mongodb://localhost:27017/2-blogApi')
        .then(() => console.log('* DB Connected *'))
        .catch((err) => console.log('! DB Not Connected !', err));
}

module.exports = dbConnection