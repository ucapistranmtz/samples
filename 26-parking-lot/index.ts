type vehicleType = "sedan" | "truck" | "bike" | "mini";

class Vehicle {
  constructor(
    public readonly plate: string,
    public readonly kind: vehicleType
  ) {}
}

class Spot {
  constructor(
    public readonly checkin: Date = new Date(),
    public readonly vehicle: Vehicle,
    public checkout?: Date
  ) {}
}

interface IrateProvider {
  getRate(vehicleType: vehicleType): number;
}

class FixedRateProvider implements IrateProvider {
  private ratesMap: Map<vehicleType, number>;
  constructor(rates: Array<{ type: vehicleType; rate: number }>) {
    this.ratesMap = new Map(rates.map(({ type, rate }) => [type, rate]));
  }

  getRate(vehicleType: vehicleType): number {
    const rate = this.ratesMap.get(vehicleType);
    if (rate === undefined) {
      throw new Error(`Rate not found for vehicle type: ${vehicleType}`);
    }
    return rate;
  }
}

interface IparkingStorage {
  addSpot(spot: Spot): void;
  removeSpot(plate: string): Spot | undefined;
  getSpot(plate: string): Spot | undefined;
  count(): number;
}

class InMemmoryParkingStorage implements IparkingStorage {
  private spots: Map<string, Spot> = new Map();

  addSpot(spot: Spot): void {
    if (this.spots.has(spot.vehicle.plate)) {
      throw new Error(
        `Spot already exists for vehicle with plate: ${spot.vehicle.plate}`
      );
    }
    this.spots.set(spot.vehicle.plate, spot);
  }

  removeSpot(plate: string): Spot | undefined {
    return this.spots.delete(plate) ? this.spots.get(plate) : undefined;
  }

  getSpot(plate: string): Spot | undefined {
    return this.spots.get(plate);
  }
  count(): number {
    return this.spots.size;
  }
}

class ParkingLot {
  constructor(
    private readonly capacity: number,
    private readonly rateProvider: IrateProvider,
    private readonly storage: IparkingStorage
  ) {
    if (capacity <= 0) {
      throw new Error("Parking lot capacity must be greater than zero");
    }
  }

  getFreeSpots(): number {
    return this.capacity - this.storage.count();
  }

  checkIn(vehicle: Vehicle, checkInTime: Date = new Date()): void {
    if (this.storage.getSpot(vehicle.plate)) {
      throw new Error(
        `Vehicle with plate ${vehicle.plate} is already checked in`
      );
    }

    if (this.getFreeSpots() <= 0) {
      throw new Error("No available spots in the parking lot");
    }
    this.storage.addSpot(new Spot(checkInTime, vehicle));
  }

  checkOut(plate: string, checkOutTime: Date = new Date()): number {
    const spot = this.storage.getSpot(plate);

    if (!spot) {
      throw new Error(`No spot found for vehicle with plate: ${plate}`);
    }

    const hoursParked = Math.max(
      1,
      (checkOutTime.getTime() - spot.checkin.getTime()) / (1000 * 60 * 60)
    );
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

  parkingLot.checkIn(truck);
  console.log(`Checked in: ${truck.plate}`);

  parkingLot.checkIn(sedan);
  console.log(`Checked in: ${sedan.plate}`);
} catch (error: any) {
  console.error(error.message);
}
