class User {
    constructor(readonly address: Address) { }

    userCity() { return this.address.city; }
}

class Address {
    constructor(readonly city: City) { }
}

class City {
    constructor(readonly name: string) { }
}



// 1. Law of Demeter (Principle of Least Knowledge)
// Meaning

// A class should only talk to its direct friends.

// Don't reach deep into other objects' internals.

// string userCity=user.userCity()



//TELL DONT ASK

//you just call withdraw
//you do not check balance urself,then decide to withdraw


//HIGH COHESION AND LOW COUPLING

//everything inside a class is closely related
//classes should depend on each other as litttle as possible

class UserRepository {
    saveUser() { }
}

class EmailService {
    sendEmail() { }
}

class InvoiceVoice {
    generareInvoice() { }
}