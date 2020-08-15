'use strict';

function sendError(res, error) {
    res.status(statusCode).send({
        error: true,
        statusCode: error.statusCode || Error.unknownError.statusCode,
        message: error.message || Error.unknownError.message
    });
}

class Error {
    unknownError = { statusCode: 400, message: "ERROR" }
    unauthenticated = { statusCode: 403, message: "UNAUTHENTICATED" }
    emailExists = { statusCode: 400, message: "EMAIL_EXISTS" }
}

module.exports = {
    sendError: sendError,
    Error: new Error()
}