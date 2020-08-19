'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');

module.exports = function deleteCompanion(uuid, comId, callback) {

    sql.query('SELECT comId FROM JDCompanions WHERE comUseId = ? AND comId = ?', [uuid, comId], (err, rows) => {
        if (err) return callback(Error.unknownError, null);
        if (!rows.length == 1) return callback(Error.companionNotFound, null);

        sql.query('DELETE FROM JDCompanions WHERE comUseId = ? AND comId = ?', [uuid, comId], (err) => {
            if (err) return callback(Error.unknownError, null);
            callback(null, {
                success: true
            });
        });
    });
}