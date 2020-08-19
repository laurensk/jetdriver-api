'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');
const CarType = require('../../models/CarType.model');

module.exports = function getCarTypes(callback) {

    sql.query('SELECT catId, catType FROM JDCarTypes', [], (err, rows) => {
        if (err) return callback(Error.unknownError, null);
        if (!rows.length >= 1) return callback(Error.propertyNotAvailable, null);

        let carTypes = [];
        rows.forEach((dbCarType) => {
            const carType = new CarType(dbCarType.catId, dbCarType.catType);
            carTypes.push(carType);
        });

        callback(null, carTypes);
    });
}