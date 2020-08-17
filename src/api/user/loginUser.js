'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');
const User = require('../../models/User.model');
const jwt = require('jsonwebtoken');

module.exports = function loginUser(email, password, callback) {

    sql.query('SELECT useId, useEmail, useName, usePassword FROM JDUsers WHERE useEmail = ?', [email], async (err, rows) => {
        if (err) return callback(Error.unknownError, null);
        if (!rows.length == 1) return callback(Error.loginFailed, null);

        const dbUser = rows[0];
        const comparePassword = await bcrypt.compare(password, dbUser.usePassword);
        if (!comparePassword) return callback(Error.loginFailed);

        const token = jwt.sign({ uuid: dbUser.useId }, process.env.TOKEN_SECRET);

        sql.query('INSERT INTO JDTokens (tokId, tokToken, tokUseId, tokValid) VALUES (?, ?, ?, TRUE)', [uuid(), token, dbUser.useId], (err) => {
            if (err) return callback(Error.unknownError, null);
            const user = new User(dbUser.useId, dbUser.useEmail, dbUser.useName);
            callback(null, user, token);
        });
    });
}