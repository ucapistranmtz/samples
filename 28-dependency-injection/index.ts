type VehicleType = "car" | "truck" | "bike";

class Vehicle {
  constructor(
    public readonly plate: string,
    public readonly kind: VehicleType
  ) {}
}

class Spot {
  constructor(
    public readonly vehicle: Vehicle,
    public checkInTime: Date = new Date(),
    public checkoutTime?: Date
  ) {}
}

interface IRateProvider {
  getRate(vehicleType: VehicleType): number;
}

class FixedRateProvider implements IRateProvider {
  private ratesMap: Map<VehicleType, number>;

  constructor(rates: Array<{ type: VehicleType; rate: number }>) {
    if (rates.length === 0) {
      throw new Error("Rates cannot be empty");
    }
    this.ratesMap = new Map(rates.map(({ type, rate }) => [type, rate]));
  }
  getRate(vehicleType: VehicleType): number {
    const rate = this.ratesMap.get(vehicleType);
    if (rate === undefined) {
      throw new Error(`Rate not found for vehicle type: ${vehicleType}`);
    }
    return rate;
  }
}

interface IparkingStorage {
  addSpot(spot: Spot): void;
  removeSpot(plate: string): void;
  getSpot(plate: string): Spot | undefined;
  count(): number;
}

class InMemoryStorage implements IparkingStorage {
  private spots: Map<string, Spot> = new Map();

  addSpot(spot: Spot): void {
    if (this.spots.has(spot.vehicle.plate)) {
      throw new Error(
        `this vehicle with plate ${spot.vehicle.plate} is already parked`
      );
    }
    this.spots.set(spot.vehicle.plate, spot);
  }
  removeSpot(plate: string): void {
    if (!this.spots.has(plate)) {
      throw new Error(`this vehicle with plate ${plate} is not parked`);
    }
    this.spots.delete(plate);
  }
  getSpot(plate: string): Spot | undefined {
    const spot = this.spots.get(plate);
    if (!spot) {
      throw new Error(`this vehicle with plate ${plate} is not parked `);
    }
    return spot;
  }

  count(): number {
    return this.spots.size;
  }
}

class ParkingLot {
  constructor(
    private readonly capacity: number,
    private readonly storage: IparkingStorage,
    private readonly rateProvider: IRateProvider
  ) {
    if (capacity <= 0) {
      throw new Error("Capacity must be greater than zero");
    }

    if (!storage) {
      throw new Error("Storage is required");
    }
    if (!rateProvider) {
      throw new Error("Rate provider is required");
    }
  }
}
