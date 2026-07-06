/*1. User Registration
2. Create/Join Group
3. Add Expense
4. Choose Split Type
5. Validate Split
6. Calculate Individual Shares
7. Update Balances
8. Notify Participants
9. View Outstanding Balances
10. Settle Balance
*/


interface SplitStrategy {
    split(expense): Expense
}

class EqualSplit implements SplitStrategy {
    split(expense): Expense{
        return Expense{}
    }
}

class PercentageSplit implements SplitStrategy {
    split(expense): Expense{
        return Expense
    }
}


interface Observer{
    update(user)
}

class EmailObserver implements Observer {
    
}

class User {
    id,name,notificationType
    //groups he is present in 
    //to track and prevent manipulation
    userGroups: []
}


class Groups {
    id, name
    users: []User
    splitStrategy
    observer[]Observer
    addToGroup(user) {
    }
    removeFromGroup(user)

    setSplitStrategy(strategy:SplitStrategy){
        
    }

    getStrategy(){ }

    notify(){
        //for all based on the opted notification
        //type notify call corect notify
    }
}

class ExpenseItem {
    create()
    update(id)
}


//mantains for each group records of expenses for each userr
class Expense {
    tracker
    //group id <- [{userId:expense}]
    constructor(splitService)
    addExpense(groupId, userId, expenseItem):Boolean{
          //validate new split with splitService
          //if all ok calucalte new shares
          //update new expeneses in tracker
        
    
    }
    viewBalance(grouId){
        return this.tracker[grouId]
    }
}

class SplitService {
    validate(expense)
    calucalateShare()
   
}



//facade expose what user really uses
class SplitWise {
    constructor(groups: Groups[]) {
        // a tracker
        this.expense= new Expense }

    //some one coming to register 
    //if group present add or create new group
    register(user, groupId) {
        //if groupId present call
        groups.add(user)
        //else create new group and add
    }
    setSplitType(groupId,strategy) {
        groups[groupId].setSplitStategy(strategy)
    }
    expense(user, amount, desc, groupId){
        expense.addExpense(...args)
        //group.notify()
    }
    viewOutstanding(user, groupId)
    setttleBalance(user, groupId)
}