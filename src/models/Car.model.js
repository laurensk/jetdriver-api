'use strict';

class Car {
    constructor
        (
            uuid,
            carType,
            numberPlate,
            name,
            brand,
            model
        ) {
        this.uuid = uuid;
        this.carType = carType;
        this.numberPlate = numberPlate;
        this.name = name;
        this.brand = brand;
        this.model = model;
    }
}

module.exports = Car;