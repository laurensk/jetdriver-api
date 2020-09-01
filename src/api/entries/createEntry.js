'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');
const { v4: uuidv4 } = require('uuid');
const Car = require('../../models/Car.model');
const RoadCondition = require('../../models/RoadCondition.model');
const Companion = require('../../models/Companion.model');
const Entry = require('../../models/Entry.model');
const Daytime = require('../../models/Daytime.model');

module.exports = function createEntry(uuid, startDate, endDate, startMileage, endMileage, routeDest, notes, carId, roadConditionId, daytimeId, companionId, callback) {

    const entId = uuidv4();

    sql.query('INSERT INTO JDEntries (entId, entStartDate, entEndDate, entStartMileage, entEndMileage, entRouteDest, entNotes, entCarId, entRoaId, entDaytimeId, entComId, entUseId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [entId, startDate, endDate, startMileage, endMileage, routeDest, notes, carId, roadConditionId, daytimeId, companionId, uuid], (err) => {
            if (err) return callback(Error.unknownError, null);

            sql.query('SELECT * FROM JDEntries LEFT JOIN JDCars ON JDEntries.entCarId = JDCars.carId LEFT JOIN JDRoadCondition ON JDEntries.entRoaId = JDRoadCondition.roaId LEFT JOIN JDCompanions ON JDEntries.entComId = JDCompanions.comId LEFT JOIN JDDaytimes ON JDEntries.entDaytimeId = JDDaytimes.dayId WHERE entId = ?', [entId], (err, rows) => {
                if (err) return callback(Error.unknownError, null);
                if (!rows.length == 1) return callback(Error.unknownError, null);

                const dbEntry = rows[0];

                const car = new Car(dbEntry.carId, dbEntry.carTypeId, dbEntry.carNumberPlate, dbEntry.carName, dbEntry.carBrand, dbEntry.carModel);
                const roadCondition = new RoadCondition(dbEntry.roaId, dbEntry.roaRoadCondition);
                const daytime = new Daytime(dbEntry.dayId, dbEntry.dayDaytime);
                const companion = new Companion(dbEntry.comId, dbEntry.comName);
                const entry = new Entry(dbEntry.entId, dbEntry.entStartDate, dbEntry.entEndDate, dbEntry.entStartMileage, dbEntry.entEndMileage, dbEntry.entRouteDest, dbEntry.entNotes, car, roadCondition, daytime, companion);

                callback(null, entry);
            });
        });
}