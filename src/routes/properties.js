'use strict';

const router = require('express').Router();

router.route('/').get((req, res) => {
    res.send('properties');
});

router.route('/carTypes').get((req, res) => {
    res.send('carTypes');
});

router.route('/daytimes').get((req, res) => {
    res.send('daytimes');
});

router.route('/roadConditions').get((req, res) => {
    res.send('roadConditions');
});

module.exports = router;