// design a parking lot

// a parking lot needs vehicles
//vehicles are identified by plates

//vehicles needs to do checkin and checkout according a rate to pay per hour

type VehicleType = "sedan" | "truck" | "bike";

class ParkingLotRates {
  constructor(public kind: VehicleType, public rate: number) {}
}
class Vehicle {
  constructor(public plate: string, public kind: VehicleType) {}
}

class Spot {
  constructor(
    public vehicle: Vehicle,
    public checkin: Date = new Date(),
    public checkOut?: Date
  ) {}
}

class ParkingLot {
  private rates: Record<VehicleType, number>;
  private availableSpots: number;
  private usedSpots: Spot[];

  constructor(spots: number, rates: ParkingLotRates[]) {
    this.availableSpots = spots;
    this.usedSpots = [];
    this.rates = rates.reduce((acc, item) => {
      acc[item.kind] = item.rate;
      return acc;
    }, {} as Record<VehicleType, number>);
  }

  rate = (vehicleType: VehicleType): number => {
    return this.rates[vehicleType];
  };

  checkIn = (vehicle: Vehicle) => {
    //check if is there spots available
    if (this.usedSpots.length <= this.availableSpots) {
      throw new Error("Sorry there are not available spot");
    }

    //check if for some reason the customer lost their ticket or went out without paying
    //find the vehicle

    if (
      this.usedSpots.some(
        (spot) =>
          spot.vehicle.plate.toLowerCase() === vehicle.plate.toLowerCase()
      )
    ) {
      throw new Error(
        "Sorry probably you lost your last ticket , could you call our team support"
      );
    }

    this.usedSpots.push(new Spot(vehicle));
    console.log(
      `Welcome to our parking lot your rate per hour is ${
        this.rates[vehicle.kind]
      }`
    );
  };

  checkOut = (vehicle: Vehicle) => {
    //to checkout find the vehicle first

    const spot = this.usedSpots.find(
      (spot) => spot.vehicle.plate.toLowerCase() === vehicle.plate.toLowerCase()
    );
    if (!spot) {
      throw new Error(
        `Sorry you probably lost your ticket please call our team support `
      );
    }

    // get the rate per hour  is is less than an hour they need to pay for an hour
    spot.checkOut = new Date();
    let time = spot.checkOut.getTime() - spot.checkin.getTime();
    time = time / (1000 * 60 * 60);
    const hours = Math.max(1, Math.ceil(time));
    const debt = this.rates[vehicle.kind] * hours;

    this.usedSpots = this.usedSpots.filter(
      (spot) => spot.vehicle.plate.toLowerCase() !== vehicle.plate.toLowerCase()
    );
    console.log(`Amount to pay is ${debt}`);
    return debt;
  };
}

const parkingTest = () => {
  const f150 = new Vehicle("f150", "truck");
  const parkingLotDemo = new ParkingLot(200, [
    { kind: "truck", rate: 10 },
    { kind: "bike", rate: 5 },
    { kind: "sedan", rate: 8 },
  ]);
};
