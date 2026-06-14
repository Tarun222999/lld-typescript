// Avoids unexpected behaviors in subclass implementations.

/*

class vehicle startEngine method

car have engine
but bicylce doesnt its obvious throw 


*/


abstract class Vehicle {

    move() { console.log("move") }
}

abstract class EngineVehicle extends Vehicle {

    startEngine() { console.log("start engine") }
}

abstract class NoNEngineVehicle extends Vehicle {

}



class Car extends EngineVehicle {
    startEngine(): void {
        console.log("start car engine")
    }
}


class Bicycle extends NoNEngineVehicle {

}



export function main() {
    const car = new Car();
    car.startEngine();
    car.move();
    const bicycle = new Bicycle();
    bicycle.move()
}