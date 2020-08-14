'use strict';

module.exports = function createUser(email, password, completion) {
    const uuid = email + password;
    completion(uuid);
}