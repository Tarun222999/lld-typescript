

enum SubscriptionStatus {
    ACTIVE,
    CANCELED,
    EXPIRED,
    PENDING
}

class User {
    constructor(id, name, email) { }
}


class Plan {
    constructor(id, plan_name, amount) { }
}

class Subscription {
    constructor(id, planid, userid, createdAt, renewAt, status: SubscriptionStatus) { }
}


class SubscriptionRepo {
    subscriptions = new Map<string, Subscription>
    save() { }
    update() { }
}


class SubscriptionService {
    constructor(
        subrepo: SubscriptionService
        invoiceservice: InvoiceGenerator
    ) {

        create(){
            //create sub in pending states
        }

        update(){
            //check for payement
            //on sucess update to active
            //generate invocie
            //send notification to user
        }

        cancel(){ }
        //cron jobs that runs periodically
        //to make active based on renewAt
        renew(){ }

        markFail(){ }

    }
}

class PaymentRecord {
    id,status,userid,susbcriptionId,amount, tax
}


class Invoice {
    constructor(id, pamyentrecord)
}

class InvoiceGenerator {
    invoices = new Map<string, Invoice>
    constructor() { }
}


interface PamyentStrategy {
    pay(amount){ }
}


class UPI implements PamyentStrategy { }
class CreditCard implements PamyentStrategy { }
class PaymentProccesor {
    payemnts = new Map<string, PaymentRecord>
    capturePayments() { }
}

class App {
    viewplan()
    subscribeplan() {
        //create sub with pending
        //complete payment
        //on sucess call subscription to make active
        //on error call subscription to mark fail
        //or delete(?)
    }
    viewinvoice()
    cancelsubscription()
}

interface Observer {
    observe()
}

class NotificationService implements Observer {
    observe() { }
}