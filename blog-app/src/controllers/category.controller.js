'use strict'

const Category = require('../models/category.model');

module.exports = {
    list: async (req, res) => {

        const result = await Category.find()

        res.status(200).send({
            success: true,
            result
        })
    },

    read: async (req, res) => {

        const result = await Category.findOne({_id: req.params.id})

        res.status(200).send({
            success: true,
            result
        })
    },

    create: async (req, res) => {

        const result = await Category.create(req.body)

        res.status(200).send({
            success: true,
            result
        })
    },

    update: async (req, res) => {

        const result = await Category

        res.status(200).send({
            success: true,
            result
        })
    },

    delete: async (req, res) => {

        const result = await Category

        res.status(200).send({
            success: true,
            result
        })
    }
}