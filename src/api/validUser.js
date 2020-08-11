'use strict';

const sendError = require("./sendError");

module.exports = function validUser(req, res, next) {
    if (false) {
        next();
    } else {
        sendError(res, 403, 'unauthorized');
    }
}