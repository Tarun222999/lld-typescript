class User {
    constructor(name: string, email: string, balance: number) { }
}

class Group {
    balanceSheet = new BalanceSheet();
    notificationService = new NotificationSerivce()
    constructor(members: User[], expenses: Expenses) {

    }

    addMember() {

    }

    addExpense(user, amount, desc, groupId, splitStrategy) {
        //check same group id and other validations
        //call expenses to create new expense

        /*call balance sheet to update balance of the
        group(users) pass group*/


        //call notification serivce to send update expense notification
        // this.notificationService.notfy(members,data)

    }

    settleExpense(){
        //call balancesheet settle
        //in return get [{user:amount}....]
        //
    }


}

class Expenses {
    splits: Split[] = []
    constructor(amount: number, paidBy, strategy: SplitStrategy) {
        //based on the strategy call strategy.split()
        //to get splits



    }


}

class Split {
    constructor(user: User,
        amount: number) { }
}


interface SplitStrategy {
    split(): Split[]
}


class EqualStrategy {
    split() {
        //[{user:"aman",amount:25},{user:"varun",amount:25}]
    }
}

class PercentageStrategy {
    split() {
        //[{user:"aman",amount:25},{user:"varun",amount:25}]
    }
}


//i can also mention we can have settlement strategy

class BalanceSheet {
    updateBalance()
    settle()
    viewOutstanding()
}

class NotificationSerivce {
    notfy()
}

class SplitService {

    constructor(groups: Groups[]) {

    }

    //some one coming to register 
    //if group present add or create new group
    register(user, groupId) {
        //if group not present create new groupid
        //add to group
    }
    expense(user, amount, desc, groupId, splitStrategy) {

    }
    viewOutstanding(user, groupId){
        //not sure how to do create anotehr method in 
        //group then call balanceSheet method?
        //this.groups[groupId].balanceSheet.viewBalance(user)
    }
    setttleBalance(user, groupId){
        //same doubt as view outstanding
    }

}
