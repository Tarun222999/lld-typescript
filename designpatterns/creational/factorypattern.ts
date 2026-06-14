interface Vehicle {
    start(): void
    stop(): void
}

class Car implements Vehicle {
    start(): void {
        console.log("start")
    }
    stop(): void {
        console.log("stop")
    }
}

class Bike implements Vehicle {
    start(): void {
        console.log("start")
    }
    stop(): void {
        console.log("stop")
    }
}


class Truck implements Vehicle {
    start(): void {
        console.log("start")
    }
    stop(): void {
        console.log("stop")
    }
}


class VehicleFactory {
    constructor(
        private readonly vehicleType: string
    ) { }

    getVehicle(): Vehicle {
        switch (this.vehicleType) {
            case "car": return new Car()
            case "bike": return new Bike()
        }
        return new Truck()
    }
}



const car = new VehicleFactory("car")