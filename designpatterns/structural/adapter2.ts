interface PaymentProcessor {
    pay(amount: number): void
}

class RazorPay {
    makePayment(amount: number) {
        console.log("make payment", amount)
    }
}


class Stripe {
    doPayment(amount: number) {
        console.log("do payment", amount)
    }
}


class RazorAdapter implements PaymentProcessor {
    constructor(private gateway: RazorPay) { }

    pay(amount: number): void {
        this.gateway.makePayment(amount)
    }
}


class StripeAdapter implements PaymentProcessor {
    constructor(private gateway: Stripe) { }

    pay(amount: number): void {
        this.gateway.doPayment(amount)
    }
}


export function main() {
    const razorPayAdapter = new RazorAdapter(new RazorPay())
    razorPayAdapter.pay(100)
    const stripeAdapter = new StripeAdapter(new Stripe())
    stripeAdapter.pay(3055)
}