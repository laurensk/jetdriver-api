'use strict';

class User {
    constructor
        (
            uuid,
            email,
            name,
            password,
            salt
        ) {
        this.uuid = uuid;
        this.email = email;
        this.name = name;
        this.password = password;
        this.salt = salt;
    }
}

module.exports = User;