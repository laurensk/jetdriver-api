'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');

module.exports = function deleteCar(uuid, carId, callback) {

    sql.query('SELECT carId FROM JDCars WHERE carUseId = ? AND carId = ?', [uuid, carId], (err, rows) => {
        if (err) return callback(Error.unknownError, null);
        if (!rows.length == 1) return callback(Error.carNotFound, null);

        sql.query('DELETE FROM JDCars WHERE carUseId = ? AND carId = ?', [uuid, carId], (err) => {
            if (err) return callback(Error.unknownError, null);
            callback(null, {
                success: true
            });
        });
    });
}