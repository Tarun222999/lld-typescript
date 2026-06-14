

class Engine {
    start() { }
}

class Car {
    constructor(readonly engine: Engine) { }
    start() {
        this.engine.start()
    }
}

/*
Separation of concerns → validator, repo, notification all separate.
Encapsulation → amount hidden inside Payment.
Composition → PaymentProcessor has validator/repo/notification instead of inheriting from them.
*/