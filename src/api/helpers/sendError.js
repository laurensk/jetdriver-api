'use strict';

module.exports = function sendError(res, statusCode, message) {
    res.status(statusCode).send({ error: true, statusCode: statusCode, message: message });
}