// the idea is to designe a parking lot using clases,interfaces and types and use dependency injection to make it more flexible and testable
//we will use typescript

// so a aprking lot needs vehicle and vehicles can be of differente types  truck, sedan,bike,
// vehicles are identified by plates

// each vehicle use a spot in the parking lot
// a parking lot has a rate per hour for each vehcile type
// a parking lot has a defined number of spots
// whena vehicle does the checking we write the checking time and we assign a spot
//when a vehicle does the checkout we calculate the total cost based on the rate and the time the veicle was parked
// we remove the spot from the parking lot

// there are some edge cases to consider :
// if the vehicle is already parked we should throw an error
// if the parking lot is full we should throw an error
// if the vehicl to checkout is not found we should throw an error

// the dependency injection works when we inject the rate provider and the storage provider to the parking lot class
//using that we can change the rate provider or the storage provider without changing the parking lot classs
// we can also use differente implementations of the rate provider or the storage provider
// we can use a fixed rate provider or a dynamic rate provider
// we can use a in memory storage provider or a database storage provider
//

//lets start defining the types and vehicle Class

type VehicleType = "sedan" | "truck" | "bike" | "mini";

class Vehicle {
  constructor(
    public readonly plate: string,
    public readonly kind: VehicleType
  ) {}
}

// now we define the spot class

class Spot {
  constructor(
    public readonly vehicle: Vehicle,
    public checkinTime: Date = new Date(),
    public checkOutTime?: Date
  ) {}
}

// now we define the rate provider interace

interface IRateProvider {
  getRate(vehicleType: VehicleType): number;
}

//we implement a fixed rate provider interface in a class

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
      throw new Error(`Rate not found for vehicle type: %{vehicleType}`);
    }
    return rate;
  }
}

// now we define the parking storage interface
//this interface wil be used to store the spots in the parking lot

interface IparkingStorage {
  addSpot(spot: Spot): void;
  removeSpot(plate: string): void;
  getSpot(plate: string): Spot | undefined;
  count(): number;
}

// now we implement the parking storage interface in a class

class InMemoryStorage implements IparkingStorage {
  private spots: Map<string, Spot> = new Map();

  addSpot(spot: Spot): void {
    if (this.spots.has(spot.vehicle.plate)) {
      throw new Error(
        `there vehicle with plate ${spot.vehicle.plate} is already parked`
      );
    }
    this.spots.set(spot.vehicle.plate, spot);
  }

  removeSpot(plate: string): void {
    if (!this.spots.has(plate)) {
      throw new Error(`there is no vehicle with plate ${plate} parked`);
    }

    this.spots.delete(plate);
  }

  getSpot(plate: string): Spot | undefined {
    return this.spots.get(plate);
  }

  count(): number {
    return this.spots.size; // returns the number of spots currently occupied
  }
}

// now we define the parking lot class

class ParkingLot {
  constructor(
    private readonly capacity: number,
    private readonly rateProvider: IRateProvider,
    private readonly storage: IparkingStorage
  ) {
    if (capacity <= 0) {
      throw new Error(`capacity must be greater than 0, we got ${capacity}`);
    }

    if (!rateProvider) {
      throw new Error("Rate provider is required");
    }
    if (!storage) {
      throw new Error("Storage provider is required");
    }
  }

  getFreeSpots(): number {
    return this.capacity - this.storage.count();
  }

  checkIn(vehicle: Vehicle): void {
    if (this.storage.getSpot(vehicle.plate)) {
      throw new Error(`vehicle with plate ${vehicle.plate} is already parked`);
    }

    if (this.getFreeSpots() <= 0) {
      throw new Error("No available spots in the parking lot");
    }

    this.storage.addSpot(new Spot(vehicle));
  }

  checkOut(plate: string, checkOutTime: Date = new Date()): number {
    const spot = this.storage.getSpot(plate);
    if (!spot) {
      throw new Error(`there is no vehicle with plate ${plate} parked`);
    }

    const hoursParked = Math.max(
      1,
      Math.ceil((checkOutTime.getTime() - spot.checkinTime.getTime()) / 3600000)
    );

    const rate = this.rateProvider.getRate(spot.vehicle.kind);
    const totalCost = Math.ceil(hoursParked * rate);
    this.storage.removeSpot(plate);
    return totalCost;
  }
}

// example usage

const ratePRovider = new FixedRateProvider([
  { type: "sedan", rate: 10 },
  { type: "truck", rate: 15 },
  { type: "bike", rate: 5 },
  { type: "mini", rate: 5 },
]);

const storage = new InMemoryStorage();

const parkingLot = new ParkingLot(2, ratePRovider, storage);

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
  console.error(`Error ${error.message}`);
}
