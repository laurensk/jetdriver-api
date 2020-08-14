'use strict';

const verifyToken = require('../api/verifyToken');
const router = require('express').Router();

router.route('/').get(verifyToken, (req, res) => {
    res.send('companions');
});

router.route('/').post(verifyToken, (req, res) => {
    res.send('create companion');
});

router.route('/:uuid').get(verifyToken, (req, res) => {
    res.send('will get the companion with id ' + req.params.uuid);
});

module.exports = router;