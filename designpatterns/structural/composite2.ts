
interface SmartComponent {
    turnOn(): void
    turnOff(): void
}



export class AirConditioner implements SmartComponent {


    turnOn() {
        console.log("Air conditioner turn-on")
    }

    turnOff() {
        console.log("Air conditioner turn-off")
    }
}

export class SmartLight implements SmartComponent {


    turnOn() {
        console.log("light turn on")
    }

    turnOff() {
        console.log("light turn off")
    }
}



class CompositeComponent implements SmartComponent {
    smartComponents: SmartComponent[] = []


    addComponent(component: SmartComponent) {
        this.smartComponents.push(component)
    }

    removeComponent(component: SmartComponent) {
        this.smartComponents = this.smartComponents.filter((comp) => comp != component)
    }

    turnOn() {
        for (const comp of this.smartComponents) {
            comp.turnOn()
        }
    }

    turnOff() {
        for (const comp of this.smartComponents) {
            comp.turnOff()
        }
    }
}


function main() {
    const airConditioner = new AirConditioner()
    const smartLight = new SmartLight()


    const room1 = new CompositeComponent()
    room1.addComponent(airConditioner)
    room1.addComponent(smartLight)


    const room2 = new CompositeComponent();
    room2.addComponent(new AirConditioner())
    room2.addComponent(new SmartLight())

    const floor = new CompositeComponent()
    floor.addComponent(room1)
    floor.addComponent(room2)


    floor.turnOn()
    floor.turnOff()
}