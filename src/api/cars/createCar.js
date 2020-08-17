'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');
const { v4: uuidv4 } = require('uuid');
const Car = require('../../models/Car.model');

module.exports = function createCar(uuid, typeId, numberPlate, name, brand, model, callback) {

    const carId = uuidv4();

    sql.query('INSERT INTO JDCars (carId, carTypeId, carNumberPlate, carName, carBrand, carModel, carUseId) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [carId, typeId, numberPlate, name, brand, model, uuid], (err) => {
            if (err) return callback(Error.unknownError, null);

            sql.query('SELECT carId, carTypeId, carNumberPlate, carName, carBrand, carModel FROM JDCars WHERE carId = ?', [carId], (err, rows) => {
                if (err) return callback(Error.unknownError, null);
                if (!rows.length == 1) return callback(Error.unknownError, null);

                const dbCar = rows[0];
                const car = new Car(dbCar.carId, dbCar.carTypeId, dbCar.carNumberPlate, dbCar.carName, dbCar.carBrand, dbCar.carModel);

                callback(null, car);
            });
        });
}