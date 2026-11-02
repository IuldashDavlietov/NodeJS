'use strict';

const User = require('../models/user.model');
const { passwordEncrypte } = require('../utils');

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
    login: async (req, res) => {
        const { email, password } = req.body;
        // 1. check credentials in req.body
        if (email && password) {

            // 2. check email in db
            const user = await User.findOne({ email });

            if (user) {
                // 3. check password in db
                if (user.password == passwordEncrypte(password)) {
                    // 4. set session
                    req.session = {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    }

                    if (req.body.rememberMe) {
                        req.session.rememberMe = true;
                        req.sessionOptions.maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days
                    }
                    res.status(200).send({
                        success: true,
                        message: 'Login is successfull.'
                    });
                } else {
                    res.errStatusCode = 404;
                    throw new Error('Wrong Email or Password.');
                }
            } else {
                res.errStatusCode = 404;
                throw new Error('Wrong Email or Password.');
            }
        } else {
            res.errStatusCode = 401;
            throw new Error('Email and Password required.');
        }
    },

    logout: async (req, res) => {
        req.session = null;
        res.status(200).send({
            success: true,
            message: 'Logout is successfull.'
        });
    }
}