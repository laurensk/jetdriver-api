'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');
const RoadCondition = require('../../models/RoadCondition.model');

module.exports = function getRoadConditions(callback) {

    sql.query('SELECT roaId, roaRoadCondition FROM JDRoadConditions', [], (err, rows) => {
        if (err) return callback(Error.unknownError, null);
        if (!rows.length >= 1) return callback(Error.propertyNotAvailable, null);

        let roadConditions = [];
        rows.forEach((dbRoadCondition) => {
            const roadCondition = new RoadCondition(dbRoadCondition.roaId, dbRoadCondition.roaRoadCondition);
            roadConditions.push(roadCondition);
        });

        callback(null, roadConditions);
    });
}