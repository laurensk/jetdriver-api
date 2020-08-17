'use strict';

class Car {
    constructor
        (
            uuid,
            carTypeId,
            carType,
            numberPlate,
            name,
            brand,
            model
        ) {
        this.uuid = uuid;
        this.carTypeId = carTypeId;
        this.carType = carType;
        this.numberPlate = numberPlate;
        this.name = name;
        this.brand = brand;
        this.model = model;
    }
}

module.exports = Car;