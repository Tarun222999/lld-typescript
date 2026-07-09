
class User {
    constructor(id: string, name: string, email: string) {

    }
}

class Admin extends User {
    isAdmin: boolean = false
    constructor(id: string, name: string, email: string) {
        super(id, name, email)
        this.isAdmin = true
    }
}

class Movie {
    constructor() { }
}


class Seats {
    constructor(id: string, row: string, col: string, isBooked: false, isLocked: false) { }
}
export class Screen {
    constructor(seats: Seats[], movie: Movie) { }

    availableSeats() {

    }
}


class ShowManagement {
    setMovie(movie, theatre, screen) {
        //only admin can do
    }
}

class Theatre {
    constructor(screens: Screen[]) {
    }

    listCurrentPlayingMovies() { }
}


class Ticket {
    constructor(movie: Movie, theatre: Theatre, screen: Screen) { }


}


class BookingSystem {

    book(movie, theare, screen) {
        //lock seat
        //collect payment(call payment processor)
        //on success generate ticket or throw error and reelase lock

    }

    cancel() {

    }
}


interface PaymentStategy {
    pay(): void
}

class UPIPayment implements PaymentStategy {
    pay() {
        console.log("upi payement")
    }
}

class PayemntProccesor {
    pay(user, strategy) {

    }
}



class App {
    constructor(theatres: Theatre[], system: BookingSystem) { }
    getAvailableMovies(theatre) {
        theatre.listCurrentPlayingMovies()
    }
    selectMovie(theatre, movie, startTime) {
        //get where the movie is playing in which screen on that screen check avl seats
        theatre.screens.screen.availableSeats()
    }
    bookTicket() {
        system.book()
    }
    cancelTicket() {
        system.cancel()
    }
}