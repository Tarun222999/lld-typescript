


export class Request {
    constructor(
        ip: string,
        userId: string,
        api_key?: string,
        client_id?: string
    ) { }
}

enum IdentifierType {
    IP,
    USER,
    API_KEY,
    CLIENT
}

type RateLimiterRule = "ip" | "client_id"
    | "api_key" | "user_id"


class RateLimiterConfig {
    constructor(noOfRequest, perHour) { }
}

class RateLimiterClientConfig extends RateLimiterConfig {
    constructor(configs: Record<clilentype, RateLimiterConfig>) { }
}


interface RateLimiterStorage {
    save(): void;
    get(): Request[];
}

class D2 implements RateLimiterStorage {
    save() {

    }

    get() {
        return []
    }
}

interface RateLimiterStrategy {
    allow(request: Request): boolean
}

class TokenBucket implements RateLimiterStrategy {
    allow(request: Request): boolean { return true }
}



class RateLimiter {
    constructor(rule: RateLimiterRule,
        limiterConfing: RateLimiterClientConfig,
        readonly strategy: RateLimiterStrategy
        storage: RateLimiterStorage
    ) {

    }

    extractRuleIdentifier(request) {

    }
    canRequest(request) {
        this.strategy.apply(rule, limiterConfig, request)
    }
}