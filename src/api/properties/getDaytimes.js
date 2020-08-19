'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');
const Daytime = require('../../models/Daytime.model');

module.exports = function getDaytimes(callback) {

    sql.query('SELECT dayId, dayDaytime FROM JDDaytimes', [], (err, rows) => {
        if (err) return callback(Error.unknownError, null);
        if (!rows.length >= 1) return callback(Error.propertyNotAvailable, null);

        let daytimes = [];
        rows.forEach((dbDayTime) => {
            const daytime = new Daytime(dbDayTime.dayId, dbDayTime.dayDaytime);
            daytimes.push(daytime);
        });

        callback(null, daytimes);
    });
}