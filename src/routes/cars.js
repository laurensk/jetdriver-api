'use strict';

const verifyToken = require('../api/verifyToken');
const router = require('express').Router();

router.route('/').get(verifyToken, (req, res) => {
    res.send('cars');
});

router.route('/').post(verifyToken, (req, res) => {
    res.send('create car');
});

router.route('/:uuid').get(verifyToken, (req, res) => {
    res.send('will get the car with id ' + req.params.uuid);
});

module.exports = router;