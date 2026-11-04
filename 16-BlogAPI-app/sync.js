"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const User = require('./src/models/user.model')
const Category = require('./src/models/category.model')
const Post = require('./src/models/post.model')

module.exports = async () => {

    /* Exampla Data */
    // Deleted All Records:
    await Post.deleteMany().then(() => console.log(' - Post Deleted All'))
    await User.deleteMany().then(() => console.log(' - User Deleted All'))
    await Category.deleteMany().then(() => console.log(' - Category Deleted All'))

    // Example User:
    const user = await User.create({
        email: "test@test.com",
        password: "12345678",
        firstName: "Test",
        lastName: "Test"
    })
    // Example Category:
    const category = await Category.create({
        name: 'Test Category'
    })
    // Example Posts:
    for (let key = 0; key < 200; key += 1) {
        await Post.create({
            userId: user._id,
            categoryId: category._id,
            title: `test ${key} title`,
            content: `test ${key} content`,
            isPublished: Boolean(key % 2)
        })
    }

    // Finish:
    console.log('* Syncronized.')

}

/* ------------------------------------------------------- */