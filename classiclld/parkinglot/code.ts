/*
whats the happy path
Vehicle arrives -> Find Suitable slot -> Resrver that slot 
-> Generate ticket -> Return ticket

Now exit
User gives ticket -> validate ticket ->calucalte fee -> take payment
->free slot -> clost ticket

who owns each resp
Vehicle arrives(nothing to do with us)
find slot(parkingLot or slotAllocator)
reserve slot(Slot)
genrate ticket(ticket service)
calucalte fee(fee calucalator)
take payment(ticketing service)
*/

//strategy
interface AllocatorStrategy {
    allocate(vehicle: Vehicle): Slot
}

interface PaymentStrategy {
    pay(amount: number){ }
}


type Ticket{
    id, vehicleId, slotId, startTime, endTime
}


//facade

class ParkingLot {
    park(vehicle: Vehicle): Ticket {
        //allocater
        //slotService.reserve(vehicle)
        //ticketService.issueTicket(vehicle,slot)
        //return the ticket
        return {}
    }
    unPark(ticket: Ticket) {
        //ticketService.validate(ticket) 
        //feeCalucalator.calucalate(ticket)<-amount
        //paymentService.pay(amount)
        //slotService.free(ticket)
        //ticketService.closeTicket(ticket)
    }
}


//OO object owning the state modifies it
class Slot {
    //id slotsize(s,l,xs)
    canFit(vehcile: Vehicle) { }
    reserve(vehicle: Vehicle): void { }
    free(): void { }
}

class TicketService {
    issueTicket(vehicle, slot): Ticket { }
    validate(ticket: Ticket): boolean { }
    closeTicket(ticket: Ticket): {}
}


class UPIPayments implements PaymentStrategy {

}


class FastestToPark implements AllocatorStrategy {
    strategy(): Slot {
        //return a slot
    }
}

class FastestToExit implements AllocatorStrategy {
    strategy(): Slot {
        //return a slot
    }
}


class FeeCalucalator {
    calucalate(ticket): number
}