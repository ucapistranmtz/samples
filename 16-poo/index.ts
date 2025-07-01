console.log("hey I will design a parkinlot object");

type VehicleType = "sedan" | "truck" | "bike";

class Vehicle {
  constructor(public plate: string, public vehicleType: VehicleType) {}
}

class Spot {
  constructor(
    public vehicle: Vehicle,
    public checkIn: Date = new Date(),
    public checkOut?: Date
  ) {}
}
class VehicleRate {
  constructor(public vehicleType: VehicleType, public rate: number) {}
}

class ParkingLot {
  private availableSpots: number;
  private usedSpots: Spot[] = [];
  private rates: Record<VehicleType, number>;

  constructor(
    public totalSpots: number,
    public rateEntries: { vehicleType: VehicleType; rate: number }[]
  ) {
    this.availableSpots = totalSpots;
    // this.costs = [...costs, {}];
    // Build Record from input array
    this.rates = rateEntries.reduce((acc, curr) => {
      acc[curr.vehicleType] = curr.rate;
      return acc;
    }, {} as Record<VehicleType, number>);
  }

  emptySpots = () => {
    return this.availableSpots - this.usedSpots.length;
  };

  rate = (vehicleType: VehicleType) => {
    const cost = this.rates[vehicleType];

    return cost;
  };

  checkIn = (vehicle: Vehicle) => {
    const alreadyParked: boolean = this.usedSpots.some(
      (spot) => spot.vehicle.plate.toLowerCase() === vehicle.plate.toLowerCase()
    ); //it means the user lost his previous ticket

    if (alreadyParked) {
      throw new Error(
        `Looks like you didn't pay the previous ticket please call our support team`
      );
    }
    if (this.emptySpots() > 0) {
      //check empty spots
      const spot = new Spot(vehicle);
      this.usedSpots.push(spot);
      console.log(
        `[check-In] a vehicle with plates ${vehicle.plate} is parked now and it's a ${vehicle.vehicleType}`
      );
    } else {
      throw new Error("Sorry there are no empty spots ");
    }
  };

  checkOut = (vehicle: Vehicle) => {
    const parkedVehicle: Spot | undefined = this.usedSpots.find(
      (spot) => spot.vehicle.plate === vehicle.plate
    );
    if (!parkedVehicle) {
      throw new Error(
        `It looks like you used a spot without accesing the system , please call our team support for guidance`
      );
    }

    let hours = Math.ceil(
      (Date.now() - parkedVehicle.checkIn.getTime()) / (1000 * 60 * 60)
    );
    hours = hours < 1 ? 1 : hours;

    const totalCost = this.rate(vehicle.vehicleType) * hours;

    console.log(
      `[Check-Out] You were parked for ${hours} and the total cost is ${totalCost}`
    );
    this.usedSpots = this.usedSpots.filter(
      (spot) => spot.vehicle.plate !== vehicle.plate
    );
    return totalCost;
  };
}

const checkingTest = () => {
  try {
    const parkingLot: ParkingLot = new ParkingLot(1000, [
      { vehicleType: "sedan", rate: 10 },
      { vehicleType: "truck", rate: 10 },
      { vehicleType: "bike", rate: 5 },
    ]);

    const mazada3: Vehicle = new Vehicle("gdf123", "sedan");

    parkingLot.checkIn(mazada3);
    const cost = parkingLot.checkOut(mazada3);
  } catch (error) {
    console.error(`test failed with ${error}`);
  }
};
//checkingTest();

const noSpotsTest = () => {
  try {
    const parkingLot: ParkingLot = new ParkingLot(2, [
      { vehicleType: "sedan", rate: 10 },
      { vehicleType: "truck", rate: 10 },
      { vehicleType: "bike", rate: 5 },
    ]);

    const mazada3: Vehicle = new Vehicle("gdsedan1f123", "sedan");
    const bike: Vehicle = new Vehicle("bike1", "bike");
    const truck: Vehicle = new Vehicle("truck1", "truck");
    parkingLot.checkIn(mazada3);
    parkingLot.checkIn(bike);
    parkingLot.checkIn(truck);

    const cost = parkingLot.checkOut(mazada3);
  } catch (error) {
    console.error(`test failed with ${error}`);
  }
};
noSpotsTest();

const repeatedVehicle = () => {
  try {
    const parkingLot: ParkingLot = new ParkingLot(2, [
      { vehicleType: "sedan", rate: 10 },
      { vehicleType: "truck", rate: 10 },
      { vehicleType: "bike", rate: 5 },
    ]);

    const mazada3: Vehicle = new Vehicle("gdsedan1f123", "sedan");

    parkingLot.checkIn(mazada3);
    parkingLot.checkIn(mazada3);

    const cost = parkingLot.checkOut(mazada3);
  } catch (error) {
    console.error(`test failed with ${error}`);
  }
};
repeatedVehicle();
