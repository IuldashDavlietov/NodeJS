'use strict';

const mongoose = require('mongoose');
const Post = require('./models/post.model');

const dbConnection = () => {
    mongoose.connect('mongodb://localhost:27017/2-blogApi')
        .then(() => console.log('* DB Connected *'))
        .catch((err) => console.log('! DB Not Connected !', err));

    // Post.syncIndexes()
    //     .then((changes)=> console.log(changes))
    //     .catch(()=> console.log('not synced'))
};

module.exports = dbConnection;