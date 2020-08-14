'use strict';

const sendError = require("./sendError");
const mysql = require('mysql');
const sql = require("../db");


module.exports = function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        sql().query('SELECT * FROM JDTokens WHERE tokToken = ' + mysql.escape(bearerToken) + ' AND tokValid = TRUE', function (err, rows, fields) {
            if (err) throw err;
            if (rows.length === 1) {
                console.log('User authenticated');
                next();
            } else {
                sendError(res, 403, 'unauthorized');
            }
        });
    } else {
        sendError(res, 403, 'unauthorized');
    }
}