'use strict';

const sql = require("../../db");
const { Error } = require('../helpers/errorHandling');
const Property = require('../../models/Property.model');

module.exports = function getProperties(callback) {

    sql.query('SELECT proId, proName, proDesc FROM JDProperties', [], (err, rows) => {
        if (err) return callback(Error.unknownError, null);
        if (!rows.length >= 1) return callback(Error.propertyNotAvailable, null);

        let properties = [];
        rows.forEach((dbProperty) => {
            const property = new Property(dbProperty.proId, dbProperty.proName, dbProperty.proDesc);
            properties.push(property);
        });

        callback(null, properties);
    });
}