//we can create an abstract class that holds the 
//common algorithm steps and let subclass overdie parts

abstract class Beverage {

    prepareRecipie() {
        this.boilwater()
        this.brew()
        this.addCondiments()
        this.pourInCup()
    }

    boilwater(): void { console.log("boiling water") }

    pourInCup(): void { console.log("pour in cup") }

    abstract brew(): void;
    abstract addCondiments(): void
}


class Coffee extends Beverage {
    // Do not override prepareRecipe()
    brew(): void {
        console.log("brewing coffee")
    }

    addCondiments(): void {
        console.log('add cofee condiemnts')
    }
}

class Tea extends Beverage {
    // Do not override prepareRecipe()
    brew(): void {
        console.log("brewing tea")
    }

    addCondiments(): void {
        console.log('add tea condiemnts')
    }
}