'use strict';

const validUser = require('../api/validUser');
const router = require('express').Router();

router.route('/').get(validUser, (req, res) => {
    res.send('companions');
});

router.route('/').post(validUser, (req, res) => {
    res.send('create companion');
});

router.route('/:uuid').get(validUser, (req, res) => {
    res.send('will get the companion with id ' + req.params.uuid);
});

module.exports = router;