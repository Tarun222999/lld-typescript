/*

misue of inhertiance

class Notification {
    void send(){}
}

class EmailNotification extends Notification {}
class SmsNotification extends Notification {}
class PushNotification extends Notification {}

*/


interface Sender {
    send(): void;
}


class EmailSender implements Sender {
    send(): void {
        console.log("email sent")
    }
}


class SmsSender implements Sender {
    send(): void {
        console.log("sms sender")
    }
}


export class Notification {


    constructor(
        private readonly sender: Sender
    ) { }


    notifyUser() {
        this.sender.send()
    }
}


const notifier1 = new Notification(new EmailSender())
const notifier2 = new Notification(new SmsSender())