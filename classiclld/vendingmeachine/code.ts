

interface VendingMeachineState {
    work(): void
}


class Product {
    constructor(
        id: string,
        name: string,
        price: number,
        qty: number
    ) { }
}

class Inventory {
    products: Product[] = []
    addProduct(product: Product) { this.products.push(product) }
    //edit dec qty etc
    updateProduct() { }
    restock() { }
}

class IdleState implements VendingMeachineState {
    work() {
        //check if state is idle
        //list avl products
        //ask for product select
        //move to product selected
        //set next state to product selected
    }


}

class ProductSelected implements VendingMeachineState {
    work() {
        //chheck if selected is still valid
        //set to payment pending state
    }

}


interface PaymentStragy {
    pay()
    refund()
}

class UPI implements PaymentStragy {
    pay()
    refund()
}

class PayemntProccesor {
    pay()
    refund()
}


class PaymentPending implements VendingMeachineState {
    work() {
        //
    }
}


class PaymentSucess implements VendingMeachineState {
    work() {

    }
}

class DispenseItem implements VendingMeachineState {
    work() {

    }
}


class VendingMeachine {
    currentState: VendingMeachineState = new IdleState()
    system() {
        //runs indenfinetly state from idle state
        //while
        //if idle state select products
        //if product selected do validations
    }

    setNext(state: VendingMeachineState) {
        this.currentState = state;
    }

    accessInventory() {
        //add restock update
    }
}