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

    // User
    unauthenticated = { statusCode: 403, message: "UNAUTHENTICATED" }
    invalidToken = { statusCode: 400, message: "INVALID_TOKEN" }
    unknownError = { statusCode: 400, message: "ERROR" }
    validationError = { statusCode: 400, message: "VALIDATION_ERROR" }
    emailExists = { statusCode: 400, message: "EMAIL_EXISTS" }
    loginFailed = { statusCode: 400, message: "LOGIN_FAILED" }

    // Car
    carNotFound = { statusCode: 400, message: "CAR_NOT_FOUND" }
    carDependency = { statusCode: 400, message: "CAR_DEPENDENCY" }

    // Companion
    companionNotFound = { statusCode: 400, message: "COMPANION_NOT_FOUND" }
    companionDependency = { statusCode: 400, message: "COMPANION_DEPENDENCY" }

    // Entries
    entryNotFound = { statusCode: 400, message: "ENTRY_NOT_FOUND" }

    // Properties
    propertyNotAvailable = { statusCode: 400, message: "PROPERTY_NOT_AVAILABLE" }
}

module.exports = {
    sendError: sendError,
    Error: new Error()
}