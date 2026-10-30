'use strict';

const Category = require('../models/category.model');


module.exports = {
    list: async (req, res) => {

        const result = await Category.find();

        res.status(200).send({
            success: true,
            result
        });
    },
    read: async (req, res) => {

        const result = await Category.findOne({ _id: req.params.id })

        res.status(200).send({
            success: true,
            result
        });
    },
    create: async (req, res) => {

        const result = await Category.create(req.body)

        res.status(201).send({
            success: true,
            result
        });
    },
    update: async (req, res) => {

        //* response from updateOne : {
        // "acknowledged": true, // if update methods ends successfuly.
        // "modifiedCount": 1, // if returns 0 : no any data updated cause data is already up to date.
        // "upsertedId": null, //  No new document was inserted. Combination of update and insert.
        // "upsertedCount": 0, // Since nothing was inserted, no new ID.
        // "matchedCount": 1 // number of data matches with our filter.
        // }

        // updateOne({..filter}, {..data}, {..?options})
        // const result = await Category.updateOne({ _id: req.params.id }, req.body)

        // findByIdAndUpdate( id, {..data}, {..?options})
        // const result = await Category.findByIdAndUpdate(req.params.id, req.body)
        const result = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(202).send({
            success: true,
            result
        });
    },
    deletee: async (req, res) => {

        // deleteOne({..filter})
        const result = await Category.deleteOne({ _id: req.params.id });
        // const result = await Category.findByIdAndDelete(req.params.id);

        if (result.deletedCount) {

            res.sendStatus(204);

        } else {
            res.errStatusCode = 404;
            throw new Error('Data is not found or already deleted.');
        }
    },
}