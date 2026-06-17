//instead of single big function
//we'll create a series of handlers

abstract class Approver {
    nextApprover: Approver | undefined = undefined

    setNextApprover(nextApprover: Approver) {
        this.nextApprover = nextApprover;
    }

    abstract processLeaveRequest(leaveDays: number): void
}


class Supervisor extends Approver {

    processLeaveRequest(leaveDays: number): void {
        if (leaveDays < 5) {
            console.log("approved")
        } else {
            this.nextApprover?.processLeaveRequest(leaveDays)
        }
    }
}


class Manager extends Approver {
    processLeaveRequest(leaveDays: number): void {
        if (leaveDays < 10) {
            console.log("approved")
        } else {
            this.nextApprover?.processLeaveRequest(leaveDays)
        }
    }
}


class Director extends Approver {
    processLeaveRequest(leaveDays: number): void {
        if (leaveDays < 15) {
            console.log("approved")
        } else {
            console.log("rejceted")
        }
    }
}


const supervisor = new Supervisor()
const manager = new Manager()
const director = new Director()

supervisor.setNextApprover(manager)
manager.setNextApprover(director)