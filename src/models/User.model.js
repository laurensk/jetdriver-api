'use strict';

class User {
    constructor
        (
            uuid,
            email,
            password,
            salt,
            token
        ) {
        this.uuid = uuid;
        this.email = email;
        this.password = password;
        this.salt = salt;
        this.token = token;

    }
}

module.exports = User;