'use strict';

module.exports = function validUser(req, res, next) {
    if (true) {
        next();
    } else {
        res.send(403);
    }
}