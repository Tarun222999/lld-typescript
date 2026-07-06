//decarator is a structural design pattern that lets you add new
//behaviour to an object dynamically without modifying the code

//linked list of object wrappers
//first let the object i m wrapping do its work then i'll do mine

//component
interface Notification {
    send(message: string): void
}

//concrete component
export class EmailNotification implements Notification {
    send(message: string): void {
        console.log("sending email", message)
    }
}

//base decarator

abstract class NotificationDecarator implements Notification {
    constructor(protected notification: Notification) { }

    send(message: string): void {
        this.notification.send(message)
    }
}


class SMSDecarator extends NotificationDecarator {
    send(message: string): void {
        super.send(message)
        console.log("sending sms", message)
    }
}

class SlackDecarator extends NotificationDecarator {
    send(message: string): void {
        super.send(message);

        console.log(`Sending Slack Message: ${message}`);
    }
}



let notification: Notification = new EmailNotification()

notification = new SMSDecarator(notification)
notification.send("server is up")
//sending mail server is up
//sending sms server is up
notification = new SlackDecarator(notification)