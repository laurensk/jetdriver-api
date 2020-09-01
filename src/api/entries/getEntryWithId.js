'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');
const Car = require('../../models/Car.model');
const RoadCondition = require('../../models/RoadCondition.model');
const Companion = require('../../models/Companion.model');
const Entry = require('../../models/Entry.model');
const Daytime = require('../../models/Daytime.model');

module.exports = function getEntryWithId(uuid, entId, callback) {

    sql.query('SELECT * FROM JDEntries LEFT JOIN JDCars ON JDEntries.entCarId = JDCars.carId LEFT JOIN JDRoadConditions ON JDEntries.entRoaId = JDRoadConditions.roaId LEFT JOIN JDCompanions ON JDEntries.entComId = JDCompanions.comId LEFT JOIN JDDaytimes ON JDEntries.entDaytimeId = JDDaytimes.dayId WHERE entUseId = ? AND entId = ?',
        [uuid, entId], (err, rows) => {
            if (err) return callback(Error.unknownError, null);
            if (!rows.length == 1) return callback(Error.entryNotFound, null);

            const dbEntry = rows[0];

            const car = new Car(dbEntry.carId, dbEntry.carTypeId, dbEntry.carNumberPlate, dbEntry.carName, dbEntry.carBrand, dbEntry.carModel);
            const roadCondition = new RoadCondition(dbEntry.roaId, dbEntry.roaRoadCondition);
            const daytime = new Daytime(dbEntry.dayId, dbEntry.dayDaytime);
            const companion = new Companion(dbEntry.comId, dbEntry.comName);
            const entry = new Entry(dbEntry.entId, dbEntry.entStartDate, dbEntry.entEndDate, dbEntry.entStartMileage, dbEntry.entEndMileage, dbEntry.entRouteDest, dbEntry.entNotes, car, roadCondition, daytime, companion);

            callback(null, entry);
        });
}