'use strict';

const mysql = require('mysql');
const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');

module.exports = function createUser(email, password, callback) {

    sql.query('SELECT useEmail from JDUsers WHERE useEmail = ' + mysql.escape(email), (err, rows) => {
        if (err) return callback(Error.unknownError, null);
        if (rows.length > 0) return callback(Error.emailExists, null);



    })


}