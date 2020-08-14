'use strict';

const verifyToken = require('../api/verifyToken');
const router = require('express').Router();

router.route('/').get(verifyToken, (req, res) => {
    res.send('user');
});

router.route('/login').post((req, res) => {
    res.send('login');
});

router.route('/sign-up').post((req, res) => {
    res.send('sign-up');
});

module.exports = router;