'use strict';

const Joi = require('@hapi/joi');
const router = require('express').Router();
const { sendError, Error } = require('../api/helpers/errorHandling');

const verifyToken = require('../api/user/verifyToken');

const getUser = require('../api/user/getUser');
const loginUser = require('../api/user/loginUser');
const createUser = require('../api/user/createUser');
const validatePassword = require('../api/helpers/validatePassword');

router.route('/').get(verifyToken, (req, res) => {
    getUser(req, res);
});

router.route('/login').post((req, res) => {
    loginUser(req, res);
});

router.route('/sign-up').post((req, res) => {

    const validation = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().required()
    });
    const { error } = validation.validate(req.body);
    if (error) return sendError(res, Error.unauthenticated);

    if (validatePassword(req.body.password)) return sendError(res, Error.unauthenticated);

    createUser(req.body.email, req.body.password, (error, user) => {
        if (error) return sendError(res, Error.unauthenticated);
        res.json(user);
    });

});

module.exports = router;