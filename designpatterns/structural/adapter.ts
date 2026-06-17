//adapter acts as a bridge bw two incompatible interfaces

interface SmartDevice {
    turnOff(): void
    turnOn(): void
}

class AirConditoner {
    connectedViaBluetooth(): void {
        console.log("connected to bluetooth")
    }

    disconnectedBluetooth() {
        console.log("disconnect bluetooth")
    }

    startCooling() {
        console.log("start cooling")
    }

    stopCalling() {
        console.log("stop calling")
    }
}

class SmartLight {
    connecToWifi() {
        console.log("connect to wifi")
    }

    disconnectWifi() {
        console.log("disconnect to wifi")
    }

    switchOff() {
        console.log("switch off")
    }

    switchOn() {
        console.log("switch on")
    }
}

class AirConditionerAdapter implements SmartDevice {
    constructor(private readonly airConditoner: AirConditoner) { }

    turnOn() {
        this.airConditoner.connectedViaBluetooth()
        this.airConditoner.startCooling()
    }

    turnOff() {
        this.airConditoner.stopCalling()
        this.airConditoner.disconnectedBluetooth()
    }
}

class SmartLightAdapter implements SmartDevice {
    constructor(private readonly smartLight: SmartLight) { }

    turnOn() {
        this.smartLight.connecToWifi()
        this.smartLight.switchOn()
    }

    turnOff() {
        this.smartLight.switchOff()
        this.smartLight.disconnectWifi()
    }
}


function main() {
    const airConditoner = new AirConditionerAdapter(new AirConditoner())
    const smartLight = new SmartLightAdapter(new SmartLight())

    smartLight.turnOn()
    airConditoner.turnOn()

    smartLight.turnOff()


}