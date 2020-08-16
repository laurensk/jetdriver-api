'use strict';

const { sendError, Error } = require("../helpers/errorHandling");
const sql = require("../../db");

module.exports = function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) return sendError(res, Error.unauthenticated);

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    sql.query('SELECT tokUseId FROM JDTokens WHERE tokToken = ? AND tokValid = TRUE', [bearerToken], (err, rows) => {
        if (err) return sendError(res, Error.unknownError);
        if (!rows.length == 1) return sendError(res, Error.unauthenticated);
        req.body.uuid = rows[0].tokUseId;
        next();
    });
}