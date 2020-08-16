'use strict';

const { sendError, Error } = require("../helpers/errorHandling");
const mysql = require('mysql');
const sql = require("../../db");

module.exports = function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) return sendError(Error.unauthenticated);

    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    sql.query('SELECT tokUseId FROM JDTokens WHERE tokToken = ? AND tokValid = TRUE', [bearerToken], (err, rows) => {
        console.log(rows);
        if (err) return sendError(Error.unknownError);
        if (rows.length === 1) {
            const uuid = rows[0].tokUseId;
            req.body.uuid = uuid;
            next();
        } else {
            sendError(res, Error.unauthenticated);
        }
    });
}