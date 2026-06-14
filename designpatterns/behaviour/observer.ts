//one to many communication
//when something happens at publisher observers must be notfied


type User = {
    name: string,
    email: string,
    phone: number
}

interface Observer {
    update(user: User): void
}

class EmailObserver implements Observer {
    update(user: User): void {
        console.log("sending email", user.email)
    }
}


class SMSObserver implements Observer {
    update(user: User): void {
        console.log("sending phone", user.phone)
    }
}

class AuditLogger implements Observer {
    update(user: User): void {
        console.log("Logging activity" + user.name);
    }
}




class UserRegistrationService {
    private observers: Observer[] = [];

    addObserver(observer: Observer) {
        this.observers.push(observer)
    }

    notifyObservers(user: User) {
        for (const observer of this.observers) {
            observer.update(user)
        }
    }

    register(user: User) {
        console.log("user registered")
        this.notifyObservers(user)
    }

}


const service = new UserRegistrationService()
service.addObserver(new EmailObserver())
service.addObserver(new SMSObserver())
service.addObserver(new AuditLogger())
const user: User = {
    "name": "sonny hayes",
    "phone": 19343434343,
    "email": "f1@mail.com"
}

service.register(user)



