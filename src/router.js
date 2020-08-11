'use strict';

const cars = require('./routes/cars');
const companions = require('./routes/companions');
const entries = require('./routes/entries');
const properties = require('./routes/properties');
const user = require('./routes/user');

const router = require('express').Router();

router.use('/cars', cars);
router.use('/companions', companions);
router.use('/entries', entries);
router.use('/properties', properties);
router.use('/user', user);

module.exports = router;