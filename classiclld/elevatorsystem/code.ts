


//root aggregator
class Building {
    constructor(floors: Floor[], elevators: Eleavator) { }

    getFloor(id) { }
    getElevtor(id) { }
}


//inject
class Floor {
    constructor(elevatorController: ElevatorController) { }
    up(floorId) {
        //hallRequest = new HallRequest(floor)
        //elevatorController.handleRequest(request)
    }
    down(floorId) {
        //hallRequest = new HallRequest(floor)
    }
}

type ElevatorStatus = "idle" | "moving up" | "moving down" | "open" | "closed"
    | "mantainance"

class Eleavator {
    requestQueue: Request[] = []
    //requests
    getCurrentState() { }
    getCurrentFloor() { }
    open() { }
    close() { }
    acceptRequests() { }


    executeRequests() {
        //while requests execute request

        /*
            while(true){
                if(requests empty){
                    state=IDLE
                    wait()
                }

                //pop the first requests
                moveTo(request.floor)
            }

        */
    }
}


class ElevatorController {
    construor(strategy: AllocationStrategy) { }
    assignElevator(request) {
        //stategy.getBestElevator() <- elevtor
        //elevator.acceptRequests
    }
}

type EleavatorRequest = {
    floor: number,
    direction?: boolean
}
export abstract class Request {
    constructor(floor: number) { }
    abstract createRequest(): EleavatorRequest
}

class CabinRequest extends Request {
    //floor number here is destination
    constructor(floor: number) {
        super(floor);
    }

    createRequest(): EleavatorRequest {

    }
}


class HallRequest extends Request {
    //floor number here is source
    constructor(floor: number, direction: string) {
        super(floor)
    }

    createRequest(): EleavatorRequest {

    }
}


interface AllocationStrategy {
    getBestElevator(request: Request): Eleavator
}

class MinimumTimeAllocator implements AllocationStrategy {
    getBestElevator(request: Request): Eleavator {
        //based on the 
    }
}