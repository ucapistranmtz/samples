"use strict";
class Vehicle {
    constructor(plate, kind) {
        this.plate = plate;
        this.kind = kind;
    }
}
class Spot {
    constructor(checkin = new Date(), vehicle, checkout) {
        this.checkin = checkin;
        this.vehicle = vehicle;
        this.checkout = checkout;
    }
}
class FixedRateProvider {
    constructor(rates) {
        this.ratesMap = new Map(rates.map(({ type, rate }) => [type, rate]));
    }
    getRate(vehicleType) {
        const rate = this.ratesMap.get(vehicleType);
        if (rate === undefined) {
            throw new Error(`Rate not found for vehicle type: ${vehicleType}`);
        }
        return rate;
    }
}
class InMemmoryParkingStorage {
    constructor() {
        this.spots = new Map();
    }
    addSpot(spot) {
        if (this.spots.has(spot.vehicle.plate)) {
            throw new Error(`Spot already exists for vehicle with plate: ${spot.vehicle.plate}`);
        }
        this.spots.set(spot.vehicle.plate, spot);
    }
    removeSpot(plate) {
        return this.spots.delete(plate) ? this.spots.get(plate) : undefined;
    }
    getSpot(plate) {
        return this.spots.get(plate);
    }
    count() {
        return this.spots.size;
    }
}
class ParkingLot {
    constructor(capacity, rateProvider, storage) {
        this.capacity = capacity;
        this.rateProvider = rateProvider;
        this.storage = storage;
        if (capacity <= 0) {
            throw new Error("Parking lot capacity must be greater than zero");
        }
    }
    getFreeSpots() {
        return this.capacity - this.storage.count();
    }
    checkIn(vehicle, checkInTime = new Date()) {
        if (this.storage.getSpot(vehicle.plate)) {
            throw new Error(`Vehicle with plate ${vehicle.plate} is already checked in`);
        }
        if (this.getFreeSpots() <= 0) {
            throw new Error("No available spots in the parking lot");
        }
        this.storage.addSpot(new Spot(checkInTime, vehicle));
    }
    checkOut(plate, checkOutTime = new Date()) {
        const spot = this.storage.getSpot(plate);
        if (!spot) {
            throw new Error(`No spot found for vehicle with plate: ${plate}`);
        }
        const hoursParked = Math.max(1, (checkOutTime.getTime() - spot.checkin.getTime()) / (1000 * 60 * 60));
        const rate = this.rateProvider.getRate(spot.vehicle.kind);
        const totalCost = Math.ceil(hoursParked * rate);
        this.storage.removeSpot(plate);
        return totalCost;
    }
}
// example
const ratesProvider = new FixedRateProvider([
    { type: "sedan", rate: 10 },
    { type: "truck", rate: 15 },
    { type: "bike", rate: 10 },
    { type: "mini", rate: 5 },
]);
const storage = new InMemmoryParkingStorage();
const parkingLot = new ParkingLot(2, ratesProvider, storage);
const bike = new Vehicle("Bike1", "bike");
const truck = new Vehicle("Frontier", "truck");
const sedan = new Vehicle("Honda", "sedan");
try {
    parkingLot.checkIn(bike);
    console.log(`Checked in: ${bike.plate}`);
}
catch (error) {
    console.error(error.message);
}
