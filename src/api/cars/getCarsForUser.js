'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');
const { v4: uuidv4 } = require('uuid');
const Car = require('../../models/Car.model');

module.exports = function getCarsForUser(uuid, callback) {

    sql.query('SELECT carId, carTypeId, catType, carNumberPlate, carName, carBrand, carModel FROM JDCars LEFT JOIN JDCarTypes ON JDCars.carTypeId = JDCarTypes.catId WHERE carUseId = ?', [uuid], (err, rows) => {
        if (err) return callback(Error.unknownError, null);
        if (!rows.length >= 1) return callback(Error.unknownError, null);

        let cars = [];
        rows.forEach((dbCar) => {
            const car = new Car(dbCar.carId, dbCar.carTypeId, dbCar.catType, dbCar.carNumberPlate, dbCar.carName, dbCar.carBrand, dbCar.carModel);
            cars.push(car);
        });

        callback(null, cars);
    });
}