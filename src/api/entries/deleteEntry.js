'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');

module.exports = function deleteEntry(uuid, entId, callback) {

    sql.query('SELECT entId FROM JDEntries WHERE entUseId = ? AND entId = ?', [uuid, entId], (err, rows) => {
        if (err) return callback(Error.unknownError, null);
        if (!rows.length == 1) return callback(Error.entryNotFound, null);

        sql.query('DELETE FROM JDEntries WHERE entUseId = ? AND entId = ?', [uuid, entId], (err) => {
            if (err) return callback(Error.unknownError, null);
            callback(null, {
                success: true
            });
        });
    });
}