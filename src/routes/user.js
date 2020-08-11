'use strict';

const router = require('express').Router();

router.route('/').get((req, res) => {
    res.send('user');
});

router.route('/login').post((req, res) => {
    res.send('login');
});

router.route('/sign-up').post((req, res) => {
    res.send('sign-up');
});

module.exports = router;