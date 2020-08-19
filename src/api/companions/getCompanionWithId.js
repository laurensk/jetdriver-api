'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');
const Companion = require('../../models/Companion.model');

module.exports = function getCompanionWithId(uuid, comId, callback) {

    sql.query('SELECT comId, comName FROM JDCompanions WHERE comUseId = ? AND comId = ?', [uuid, comId], (err, rows) => {
        if (err) return callback(Error.unknownError, null);
        if (!rows.length == 1) return callback(Error.companionNotFound, null);

        const dbCompanion = rows[0];
        const companion = new Companion(dbCompanion.comId, dbCompanion.comName);

        callback(null, companion);
    });
}