'use strict';

const User = require('../models/user.model');


module.exports = {
    list: async (req, res) => {

        const result = await User.find();

        res.status(200).send({
            success: true,
            result
        });
    },
    read: async (req, res) => {

        const result = await User.findOne({ _id: req.params.id })

        res.status(200).send({
            success: true,
            result
        });
    },
    create: async (req, res) => {

        const result = await User.create(req.body)

        res.status(201).send({
            success: true,
            result
        });
    },
    update: async (req, res) => {

        const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(202).send({
            success: true,
            result
        });
    },
    deletee: async (req, res) => {

        const result = await User.deleteOne({ _id: req.params.id });

        if (result.deletedCount) {

            res.sendStatus(204);

        } else {
            res.errStatusCode = 404;
            throw new Error('Data is not found or already deleted.');
        }
    },
}