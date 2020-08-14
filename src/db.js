'use strict';

// var mysql = require('mysql');
// require('dotenv/config');

// var connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT || 3306,
//     database: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
// });

// connection.connect(function (err) {
//     if (err) throw err;
// });

// module.exports = connection;

module.exports = () => {

    var mysql = require('mysql');
    require('dotenv/config');

    var db_config = {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
    };

    var connection;

    function handleDisconnect() {
        connection = mysql.createConnection(db_config); // Recreate the connection, since

        connection.connect(function (err) {
            if (err) {
                console.log('error when connecting to db:', err);
                setTimeout(handleDisconnect, 2000);
            }
        });

        connection.on('error', function (err) {
            console.log('db error', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
                handleDisconnect();
            } else {
                throw err;
            }
        });
    }

    handleDisconnect();

    return connection;

}