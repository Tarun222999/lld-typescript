//class is closed for change bur open for extension
abstract class Payment {
    abstract pay(amount: number): void

    validate() {
        console.log('validating payment')
    }
}



class CreditCard extends Payment {
    pay(amount: number): void {
        console.log("credit card payment", amount)
    }
}


class Upi extends Payment {
    pay(amount: number): void {
        console.log("upi payment", amount)
    }
}



class PaymentProcessor {

    process(payment: Payment, amount: number) {
        payment.validate();
        payment.pay(amount)
    }
}


export function main() {
    const upi = new Upi()
    const processor = new PaymentProcessor()
    processor.process(upi, 100);
}

