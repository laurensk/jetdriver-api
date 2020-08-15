'use strict';

class User {
    constructor
        (
            uuid,
            email,
            password,
            salt
        ) {
        this.uuid = uuid;
        this.email = email;
        this.password = password;
        this.salt = salt;
    }
}

module.exports = User;