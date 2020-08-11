'use strict';

const router = require('express').Router();

router.route('/').get((req, res) => {
    res.send('entries');
});

router.route('/').post((req, res) => {
    res.send('create entry');
});

router.route('/:uuid').get((req, res) => {
    res.send('will get entry with id ' + req.params.uuid);
});

module.exports = router;