// -------------------- USERS --------------------

class User {
    constructor(
        public id: string,
        public name: string,
        public email: string
    ) { }
}

class Admin extends User {
    constructor(
        id: string,
        name: string,
        email: string
    ) {
        super(id, name, email);
    }
}

// -------------------- MOVIE --------------------

class Movie {
    constructor(
        public id: string,
        public title: string,
        public duration: number,
        public language: string
    ) { }
}

// -------------------- SEAT --------------------

class Seat {
    isBooked = false;
    isLocked = false;
    lockedBy?: User;

    constructor(
        public id: string,
        public row: string,
        public col: number
    ) { }

    lock(user: User) {
        if (this.isBooked || this.isLocked)
            throw new Error("Seat unavailable");

        this.isLocked = true;
        this.lockedBy = user;
    }

    unlock() {
        this.isLocked = false;
        this.lockedBy = undefined;
    }

    book() {
        this.isBooked = true;
        this.unlock();
    }
}

// -------------------- SCREEN --------------------

class Screen {

    constructor(
        public id: string,
        public seats: Seat[]
    ) { }

    availableSeats() {
        return this.seats.filter(
            s => !s.isBooked && !s.isLocked
        );
    }
}

// -------------------- SHOW --------------------

class Show {

    constructor(
        public id: string,
        public movie: Movie,
        public screen: Screen,
        public startTime: Date,
        public endTime: Date
    ) { }
}

// -------------------- THEATRE --------------------

class Theatre {

    constructor(
        public id: string,
        public name: string,
        public screens: Screen[],
        public shows: Show[] = []
    ) { }

    listCurrentPlayingMovies() {
        return this.shows.map(show => show.movie);
    }

    getShow(movie: Movie) {
        return this.shows.find(
            s => s.movie.id == movie.id
        );
    }
}

// -------------------- BOOKING --------------------

enum BookingStatus {
    PENDING,
    CONFIRMED,
    CANCELLED
}

class Booking {

    constructor(
        public id: string,
        public user: User,
        public show: Show,
        public seats: Seat[],
        public status: BookingStatus = BookingStatus.PENDING
    ) { }
}

// -------------------- TICKET --------------------

class Ticket {

    constructor(
        public booking: Booking
    ) { }
}

// -------------------- PAYMENT --------------------

interface PaymentStrategy {
    pay(amount: number): boolean;
}

class UPIPayment implements PaymentStrategy {

    pay(amount: number): boolean {
        console.log("UPI Payment");
        return true;
    }
}

class CardPayment implements PaymentStrategy {

    pay(amount: number): boolean {
        console.log("Card Payment");
        return true;
    }
}

class PaymentProcessor {

    process(
        booking: Booking,
        strategy: PaymentStrategy
    ) {
        return strategy.pay(500);
    }
}

// -------------------- NOTIFICATION --------------------

interface Notification {

    notify(user: User, ticket: Ticket): void;
}

class EmailNotification implements Notification {

    notify(user: User, ticket: Ticket) {
        console.log("Email sent");
    }
}

class SMSNotification implements Notification {

    notify(user: User, ticket: Ticket) {
        console.log("SMS sent");
    }
}

// -------------------- BOOKING SYSTEM --------------------

class BookingSystem {

    constructor(
        private paymentProcessor: PaymentProcessor,
        private notifications: Notification[]
    ) { }

    book(
        user: User,
        show: Show,
        seats: Seat[],
        strategy: PaymentStrategy
    ): Ticket {

        // Lock seats
        seats.forEach(s => s.lock(user));

        const booking = new Booking(
            crypto.randomUUID(),
            user,
            show,
            seats
        );

        const success =
            this.paymentProcessor.process(
                booking,
                strategy
            );

        if (!success) {
            seats.forEach(s => s.unlock());
            throw new Error("Payment Failed");
        }

        seats.forEach(s => s.book());

        booking.status = BookingStatus.CONFIRMED;

        const ticket = new Ticket(booking);

        this.notifications.forEach(n =>
            n.notify(user, ticket)
        );

        return ticket;
    }

    cancel(booking: Booking) {

        booking.status = BookingStatus.CANCELLED;

        booking.seats.forEach(seat => {
            seat.isBooked = false;
        });
    }
}

// -------------------- SHOW MANAGEMENT --------------------

class ShowManagement {

    createShow(
        admin: Admin,
        theatre: Theatre,
        show: Show
    ) {
        theatre.shows.push(show);
    }
}

// -------------------- APP --------------------

class App {

    constructor(
        private theatres: Theatre[],
        private bookingSystem: BookingSystem
    ) { }

    getAvailableMovies(theatre: Theatre) {
        return theatre.listCurrentPlayingMovies();
    }

    getAvailableSeats(show: Show) {
        return show.screen.availableSeats();
    }

    bookTicket(
        user: User,
        show: Show,
        seats: Seat[],
        strategy: PaymentStrategy
    ) {
        return this.bookingSystem.book(
            user,
            show,
            seats,
            strategy
        );
    }

    cancelTicket(booking: Booking) {
        this.bookingSystem.cancel(booking);
    }
}