

abstract class OrderProcessor {
    processOrder() {
        this.validateOrder()
        this.calucalatePrice()
        this.paymentProcessor()
    }

    validateOrder() { console.log("validate") }
    calucalatePrice() { console.log("price") }

    abstract paymentProcessor(): void
}

