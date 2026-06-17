export class Request {
    constructor(
        public isAuthenticated: boolean,
        public isAdmin: boolean,
        public body: string
    ) { }
}

abstract class Handler {
    protected nextHandler?: Handler;

    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler
    }

    abstract handle(request: Request): void

}


class AuthHandler extends Handler {
    handle(request: Request) {
        if (!request.isAuthenticated) {
            console.log("Not Authenticated")
            return
        }
        this.nextHandler?.handle(request)
    }
}


class AuthorzationHandler extends Handler {
    handle(request: Request): void {
        if (!request.isAdmin) {
            console.log("Not Admin")
            return
        }
        this.nextHandler?.handle(request)
    }
}

class ValidationHandler extends Handler {

    handle(request: Request): void {

        if (!request.body) {
            console.log("Validation Failed");
            return;
        }

        console.log("Validation Passed");

        this.nextHandler?.handle(request);
    }
}

class BussinessHandler extends Handler {
    handle(request: Request): void {
        console.log("process request")
    }
}

const auth = new AuthHandler();
const authorization = new AuthorzationHandler();
const validation = new ValidationHandler();
const business = new BussinessHandler();

auth
    .setNext(authorization)
    .setNext(validation)
    .setNext(business)



const req = new Request(
    true,
    true,
    "data"
);
auth.handle(req)