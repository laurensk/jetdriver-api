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

    const uuid = req.body.uuid;
    getUser(uuid, (error, user) => {
        if (error) return sendError(res, error);
        res.json({
            user: user
        });
    });
});

router.route('/login').post((req, res) => {

    const validation = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().required()
    });
    const { error } = validation.validate(req.body);
    if (error) return sendError(res, Error.validationError);

    if (!validatePassword(req.body.password)) return sendError(res, Error.validationError);

    loginUser(req.body.email, req.body.password, (error, user, token) => {
        if (error) return sendError(res, error);
        res.header('auth-token', token);
        res.json({
            user: user
        });
    });
});

router.route('/sign-up').post((req, res) => {

    const validation = Joi.object({
        email: Joi.string().min(6).required().email(),
        name: Joi.string().min(1).required(),
        password: Joi.string().required()
    });
    const { error } = validation.validate(req.body);
    if (error) return sendError(res, Error.validationError);

    if (!validatePassword(req.body.password)) return sendError(res, Error.validationError);

    createUser(req.body.email, req.body.name, req.body.password, (error, user, token) => {
        if (error) return sendError(res, error);
        res.header('auth-token', token);
        res.json({
            user: user
        });
    });
});

module.exports = router;