class User {
    constructor
        (
            uuid,
            name,
            email,
            password,
            salt
        ) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.password = password;
        this.salt = salt;
    }
}