// -------------------- ENUMS --------------------

enum Direction {
    UP = "UP",
    DOWN = "DOWN",
    IDLE = "IDLE"
}

enum ElevatorState {
    IDLE = "IDLE",
    MOVING = "MOVING",
    MAINTENANCE = "MAINTENANCE"
}

// -------------------- REQUESTS --------------------

export abstract class Request {
    constructor(public floor: number) { }
}

class HallRequest extends Request {
    constructor(
        floor: number,
        public direction: Direction
    ) {
        super(floor);
    }
}

class CabinRequest extends Request {
    constructor(destination: number) {
        super(destination);
    }
}

// -------------------- STRATEGY --------------------

interface AllocationStrategy {
    getBestElevator(
        elevators: Elevator[],
        request: HallRequest
    ): Elevator;
}

class NearestElevatorStrategy implements AllocationStrategy {

    getBestElevator(
        elevators: Elevator[],
        request: HallRequest
    ): Elevator {

        return elevators.reduce((best, curr) => {

            return Math.abs(curr.getCurrentFloor() - request.floor) <
                Math.abs(best.getCurrentFloor() - request.floor)
                ? curr
                : best;

        });

    }

}

// -------------------- ELEVATOR --------------------

class Elevator {

    private requestQueue: Request[] = [];

    constructor(
        private id: number,
        private currentFloor = 0,
        private direction = Direction.IDLE,
        private state = ElevatorState.IDLE
    ) { }

    getCurrentFloor() {
        return this.currentFloor;
    }

    getDirection() {
        return this.direction;
    }

    getState() {
        return this.state;
    }

    acceptRequest(request: Request) {
        console.log(
            `Elevator ${this.id} accepted request -> Floor ${request.floor}`
        );

        this.requestQueue.push(request);
    }

    executeRequests() {

        while (this.requestQueue.length) {

            const request = this.requestQueue.shift()!;

            this.moveToFloor(request.floor);

            this.openDoor();
            this.closeDoor();

        }

        this.direction = Direction.IDLE;
        this.state = ElevatorState.IDLE;
    }

    private moveToFloor(destination: number) {

        this.state = ElevatorState.MOVING;

        this.direction =
            destination > this.currentFloor
                ? Direction.UP
                : Direction.DOWN;

        console.log(
            `Elevator ${this.id} moving from ${this.currentFloor} -> ${destination}`
        );

        this.currentFloor = destination;
    }

    private openDoor() {
        console.log(`Elevator ${this.id} door opened`);
    }

    private closeDoor() {
        console.log(`Elevator ${this.id} door closed`);
    }

}

// -------------------- CONTROLLER --------------------

class ElevatorController {

    constructor(
        private elevators: Elevator[],
        private strategy: AllocationStrategy
    ) { }

    assignElevator(request: HallRequest) {

        const elevator =
            this.strategy.getBestElevator(this.elevators, request);

        elevator.acceptRequest(request);

        return elevator;
    }

}

// -------------------- FLOOR --------------------

class Floor {

    constructor(
        private floorNo: number,
        private controller: ElevatorController
    ) { }

    pressUp() {

        const request =
            new HallRequest(this.floorNo, Direction.UP);

        return this.controller.assignElevator(request);
    }

    pressDown() {

        const request =
            new HallRequest(this.floorNo, Direction.DOWN);

        return this.controller.assignElevator(request);
    }

}

// -------------------- BUILDING --------------------

class Building {

    constructor(
        public floors: Floor[],
        public elevators: Elevator[]
    ) { }

}

// -------------------- DEMO --------------------

const elevators = [
    new Elevator(1),
    new Elevator(2, 6),
    new Elevator(3, 10)
];

const controller = new ElevatorController(
    elevators,
    new NearestElevatorStrategy()
);

const floors = [];

for (let i = 0; i < 15; i++) {
    floors.push(new Floor(i, controller));
}

const building = new Building(floors, elevators);

// User presses UP at floor 7

const assignedElevator = building.floors[7].pressUp();

// Passenger enters elevator and presses floor 12

assignedElevator.acceptRequest(
    new CabinRequest(12)
);

// Elevator starts processing

assignedElevator.executeRequests();