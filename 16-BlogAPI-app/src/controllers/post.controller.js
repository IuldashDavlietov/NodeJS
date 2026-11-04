'use strict';

const Post = require('../models/post.model');


module.exports = {
    list: async (req, res) => {

        /* ----------------------------------------------- *
        //* FILTRING & SEARCHING & SORTING & PAGINATION

        // Filter: searches for absolute equality, Search: searches for partial equality.

        //* Filter: 
        // URL/?filter[fieldName]=value&filter[fieldName2]=value2
        const filter = req.query?.filter || {}

        //* Search: 
        // URL/?search[fieldName]=value&search[fieldName2]=value2
        const search = req.query?.search || {}

        // {field: { $regex: 'value', $options: 'i' }} // this is how mongodb expect search
        // {content: {$regex: 'test 1', $options: 'i'}}

        // console.log(search.content)
        // console.log(search['content'])
        for (let key in search) search[key] = { $regex: search[key], $options: 'i' }

        //* Search: 
        // URL/?sort[fieldName]=value&sort[fieldName2]=value2
        const sort = req.query?.sort || {}

        //? PAGINATION:
        // URL/?page=3&limit=20&skip=20

        //* Page: 
        let page = parseInt(req.query?.page)
        page = page > 0 ? page : 1;

        //* limit: 
        let limit = parseInt(req.query?.limit)
        limit = limit > 0 ? limit : 20;

        //* skip: 
        let skip = parseInt(req.query?.skip)
        skip = skip > 0 ? skip : (page - 1) * limit

        const result = await Post.find({ ...search, ...filter }, { __v: 0 })
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .populate([
                { path: "categoryId", select: "-__v" },
                { path: "userId", select: "-password -createdAt -updatedAt -__v" },
            ])

        /* ----------------------------------------------- */

        const result = await res.getModelList(Post, [
            { path: "categoryId", select: "-__v" },
            { path: "userId", select: "-password -createdAt -updatedAt -__v" },
        ]);

        res.status(200).send({
            success: true,
            result
        });
    },
    read: async (req, res) => {

        const result = await Post.findOne({ _id: req.params.id })

        res.status(200).send({
            success: true,
            result
        });
    },
    create: async (req, res) => {

        if (!req.user) {
            res.errStatusCode = 401;
            throw new Error('You are not authorized to create a post. Please login first.');
        }

        req.body.userId = req.user._id;

        const result = await Post.create(req.body)

        res.status(201).send({
            success: true,
            result
        });
    },
    update: async (req, res) => {

        if (!req.user) {
            res.errStatusCode = 401;
            throw new Error('You are not authorized to update a post. Please login first.');
        }

        const result = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(202).send({
            success: true,
            result
        });
    },
    deletee: async (req, res) => {

        if (!req.user) {
            res.errStatusCode = 401;
            throw new Error('You are not authorized to delete a post. Please login first.');
        }

        const result = await Post.deleteOne({ _id: req.params.id });

        if (result.deletedCount) {

            res.sendStatus(204);

        } else {
            res.errStatusCode = 404;
            throw new Error('Data is not found or already deleted.');
        }
    },
}