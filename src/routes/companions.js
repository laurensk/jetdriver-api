const router = require('express').Router();

router.route('/').get((req, res) => {
    res.send('companions');
});

router.route('/').post((req, res) => {
    res.send('create companion');
});

router.route('/:uuid').get((req, res) => {
    res.send('will get the companion with id ' + req.params.uuid);
});

module.exports = router;