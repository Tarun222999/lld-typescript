class Bankaccount {


    constructor(

        private balance: number = 0,
    ) {

    }

    deposit(amount: number) {
        this.balance += amount;
    }

    withdraw(amount: number) {
        if (amount > this.balance) throw new Error("insuffecient balance")
        this.balance -= amount;
    }

    getBalance() { return this.balance }


}