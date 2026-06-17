
interface ChatMediator {
    sendMessage(msg: string, sender: User): void;
}


class ChatMediator implements ChatMediator {
    private readonly users: User[] = []


    addUser(user: User) { this.users.push(user) }
    sendMessage(msg: string, user: User) {
        for (const u of this.users) {
            if (u != user) user.recieve(msg, u)
        }
    }

}




class User {
    constructor(
        private readonly name: string,
        private readonly chatMediator: ChatMediator
    ) {

    }


    send(msg: string) {
        this.chatMediator.sendMessage(msg, this)
    }

    recieve(msg: string, sender: User) {
        console.log("recieved msg " + msg + "<--" + sender.name)
    }

}

const chatMediator = new ChatMediator()
const user1 = new User("sam", chatMediator)
const user2 = new User("neymer", chatMediator)
const user3 = new User("messi", chatMediator)
user2.send("hey")