'use strict';

const Post = require('../models/post.model');
module.exports = {
    list: async (req, res) => {
        // const result = await Post.find();
        // const result = await Post.find({}, { __v: 0 })
        //     .populate('categoryId', { __v: 0 })
        //     .populate('userId', { __v: 0, password: 0 , createdAt: 0, updatedAt: 0 });
        const result = await Post.find({}, { __v: 0 })
            .populate([
                { path: 'categoryId', select: { __v: 0 } },
                { path: 'userId', select: '-__v -password -createdAt -updatedAt' }
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