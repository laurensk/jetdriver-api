'use strict';

const validUser = require('../api/validUser');
const router = require('express').Router();

router.route('/').get(validUser, (req, res) => {
    res.send('cars');
});

router.route('/').post(validUser, (req, res) => {
    res.send('create car');
});

router.route('/:uuid').get(validUser, (req, res) => {
    res.send('will get the car with id ' + req.params.uuid);
});

module.exports = router;