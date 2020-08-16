'use strict';

function sendError(res, error) {
    res.status(error.statusCode).send({
        error: {
            statusCode: error.statusCode || Error.unknownError.statusCode,
            message: error.message || Error.unknownError.message
        }
    });
}

class Error {
    unauthenticated = { statusCode: 403, message: "UNAUTHENTICATED" }
    unknownError = { statusCode: 400, message: "ERROR" }
    validationError = { statusCode: 400, message: "VALIDATION_ERROR" }
    emailExists = { statusCode: 400, message: "EMAIL_EXISTS" }
    loginFailed = { statusCode: 400, message: "LOGIN_FAILED" }
}

module.exports = {
    sendError: sendError,
    Error: new Error()
}