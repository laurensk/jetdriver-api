'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');
const Car = require('../../models/Car.model');

module.exports = function getCarWithId(uuid, carId, callback) {

    sql.query('SELECT carId, carTypeId, catType, carNumberPlate, carName, carBrand, carModel FROM JDCars LEFT JOIN JDCarTypes ON JDCars.carTypeId = JDCarTypes.catId WHERE carUseId = ? AND carId = ?', [uuid, carId], (err, rows) => {
        if (err) return callback(Error.unknownError, null);
        if (!rows.length == 1) return callback(Error.carNotFound, null);

        const dbCar = rows[0];
        const car = new Car(dbCar.carId, dbCar.carTypeId, dbCar.catType, dbCar.carNumberPlate, dbCar.carName, dbCar.carBrand, dbCar.carModel);

        callback(null, car);
    });
}