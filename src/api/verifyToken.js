'use strict';

const sendError = require("./sendError");
const sql = require("../db");

module.exports = function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        sendError(res, 403, 'unauthorized');
    }
    sql.query('SELECT * FROM JDTokens WHERE ', function (err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows[0].solution);
    });
    if (false) {
        next();
    } else {
        sendError(res, 403, 'unauthorized');
    }
}