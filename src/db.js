'use strict';

var mysql = require('mysql');
require('dotenv/config');

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;