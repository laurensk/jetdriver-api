'use strict';

const router = require('express').Router();
const { sendError } = require('../api/helpers/errorHandling');
const getProperties = require('../api/properties/getProperties');
const getCarTypes = require('../api/properties/getCarTypes');
const getDaytimes = require('../api/properties/getDaytimes');
const getRoadConditions = require('../api/properties/getRoadConditions');

router.route('/').get((req, res) => {

    getProperties((error, properties) => {
        if (error) return sendError(res, error);
        res.json({
            properties: properties
        });
    });
});

router.route('/carTypes').get((req, res) => {

    getCarTypes((error, carTypes) => {
        if (error) return sendError(res, error);
        res.json({
            carTypes: carTypes
        });
    });
});

router.route('/daytimes').get((req, res) => {

    getDaytimes((error, daytimes) => {
        if (error) return sendError(res, error);
        res.json({
            daytimes: daytimes
        });
    });
});

router.route('/roadConditions').get((req, res) => {

    getRoadConditions((error, roadConditions) => {
        if (error) return sendError(res, error);
        res.json({
            roadConditions: roadConditions
        });
    });
});

module.exports = router;