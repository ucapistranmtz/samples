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
class SpotCosts {
  constructor(public vehicleType: VehicleType, public rate: number) {}
}

class ParkingLot {
  private availableSpots: number;
  private usedSpots: Spot[] = [];
  constructor(public totalSpots: number, public costs: SpotCosts[]) {
    this.availableSpots = totalSpots;
    // this.costs = [...costs, {}];
    console.log("costs", this.costs);
  }

  emptySpots = () => {
    return this.availableSpots - this.usedSpots.length;
  };

  rate = async (vehicleType: VehicleType) => {
    const cost = this.costs.find((cost) => cost.vehicleType === vehicleType);
    if (!cost) {
      return 10;
    }
    return cost.rate;
  };

  checkIn = async (vehicle: Vehicle): Promise<boolean> => {
    const checkinGranted: boolean = false;
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
        `a vehicle with plates ${vehicle.plate} is parked now and it's a ${vehicle.vehicleType}`
      );
    }

    return checkinGranted;
  };

  checkOut = async (vehicle: Vehicle) => {
    const parkedVehicle: Spot | undefined = this.usedSpots.find(
      (spot) => spot.vehicle.plate === vehicle.plate
    );
    if (!parkedVehicle) {
      throw new Error(
        `It looks like you used a spot without accesing the system , please call our team support for guidance`
      );
    }
    const rate = this.rate(vehicle.vehicleType);
    let hours = Math.ceil(
      (new Date().getTime() - parkedVehicle.checkIn.getTime()) *
        (1000 * 60 * 60)
    );
    hours = hours < 1 ? 1 : hours;
    const baseCost = this.costs.find(
      (cost) => cost.vehicleType === vehicle.vehicleType
    );
    console.log(`baseCost , ${baseCost}`);
    const totalCost =
      this.costs.find((cost) => cost.vehicleType === vehicle.vehicleType)!
        ?.rate * hours;

    console.log(
      `You wer parked for ${hours} and the total cost is ${totalCost}`
    );
    return totalCost;
  };
}

const parkingLot: ParkingLot = new ParkingLot(1000, [
  { vehicleType: "sedan", rate: 10 },
  { vehicleType: "truck", rate: 10 },
  { vehicleType: "bike", rate: 5 },
]);

const mazada3: Vehicle = new Vehicle("gdf123", "sedan");

parkingLot.checkIn(mazada3);
const cost = parkingLot.checkOut(mazada3);
