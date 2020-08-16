'use strict';

const sql = require("../../db");
const { Error, sendError } = require('../helpers/errorHandling');
const bcrypt = require('bcryptjs');
const User = require('../../models/User.model');
const jwt = require('jsonwebtoken');

module.exports = function createUser(email, name, password, callback) {

    sql.query('SELECT useEmail FROM JDUsers WHERE useEmail = ?', [email], async (err, rows) => {
        if (err) return callback(Error.unknownError, null);
        if (rows.length > 0) return callback(Error.emailExists, null);

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        sql.query(`INSERT INTO JDUsers (useId, useEmail, useName, usePassword, useSalt) VALUES (UUID(), ?, ?, ?, ?)`, [email, name, hashPassword, salt], (err) => {
            if (err) return callback(Error.unknownError, null);
            sql.query('SELECT * FROM JDUsers WHERE useEmail = ?', [email], (err, rows) => {
                const dbUser = rows[0];

                const token = jwt.sign({ uuid: dbUser.useId }, process.env.TOKEN_SECRET);

                sql.query('INSERT INTO JDTokens (tokId, tokToken, tokUseId, tokValid) VALUES (UUID(), ?, ?, TRUE)', [token, dbUser.useId], (err) => {
                    if (err) return callback(Error.unknownError, null);
                    const user = new User(dbUser.useId, dbUser.useEmail, dbUser.useName);
                    callback(null, user, token);
                })
            })
        });


    })

}