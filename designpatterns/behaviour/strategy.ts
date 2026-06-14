interface PaymentStrategy {
    processPayment(): void
}

export class CreditCard implements PaymentStrategy {
    processPayment(): void {
        console.log("credit card payment")
    }
}

export class UPI implements PaymentStrategy {
    processPayment(): void {
        console.log("upi payment")
    }
}

export class Crypto implements PaymentStrategy {
    processPayment(): void {
        console.log("crypto payment")
    }
}


class PaymentProcessor {


    constructor(private paymentStrategy: PaymentStrategy) { }
    processPayment() {
        this.paymentStrategy.processPayment()
    }



    setPaymentStrategy(PaymentStrategy: PaymentStrategy) {
        this.paymentStrategy = PaymentStrategy
    }
}


const credtiCard = new CreditCard()
const upi = new UPI()

const paymentProcessor = new PaymentProcessor(credtiCard)
paymentProcessor.processPayment();
paymentProcessor.setPaymentStrategy(upi)
paymentProcessor.processPayment()
