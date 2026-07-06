//DOMAIN


export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL";

export class Log {
    constructor(
        public level: LogLevel,
        public message: string,
        public timestamp: Date = new Date(),
        public ip?: string,
        public requestUrl?: string
    ) { }
}



class LogBuilder {
    private level!: LogLevel;
    private message!: string;
    private ip?: string;
    private requestUrl?: string;

    setLevel(level: LogLevel) { this.level = level; return this; }
    setMessage(msg: string) { this.message = msg; return this; }
    setIp(ip: string) { this.ip = ip; return this; }
    setRequestUrl(url: string) { this.requestUrl = url; return this; }

    build() {
        return new Log(this.level, this.message, new Date(), this.ip, this.requestUrl);
    }
}

//formatter strategy

interface Formatter {
    format(log: Log): string
}

class PlainFormatter implements Formatter {
    format(log: Log): string {
        return `[${log.timestamp.toISOString()}] ${log.level}: ${log.message}`;
    }
}


class JsonFormatter implements Formatter {
    format(log: Log): string {
        return JSON.stringify(log);
    }
}


//storage 

interface StorageService {
    write(data: string): void;
}

class FileStorage implements StorageService {
    write(data: string) {
        console.log("Writing to File:", data);
    }
}

class S3Storage implements StorageService {
    write(data: string) {
        console.log("Uploading to S3:", data);
    }
}

//appender

interface Appender {
    append(log: Log): void;
}

class StorageAppender implements Appender {
    constructor(
        private storage: StorageService,
        private formatter: Formatter
    ) { }

    append(log: Log): void {
        const formatted = this.formatter.format(log)
        this.storage.write(formatted)

    }

}


// ------------------------




// ------------------------

class LoggerConfig {

    constructor(
        public minLevel: LogLevel,
        public appenders: Appender[]
    ) { }
}

// ------------------------
// Logger
// ------------------------

class Logger {

    private static instance: Logger;

    private constructor(
        private config: LoggerConfig
    ) { }

    static initialize(config: LoggerConfig) {
        if (!Logger.instance)
            Logger.instance = new Logger(config);
    }

    static getInstance() {
        return Logger.instance;
    }

    log(log: Log) {
        for (const appender of this.config.appenders)
            appender.append(log);
    }
}

const fileAppender = new StorageAppender(
    new FileStorage(),
    new JsonFormatter()
);

const s3Appender = new StorageAppender(
    new S3Storage(),
    new PlainFormatter()
);

Logger.initialize(
    new LoggerConfig(
        "INFO",
        [fileAppender, s3Appender]
    )
);

const logger = Logger.getInstance();

const log = new LogBuilder()
    .setLevel("ERROR")
    .setMessage("Database Down")
    .setIp("127.0.0.1")
    .build();

logger.log(log);