'use strict';

const Joi = require('@hapi/joi');
const verifyToken = require('../api/user/verifyToken');
const router = require('express').Router();
const { sendError } = require('../api/helpers/errorHandling');
const getCarsForUser = require('../api/cars/getCarsForUser');
const createCar = require('../api/cars/createCar');
const getCarWithId = require('../api/cars/getCarWithId');

router.route('/').get(verifyToken, (req, res) => {

    getCarsForUser(req.body.uuid, (error, cars) => {
        if (error) return sendError(res, error);
        res.json({
            cars: cars
        });
    });
});

router.route('/').post(verifyToken, (req, res) => {

    const validation = Joi.object({
        typeId: Joi.number().required(),
        numberPlate: Joi.string().required(),
        name: Joi.string().required(),
        brand: Joi.string(),
        model: Joi.string()
    });
    const { error } = validation.validate(req.body);
    if (error) return sendError(res, Error.validationError);

    createCar(req.body.uuid, req.body.typeId, req.body.numberPlate, req.body.name, req.body.brand, req.body.model, (error, car) => {
        if (error) return sendError(res, error);
        res.json({
            car: car
        });
    });
});

router.route('/:carId').get(verifyToken, (req, res) => {

    const carId = req.params.carId;
    getCarWithId(req.body.uuid, carId, (error, car) => {
        if (error) return sendError(res, error);
        res.json({
            car: car
        });
    });
});

module.exports = router;