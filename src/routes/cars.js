const router = require('express').Router();

router.route('/').get((req, res) => {
    res.send('cars');
});

router.route('/').post((req, res) => {
    res.send('create car');
});

router.route('/:uuid').get((req, res) => {
    res.send('will get the car with id ' + req.params.uuid);
});

module.exports = router;