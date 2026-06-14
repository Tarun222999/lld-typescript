// In simpler terms, the DIP suggests that classes should rely on abstractions (e.g., interfaces or abstract classes) rather than concrete implementations. This allows for more flexible and decoupled code, making it easier to change implementations without affecting other parts of the codebas


class Order {
    constructor(
        private readonly id: string,
        private readonly qty: number
    ) { }
}

interface NotificationService {
    sendNotification(message: string): void
}

interface LoggingService {
    logMessage(message: string): void;
    logError(message: string): void;
}

interface InventoryService {
    updateStock(order: Order): void;
    checkAvailability(): boolean;

}


class Email implements NotificationService {
    sendNotification(message: string): void {
        console.log("email sent ", message);
    }
}


class DatabaseLogger implements LoggingService {
    logMessage(message: string): void {
        console.log(message)
    }

    logError(error: string): void {
        console.log(error)
    }
}


class OrderService {
    constructor(
        private readonly notificationService: NotificationService,
        private readonly loggingService: LoggingService,
        private readonly inventoryService: InventoryService
    ) {

    }


    placeOrder(order: Order) {
        try {
            this.inventoryService.updateStock(order);
            this.notificationService.sendNotification("order placed")
            this.loggingService.logMessage("order placed")
        } catch (error) {
            const msg = error instanceof Error ? `${error.message}` : String(error)
            this.loggingService.logError(`order failed: ${msg}`)
            throw error
        }
    }
}
