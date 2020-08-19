'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');
const { v4: uuidv4 } = require('uuid');
const Companion = require('../../models/Companion.model');

module.exports = function createCompanion(uuid, name, callback) {

    const comId = uuidv4();

    sql.query('INSERT INTO JDCompanions (comId, comName, comUseId) VALUES (?, ?, ?)',
        [comId, name, uuid], (err) => {
            if (err) return callback(Error.unknownError, null);

            sql.query('SELECT comId, comName, comUseId FROM JDCompanions WHERE comId = ?', [comId], (err, rows) => {
                if (err) return callback(Error.unknownError, null);
                if (!rows.length == 1) return callback(Error.unknownError, null);

                const dbCompanion = rows[0];
                const companion = new Companion(dbCompanion.comId, dbCompanion.comName);

                callback(null, companion);
            });
        });
}