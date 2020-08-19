'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');
const Companion = require('../../models/Companion.model');

module.exports = function getCompanionsForUser(uuid, callback) {

    sql.query('SELECT comId, comName FROM JDCompanions WHERE comUseId = ?', [uuid], (err, rows) => {
        if (err) return callback(Error.unknownError, null);
        if (!rows.length >= 1) return callback(Error.companionNotFound, null);

        let companions = [];
        rows.forEach((dbCompanion) => {
            const companion = new Companion(dbCompanion.comId, dbCompanion.comName);
            companions.push(companion);
        });

        callback(null, companions);
    });
}