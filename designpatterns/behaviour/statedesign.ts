
//you should have the context
//then you should change state basically


interface TrafficLightState {
    next(context: TrafficLightContext): void
    getColor(): string
}



class RedState implements TrafficLightState {
    constructor(private readonly color: string = "red") { }

    next(context: TrafficLightContext): void {
        context.setState(new GreenState())
    }
    getColor(): string {
        return this.color
    }
}

class GreenState implements TrafficLightState {
    constructor(private readonly color: string = "green") { }

    next(context: TrafficLightContext): void {
        context.setState(new YellowState())
    }
    getColor(): string {
        return this.color
    }
}


class YellowState implements TrafficLightState {
    constructor(private readonly color: string = "yellow") { }

    next(context: TrafficLightContext): void {
        context.setState(new RedState())
    }
    getColor(): string {
        return this.color
    }
}


class TrafficLightContext {
    constructor(
        private currentState: TrafficLightState = new RedState()
    ) { }


    setState(state: TrafficLightState) { this.currentState = state }

    next() {
        this.currentState.next(this)
    }

    getColor(): string {
        return this.currentState.getColor()
    }
}

const context = new TrafficLightContext()
context.next()
context.next()