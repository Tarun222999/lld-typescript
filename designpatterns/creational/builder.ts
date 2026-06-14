//builder pattern is used when constructing
//objects with optional parameters where constructor can get error prone


class Computer {
    constructor(
        public cpu: string,
        public wifi?: boolean,
        public gpu?: string

    ) { }
}


class ComputerBuilder {
    private cpu!: string;
    private gpu?: string
    private wifi = false;

    setCPU(cpu: string): this {
        this.cpu = cpu;
        return this
    }

    setGPU(gpu: string): this {
        this.gpu = gpu;
        return this
    }

    setWIFI(req: boolean): this {
        this.wifi = req;
        return this
    }



    builder() {
        return new Computer(this.cpu, this.wifi, this.gpu)
    }

}


const gamingPC: Computer = new ComputerBuilder()
    .setCPU("i9")
    .setGPU("RTX 500")
    .setWIFI(true)
    .builder()



// const request = new HttpRequestBuilder()
//     .setMethod("POST")
//     .setUrl("/users")
//     .setHeaders(headers)
//     .setBody(body)
//     .setTimeout(5000)
//     .setRetries(3)
//     .build();