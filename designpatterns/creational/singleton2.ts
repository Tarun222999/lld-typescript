class Logger {
    private static instance: Logger

    private constructor() { }

    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger()
        }
        return Logger.instance
    }

    log(msg: string) {
        console.log("[MSG] " + msg)
    }
}


const logger1 = Logger.getInstance()
const logger2 = Logger.getInstance()

console.log(logger1 == logger2) //true