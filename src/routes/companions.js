'use strict';

const Joi = require('@hapi/joi');
const verifyToken = require('../api/user/verifyToken');
const router = require('express').Router();
const { sendError, Error } = require('../api/helpers/errorHandling');
const getCompanionsForUser = require('../api/companions/getCompanionsForUser');
const createCompanion = require('../api/companions/createCompanion');
const getCompanionWithId = require('../api/companions/getCompanionWithId');
const deleteCompanion = require('../api/companions/deleteCompanion');

router.route('/').get(verifyToken, (req, res) => {

    getCompanionsForUser(req.body.uuid, (error, companions) => {
        if (error) return sendError(res, error);
        res.json({
            companions: companions
        });
    });
});

router.route('/').post(verifyToken, (req, res) => {

    const validation = Joi.object({
        uuid: Joi.string().required(),
        name: Joi.string().required()
    });
    const { error } = validation.validate(req.body);
    if (error) return sendError(res, Error.validationError);

    createCompanion(req.body.uuid, req.body.name, (error, companion) => {
        if (error) return sendError(res, error);
        res.json({
            companion: companion
        });
    });
});

router.route('/:comId').get(verifyToken, (req, res) => {

    const comId = req.params.comId;
    getCompanionWithId(req.body.uuid, comId, (error, companion) => {
        if (error) return sendError(res, error);
        res.json({
            companion: companion
        });
    });
});

router.route('/:comId').delete(verifyToken, (req, res) => {

    const comId = req.params.comId;
    deleteCompanion(req.body.uuid, comId, (error, deletion) => {
        if (error) return sendError(res, error);
        res.json({
            delete: deletion
        });
    });
});

module.exports = router;