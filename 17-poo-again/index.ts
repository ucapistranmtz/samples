///define a parking lot
// needs vehicles
//it has spots
// hour rate vary  between 5 to 15 (sedan=10,bike=5,truck=15
//there is only one in and one out

type VehicleType = "sedan" | "truck" | "bike";

class Vehicle {
  constructor(public type: VehicleType, public plate: string) {}
}

class Spot {
  constructor(public vehicle: Vehicle, public checkin: Date = new Date()) {}
}

class ParkingLot {
  private availableSpots: number;
  private usedSpots: Spot[];
  private rates: Record<VehicleType, number>;
  constructor(spots: number, rates: { type: VehicleType; rate: number }[]) {
    this.availableSpots = spots;
    this.usedSpots = [];
    this.rates = rates.reduce((accu, item) => {
      accu[item.type] = item.rate;
      return accu;
    }, {} as Record<VehicleType, number>);
  }

  getFreeSpots = () => {
    const spots = this.availableSpots - this.usedSpots.length;
    console.log(`Current available spots ${spots}`);
    return spots;
  };

  checkIn = (vehicle: Vehicle, checkingDate: Date = new Date()) => {
    //check if the vehicle was already using an a spot
    const parked = this.usedSpots.find(
      (item) => item.vehicle.plate.toLowerCase() === vehicle.plate.toLowerCase()
    );
    if (parked) {
      throw new Error(
        `It looks like you were already parked, Please call our team support.  at +1 568-654-9999`
      );
    }
    const spot = new Spot(vehicle, new Date());
    this.usedSpots.push(spot);
    console.info(`New vehicle parked ${vehicle.plate} at ${checkingDate}`);
    this.getFreeSpots();
  };

  checkOut(vehicle: Vehicle) {
    //check if the vehicle was already using an a spot
    const parked = this.usedSpots.find(
      (item) => item.vehicle.plate.toLowerCase() === vehicle.plate.toLowerCase()
    );
    if (!parked) {
      throw new Error(
        `It looks like you forgot to register in the system, please call our team support `
      );
    }
    let timeSpent = Date.now() - parked.checkin.getTime();
    timeSpent = timeSpent / (1000 * 60 * 60);
    timeSpent = timeSpent < 1 ? 1 : timeSpent;

    const totalCost = Math.ceil(this.rates[vehicle.type] * timeSpent);
    this.usedSpots = this.usedSpots.filter(
      (item) => item.vehicle.plate !== vehicle.plate
    );
    console.log(
      `[checkout] vehicle ${vehicle.plate} checked out, Total ${totalCost}`
    );
    this.getFreeSpots();
    return totalCost;
  }
}

const checkinTest = () => {
  const parkingLot = new ParkingLot(10, [
    { type: "bike", rate: 5 },
    { type: "sedan", rate: 10 },
    { type: "truck", rate: 12 },
  ]);

  const f150 = new Vehicle("truck", "f150");
  parkingLot.checkIn(f150);

  parkingLot.checkOut(f150);
};
//checkinTest
const doubleCheckinTest = () => {
  try {
    const parkingLot = new ParkingLot(10, [
      { type: "bike", rate: 5 },
      { type: "sedan", rate: 10 },
      { type: "truck", rate: 12 },
    ]);

    const f150 = new Vehicle("truck", "f150");
    parkingLot.checkIn(f150);
    parkingLot.checkIn(f150);
    // parkingLot.checkOut(f150);
  } catch (error) {
    console.error("An error ocurred while parking a car", error);
  }
};
//doubleCheckinTest
const checkoutWhitOutCheckin = () => {
  try {
    const parkingLot = new ParkingLot(10, [
      { type: "bike", rate: 5 },
      { type: "sedan", rate: 10 },
      { type: "truck", rate: 12 },
    ]);

    const f150 = new Vehicle("truck", "f150");
    // parkingLot.checkIn(f150);
    // parkingLot.checkIn(f150);
    parkingLot.checkOut(f150);
  } catch (error) {
    console.error("An error ocurred during checkout", error);
  }
};
checkoutWhitOutCheckin();
