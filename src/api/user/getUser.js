'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');
const User = require('../../models/User.model');

module.exports = function getUser(uuid, callback) {
    sql.query('SELECT useId, useEmail, useName FROM JDUsers WHERE useId = ?', [uuid], (err, rows) => {
        if (err) return callback(Error.unknownError, null);
        if (!rows.length == 1) return callback(Error.unknownError, null);
        const dbUser = rows[0];
        const user = new User(dbUser.useId, dbUser.useEmail, dbUser.useName);
        callback(null, user);
    });
}