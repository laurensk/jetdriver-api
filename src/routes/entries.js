'use strict';

const validUser = require('../api/validUser');
const router = require('express').Router();

router.route('/').get(validUser, (req, res) => {
    res.send('entries');
});

router.route('/').post(validUser, (req, res) => {
    res.send('create entry');
});

router.route('/:uuid').get(validUser, (req, res) => {
    res.send('will get entry with id ' + req.params.uuid);
});

module.exports = router;