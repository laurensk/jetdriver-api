'use strict';

const verifyToken = require('../api/verifyToken');
const router = require('express').Router();

router.route('/').get(verifyToken, (req, res) => {
    res.send('entries');
});

router.route('/').post(verifyToken, (req, res) => {
    res.send('create entry');
});

router.route('/:uuid').get(verifyToken, (req, res) => {
    res.send('will get entry with id ' + req.params.uuid);
});

module.exports = router;