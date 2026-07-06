



interface StorageService {
    store(): boolean;
}


class File implements StorageService {
    store(log)
}

class S3 implements StorageService {
    store(log)
}




type LogLevel = "DEBUG" | "ERROR" |
    "WARN" | "FATAL" | "INFO"


//log builder

class Log {
    protected constructor(
        time: Date,
        message: string,
        instance: string,
        ip: string,
        requestUrl: string
    ) {

    }
}


class LogBuilder {
    time: Date = new Date;
    message!: string;
    instance?: string;
    ip?: string;
    requestUrl?: string;


    setMessage() { this.message = this.message; return this; }
    //similarly rest all 

    builder() {
        return Log(this.time ...)
    }

}


interface Observer {
    pullLog()
}


class Queue implements Observer {
    pullLog() {
        //get the log
        //call db
    }
}

class Logger {

    private static instance: Logger
    storageServers: StorageService[] = []
    obseervers: Observer[] = []
    private constructor() { }

    static getInstance(): Logger {
        if (!Logger.instance) Logger.instance = new Logger()
        return Logger.instance
    }

    log(level: LogLevel, log: Log) {
        //for all observers send the log
    }

    config() { }


    getLogs() { }

    addStorageService(storage: StorageService) { }

    removeStorageService(storage: StorageService) { }

    addObservers() { }

}