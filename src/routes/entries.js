'use strict';

const Joi = require('@hapi/joi');
const verifyToken = require('../api/user/verifyToken');
const router = require('express').Router();
const { sendError, Error } = require('../api/helpers/errorHandling');
const getEntriesForUser = require('../api/entries/getEntriesForUser');
const createEntry = require('../api/entries/createEntry');
const getEntryWithId = require('../api/entries/getEntryWithId');
const deleteEntry = require('../api/entries/deleteEntry');

router.route('/').get(verifyToken, (req, res) => {

    getEntriesForUser(req.body.uuid, (error, entries) => {
        if (error) return sendError(res, error);
        res.json({
            entries: entries
        });
    });
});

router.route('/').post(verifyToken, (req, res) => {

    const validation = Joi.object({
        uuid: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
        startMileage: Joi.number().required(),
        endMileage: Joi.number().required(),
        routeDest: Joi.string().required(),
        notes: Joi.string().allow(null, ''),
        carId: Joi.string().required(),
        roadConditionId: Joi.number().required(),
        daytimeId: Joi.number().required(),
        companionId: Joi.string().required(),
    });
    const { error } = validation.validate(req.body);
    if (error) return sendError(res, Error.validationError);

    createEntry(req.body.uuid, req.body.startDate, req.body.endDate, req.body.startMileage, req.body.endMileage, req.body.routeDest, req.body.notes, req.body.carId, req.body.roadConditionId, req.body.daytimeId, req.body.companionId, (error, entry) => {
        if (error) return sendError(res, error);
        res.json({
            entry: entry
        });
    });
});

router.route('/:entId').get(verifyToken, (req, res) => {

    const entId = req.params.entId;
    getEntryWithId(req.body.uuid, entId, (error, entry) => {
        if (error) return sendError(res, error);
        res.json({
            entry: entry
        });
    });
});

router.route('/:entId').delete(verifyToken, (req, res) => {

    const entId = req.params.entId;
    deleteEntry(req.body.uuid, entId, (error, deletion) => {
        if (error) return sendError(res, error);
        res.json({
            delete: deletion
        });
    });
});

module.exports = router;