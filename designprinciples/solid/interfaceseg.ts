//avoid fat interfaces


interface Printer {
    print(): void;
}


interface FaxMeachine {
    fax(): void;

}

interface Scanner {
    scanner(): void;
}



class BasicPrinter implements Printer {
    print(): void {
        console.log("printer")
    }
}

class AllInOne implements Printer, FaxMeachine, Scanner {
    print(): void {
        console.log("printer")
    }

    fax(): void {
        console.log("fax")
    }

    scanner(): void {
        console.log("scanner")
    }

}